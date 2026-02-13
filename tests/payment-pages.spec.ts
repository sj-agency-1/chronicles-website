import { test, expect } from '@playwright/test';

test.describe('Payment Result Pages', () => {
  test('Payment Success page displays correct content and links', async ({ page }) => {
    await page.goto('/payment-success');

    await expect(page).toHaveTitle(/Спасибо за ваше пожертвование!/);

    const main = page.locator('main');

    const heading = main.locator('h1');
    await expect(heading).toHaveText('Спасибо за вашу поддержку!');

    await expect(main.locator('text=Ваш платеж был успешно обработан')).toBeVisible();

    const contactLink = main.locator('a[href="/contacts"]');
    await expect(contactLink).toBeVisible();

    const homeLink = main.locator('a[href="/"]', { hasText: 'Вернуться на главную' });
    await expect(homeLink).toBeVisible();

    const donateLink = main.locator('a[href="/donate"]', { hasText: 'Сделать еще одно пожертвование' });
    await expect(donateLink).toBeVisible();

    const breadcrumbs = main.locator('nav');
    await expect(breadcrumbs.locator('a[href="/donate"]')).toBeVisible();
    await expect(breadcrumbs.locator('text=Благодарим вас')).toBeVisible();
  });

  test('Payment Failure page displays correct content and links', async ({ page }) => {
    await page.goto('/payment-failure');

    await expect(page).toHaveTitle(/Что-то пошло не так/);

    const main = page.locator('main');

    const heading = main.locator('h1');
    await expect(heading).toHaveText('Что-то пошло не так');

    await expect(main.locator('text=возникла проблема при обработке вашего платежа')).toBeVisible();
    await expect(main.locator('text=Ваши средства не были списаны')).toBeVisible();

    const contactLink = main.locator('a[href="/contacts"]');
    await expect(contactLink).toBeVisible();

    const tryAgainLink = main.locator('a[href="/donate"]', { hasText: 'Попробовать снова' });
    await expect(tryAgainLink).toBeVisible();

    const homeLink = main.locator('a[href="/"]', { hasText: 'Вернуться на главную' });
    await expect(homeLink).toBeVisible();

    const breadcrumbs = main.locator('nav');
    await expect(breadcrumbs.locator('a[href="/donate"]')).toBeVisible();
    await expect(breadcrumbs.locator('text=Проблема с оплатой')).toBeVisible();
  });
});
