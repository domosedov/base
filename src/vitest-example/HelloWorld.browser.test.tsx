import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import HelloWorld from './HelloWorld.jsx'

describe('render HelloWorld', () => {
  it('renders name', async () => {
    expect.hasAssertions()

    const { getByText } = render(<HelloWorld name='Vitest' />)

    await expect.element(getByText('Hello Vitest!')).toBeInTheDocument()
  })
})
