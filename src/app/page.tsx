import { routes } from '@/shared/routes.generated'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <h1>Hello</h1>
      <nav>
        <ul>
          <li>
            <Link href={routes['/apps/todo/effector']()}>
              Effector Todo App
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
