import { expect } from '@playwright/test';
import { TestDataFactory } from '../../test-data/sauvedemourl_const';
import { GenericPageAction } from '../../utils/genericPageAction';


const urls = TestDataFactory.allUrls();

export class ShopingCartPage{
    constructor(page, context){
        this.page = page;
        this.genericPageAction = new GenericPageAction(page);
        this.locator_subTotal = '.summary_subtotal_label';
        this.locator_tax = '.summary_tax_label';
        this.locator_total = '.summary_total_label';
    }

    async clickOnCheckout(){
        await this.page.locator('#checkout').click();
    }

    async verifyTotalAmountSumOfProductsSubTotalAndTax(){
        const subTotal = await this.page.locator(this.locator_subTotal).textContent();
        const tax = await this.page.locator(this.locator_tax).textContent();
        const total = await this.page.locator(this.locator_total).textContent();
        const sumOfPriceAndTax = parseFloat(subTotal?.replace('Item total: $', '')) + parseFloat(tax?.replace('Tax: $', ''));
        expect(parseFloat(total?.replace('Total: $', ''))).toBeCloseTo(sumOfPriceAndTax, 2);
        console.log('Total price is correctly calculated as the sum of subtotal and tax.');
    }
}