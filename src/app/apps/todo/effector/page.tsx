import HelloWorld from '@/vitest-example/HelloWorld'
import { EffectorNext } from '@effector/next'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getData } from './data-loader'
import { TodoList } from './todo_list'
import { UserAction } from './user-action'
import { UserData } from './user-data'

export const metadata: Metadata = {
  title: 'Todo app',
}

export default async function TodoAppPage() {
  return (
    <EffectorNext values={await getData()}>
      <div className='container mx-auto'>
        <h1>Todo app</h1>
        <TodoList />
        <UserData />
        <HelloWorld name='Playwright' />
        <Suspense fallback={<p>Loading user...</p>}>
          <UserAction />
        </Suspense>
      </div>
    </EffectorNext>
  )
}
