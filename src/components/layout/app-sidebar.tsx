"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Command,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getNav, isItemActive, NavAction, NavItemData } from "@/constant/sidebar";
import { useQueryData } from "@/hooks/useQueryData";
import { getWorkSpaces } from "@/actions/workspace";
import Modal from "../modals/modal";

type SidebarContextValue = { open: boolean; toggle: () => void };
const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used inside <SidebarProvider>");
  return ctx;
}

export function SidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <SidebarContext.Provider value={{ open, toggle: () => setOpen((o) => !o) }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function SidebarToggle({ className }: { className?: string }) {
  const { open, toggle } = useSidebar();
  const Icon = open ? PanelLeftClose : PanelLeftOpen;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={open ? "Close sidebar" : "Open sidebar"}
      className={cn(
        "rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground cursor-pointer",
        className,
      )}
    >
      <Icon className="h-4.5 w-4.5" strokeWidth={1.5} />
    </button>
  );
}

function WorkspaceSwitcher({ currentId }: { currentId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { data: ws, isFetched, isPending } = useQueryData(["user-workspaces"], getWorkSpaces);

  const owned = ws?.data.workspaces?.workSpace ?? [];
  const joined =
    ws?.data.workspaces?.members
      .map((m) => m.WorkSpace)
      .filter((w): w is NonNullable<typeof w> => w !== null) ?? [];

  const allWorkspaces = [...owned, ...joined].filter(
    (w, i, arr) => arr.findIndex((x) => x.id === w.id) === i,
  );

  const current = allWorkspaces.find((w) => w.id === currentId);
  const name = isPending ? "Loading..." : (current?.name ?? "Workspace");

  return (
    <div className="relative mb-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full select-none items-center justify-between rounded-lg px-2 py-2 text-left transition-colors hover:bg-accent/60"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-[13px] font-semibold text-primary-foreground shadow-sm">
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="mb-1 max-w-30 truncate text-[13px] font-medium leading-none text-foreground">
              {name}
            </span>
          </div>
        </div>
        <ChevronDown
          className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
          strokeWidth={1.5}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-13 z-50 flex w-full flex-col gap-0.5 rounded-lg border border-border bg-popover py-1 text-popover-foreground shadow-xl animate-in fade-in zoom-in-95 duration-100">
            {allWorkspaces.map((ws) => (
              <button
                key={ws.id}
                type="button"
                onClick={() => {
                  setOpen(false);
                  router.push(`/dashboard/${ws.id}`);
                }}
                className={cn(
                  "mx-1 rounded-md px-3 py-2 text-left text-[13px] transition-colors",
                  ws.id === currentId
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-foreground/80 hover:bg-accent/60",
                )}
              >
                {ws.name}
              </button>
            ))}
            <div className="mx-2 my-1 h-px bg-border" />
            <button
              type="button"
              className="mx-1 flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 text-left text-[13px] text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
            >
              <span className="mb-0.5 text-[16px] leading-none">+</span> Create Workspace
            </button>

          <Modal
            title="Invite to Workspace"
            description="Invite other users to your workspace."
            trigger={
              <button className="w-full mx-1 flex items-center cursor-pointer gap-2 rounded-md px-3 py-2 text-left text-[13px] text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground">
              <span className="mb-0.5 text-[16px] leading-none">+</span> Invite to Workspace
                
              </button>
            }
          >
            <p className="text-sm text-muted-foreground">Invite form goes here.</p>
          </Modal>
          </div>
        </>
      )}
    </div>
  );
}

