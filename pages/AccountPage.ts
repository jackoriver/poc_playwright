import { expect, Locator, Page } from '@playwright/test'
import {BasePage} from './BasePage'

export class AccountPage extends BasePage{
    // Selectors
    readonly greet: Locator
    readonly logoutLink: Locator

    // Constructor
    constructor(page: Page) {
        super(page)
        this.greet = page.locator('.woocommerce-MyAccount-content > p:nth-child(2)')
        this.logoutLink = page.locator('text=Log out')
    }

    // Functions
    async getGreet(){
        return this.greet
    }

    async getLogoutLink(){
        return this.logoutLink
    }


}