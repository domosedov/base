'use client'

import { useEffect, useState } from 'react'

export default function HelloWorld({ name }: { name: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('Count...', count)
  }, [count])

  return (
    <div>
      <h1>Hello {name}!</h1>
      <button type='button' onClick={() => setCount(c => c + 1)}>
        Inc
      </button>
    </div>
  )
}
