import { Locator, Page } from "playwright";
import { faker } from "@faker-js/faker";
import { expect } from "playwright/test";

export class LiveBettingPage {
  readonly page;
  readonly eventViewButton: Locator;
  readonly basketBallCategoryButton: Locator;
  readonly liveEventsLocator: Locator;
  readonly valuesInsideEventPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.eventViewButton = page.getByRole("link", { name: "Event View" });
    this.basketBallCategoryButton = page.getByLabel("7").locator("a");
    this.liveEventsLocator = page.locator(".grid-info-wrapper");
    this.valuesInsideEventPage = page.locator(".value");
  }

  async navigateToTheBasketballSeciton() {
    await this.basketBallCategoryButton.click();
    await this.page.waitForLoadState("load");
  }

  async getAllLiveEventsAndSelectARandomOne() {
    const numberOfEvents = await this.liveEventsLocator.count();

    // const randomIndex = faker.number.int({
    //   min: 0,
    //   max: numberOfEvents,
    // });

    await this.liveEventsLocator.nth(0).click();
  }

  async addRandomPickToBetslip() {
    const betValue = await this.valuesInsideEventPage.nth(0).textContent();

    await this.valuesInsideEventPage.nth(0).click();

    const text = await this.page.evaluate(() => {
      const element = document.querySelector(".betslip-pick-odds__value");
      return element?.textContent?.trim() || "";
    });

    expect(text).toEqual(betValue);
  }
}