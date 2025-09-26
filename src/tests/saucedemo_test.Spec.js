import {test} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { ShopingCartPage } from '../pages/shoppingCartPage';
import { checkourUser } from '../../test-data/checkoutUserInfo.json';
import { TestDataFactory } from '../../test-data/sauvedemourl_const';
import { CheckoutPage } from '../pages/checkoutPage';
import { userInput } from '../../test-data/loginUserInfo.json';

const urls = TestDataFactory.allUrls();
const LOGIN_BUTTON = '#login-button';

test('Login test', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(userInput.standardUser,userInput.password);
    await loginPage.verifyLoginSuccess();
})


test('Login test for Locked Out User', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(userInput.lockedOutUser,userInput.password);
    await loginPage.verifyErrorMessageForLockedUser();
});


test('Add Items to Cart', async ({page}) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const selectProductByTwoIndexInputArray = [2,6];
    await loginPage.navigateToLoginPage();
    await loginPage.login(userInput.standardUser,userInput.password);
    await loginPage.verifyLoginSuccess();

    await homePage.verifyCartCountIsEmpty();
    await homePage.addToCardByIndex(selectProductByTwoIndexInputArray);
    await page.screenshot({path: 'screenshot.png', fullPage: true});
    await homePage.VerifyButtonChangedToRemove(selectProductByTwoIndexInputArray);
    await homePage.verifyCartCount(selectProductByTwoIndexInputArray.length);

})


test('Sort and validate product',   async ({page}) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(userInput.standardUser,userInput.password);
    await loginPage.verifyLoginSuccess();

    await homePage.clickOnFilter();
    await homePage.selectDropdownOption('price_low_to_high');
    await homePage.verifyPricesAreSortedAscending();
});

test('Checkout items', async ({page}) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const checkoutPage = new CheckoutPage(page);
    const shoppingCartPage = new ShopingCartPage(page);

    const selectProductByTwoIndexInputArray = [2,6];
    await loginPage.navigateToLoginPage();
    await loginPage.login(userInput.standardUser,userInput.password);
    await loginPage.verifyLoginSuccess();
    await homePage.addToCardByIndex(selectProductByTwoIndexInputArray);
    await page.screenshot({path: 'screenshot.png', fullPage: true});

    await homePage.navigateToCartPage();
    await shoppingCartPage.clickOnCheckout();

    await checkoutPage.verifyHeaderTextOnCheckoutPage();
    await checkoutPage.fillInCheckoutInformationAndContinue(checkourUser.firstname, checkourUser.lastname, checkourUser.zipcode);

    await shoppingCartPage.verifyTotalAmountSumOfProductsSubTotalAndTax();    

})



