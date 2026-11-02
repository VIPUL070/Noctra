"use client";

// import { useMutationData } from "@/hooks/useMutationData";
import { useSearch } from "@/hooks/useSearch";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Command, Search, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface SearchDialogProps {
  workspaceId?: string;
  onClose: () => void;
}
function SearchDialog({ onClose }: SearchDialogProps) {
  const { query, onSearchQuery, isFetching, onUsers } = useSearch("get-users", "USERS");

  // WIP
  // const { mutate , isPending} = useMutationData(
  //   ['invite-member'],
  //   (data: {receiverId: string, email:string}) => {

  //   }
  // )

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/60 px-4 pt-[15vh] backdrop-blur-sm"
    >
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center border-b border-border px-4">
          <Search className="mr-3 h-4.5 w-4.5 shrink-0 text-muted-foreground" strokeWidth={1.5} />
          <input
            autoFocus
            onChange={onSearchQuery}
            value={query}
            className="flex-1 bg-transparent py-4 text-[14px] text-foreground outline-none placeholder:text-muted-foreground"
            placeholder="Search users or workspaces..."
          />
          <kbd className="ml-2 hidden h-5 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
            ESC
          </kbd>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="ml-3 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="h-4.5 w-4.5 cursor-pointer" strokeWidth={1.5} />
          </button>
        </div>

        {isFetching ? (
          <div className="flex flex-col gap-1 p-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 rounded-md px-3 py-2.5">
                <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-3.5 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-8 w-16 rounded-md" />
              </div>
            ))}
          </div>
        ) : onUsers && onUsers.length > 0 ? (
          <div className="flex max-h-80 flex-col gap-1 overflow-y-auto p-2">
            {onUsers.map((user) => {
              const fullName =
                [user.firstName, user.lastName].filter(Boolean).join(" ") || "Unknown user";
              return (
                <div
                  key={user.id}
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-accent/60"
                >
                  {user.image ? (
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarImage src={user.image ?? undefined} alt={fullName} />
                      <AvatarFallback className="text-[13px] font-semibold">
                        {fullName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-[13px] font-semibold text-foreground">
                      {fullName.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[13px] font-medium text-foreground">
                      {fullName}
                    </span>
                    <span className="truncate text-[12px] text-muted-foreground">{user.email}</span>
                  </div>

                  {user.subscription?.plan === "PRO" && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                      PRO
                    </span>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    // disabled={isPending}
                    // onClick={() => mutate({ receiverId: user.id, email: user.email ?? "" })}
                  >
                    Invite
                  </Button>
                </div>
              );
            })}
          </div>
        ) : onUsers ? (
          <div className="flex flex-col items-center justify-center p-2 py-8">
            <Search className="mb-2 h-6 w-6 text-muted-foreground/50" strokeWidth={1.5} />
            <p className="text-[13px] font-medium text-muted-foreground">No users found</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-2 py-8">
            <Command className="mb-2 h-6 w-6 text-muted-foreground/50" strokeWidth={1.5} />
            <p className="text-[13px] font-medium text-muted-foreground">
              Type a command or search...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchDialog;
