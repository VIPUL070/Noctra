import { createWorkspace } from "@/actions/workspace"
import { useMutationData } from "./useMutationData"
import useZodForm from "./useZodFrom"
import { workspaceSchema } from "@/components/forms/schema"

export const useCreateWorkspace = () => {
    const { mutate, isPending } = useMutationData(
        ['create-workspace'],
        (data: { name: string }) => createWorkspace(data.name), ['user-workspaces'])

    const {errors,onFormSubmit,register} = useZodForm(workspaceSchema,mutate)

    return {errors,onFormSubmit,register,isPending};
}