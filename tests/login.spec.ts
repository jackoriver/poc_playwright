import {test, expect} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {loadHomePage, assertTitle, assertErrorMessage} from '../helpers'


test.describe("Login Suite", () => {
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.loadLoginPage()
    })

    test("Verify non existing user cannot login in", async ({page}) => {
        const username = 'test_user'
        const pass = "badpass"
        await loginPage.login(username, pass)
        await assertErrorMessage(await loginPage.getErrorMessage(), `The username ${username} is not registered on this site. If you are unsure of your username, try your email address instead.`)
    })
})