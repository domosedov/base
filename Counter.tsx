import { useUnit } from 'effector-react'
import React from 'react'
import { $count, $limit, incrementBy } from './counter'

export const Counter: React.FC = () => {
  const [count, limit, increment] = useUnit([$count, $limit, incrementBy])
  const isLimit = count >= limit

  return (
    <div className='mx-auto mt-10 flex max-w-xs flex-col items-center space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-md'>
      <h2 className='text-2xl font-bold text-gray-800'>Счётчик</h2>
      <div className='flex items-center space-x-4'>
        <button
          className='rounded bg-gray-200 px-4 py-2 text-xl font-bold transition hover:bg-gray-300'
          onClick={() => increment({ step: -1 })}
          disabled={count <= 0}
        >
          -
        </button>
        <span className='w-16 text-center font-mono text-3xl'>{count}</span>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-xl font-bold text-white transition hover:bg-blue-600 disabled:bg-gray-300'
          onClick={() => increment({ step: 1 })}
          disabled={isLimit}
        >
          +
        </button>
      </div>
      <div className='text-sm text-gray-500'>Лимит: {limit}</div>
      {isLimit && (
        <div className='font-semibold text-red-500'>Достигнут лимит!</div>
      )}
    </div>
  )
}
