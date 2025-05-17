import { keyval } from '@effector/model'
import { createEvent, createStore, sample } from 'effector'

export const formModel = keyval(() => {
  const $name = createStore('')

  const $value = createStore('')

  const set = createEvent<string>()

  sample({
    clock: set,
    target: $value,
  })

  return {
    key: 'name',
    state: {
      name: $name,
      value: $value,
    },
    api: {
      setValue: set,
    },
  }
})
