'use client'
import { QueryClientProvider as QueryClientProviderBase } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getQueryClient } from './get-query-client'

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProviderBase client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProviderBase>
  )
}
