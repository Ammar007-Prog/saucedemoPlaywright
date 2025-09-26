import {  expect } from '@playwright/test';
import { TestDataFactory } from '../../test-data/sauvedemourl_const';
import { GenericPageAction } from '../../utils/genericPageAction';


const urls = TestDataFactory.allUrls();

export class HomePage{
    constructor(page, context){
        this.page = page;
        this.genericPageAction = new GenericPageAction(page);
        this.cartIcon = '.shopping_cart_link';
        this.nullCountCartValidateMessage = 'no item selected, cart count is empty'
        this.inventoryItems = page.locator('#inventory_container .inventory_item');
        this.buttonTextLocator = page.locator('button.btn_inventory')
        this.loocator_shopingcart_badge = page.locator('.shopping_cart_badge');
        this.text_addtocart = 'Add to cart';
        this.text_remove = 'Remove';
        this.text_addedtocart = 'already added to cart';
        this.locator_filter = '.product_sort_container';
        this.locator_product_price = page.locator('.inventory_item_price');
    }

    async verifyCartCountIsEmpty() {
        const cartCount = await this.page.locator(this.cartIcon).textContent();
        expect(cartCount).toBe("");  
        console.log(this.nullCountCartValidateMessage);
    }

    async addToCardByIndex(productByIndexArray) {
        for (let index of productByIndexArray) {
            const item = this.inventoryItems.nth(index - 1);
            const button = item.locator('button.btn_inventory');
            let buttonText = await button.textContent();
            console.log(`Button text for item index ${index}: ${buttonText}`);
            let buttonTextOnly = buttonText?.trim();
            if (buttonTextOnly === this.text_addtocart) {
                await button.click();
            } else {
                return this.text_addedtocart;
            }
        }
    }


    async verifyCartCount(expectedCount) {
        const cartCount = await this.loocator_shopingcart_badge.textContent();
        console.log(`Cart count after adding products: ${cartCount}`);
        expect(cartCount).toBe(expectedCount.toString());
    }

    async VerifyButtonChangedToRemove(idx) {
        for (let index  of idx){
            try {
            const item = this.inventoryItems.nth(index-1);
            const buttonText = await item.locator('button.btn_inventory').textContent();
            const buttonTextOnly = buttonText?.trim();
            expect(buttonTextOnly).toBe(this.text_remove);
            console.log(`Button text for item index ${index} is correctly set to 'Remove'.`);
            } catch (error) {
                console.error(`Verification failed for item index ${index}: ${error.message}`);
                throw error;
            }
        }
    }

    async navigateToCartPage(){
        await this.genericPageAction.clickOn(this.cartIcon);
        await expect(this.page).toHaveURL(urls.CART_URL);
    }

    async clickOnFilter(){
        await this.genericPageAction.clickOn(this.locator_filter);
    }

    async selectFilterOption(value) {
        await this.page.locator('.product_sort_container').selectOption(value);
    }

    async selectDropdownOption(optionName) {
        switch (optionName.toLowerCase()) {
            case 'name_ascending':
                await this.selectFilterOption('az');
                break;
            case 'name_descending':
                await this.selectFilterOption('za');
                break;
            case 'price_low_to_high':
                await this.selectFilterOption('lohi');
                break;
            case 'price_high_to_low':
                await this.selectFilterOption('hilo');
                break;
            default:
                throw new Error(`Invalid dropdown option: ${optionName}`);
        }
    }

    async verifyPricesAreSortedAscending() {
        const prices = await this.locator_product_price.allTextContents();
        console.log('Product prices:', prices);
        // Convert price strings to numbers and verify sorting
        const priceValues = prices.map(price => parseFloat(price.replace('$', '')));
        const sortedPrices = [...priceValues].sort((a, b) => a - b);
        expect(priceValues).toEqual(sortedPrices);
        console.log('Products are sorted by price from low to high correctly.');
    }

}