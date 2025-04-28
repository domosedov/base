'use server'

import { setTimeout } from 'node:timers/promises'

export async function fetchUser() {
  await setTimeout(1000)

  const res = await fetch('http://localhost:3000/jsonp/users/2')
  if (!res.ok) {
    throw new Error('Failed to fetch user')
  }
  return res.json()
}
