import { QueryClient, isServer } from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (isServer) {
    // Server: always a new client per request
    return makeQueryClient()
  }
  // Browser: reuse one client so React suspending doesn't recreate it
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}