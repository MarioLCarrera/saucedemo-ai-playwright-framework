import { expect, test } from '@playwright/test';
import { password } from '../../src/data/users';
import { InventoryPage, InventorySortOption } from '../../src/pages/InventoryPage';
import { LoginPage } from '../../src/pages/LoginPage';

type SortCase = {
    id: 'I-02' | 'I-03';
    description: string;
    option: InventorySortOption;
};

const nameSortCases: SortCase[] = [
    { id: 'I-02', description: 'name A to Z', option: 'az' },
    { id: 'I-02', description: 'name Z to A', option: 'za' },
];

const priceSortCases: SortCase[] = [
    { id: 'I-03', description: 'price low to high', option: 'lohi' },
    { id: 'I-03', description: 'price high to low', option: 'hilo' },
];

test.describe('Inventory', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', password);
        await loginPage.expectLoggedIn();
    });

    test('I-01 inventory displays six complete products', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await expect(inventoryPage.items).toHaveCount(6);
        await inventoryPage.expectEachProductComplete();
    });

    for (const { id, description, option } of nameSortCases) {
        test(`${id} sorts by ${description}`, async ({ page }) => {
            const inventoryPage = new InventoryPage(page);
            await inventoryPage.expectLoaded();

            const ascending = [...(await inventoryPage.readNames())].sort((a, b) =>
                a.localeCompare(b, 'en'),
            );
            const expected = option === 'az' ? ascending : [...ascending].reverse();

            // A to Z is the default order, so switch away first to prove the option really sorts
            if (option === 'az') {
                await inventoryPage.selectSortOption('za');
            }
            await inventoryPage.selectSortOption(option);
            await inventoryPage.expectNamesInOrder(expected);
        });
    }

    for (const { id, description, option } of priceSortCases) {
        test(`${id} sorts by ${description}`, async ({ page }) => {
            const inventoryPage = new InventoryPage(page);
            await inventoryPage.expectLoaded();

            const ascending = [...(await inventoryPage.readPrices())].sort((a, b) => a - b);
            const expected = option === 'lohi' ? ascending : [...ascending].reverse();

            await inventoryPage.selectSortOption(option);
            await inventoryPage.expectPricesInOrder(expected);
        });
    }
});