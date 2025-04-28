import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { setTimeout } from 'node:timers/promises'

export const config = {
  runtime: 'nodejs',
}

export function middleware(req: NextRequest, event: NextFetchEvent) {
  event.waitUntil(
    setTimeout(1_000).then(() => {
      console.log('Send middleware analytics')
    }),
  )

  return NextResponse.next()
}
