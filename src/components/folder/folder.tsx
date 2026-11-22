"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { FolderOpen } from "lucide-react";
import React, { useRef, useState } from "react";
import { useMutationData } from "@/hooks/useMutationData";
import { renameFolder } from "@/actions/workspace";
import { Input } from "../ui/input";

interface FolderProps {
  name: string;
  id?: string;
  optimistic?: boolean;
  count?: number;
}

const Folder = ({ name, id, optimistic, count }: FolderProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [onRename, setRename] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const folderCardRef = useRef<HTMLDivElement | null>(null);

  //optimistic updates
  const { mutate: update, isPending } = useMutationData(
    ["rename-folder"],
    (data: { name: string }) => renameFolder(id, data.name),
    ["workspace-folders"],
    () => setRename(false),
  );

  const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isPending) return;
    if (!inputRef.current || !folderCardRef.current) return;

    const target = e.target as Node | null;
    const clickedOutside =
      !inputRef.current.contains(target) && !folderCardRef.current.contains(target);

    if (!clickedOutside) return;

    const newName = inputRef.current.value.trim();
    if (newName && newName !== name) {
      update({ name: newName });
    } else {
      setRename(false);
    }
  };

  const handleFolderClick = () => {
    router.push(`${pathname}/folder/${id}`);
  };

  const handleEditName = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    setRename(true);
  };

  return (
<div
  className={cn(
    "flex hover:bg-neutral-800 shadow-lg cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-62.5 py-4 px-4 rounded-sm",
  )}
  onClick={handleFolderClick}
>
  <div className="flex min-w-0 flex-1 flex-col gap-px">
    {onRename ? (
      <Input
        autoFocus
        defaultValue={name}
        ref={inputRef}
        onClick={(e) => e.stopPropagation()} 
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
          if (e.key === "Escape") setRename(false);
        }}
        onBlur={updateFolderName}
        className="h-6 rounded-none border-0 border-b border-neutral-500 bg-transparent p-0 text-base leading-6 shadow-none focus-visible:border-neutral-300 focus-visible:ring-0 md:text-base dark:bg-transparent"
      />
    ) : (
      <p
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={handleEditName}
        className="h-6 truncate text-base leading-6 text-neutral-300 underline cursor-text"
      >
        {name}
      </p>
    )}

    <span className="text-sm text-neutral-500">{count || 0} videos</span>
  </div>
  <FolderOpen className="size-4 shrink-0" />
</div>
  );
};

export default Folder;