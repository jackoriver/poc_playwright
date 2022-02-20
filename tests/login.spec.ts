import {test, expect} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {AccountPage} from "../pages/AccountPage";
import {assertErrorMessage} from '../helpers'
import {NavBar} from "../pages/components/NavBar";


test.describe("Login Suite", () => {
    let loginPage: LoginPage
    let accountPage: AccountPage
    let navbar: NavBar

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        accountPage = new AccountPage(page)
        navbar = new NavBar(page)
        await loginPage.loadLoginPage()
    })

    test("Verify non existing user cannot login in", async ({page}) => {
        const username = 'test_user'
        const pass = "badpass"
        await loginPage.login(username, pass)
        await assertErrorMessage(await loginPage.getErrorMessage(), `The username ${username} is not registered on this site. If you are unsure of your username, try your email address instead.`)
    })

    test("Verify user cannot login in with incorrect password", async ({page}) => {
        await loginPage.login("catta", "jkhjgh")
        await assertErrorMessage(await loginPage.getErrorMessage(), "Error: The password you entered for the username catta is incorrect. Lost your password?")
    })

    test.only("Verify user can login in correctly", async ({page}) => {
        const username = 'catta'
        await loginPage.login(username, "Sentalf12!")
        await assertErrorMessage(await accountPage.getGreet(),`Hello ${username}`)
    })
})