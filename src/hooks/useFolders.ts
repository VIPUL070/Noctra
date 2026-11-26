import { useAppSelector } from "@/lib/redux/hooks"
import { FoldersItem } from "@/types"
import { useEffect, useState } from "react"
import { useMutationData } from "./useMutationData"
import { getWorkspaceFolders, moveVideoLocation } from "@/actions/workspace"
import { moveVideoSchema } from "@/components/forms/schema"                                 
import useZodForm from "./useZodFrom"
    
export const useMoveVideos = (videoId: string, currentWorkspace: string) => {
  // redux
  const { folders } = useAppSelector((state) => state.folder)
  const { workspaces } = useAppSelector((state) => state.workspace)

  // state for fetching folders of the selected workspace
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [isFolders, setIsFolders] = useState<FoldersItem | undefined>(undefined)

  const { mutate, isPending } = useMutationData(
    ["change-video-location"],
    (data: { folderId: string; workspaceId: string }) =>
      moveVideoLocation(videoId, data.folderId, data.workspaceId),
    ["folder-videos"]
  )

  const { errors, onFormSubmit, watch, register } = useZodForm(
    moveVideoSchema,
    mutate,
    { folderId: null, workspaceId: currentWorkspace }
  )

  // fetch folders for a workspace
  const fetchFolders = async (workspace: string) => {
    setIsFetching(true)
    try {
      const res = await getWorkspaceFolders(workspace)
      setIsFolders(res.data)
    } catch (error) {
      console.error("Failed to fetch folders", error)
      setIsFolders(undefined)
    } finally {
      setIsFetching(false)
    }
  }

  // initial fetch (and when the current workspace changes)
  useEffect(() => {
    fetchFolders(currentWorkspace)
  }, [currentWorkspace])

  // refetch whenever the user picks a different workspace in the form
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "workspaceId" && value.workspaceId) {
        fetchFolders(value.workspaceId)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  return {
    onFormSubmit,
    errors,
    register,
    isPending,
    folders,       
    workspaces,  
    isFetching,
    isFolders,     
  }
}