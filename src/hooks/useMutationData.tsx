'use client'

import { toast } from '@/components/ui/toast'
import {
  type MutationStatus,
  useMutation,
  useMutationState,
  useQueryClient,
  type MutationKey,
  type QueryKey,
} from '@tanstack/react-query'

export const useMutationData = <TData, TVariables = void>(
  mutationKey: MutationKey,
  mutationFn: (variables: TVariables) => Promise<TData>,
  queryKeyToInvalidate?: QueryKey,
  onSuccess?: (data: TData, variables: TVariables) => void,
) => {
  const queryClient = useQueryClient()

  const { mutate, mutateAsync, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (data, variables) => {
      toast.success('Success')
      onSuccess?.(data, variables)
    },
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong')
    },
    onSettled: async () => {
      if (queryKeyToInvalidate) {
        await queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate })
      }
    },
  })

  return { mutate, mutateAsync, isPending }
}

export const useMutationDataState = <TVariables = unknown>(
  mutationKey: MutationKey,
) => {
  const data = useMutationState({
    filters: { mutationKey },
    select: (mutation) => ({
      variables: mutation.state.variables as TVariables | undefined,
      status: mutation.state.status as MutationStatus,
    }),
  })

  const latestVar = data[data.length - 1]
  return { latestVar }
}