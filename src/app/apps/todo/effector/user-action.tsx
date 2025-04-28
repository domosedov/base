'use client'

import { useActionState, useTransition } from 'react'
import { fetchUser } from './action'

export function UserAction() {
  const [state, callAction, isPending] = useActionState(fetchUser, null)
  const [isTransition, startTransition] = useTransition()

  return (
    <div className='border border-red-500'>
      {isPending && <p>Loading...</p>}
      {isTransition && <p>Transition...</p>}
      <button
        type='button'
        onClick={async () => {
          startTransition(() => {
            callAction()
          })
        }}
      >
        Fetch user
      </button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}
