import { ChevronRight, Folders as FolderIcon  } from "lucide-react"
import { FoldersProps } from "../dashboard/create-folders"
import { cn } from "@/lib/utils"
import Folder from "./folder"

const Folders = ({workspaceId}:FoldersProps) => {
    //get folders
    // optimistic var => 
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderIcon />
          <h2 className="text-lg">Folders</h2>
        </div>
        <div className="flex items-center gap-2 text-foreground/70 cursor-pointer">
           <p>See all</p>
           <ChevronRight className="size-4"/>
        </div>
      </div>
      <section className={cn('flex items-center gap-4 overflow-x-auto w-full')}>
      <Folder name="Folder title" />
      </section>
    </div>
  )
}

export default Folders