import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { invalidLoginCases } from '../../src/data/users';

test('L-01 standard_user can log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.expectLoggedIn();
});

for (const testCase of invalidLoginCases) {
    test(`${testCase.id} ${testCase.description}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(testCase.username, testCase.password);
        await loginPage.expectErrorMessage(testCase.expectedError);
        await loginPage.expectLoginUrl();
    });
}

test('L-07 direct inventory access without a session', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/inventory.html');
    await loginPage.expectErrorMessage(
        "Epic sadface: You can only access '/inventory.html' when you are logged in.",
    );
    await loginPage.expectLoginUrl();
});