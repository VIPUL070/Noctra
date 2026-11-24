"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useMutationData, useMutationDataState } from "@/hooks/useMutationData";
import { renameFolder } from "@/actions/workspace";
import { Input } from "../ui/input";
import { FolderDuotoneIcon } from "../ui/folder-duotone";

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

  const {latestVar} = useMutationDataState<{name:string , id:string}>(['rename-folder'])

  const updateFolderName = () => {
    if (isPending) return;
    if (!inputRef.current) return;

    const newName = inputRef.current.value.trim();
    if (newName) {
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
  className={cn("group relative flex min-w-62.5 cursor-pointer items-center justify-between gap-2 rounded-xl px-4 py-6",
        "border border-white/8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]",
        "transition-all duration-200 ease-out",
        "hover:border-white/15 hover:from-neutral-800/80 hover:to-neutral-900",
        "hover:shadow-[0_8px_30px_rgba(255,255,255,0.04),inset_0_1px_0_0_rgba(255,255,255,0.1)]",
        optimistic && "pointer-events-none opacity-60",
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
        placeholder={name}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
          if (e.key === "Escape") setRename(false);
        }}
        onBlur={updateFolderName}
        className="h-4 rounded-none border-0 border-b border-neutral-500 bg-transparent p-0 text-xs shadow-none focus-visible:border-neutral-300 focus-visible:ring-0 md:text-sm dark:bg-transparent"
      />
    ) : (
      <p
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={handleEditName}
        className="h-6 truncate text-base leading-6 text-neutral-300 underline cursor-text"
      >
        {latestVar && latestVar.status === 'pending' &&
        latestVar?.variables?.id === id ? latestVar?.variables?.name : name} 
      </p>
    )}

    <span className="text-sm text-neutral-500">{count || 0} videos</span>
  </div>
  <FolderDuotoneIcon className="shrink-0" />
</div>
  );
};

export default Folder;