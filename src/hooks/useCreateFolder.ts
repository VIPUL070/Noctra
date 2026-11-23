import { createFolder } from "@/actions/workspace"
import { useMutationData } from "./useMutationData"

export const useCreateFolder = (workspaceId: string) => {
   const { mutate, isPending } = useMutationData(
      ['create-folder'],
      () => createFolder(workspaceId),
      ['workspace-folders'],
   )

   const onCreateNewFolder = () => mutate()

   return {onCreateNewFolder, isPending}
}