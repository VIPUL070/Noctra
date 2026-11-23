'use client'
import { FolderPlus } from "lucide-react";
import { Button } from "../ui/button";
import { useCreateFolder } from "@/hooks/useCreateFolder";
import Loader from "../ui/loader";

export interface FoldersProps {
  workspaceId: string;
}

const CreateFolders = ({ workspaceId }: FoldersProps) => {
  const { onCreateNewFolder, isPending } = useCreateFolder(workspaceId);
  return (
    <Button className={"flex items-center gap-2 p-4 cursor-pointer"}
    onClick={onCreateNewFolder}
    disabled={isPending}
    >
       {isPending ? <Loader /> : <><FolderPlus /> Create Folder</> }{" "}
    </Button>
  );
};

export default CreateFolders;