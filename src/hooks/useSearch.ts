'use client'

import React, { useEffect, useState } from 'react'
import { useQueryData } from './useQueryData'
import { searchUsers } from '@/actions/user'

export interface OnUserProps {
  id: string
  subscription: { plan: 'PRO' | 'FREE' } | null
  firstName: string | null
  lastName: string | null
  image: string | null
  email: string | null
}

export const useSearch = (key: string, type: 'USERS') => {
  const [query, setQuery] = useState('')
  const [debounce, setDebounce] = useState('')

  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    const delay = setTimeout(() => setDebounce(query), 1000)
    return () => clearTimeout(delay)
  }, [query])

  const hasQuery = debounce.trim().length > 0

  const { data, isFetching } = useQueryData(
    [key, debounce],
    async () => {
      if (type === 'USERS') {
        const res = await searchUsers(debounce)
        if (res.status === 200) return res.data.users
      }
      return null
    },
    hasQuery,
  )
  const onUsers = hasQuery ? data : undefined

  return { query, onSearchQuery, onUsers, isFetching }
}