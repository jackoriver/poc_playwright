import {test, expect} from "@playwright/test";

test("Simple baseic test", async ({page}) => {
    await page.goto("http://localhost:8080")
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toContainText("api_test")
})

test("Clicking on Elements", async ({page}) => {
    await page.goto('http://localhost:8080/my-account/')
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

test("Working with inputs", async ({page}) => {
    await page.goto('http://localhost:8080/my-account/')
    await page.type('#username', 'jack')
    await page.type('#password', 'failing')
    await page.click('text=Log in')
    const errorMessage = await page.locator('.woocommerce-error')
    await expect(errorMessage).toContainText("The password you entered for the username jack is incorrect. Lost your password?")
})

test("Assertions", async ({page}) => {
    await page.goto('http://localhost:8080/')
    await expect(page).toHaveURL('http://localhost:8080/')
    await expect(page).toHaveTitle('api_test – Just another WordPress site')
    const pageHeader = await page.locator('h1')
    await expect(pageHeader).toBeVisible()
    await expect(pageHeader).toHaveText('api_test')
    await expect(pageHeader).toHaveCount(1)
    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
})

test.describe.only('hooks', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://localhost:8080/')
    })
    test("Screenshots", async ({page}) => {
        // await page.goto('http://localhost:8080/')
        await page.screenshot({path: 'screenshot.png', fullpage: true})
    })

    test("Single element Screenshot", async ({page}) => {
        // await page.goto('http://localhost:8080/')
        const element = await page.$('h1')
        await element.screenshot({path: "single_elem.png"})
    })
})