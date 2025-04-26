import { EffectorNext } from '@effector/next'
import { reflect } from '@effector/reflect'
import { invoke } from '@withease/factories'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { createCounter } from './factory'

describe('counter ui integration', () => {
  it('should render counter', async () => {
    expect.hasAssertions()

    const counterModel = invoke(() => createCounter())

    const Counter = reflect({
      view: CounterView,
      bind: {
        count: counterModel.$count,
        onIncrement: counterModel.increment,
        onDecrement: counterModel.decrement,
      },
    })

    const screen = render(<Counter />, {
      wrapper: EffectorNext,
    })

    const incrementButton = screen.getByRole('button', {
      name: 'increment',
    })

    await expect.element(incrementButton).toBeInTheDocument()

    const count = screen.getByText(/count/i)

    await expect.element(count).toBeInTheDocument()

    await incrementButton.click({
      clickCount: 10,
    })

    await expect.element(count).toHaveTextContent('10')

    const decrementButton = screen.getByRole('button', {
      name: 'decrement',
    })

    await expect.element(decrementButton).toBeInTheDocument()

    await decrementButton.click({
      clickCount: 5,
    })

    await expect.element(count).toHaveTextContent('5')
  })
})

function CounterView({
  count,
  onDecrement,
  onIncrement,
}: {
  count: number
  onIncrement: () => void
  onDecrement: () => void
}) {
  return (
    <div className='flex items-center justify-center gap-2 rounded-sm border border-dashed border-gray-200 p-4'>
      <button
        type='button'
        aria-label='decrement'
        className='flex size-10 items-center justify-center rounded-xs border border-gray-500'
        onClick={onDecrement}
      >
        -
      </button>
      <span className='text-2xl font-bold'>Count: {count}</span>
      <button
        type='button'
        aria-label='increment'
        className='flex size-10 items-center justify-center rounded-xs border border-gray-500'
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  )
}
