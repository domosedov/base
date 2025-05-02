if (process.env.NEXT_PUBLIC_TEST === 'e2e') {
  import('@/mocks/browser').then(async ({ worker }) => {
    await worker.start()
  })
}
