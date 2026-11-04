import { UserButton } from "@clerk/nextjs";
import { ScreenShare, Search, UploadIcon } from "lucide-react";
import { SidebarToggle } from "./app-sidebar";
import { Button } from "../ui/button";

const InfoBar = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 bg-background/80 px-3 backdrop-blur sm:gap-3 sm:px-4">
        
      <SidebarToggle className="shrink-0" />

      <div className="flex min-w-0 flex-1 justify-center">
        <label className="flex h-9 w-full max-w-md items-center gap-2 rounded-full border border-border bg-muted/40 px-3 transition-colors focus-within:border-ring/50 focus-within:bg-background focus-within:ring-2 focus-within:ring-ring/10">
          <Search
            className="h-4 w-4 shrink-0 text-muted-foreground"
            strokeWidth={1.5}
          />
          <input
            type="search"
            aria-label="Search"
            className="min-w-0 flex-1 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
            placeholder="Search people, projects, tags & folders..."
          />
        </label>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <Button size="sm" className={'text-xs cursor-pointer flex gap-2'}><UploadIcon className="size-4"/> <span>Upload</span></Button>
        <Button size="sm" className={'text-xs cursor-pointer flex gap-2'}><ScreenShare className="size-4"/> <span>Record</span></Button>
        <UserButton />
      </div>
    </header>
  );
};

export default InfoBar;