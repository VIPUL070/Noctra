'use client';

import { WorkSpace } from "@/generated";
import { usePathname } from "next/navigation";

export interface HeaderProps {
    workspace: WorkSpace
}

const WorkSpaceHeader = ({workspace}: HeaderProps) => {
  const pathName = usePathname().split(`/dashboard/${workspace.id}`)[1];
  return (
    <article className="flex flex-col gap-2 text-foreground">
        <span className="text-foreground/70 text-xs">
            {workspace.type.toLocaleUpperCase()}
        </span>
        <h1 className="text-4xl font-semibold">
            {
                pathName && !pathName.includes('folder')
                ? pathName.charAt(0).toUpperCase() + pathName.slice(1).toLowerCase()
                : "My Library"
            }
        </h1>
    </article>
  )
}

export default WorkSpaceHeader;