function NavItem({
  item,
  pathname,
  onAction,
  level = 0,
}: {
  item: NavItemData;
  pathname: string;
  onAction: (a: NavAction) => void;
  level?: number;
}) {
  const hasChildren = !!item.children?.length;
  const isActive = isItemActive(item, pathname);
  // open the group by default if one of its children is the current page
  const [open, setOpen] = useState(() => !!item.children?.some((c) => isItemActive(c, pathname)));

  const rowClass = cn(
    "group flex w-full select-none items-center justify-between rounded-md py-[7px] pr-2.5 text-left text-[13px] transition-colors",
    isActive
      ? "bg-accent font-medium text-accent-foreground"
      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
  );
  const style = { paddingLeft: level * 12 + 10 };

  const inner = (
    <>
      <span className="flex min-w-0 items-center gap-2.5">
        <item.icon
          className={cn(
            "h-4 w-4 shrink-0 transition-colors",
            isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
          )}
          strokeWidth={1.5}
        />
        <span className="truncate tracking-wide">{item.title}</span>
      </span>

      <span className="flex items-center gap-2">
        {item.shortcut && (
          <kbd className="hidden h-5 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground group-hover:inline-flex">
            {item.shortcut}
          </kbd>
        )}
        {item.badge !== undefined && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1.5 text-[10px] font-medium text-primary">
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <ChevronRight
            className={cn(
              "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
              open && "rotate-90",
            )}
            strokeWidth={2}
          />
        )}
      </span>
    </>
  );

  return (
    <div className="flex w-full flex-col">
      {hasChildren ? (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={rowClass}
          style={style}
        >
          {inner}
        </button>
      ) : item.href ? (
        <Link
          href={item.href}
          aria-current={isActive ? "page" : undefined}
          className={rowClass}
          style={style}
        >
          {inner}
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => item.action && onAction(item.action)}
          className={rowClass}
          style={style}
        >
          {inner}
        </button>
      )}

      {hasChildren && (
        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="relative mt-0.5 flex min-h-0 flex-col gap-0.5 overflow-hidden">
            <div
              className="absolute inset-y-0 border-l border-border"
              style={{ left: level * 12 + 17.5 }}
            />
            {item.children!.map((child) => (
              <NavItem
                key={child.id}
                item={child}
                pathname={pathname}
                onAction={onAction}
                level={level + 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SearchDialog({ onClose }: { onClose: () => void }) {
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
            className="flex-1 bg-transparent py-4 text-[14px] text-foreground outline-none placeholder:text-muted-foreground"
            placeholder="Search projects, docs, or actions..."
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
            <X className="h-4.5 w-4.5" strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center p-2 py-8">
          <Command className="mb-2 h-6 w-6 text-muted-foreground/50" strokeWidth={1.5} />
          <p className="text-[13px] font-medium text-muted-foreground">
            Type a command or search...
          </p>
        </div>
      </div>
    </div>
  );
}

function UpgradeCard({ href }: { href: string }) {
  return (
    <div className="mt-auto rounded-lg border border-border bg-muted/40 p-5">
      <div className="mb-1.5 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" strokeWidth={1.5} />
        <span className="text-[13px] font-medium text-foreground">Upgrade to Pro</span>
      </div>
      <p className="mb-3 text-[12px] leading-snug text-muted-foreground">
        Unlock more features and higher limits for your workspace.
      </p>
      <Link
        href={href}
        className="flex w-full items-center justify-center rounded-md bg-primary px-2 py-1.5 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Upgrade
      </Link>
    </div>
  );
}

export function AppSidebar({
  activeWorkspaceId,
  className,
}: {
  activeWorkspaceId: string;
  onSignOut?: () => void;
  className?: string;
}) {
  const { open } = useSidebar();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  const { groups } = getNav(`/dashboard/${activeWorkspaceId}`);

  const handleAction = (action: NavAction) => {
    if (action === "search") setSearchOpen(true);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <aside
      inert={!open}
      className={cn(
        "h-full shrink-0 overflow-hidden border-border bg-card transition-[width] duration-300 ease-in-out",
        open ? "w-65 border-r" : "w-0",
        className,
      )}
    >
      <div className="flex h-full w-65 flex-col p-3">
        <WorkspaceSwitcher currentId={activeWorkspaceId} />

        <nav className="scrollbar-none mt-2 flex flex-1 flex-col gap-4 overflow-y-auto">
          {groups.map((group, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              {group.heading && (
                <span className="mb-1 px-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.heading}
                </span>
              )}
              {group.items.map((item) => (
                <NavItem key={item.id} item={item} pathname={pathname} onAction={handleAction} />
              ))}
            </div>
          ))}
        </nav>

        <UpgradeCard href="/upgrade" />
      </div>

      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
    </aside>
  );
}
