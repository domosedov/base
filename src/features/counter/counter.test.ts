import { invoke } from '@withease/factories'
import { allSettled, fork } from 'effector'
import { describe, expect, it } from 'vitest'
import { createCounter } from './factory'

describe('counter factory', () => {
  it('should create a counter with default values', async () => {
    expect.hasAssertions()

    const { $count, increment, decrement, reset } = invoke(() =>
      createCounter(),
    )

    const scope = fork()

    await allSettled(increment, { scope })

    expect(scope.getState($count)).toBe(1)

    await allSettled(decrement, { scope })

    expect(scope.getState($count)).toBe(0)

    await allSettled(reset, { scope })

    expect(scope.getState($count)).toBe(0)
  })

  it('should create a counter with custom initial value and step', async () => {
    expect.hasAssertions()

    const INITIAL_COUNT = 5

    const { $count, increment, decrement, reset } = invoke(() =>
      createCounter({
        initialValue: INITIAL_COUNT,
        step: 2,
      }),
    )

    const scope = fork()

    await allSettled(increment, { scope })

    expect(scope.getState($count)).toBe(7)

    await allSettled(decrement, { scope })

    expect(scope.getState($count)).toBe(5)

    await allSettled(reset, { scope })

    expect(scope.getState($count)).toBe(INITIAL_COUNT)
  })
})
