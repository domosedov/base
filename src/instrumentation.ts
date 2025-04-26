export async function register() {
  if (
    process.env.NEXT_RUNTIME === 'nodejs' &&
    process.env.NEXT_PUBLIC_E2E_TESTING === '1'
  ) {
    const { mockServer } = await import('@/mocks/node')
    mockServer.listen()
  }
}
