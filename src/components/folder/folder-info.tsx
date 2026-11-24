'use client'
import { getFolderInfo } from "@/actions/workspace"
import { useQueryData } from "@/hooks/useQueryData"

interface FolderInfoProps {
    folderId : string
}

const FolderInfo = ({folderId}: FolderInfoProps) => {
    const {data: folder} = useQueryData(['folder-info'], () => getFolderInfo(folderId))

    const info =
    folder && typeof folder.data === 'object' && folder.data !== null
      ? folder.data
      : null

  return (
    <div className="flex items-center">
        <h2 className="text-foreground/90 text-2xl">{info?.name}</h2>
    </div>
  )
}

export default FolderInfo