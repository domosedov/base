import HelloWorld from '@/vitest-example/HelloWorld'
import { EffectorNext } from '@effector/next'
import type { Metadata } from 'next'
import { getData } from './data-loader'
import { TodoList } from './todo_list'
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
      </div>
    </EffectorNext>
  )
}
