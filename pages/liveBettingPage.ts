import { Locator, Page } from "playwright";
import { expect } from "playwright/test";

export class LiveBettingPage {
  readonly page;
  readonly eventViewButton: Locator;
  readonly liveEventsLocator: Locator;
  readonly valuesInsideEventPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.eventViewButton = page.getByRole("link", { name: "Event View" });
    this.liveEventsLocator = page.locator(".grid-info-wrapper");
    this.valuesInsideEventPage = page.locator(".value");
  }

  async getAllLiveEventsAndSelectARandomOne() {
    const numberOfEvents = await this.liveEventsLocator.count();

    // const randomIndex = faker.number.int({
    //   min: 0,
    //   max: numberOfEvents,
    // });

    await this.liveEventsLocator.nth(1).click();
  }

  async addRandomPickToBetslipAndAssert() {
    const betValue = await this.valuesInsideEventPage.nth(0).textContent();

    await this.valuesInsideEventPage.nth(0).click();

    await this.page.waitForTimeout(500);

    const valueOnTheBetslip = await this.getTextFromBetslip();
    expect(valueOnTheBetslip).toEqual(betValue);
  }

  async addPickAndWaitForOddsToChangeAndAssert() {
    const betValue = await this.valuesInsideEventPage.nth(0).textContent();
    await this.valuesInsideEventPage.nth(0).click();

    await this.page.waitForTimeout(10000);

    const updatedBetOdd = await this.valuesInsideEventPage.nth(0).textContent();
    expect(updatedBetOdd).not.toBe(betValue);
    const valueOnTheBetslip = await this.getTextFromBetslip();
    expect(valueOnTheBetslip).toEqual(betValue);
  }

  async getTextFromBetslip() {
    return await this.page.evaluate(() => {
      const element = document.querySelector(".betslip-pick-odds__value");
      return element?.textContent?.trim().toString();
    });
  }
}
