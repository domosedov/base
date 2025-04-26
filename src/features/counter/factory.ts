import { createFactory } from '@withease/factories'
import { createStore } from 'effector'
import { createAction } from 'effector-action'

type Config = {
  initialValue?: number
  step?: number
}

function createCounterImpl(config?: Config) {
  const { initialValue = 0, step = 1 } = config || {}

  const $count = createStore(initialValue)

  const increment = createAction({
    target: $count,
    fn: count => {
      count(currentValue => currentValue + step)
    },
  })

  const decrement = createAction({
    target: $count,
    fn: count => {
      count(currentValue => currentValue - step)
    },
  })

  const reset = $count.reinit

  return {
    $count,
    increment,
    decrement,
    reset,
  }
}

export const createCounter = createFactory(createCounterImpl)
