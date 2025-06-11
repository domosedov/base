import { mockHandlers } from '@/mocks/handlers'
import { createWorkerFixture, type WorkerFixture } from '@msw/playwright'
import { test as testBase } from '@playwright/test'

interface Fixtures {
  worker: WorkerFixture
}

export const test = testBase.extend<Fixtures>({
  // Create your worker fixture to access in tests.
  worker: createWorkerFixture({
    initialHandlers: mockHandlers,
  }),
})
