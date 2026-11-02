'use client'

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
  onSuccess?: () => void,
) => {
  const queryClient = useQueryClient()

  const { mutate, mutateAsync, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (data) => {
      onSuccess?.();
      //return toast with data
    },
    onSettled: async () => {
      if (queryKeyToInvalidate) {
        await queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate })
      }
    },
  })

  return { mutate, mutateAsync, isPending }
}