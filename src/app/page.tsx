'use client'

import { routes } from '@/shared/routes.generated'
import Link from 'next/link'
import { LongPressButton } from './components/long-press-button'

export default function HomePage() {
  return (
    <div>
      <h1>Hello</h1>
      <LongPressButton onLongPress={() => console.log('long press')} />
      <nav>
        <ul>
          <li>
            <Link href={routes['/apps/todo/effector']()}>
              Effector Todo App
            </Link>
          </li>
          <li>
            <Link href={routes['/apps/virtual-dnd']()}>Virtual DND</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
