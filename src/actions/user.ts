"use server"

import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { cache } from "react";

export const onAuthenticateUser = cache(async () => {
  try {
    const { userId } = await auth();
    if (!userId) return { status: 401 }

    const userExists = await db.user.findUnique({
      where: { clerkId: userId },
      include: { workSpace: true },
    })

    if (userExists) return { status: 200, user: userExists }

    const user = await currentUser();

    if (!user) return { status: 401 }

    const newUser = await db.user.create({
      data: {
        clerkId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0]!.emailAddress,
        image: user.imageUrl,
        studio: { create: {} },
        subscription: { create: {} },
        workSpace: {
          create: { name: `${user.firstName}'s Workspace`, type: 'PERSONAL' },
        },
      },
      include: {
        workSpace: true,
        subscription: { select: { plan: true } },
      },
    })

    return { status: 201, user: newUser }
  } catch (error) {
    console.log(error)
    return { status: 500 }
  }
})

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

export const searchUsers = async (query: string) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        status: 401,
        data: { users: undefined }
      }
    }

    const users = await db.user.findMany({
      where: {
        OR: [
          { firstName: { contains: query, mode: 'insensitive' } },
          { lastName: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
        ],
        NOT: [{ clerkId: userId }]
      },

      select: {
        id: true,
        subscription: {
          select: {
            plan: true
          }
        },
        firstName: true,
        lastName: true,
        image: true,
        email: true
      }
    })

    if (!users) {
      return {
        status: 404,
        data: { users: undefined }
      }
    }
    return {
      status: 200,
      data: { users }
    }
  } catch (error) {
    console.log("Fetching User Error: ", error)
    return {
      status: 500,
      data: { users: undefined }
    }
  }
}