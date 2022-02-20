import {test, expect} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";

import {assertErrorMessage} from '../helpers'

test("Simple basic test", async ({page}) => {
    await page.goto("http://fidelitasplayground.xyz")
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toContainText("api_test")
})

test("Clicking on Elements", async ({page}) => {
    await page.goto('http://fidelitasplayground.xyz/my-account/')
    await page.click('text=Log in')
    const errorMessage = await page.locator('.woocommerce-error')
    await expect(errorMessage).toContainText("Error: Username is required.")
})

test.skip("Selectors", async ({page}) => {
    //text
    await page.click('text=some text')

    //CSS selector
    await page.click('button')
    await page.click('#id')
    await page.click('.class')

    // Only Visible CSS Selector
    await page.click('.submit-visible:visible')

    // Combinations
    await page.click('#username .first')

    //Xpath
    await page.click('//button')
})

test.describe("Example Login Suite", () => {
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.loadLoginPage()
    })

    test("Working with inputs", async ({page}) => {
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