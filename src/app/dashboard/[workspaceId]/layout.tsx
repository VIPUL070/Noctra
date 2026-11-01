import { getNotifications, onAuthenticateUser } from "@/actions/user";
import {
  getAllUserVideos,
  getWorkspaceFolders,
  getWorkSpaces,
  verifyAccessToWorkspace,
} from "@/actions/workspace";
import { AppSidebar, SidebarProvider, SidebarToggle } from "@/components/layout/app-sidebar";
import { ThemeToggleButton } from "@/components/theme-toggle";
import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface WorkSpaceLayoutProps {
  params: Promise<{ workspaceId: string }>;
  children: ReactNode;
}

async function Layout({ params, children }: WorkSpaceLayoutProps) {
  const { workspaceId } = await params;

  const auth = await onAuthenticateUser();
  if (!auth.user?.workSpace?.length) {
    return redirect(`/auth/sign-in`);
  }
  if (!auth.user?.workSpace.length) {
    return redirect(`/auth/sign-in`);
  }

  const hasAccess = await verifyAccessToWorkspace(workspaceId);
  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user.workSpace[0]?.id}`);
  }
  if (!hasAccess.data?.workspace) return null;

  const queryClient = getQueryClient();
  await queryClient.query({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });
  await queryClient.query({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  });
  await queryClient.query({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkSpaces(),
  });
  await queryClient.query({
    queryKey: ["user-notifications"],
    queryFn: () => getNotifications(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarProvider>
        <div className="flex h-screen bg-background">
          <AppSidebar activeWorkspaceId = {workspaceId} />
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex h-14 shrink-0 items-center border-b border-border px-4">
              <SidebarToggle />
              <ThemeToggleButton className="size-4.5 rounded-full"/>
            </header>
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </HydrationBoundary>
  );
}

export default Layout;