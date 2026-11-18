import { createWorkspace } from "@/actions/workspace"
import { useMutationData } from "./useMutationData"
import useZodForm from "./useZodFrom"

export const useCreateWorkspace = () => {
    const { mutate, mutateAsync, isPending } = useMutationData(
        ['create-workspace'],
        (data: { name: string }) => createWorkspace(data.name), ['user-workspaces'])

    const {} = useZodForm()
}