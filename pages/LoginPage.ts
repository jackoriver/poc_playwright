import { expect, Locator, Page } from '@playwright/test'
import {BasePage} from './BasePage'

export class LoginPage extends BasePage{
    // Selectors
    // readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    readonly errorMessage: Locator

    // Init selectors using constructor
    constructor(page: Page) {
        super(page)
        this.usernameInput = page.locator('#username')
        this.passwordInput = page.locator('#password')
        this.loginButton = page.locator('text=Log in')
        this.errorMessage = page.locator('.woocommerce-error')
    }

    // Define Login methods
    async loadLoginPage() {
        await this.visit('/my-account')
    }

    async login(username: string, pass: string){
        await this.usernameInput.type(username)
        await this.passwordInput.type(pass)
        await this.loginButton.click()
    }

    async getErrorMessage(){
        return this.errorMessage
    }

}