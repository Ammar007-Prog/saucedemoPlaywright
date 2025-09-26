import {  expect } from '@playwright/test';
import { TestDataFactory } from '../../test-data/sauvedemourl_const';
import { GenericPageAction } from '../../utils/genericPageAction';

const urls = TestDataFactory.allUrls();

export class CheckoutPage{
    constructor(page, context){
        this.page = page;
        this.genericPageAction = new GenericPageAction(page);
        this.locator_header = page.locator('.header_secondary_container');
        this.text_checkout_your_information = 'Checkout: Your Information';
        this.locator_firstname = '//input[@name="firstName"]';
        this.locator_lastname = '//input[@name="lastName"]';
        this.locator_zipcode = '//input[@name="postalCode"]';
        this.locator_button_continue = '#continue';
    }

    async verifyHeaderTextOnCheckoutPage(){
        await expect(this.locator_header).toContainText(this.text_checkout_your_information);
    }

    async fillInCheckoutInformationAndContinue(firstname, lastname, zipcode){
        await this.genericPageAction.enterText(this.locator_firstname, firstname);
        await this.genericPageAction.enterText(this.locator_lastname, lastname);
        await this.genericPageAction.enterText(this.locator_zipcode, zipcode);
        await this.page.locator(this.locator_button_continue).click();
        await this.page.waitForTimeout(2000);
    }


}