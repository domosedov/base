import { allSettled, fork, serialize } from 'effector'
import { todosQuery } from './model'

export async function getData() {
  const scope = fork()
  await allSettled(todosQuery.refresh, {
    scope,
    params: {},
  })

  return serialize(scope)
}
