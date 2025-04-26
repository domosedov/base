'use client'

import { cx } from '@/shared/lib/classnames'
import { useList } from 'effector-react'
import { $todos } from './model'

export function TodoList() {
  return (
    <ul className='flex flex-col gap-y-2'>
      {useList($todos, ({ title, completed }) => (
        <li
          className={cx(
            completed ? 'text-green-600' : 'text-gray-600',
            'rounded-xs p-2',
          )}
        >
          {title}
        </li>
      ))}
    </ul>
  )
}
