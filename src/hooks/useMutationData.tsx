'use client'

import { toast } from '@/components/ui/toast'
import {
  useMutation,
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