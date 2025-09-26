
export class TestDataFactory{
    static allUrls(){
        // available environments: qa, stage, prod
        //const env = process.env.ENV || 'qa';
        const BASE_URL = 'https://www.saucedemo.com/?env=qa';
        const INVENTORY_URL = 'https://www.saucedemo.com/inventory.html';
        const CART_URL = 'https://www.saucedemo.com/cart.html';
        return {BASE_URL, INVENTORY_URL, CART_URL};    
}};


