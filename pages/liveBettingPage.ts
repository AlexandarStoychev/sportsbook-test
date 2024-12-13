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
    // choosing an event is hardcoded because the events are way too different

    // const randomIndex = faker.number.int({
    //   min: 0,
    //   max: numberOfEvents,
    // });

    await this.liveEventsLocator.nth(1).click();
  }

  async addRandomPickToBetslipAndAssert() {
    const betValue = await this.valuesInsideEventPage.nth(0).textContent();

    await this.valuesInsideEventPage.nth(0).click();

    // Playwright is trying to get the value too fast and the result is undefined
    await this.page.waitForTimeout(500);

    const valueOnTheBetslip = await this.getTextFromBetslip();
    expect(valueOnTheBetslip).toEqual(betValue);
  }

  async addPickAndWaitForOddsToChangeAndAssert() {
    const betValue = await this.valuesInsideEventPage.nth(0).textContent();
    await this.valuesInsideEventPage.nth(0).click();

    // Even with this big wait, sometimes the odds are not changing for 10 or more seconds
    await this.page.waitForTimeout(10000);

    // This assert is to check that a change in odds have actually happened
    const updatedBetOdd = await this.valuesInsideEventPage.nth(0).textContent();
    expect(updatedBetOdd).not.toBe(betValue);

    // This assert is to check if the new value equals to the value on the betslip
    const valueOnTheBetslip = await this.getTextFromBetslip();
    expect(valueOnTheBetslip).toEqual(betValue);
  }

  async getTextFromBetslip() {
    // Playwright was not able extract the value from this locatior with its "textContect" method,
    // so page.evaluate had to be used
    return await this.page.evaluate(() => {
      const element = document.querySelector(".betslip-pick-odds__value");
      return element?.textContent?.trim().toString();
    });
  }
}
