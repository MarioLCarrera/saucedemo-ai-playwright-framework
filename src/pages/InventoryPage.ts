import { expect, Locator, Page } from '@playwright/test';

export type InventorySortOption = 'az' | 'za' | 'lohi' | 'hilo';

function parsePrice(text: string): number {
    const price = Number(text.replace('$', ''));
    if (!Number.isFinite(price)) {
        throw new Error(`Invalid product price "${text}".`);
    }
    return price;
}

export class InventoryPage {
    readonly items: Locator;
    private readonly names: Locator;
    private readonly prices: Locator;
    private readonly sortDropdown: Locator;

    constructor(page: Page) {
        this.items = page.getByTestId('inventory-item');
        this.names = page.getByTestId('inventory-item-name');
        this.prices = page.getByTestId('inventory-item-price');
        this.sortDropdown = page.getByTestId('product-sort-container');
    }

    async expectLoaded() {
        await expect(this.items.first()).toBeVisible();
    }

    async selectSortOption(option: InventorySortOption) {
        await this.sortDropdown.selectOption(option);
    }

    async readNames(): Promise<string[]> {
        return this.names.allTextContents();
    }

    async readPrices(): Promise<number[]> {
        const priceTexts = await this.prices.allTextContents();
        return priceTexts.map(parsePrice);
    }

    async expectNamesInOrder(names: string[]) {
        await expect(this.names).toHaveText(names);
    }

    async expectPricesInOrder(prices: number[]) {
        await expect(this.prices).toHaveText(prices.map((price) => `$${price.toFixed(2)}`));
    }

    async expectEachProductComplete() {
        for (const item of await this.items.all()) {
            await expect(item.getByTestId('inventory-item-name')).toBeVisible();
            await expect(item.getByTestId('inventory-item-desc')).toBeVisible();
            await expect(item.getByTestId('inventory-item-price')).toBeVisible();
            await expect(item.getByRole('img')).toBeVisible();
        }
    }
}