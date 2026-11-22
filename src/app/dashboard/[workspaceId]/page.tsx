import CreateFolders from "@/components/dashboard/create-folders";
import CreateWorkspace from "@/components/dashboard/create-workspace";
import Folders from "@/components/folder/folders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface Props {
  params: Promise<{ workspaceId: string }>;
}

const Page = async ({ params }: Props) => {
  const { workspaceId } = await params;
  return (
    <div>
      <Tabs defaultValue="videos" className="mt-6">
        <div className="flex w-full justify-between items-center">
          <TabsList className="bg-transparent gap-2 pl-0">
            <TabsTrigger
              value="videos"
              className="px-6 rounded-full data-[state=active]:bg-foreground cursor-pointer"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger
              value="archive"
              className="px-6 rounded-full data-[state=active]:bg-foreground cursor-pointer"
            >
              Archive
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-x-3">
            <CreateWorkspace />
            <CreateFolders workspaceId={workspaceId} />
          </div>
        </div>

        <section className="py-9">
          <TabsContent value="videos">
            <Folders workspaceId={workspaceId} />
          </TabsContent>
        </section>
      </Tabs>
    </div>
  );
};

export default Page;