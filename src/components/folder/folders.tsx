"use client";
import { ChevronRight, Folders as FolderIcon } from "lucide-react";
import { FoldersProps } from "../dashboard/create-folders";
import { cn } from "@/lib/utils";
import Folder from "./folder";
import { useQueryData } from "@/hooks/useQueryData";
import { getWorkspaceFolders } from "@/actions/workspace";
import { useMutationDataState } from "@/hooks/useMutationData";

const Folders = ({ workspaceId }: FoldersProps) => {
  //get folders
  const { data: response, isFetched } = useQueryData(["workspace-folders"], () =>
    getWorkspaceFolders(workspaceId),
  );

  const { latestVar } = useMutationDataState<{ name: string; id: string }>(["create-folder"]);
  const pendingVars = latestVar?.status === "pending" ? latestVar.variables : undefined;

  const folders = response?.status === 200 ? response.data : [];
  // if (isFetched && folders) {
  //   //use redux
  // }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderIcon />
          <h2 className="text-lg">Folders</h2>
        </div>
        <div className="flex items-center gap-2 text-foreground/70 cursor-pointer">
          <p>See all</p>
          <ChevronRight className="size-4" />
        </div>
      </div>
      <section
        className={cn(
          response?.status !== 200
            ? "justify-center"
            : "flex items-center gap-4 overflow-x-auto w-full",
        )}
      >
        {response?.status !== 200 ? (
          <p>No folders in workspace.</p>
        ) : (
          <>
            {pendingVars && <Folder name={pendingVars.name} id={pendingVars.id} optimistic />}

            {folders.map((folder) => (
              <Folder
                key={folder.id}
                name={folder.name}
                count={folder._count.videos}
                id={folder.id}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Folders;