import {test, expect} from '@playwright/test';

export class GenericPageAction{
    constructor(page){
        this.page = page;
    }

    async clickOn(locator){
        await this.page.locator(locator).click();
    }

    async waitSecond(seconds){
        await this.page.waitForTimeout(seconds * 1000);
    }

    async waitForPageLoad(){
        await this.page.waitForLoadState('load');
    }

    async navigateToUrl(url){
        await this.page.goto(url);
    }

    async enterText(locator, text){
        await this.page.locator(locator).fill(text);
    }


}