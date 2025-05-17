import { concurrency, createQuery } from '@farfetched/core'
import { createEffect, createStore, sample } from 'effector'

export type Todo = {
  id: number
  title: string
  completed: boolean
  userId: number
}

export type User = {
  id: number
  name: string
}

async function fetchTodos(params?: { _limit?: number; _start?: number }) {
  const { _limit = 10, _start = 0 } = params || {}

  const url = new URL('/todos', 'https://jsonplaceholder.typicode.com')

  url.searchParams.set('_limit', _limit.toString())
  url.searchParams.set('_start', _start.toString())

  const response = await fetch(url, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch todos', {
      cause: response,
    })
  }

  const todos: Todo[] = await response.json()

  return todos
}

export const todosQuery = createQuery({
  effect: createEffect(fetchTodos),
  initialData: [],
})

todosQuery.__.$latestParams.watch(console.log)

concurrency(todosQuery, {
  strategy: 'TAKE_LATEST',
})

export const $todos = createStore<Todo[]>([], {
  sid: '$todos',
})

sample({
  clock: todosQuery.$data,
  target: $todos,
})
