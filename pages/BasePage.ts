import { Page } from "@playwright/test";

export class BasePage {
    readonly page: Page
    readonly baseurl: string

    constructor(page: Page) {
        this.page = page
        this.baseurl = "http://fidelitasplayground.xyz"
    }

    async visit(url: string){
        await this.page.goto(this.baseurl + url)
    }
}