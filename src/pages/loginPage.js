import {  expect } from '@playwright/test';
import { TestDataFactory } from '../../test-data/sauvedemourl_const';
import { GenericPageAction } from '../../utils/genericPageAction';

const urls = TestDataFactory.allUrls();

export class LoginPage{
    constructor(page, context){
        this.page = page;
        this.genericPageAction = new GenericPageAction(page);
        this.locator_usernameInput = '#user-name';
        this.locator_passwordInput = '#password';
        this.locator_loginButton = '#login-button';
        this.locator_errorMessage = '[data-test="error"]';
        this.text_errorMessageForLockedUser = 'Epic sadface: Sorry, this user has been locked out.';
    }

    async navigateToLoginPage(){
        const baseURL = urls.BASE_URL;
        await this.genericPageAction.navigateToUrl(baseURL);
    }

    async login(username, password){
        await this.genericPageAction.enterText(this.locator_usernameInput, username);
        await this.genericPageAction.enterText(this.locator_passwordInput, password);
        await this.genericPageAction.clickOn(this.locator_loginButton);
    }

    async verifyErrorMessageForLockedUser(){
        await expect(this.page.locator(this.locator_errorMessage)).toHaveText(this.text_errorMessageForLockedUser);
    }

    async verifyLoginSuccess(){
        await this.genericPageAction.waitForPageLoad();
        await expect(this.page).toHaveURL(urls.INVENTORY_URL);
    }

}