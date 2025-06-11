import { createEffect, createStore } from 'effector'
import { createAction } from 'effector-action'

// Стор для хранения значения счетчика
const $count = createStore(0)

// Эффект для логирования достижения лимита
const logFx = createEffect(() => {
  console.log('Достигнут лимит!')
})

// Стор с лимитом
const $limit = createStore(10)

type IncrementPayload =
  | {
      step: number
    }
  | undefined

// Действие для инкремента
const incrementBy = createAction({
  target: {
    count: $count,
    log: logFx,
  },
  source: {
    count: $count,
    limit: $limit,
  },
  fn: (targets, sources, payload: IncrementPayload) => {
    const { step = 1 } = payload ?? {}
    if (sources.count >= sources.limit) {
      targets.log()
    } else {
      targets.count((current: number) => current + step)
    }
  },
})

export { $count, $limit, incrementBy }

incrementBy()
