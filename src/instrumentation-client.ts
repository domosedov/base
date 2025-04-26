console.log('instrumentation-client.ts')

if (process.env.NEXT_PUBLIC_E2E_TESTING === '1') {
  import('@/mocks/browser').then(async ({ worker }) => {
    await worker.start()
  })
}
