import {test, expect} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {loadHomePage, assertTitle, assertErrorMessage} from '../helpers'


test.describe.only("Login Suite", () => {
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.loadLoginPage()
    })

    test("Verify non existing user cannot login in", async ({page}) => {
        await loginPage.login("jack", "kjkasdk")
        await assertErrorMessage(await loginPage.getErrorMessage(), "The username jack is not registered on this site. If you are unsure of your username, try your email address instead.")
    })
})


test.skip("Assertions", async ({page}) => {
    await page.goto('http://fidelitasplayground.xyz/')
    await expect(page).toHaveURL('http://fidelitasplayground.xyz/')
    await expect(page).toHaveTitle('api_test – Just another WordPress site')
    const pageHeader = await page.locator('h1')
    await expect(pageHeader).toBeVisible()
    await expect(pageHeader).toHaveText('api_test')
    await expect(pageHeader).toHaveCount(1)
    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
})

test.describe('hooks', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://fidelitasplayground.xyz/')
    })
    test("Screenshots", async ({page}) => {
        await page.screenshot({path: 'screenshot.png', fullpage: true})
    })

    test("Single element Screenshot", async ({page}) => {
        const element = await page.$('h1')
        await element.screenshot({path: "single_elem.png"})
    })
})

test("Custome helpers", async ({page}) => {
    await loadHomePage(page)
    await assertTitle(page)
    // const temp = await page.locator('h6')
    // await expect(temp).toBeVisible()
})