import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const config = {
  runtime: 'nodejs',
}

export function middleware(_req: NextRequest, _event: NextFetchEvent) {
  return NextResponse.next()
}
