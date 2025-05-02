'use client'

import { useEffect, useState } from 'react'

export default function HelloWorld({ name }: { name: string }) {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<unknown>()

  useEffect(() => {
    console.log('Count...', count)
  }, [count])

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(setData)
  }, [])

  return (
    <div role='article'>
      <h1>Hello {name}!</h1>
      <button type='button' onClick={() => setCount(c => c + 1)}>
        Inc
      </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
