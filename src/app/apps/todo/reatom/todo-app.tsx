'use client'

import { atom } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

const newTodoTitleAtom = atom('', 'newTodoTitleAtom')

type Todo = {
  id: string
  title: string
  completed: boolean
}

const todosAtom = atom<Todo[]>([], 'todosAtom')

const modalAtom = atom(false, 'modalAtom')

const Modal = reatomComponent(() => {
  return (
    <div>
      <div>{modalAtom() ? 'open' : 'close'}</div>
      <button onClick={() => modalAtom()}>toggle</button>
    </div>
  )
}, 'Modal')

const TodoList = reatomComponent(() => {
  return (
    <div>
      {todosAtom().map(todo => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  )
}, 'TodoList')

const TodoForm = reatomComponent(() => {
  return (
    <div>
      <input
        type='text'
        value={newTodoTitleAtom()}
        onChange={() => newTodoTitleAtom()}
      />
    </div>
  )
}, 'TodoForm')

export const TodoApp = reatomComponent(() => {
  return (
    <div>
      <div>Reactom</div>
      <Modal />
      <TodoForm />
      <TodoList />
    </div>
  )
}, 'TodoApp')
