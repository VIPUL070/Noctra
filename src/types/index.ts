import { getAllUserVideos, getWorkspaceFolders, getWorkSpaces } from "@/actions/workspace"

type VideosResponse = Awaited<ReturnType<typeof getAllUserVideos>>

export type VideoItem = NonNullable<
    NonNullable<VideosResponse>["data"]["videos"]
>[number]

type FoldersResponse = Awaited<ReturnType<typeof getWorkspaceFolders>>

export type FoldersItem = NonNullable<NonNullable<FoldersResponse>["data"]>

type WorkspacesResponse = Awaited<ReturnType<typeof getWorkSpaces>>
type WorkspacesData = NonNullable<WorkspacesResponse["data"]["workspaces"]>
export type WorkspacesList = WorkspacesData["workSpace"]
export type WorkspacesItem = WorkspacesData["workSpace"][number]