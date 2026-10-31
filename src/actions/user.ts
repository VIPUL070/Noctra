"use server"

import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server"

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 401 }
    }

    const userExists = await db.user.findUnique({
      where: {
        clerkId: user.id
      },
      include: {
        workSpace: {
          where: {
            User: {
              clerkId: user.id
            }
          }
        }
      }
    })

    if (userExists) {
      return { status: 200, user: userExists }
    }

    const newUser = await db.user.create({
      data: {
        clerkId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0]!.emailAddress,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workSpace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: 'PERSONAL'
          }
        }
      },
      include: {
        workSpace: {
          where: {
            User: {
              clerkId: user.id
            }
          }
        },
        subscription: {
          select: {
            plan: true
          }
        }
      }
    })

    if (newUser) {
      return { status: 201, user: newUser }
    }
    return { status: 404 }
  } catch (error) {
    console.log(error)
    return { status: 500 }
  }
}

export const getNotifications = async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { status: 401 }
    }

    const notifications = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true
          }
        }
      }
    })

    if (!notifications) {
      return { status: 400, data: { notifications: null } }
    }

    return { status: 200, data: { notifications } }

  } catch (error) {
    console.log("Fetching Notifications Error: ", error)
    return {
      status: 500,
      data: { notifications: null }
    }
  }
}