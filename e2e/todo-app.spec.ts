import { worker } from '@/mocks/browser'
import { routes } from '@/shared/routes.generated'
import { expect, test } from '@playwright/test'

test.describe('todo app', () => {
  test.only('has title', async ({ page }) => {
    // await page.addInitScript(async () => {
    //   await worker.start()
    // })

    await page.goto(routes['/']())

    await page
      .getByRole('link', {
        name: /effector todo app/i,
      })
      .click()

    await expect(page.getByText(/loading/i)).toBeInViewport()

    await expect(page).toHaveTitle(/todo app/i)

    const list = page.getByRole('list')

    await expect(list).toBeVisible()

    await expect(list.getByRole('listitem')).toHaveCount(10)

    await expect(page.getByRole('article')).toBeVisible()
  })
})
