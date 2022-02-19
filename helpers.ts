import {expect, Locator} from "@playwright/test";

export async function loadHomePage(page){
    await page.goto('http://fidelitasplayground.xyz')
}

export async function assertTitle(page){
    await page.waitForSelector('h1')
}

// this function inputs: Locator and expected message
export async function assertErrorMessage(elem: Locator, message: string) {
    await expect(elem).toContainText(message)
}
