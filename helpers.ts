import {expect, Locator} from "@playwright/test";

// this function inputs: Locator and expected message
export async function assertErrorMessage(elem: Locator, message: string) {
    await expect(elem).toContainText(message)
}
