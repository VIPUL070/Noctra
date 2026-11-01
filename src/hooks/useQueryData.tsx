'use client'

import { QueryKey, useQuery } from '@tanstack/react-query'

export const useQueryData = <T,>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>,
  enabled?: boolean,
) => {
  const { data, isPending, isFetched, refetch, isFetching } = useQuery({
    queryKey,
    queryFn,
    enabled,
  })

  return { data, isPending, isFetched, isFetching, refetch }
}