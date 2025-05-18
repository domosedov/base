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
        position: 'relative',
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        whiteSpace: 'nowrap',
      }}
      className='grid'
    >
      <thead className='flex'>
        <tr className='flex'>
          <th className='min-w-[200px] flex-1'>Drag</th>
          <th>Title</th>
          <th>Completed</th>
          <th>User Id</th>
        </tr>
      </thead>
      <tbody
        style={{
          ...style,
          contain: undefined,
          position: 'absolute',
          left: 0,
        }}
        className='grid'
      >
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
                <SortableItem key={todo.id} todoId={todo.id} />
              ))}
            </Virtualizer>
          </div>
        </div>
      </SortableContext>
      <DragOverlay>
        {activeId != null ? <Item id={activeId.toString()}>LOL</Item> : null}
      </DragOverlay>
    </DndContext>
  )
}

const Item = ({ className, ...props }: ComponentProps<'div'>) => {
  return <div className={cx('', className)} {...props} />
}

const SortableItem = ({
  ref,
  style,
  className,
  todoId,
  ...props
}: { todoId: Todo['id'] } & ComponentProps<'div'>) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todoId })

  const queryClient = useQueryClient()

  const todo = useMemo(() => {
    const todos = queryClient.getQueryData<Todo[]>(['todos'])
    const todo = todos?.find(todo => todo.id === todoId)
    return todo
  }, [queryClient, todoId])

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
      <td className='min-w-[200px] p-2'>
        <button
          type='button'
          className='size-8 cursor-grab rounded-lg bg-gray-300'
          {...attributes}
          {...listeners}
        />
      </td>
      <td className='p-2'>{todo?.title}</td>
      <td className='p-2'>{todo?.userId}</td>
      <td className='p-2'>{todo?.userId}</td>
    </tr>
  )
}
