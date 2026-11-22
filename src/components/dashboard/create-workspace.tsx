'use client'

import { getWorkSpaces } from "@/actions/workspace"
import { useQueryData } from "@/hooks/useQueryData"
import Modal from "../modals/modal"
import { Button } from "../ui/button"
import { FolderPlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import WorkspaceForm from "../forms/workspace-form"

const CreateWorkspace = () => {

   const {data:plan} = useQueryData(['user-workspaces'], getWorkSpaces)

   if(plan?.data.workspaces?.subscription?.plan === "FREE"){
      return <></>
   }

   if(plan?.data.workspaces?.subscription?.plan){
      return(
         <Modal title="Create a Workspace" description="Workspace helps you collaborate with team members. You are assigned a default personal workspace where you can share videos in private with yourself." trigger={<Button className={cn('cursor-pointer')}><FolderPlusIcon /> Create a Workspace</Button>}>
           <WorkspaceForm />
         </Modal>
      )
   }
}

export default CreateWorkspace