'use client'
import { useQuery } from '@tanstack/react-query'

export function UserData() {
  const { data, isLoading } = useQuery({
    queryKey: ['user-data'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
      if (!res.ok) {
        throw new Error('Failed to fetch user data', { cause: res })
      }
      return res.json()
    },
  })

  if (isLoading) {
    return <div>Loading user data...</div>
  }

  return (
    <div>
      <h2>User data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
