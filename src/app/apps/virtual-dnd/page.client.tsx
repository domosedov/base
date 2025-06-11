'use client'

import { cx } from '@/shared/lib/classnames'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { composeRefs } from 'radix-ui/internal'
import type { ComponentProps, CSSProperties, ReactElement } from 'react'
import { cloneElement, useCallback, useMemo, useState } from 'react'
import { merge } from 'remeda'
import type {
  CustomContainerComponentProps,
  CustomItemComponentProps,
} from 'virtua'
import { Virtualizer } from 'virtua'

function VirtualItem({
  children,
  style,
  ref,
  ...props
}: CustomItemComponentProps) {
  const Children = children as ReactElement<ComponentProps<'tr'>>

  return cloneElement(Children, {
    ref: composeRefs(ref, Children.props.ref),
    style: merge(Children.props.style, style),
    ...props,
  })
}

function VirtualContainer({
  ref,
  style,
  children,
}: CustomContainerComponentProps) {
  return (
    <table
      ref={ref}
      style={{
        height: style?.height,
      }}
      className='relative grid border-collapse'
    >
      <thead className='sticky top-0 left-0 z-10 flex bg-gray-100'>
        <tr className='flex w-full'>
          <th className='min-w-[100px] flex-1 p-2 text-left'>Drag</th>
          <th className='min-w-[300px] flex-1 p-2 text-left'>Title</th>
          <th className='min-w-[100px] flex-1 p-2 text-left'>Completed</th>
          <th className='min-w-[100px] flex-1 p-2 text-left'>User Id</th>
        </tr>
      </thead>
      <tbody style={style} className='grid'>
        {children}
      </tbody>
    </table>
  )
}

type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

export default function List() {
  const queryClient = useQueryClient()

  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=100',
      )
      return res.json() as Promise<Todo[]>
    },
  })

  const [activeId, setActiveId] = useState<number | null>(null)

  const activeTodo = useMemo(() => {
    if (!activeId || !todos) return null
    return todos.find(todo => todo.id === activeId)
  }, [activeId, todos])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(+event.active.id)
  }, [])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event

      if (over && active.id !== over?.id) {
        const currentTodos = queryClient.getQueryData<Todo[]>(['todos']) ?? []

        const oldIndex = currentTodos.findIndex(todo => todo.id === +active.id)
        const newIndex = currentTodos.findIndex(todo => todo.id === +over.id)
        const newTodos = arrayMove(currentTodos, oldIndex, newIndex)
        queryClient.setQueryData(['todos'], newTodos)
      }
      setActiveId(null)
    },
    [queryClient],
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!todos) {
    return <div>No todos</div>
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={todos} strategy={verticalListSortingStrategy}>
        <div className='max-w-full overflow-x-auto'>
          <div className='h-100 overflow-y-auto'>
            <Virtualizer as={VirtualContainer} item={VirtualItem}>
              {todos.map(todo => (
                <SortableItem key={todo.id} todo={todo} />
              ))}
            </Virtualizer>
          </div>
        </div>
      </SortableContext>
      <DragOverlay>
        {activeTodo ? <Item todo={activeTodo} /> : null}
      </DragOverlay>
    </DndContext>
  )
}

const Item = ({
  todo,
  className,
  ...props
}: { todo: Todo } & ComponentProps<'div'>) => {
  return (
    <div
      className={cx(
        'flex border-b border-b-gray-300 bg-white p-2 shadow-lg',
        className,
      )}
      {...props}
      // Можно задать фиксированную ширину, если необходимо, или она унаследуется
    >
      <div className='min-w-[200px] p-2'>
        {/* Можно отобразить иконку перетаскивания или оставить пустым */}
        <div className='size-8 cursor-grabbing rounded-lg bg-gray-300 opacity-75' />
      </div>
      <div className='p-2'>{todo.title}</div>
      <div className='p-2'>{todo.completed.toString()}</div>
      <div className='p-2'>{todo.userId}</div>
    </div>
  )
}

const SortableItem = ({
  ref,
  style,
  className,
  todo,
  ...props
}: { todo: Todo } & ComponentProps<'tr'>) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id }) // Используем todo.id

  const dndStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    visibility: isDragging ? 'hidden' : 'visible',
  }

  return (
    <tr
      ref={composeRefs(setNodeRef, ref)}
      style={merge(style, dndStyle)}
      className={cx('flex border-b border-b-gray-300', className)}
      {...props}
    >
      <td className='min-w-[100px] flex-1 p-2'>
        <button
          type='button'
          className='size-8 cursor-grab rounded-lg bg-gray-300'
          {...attributes}
          {...listeners}
        />
      </td>
      <td className='min-w-[300px] flex-1 p-2'>{todo.title}</td>
      <td className='min-w-[100px] flex-1 p-2'>{todo.completed.toString()}</td>
      <td className='min-w-[100px] flex-1 p-2'>{todo.userId}</td>
    </tr>
  )
}
