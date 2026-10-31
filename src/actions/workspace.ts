"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const verifyAccessToWorkspace = async (workSpaceId: string) => {
    try {
        const { userId } = await auth();

        if (!userId) {
            return {
                status: 401,
                data: { workspace: null },
            };
        }

        const workspace = await db.workSpace.findFirst({
            where: {
                id: workSpaceId,
                OR: [
                    {
                        User: {
                            clerkId: userId,
                        },
                    },
                    {
                        members: {
                            some: {
                                User: {
                                    clerkId: userId,
                                },
                            },
                        },
                    },
                ],
            },
        });

        if (!workspace) {
            return {
                status: 404,
                data: { workspace: null },
            };
        }

        return {
            status: 200,
            data: { workspace },
        };
    } catch (error) {
        console.error("[VERIFY_ACCESS_TO_WORKSPACE_ERROR]", error);
        return {
            status: 500,
            data: { workspace: null },
        };
    }
};

export const getWorkspaceFolders = async (workSpaceId: string) => {
    try {
        const isFolders = await db.folder.findMany({
            where: {
                workSpaceId
            },
            include: {
                _count: {
                    select: {
                        videos: true
                    }
                }
            }
        })

        if (isFolders && isFolders.length > 0) {
            return {
                status: 200,
                data: isFolders
            }
        }
        return {
            status: 404,
            data: []
        }
    } catch (error) {
        console.log("Fetching Workspace Folders Error: ", error)
        return {
            status: 500,
            data: []
        }
    }
}
export const getAllUserVideos = async (workSpaceId: string) => {
    try {
        const videos = await db.video.findMany({
            where: {
                OR: [
                    {
                        workSpaceId
                    }, {
                        folderId: workSpaceId
                    }
                ]
            },
            select: {
                id: true,
                title: true,
                createdAt: true,
                source: true,
                processing: true,
                Folder: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                User: {
                    select: {
                        firstName: true,
                        lastName: true,
                        image: true
                    }
                }
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        if (!videos) {
            return {
                status: 404,
                data: { videos: null },
            };
        }

        return {
            status: 200,
            data: { videos }
        };

    } catch (error) {
        console.log("User Videos Error: ", error)
        return {
            status: 500,
            data: { videos: null }
        }
    }
}

export const getWorkSpaces = async () => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return {
                status: 401,
                data: { workspaces: null }
            }
        }

        const workspaces = await db.user.findUnique({
            where: {
                clerkId: userId
            },
            select: {
                subscription: {
                    select: {
                        plan: true,
                    }
                },
                workSpace: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                    },
                },
                members: {
                    select: {
                        WorkSpace: {
                            select: {
                                id: true,
                                name: true,
                                type: true,
                            },
                        },
                    },
                },
            },
        })

        if (!workspaces) {
            return {
                status: 404,
                data: { workspaces: null }
            }
        }
        return {
            status: 200,
            data: { workspaces }
        }
    } catch (error) {
        console.log("Fetching User Workspaces Error: ", error)
        return {
            status: 500,
            data: { workspaces: null }
        }
    }
}