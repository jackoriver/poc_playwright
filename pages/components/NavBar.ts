import {Locator, Page} from '@playwright/test'

export class NavBar{
    // Selectors
    readonly page: Page
    readonly home: Locator
    readonly cart: Locator
    readonly checkout: Locator
    readonly my_account: Locator
    readonly refund_terms: Locator

    // Constructor
    constructor(page: Page) {
        this.page = page
        this.home = page.locator('#site-navigation .nav-menu li:nth-child(1)')
        this.cart = page.locator('#site-navigation .nav-menu li:nth-child(2)')
        this.checkout = page.locator('#site-navigation .nav-menu li:nth-child(3)')
        this.my_account = page.locator('#site-navigation .nav-menu li:nth-child(4)')
        this.refund_terms = page.locator('#site-navigation .nav-menu li:nth-child(5)')
    }

    async navigateToPage(page_name: string){
        switch (page_name){
            case 'Home':
                await this.home.click()
                break
            case 'Cart':
                await this.cart.click()
                break
            case 'Checkout':
                await this.checkout.click()
                break
            case 'My Account':
                await this.my_account.click()
                break
            case 'Refund and Returns Policy':
                await this.refund_terms.click()
                break
            default:
                throw new Error("This element doesn't exist in the navigation bar")
        }
    }

}