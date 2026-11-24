import { getAllUserVideos, getFolderInfo } from "@/actions/workspace"
import FolderInfo from "@/components/folder/folder-info"
import Videos from "@/components/videos/videos"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

interface FolderPageProps {
    params: Promise< {
        folderId: string,
        workspaceId: string
    }>
}
const FolderPage = async ({params}:FolderPageProps) => {
    const {folderId, workspaceId} = await params;
    const queryClient = new QueryClient();
    await Promise.all([
    queryClient
      .query({
        queryKey: ["folder-videos", folderId],
        queryFn: () => getAllUserVideos(folderId),
      }),
    queryClient
      .query({
        queryKey: ["folder-info", folderId],
        queryFn: () => getFolderInfo(folderId),
      }),
  ])
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FolderInfo folderId={folderId} />
      <Videos folderId={folderId} workspaceId={workspaceId} videoKey='folder-videos' />
    </HydrationBoundary>
  )
}

export default FolderPage