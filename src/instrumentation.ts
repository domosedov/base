export async function register() {
  if (
    process.env.NEXT_RUNTIME === 'nodejs' &&
    process.env.NEXT_PUBLIC_TEST === 'e2e'
  ) {
    const { mockServer } = await import('@/mocks/node')
    mockServer.listen()
  }
}
