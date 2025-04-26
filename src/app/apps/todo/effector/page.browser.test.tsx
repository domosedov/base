import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import * as model from './model'
import ServerPage from './page'

describe('server component TodoAppPage', () => {
  it('should pass', async () => {
    expect.hasAssertions()

    const currentHandler = model.todosQuery.__.executeFx.use.getCurrent()

    model.todosQuery.__.executeFx.use(() => {
      return [
        { id: 1, title: 'todo 1', completed: false },
        { id: 2, title: 'todo 2', completed: true },
      ]
    })

    const Comp = await ServerPage()

    const screen = render(Comp)

    await expect.element(screen.getByText(/Todo app/i)).toBeInTheDocument()

    model.todosQuery.__.executeFx.use(currentHandler) // restore original handler
  })
})
