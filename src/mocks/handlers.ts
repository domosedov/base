import type { HttpHandler } from 'msw'
import { delay, http, HttpResponse } from 'msw'

export const mockHandlers = [
  http.get(
    'https://jsonplaceholder.typicode.com/todos',
    async ({ request }) => {
      const url = new URL(request.url)
      const params = url.searchParams
      const limit = params.get('_limit')

      await delay(1200)

      return HttpResponse.json(
        Array.from({ length: Number(limit) }).map((_, i) => ({
          userId: 1,
          id: i,
          title: `todo ${i}`,
          completed: Math.random() > 0.5,
        })),
      )
    },
  ),
  http.get('https://jsonplaceholder.typicode.com/users/1', async () => {
    await delay(1200)

    return HttpResponse.json({
      id: 1,
      name: 'John Doe',
    })
  }),
  http.get('http://localhost:3000/api/hello', async () => {
    await delay(1200)

    return HttpResponse.json({
      message: 'Hello test!',
    })
  }),
] satisfies HttpHandler[]
