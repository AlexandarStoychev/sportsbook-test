import { expect, test } from "../fixtures/fixtures";

test.beforeEach(async ({ commonMethods }) => {
  await commonMethods.loadWebsite();
});

test.describe("Betslip scenarios", { tag: "@all" }, () => {
  test("Adding pick to Betslip", async ({ liveBettingPage }) => {
    await liveBettingPage.navigateToTheBasketballSeciton();
    await liveBettingPage.getAllLiveEventsAndSelectARandomOne();
    await liveBettingPage.addRandomPickToBetslip();
  });
});
