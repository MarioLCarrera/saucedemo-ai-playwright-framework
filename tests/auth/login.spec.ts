import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test('standard_user can log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.expectLoggedIn();
});