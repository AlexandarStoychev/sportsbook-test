import { Locator, Page } from "playwright";
import { expect } from "playwright/test";

export class HomePage {
  readonly page;
  readonly basketBallCategoryButton: Locator;
  readonly aToZPageButton: Locator;
  readonly formula1Button: Locator;
  readonly formula1TabLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basketBallCategoryButton = page.getByLabel("7").locator("a");
    this.aToZPageButton = page.getByRole("link", { name: " A-Z Sports" });
    this.formula1Button = page.getByRole("link", { name: " Formula" });
    this.formula1TabLocator = page.locator(".active.top-nav-link");
  }

  async navigateToTheFormula1Page() {
    await this.formula1Button.click();
    await this.page.waitForLoadState("load");
  }

  async navigateToTheAZPage() {
    await this.aToZPageButton.click();
    await this.page.waitForLoadState("load");
  }

  async navigateToTheBasketballSeciton() {
    await this.basketBallCategoryButton.click();
    await this.page.waitForLoadState("load");
  }

  async assertThatTheFormula1TabIsSelected() {
    await expect(this.formula1TabLocator).toBeVisible();
    await expect(this.formula1TabLocator).toContainText("Formula");
  }

  async assertThatTheUrlContainsFormula1() {
    const currentUrl = this.page.url();
    console.log(currentUrl);
    expect(currentUrl).toContain("formula");
  }
}
