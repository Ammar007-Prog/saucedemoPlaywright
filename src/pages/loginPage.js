import {  expect } from '@playwright/test';
import { TestDataFactory } from '../../test-data/sauvedemourl_const';
import { GenericPageAction } from '../../utils/genericPageAction';

const urls = TestDataFactory.allUrls();

// const usernameInput = '#user-name';
// const passwordInput = '#password';
//const loginButton = '#login-button';
// const errorMessage = '[data-test="error"]';
// const errorMessageForLockedUser = 'Epic sadface: Sorry, this user has been locked out.';

export class LoginPage{

    constructor(page, context){
        this.page = page;
        this.genericPageAction = new GenericPageAction(page);
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
        this.errorMessage = page.locator('[data-test="error"]');
        this.errorMessageForLockedUser = 'Epic sadface: Sorry, this user has been locked out.';
    }

    

    async navigateToLoginPage(){
        const baseURL = urls.BASE_URL;
        await this.genericPageAction.navigateToUrl(baseURL);
    }

    async login(username, password){
        await this.genericPageAction.enterText(this.usernameInput, username);
        await this.genericPageAction.enterText(this.passwordInput, password);
        await this.genericPageAction.clickOn(this.loginButton);
    }
        

    async verifyErrorMessageForLockedUser(){
        await expect(this.errorMessage).toHaveText(this.errorMessageForLockedUser);
    }

    async verifyLoginSuccess(){
        await this.genericPageAction.waitForPageLoad();
        await expect(this.page).toHaveURL(urls.INVENTORY_URL);
    }

}