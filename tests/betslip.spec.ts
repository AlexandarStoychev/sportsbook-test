import { test } from "../fixtures/fixtures";

test.beforeEach(async ({ commonMethods }) => {
  await commonMethods.loadWebsite();
});

test.describe("Betslip scenarios", { tag: "@all" }, () => {
  test("Adding pick to Betslip", async ({ homePage, liveBettingPage }) => {
    await homePage.navigateToTheBasketballSeciton();
    await liveBettingPage.getAllLiveEventsAndSelectARandomOne();
    await liveBettingPage.addRandomPickToBetslipAndAssert();
  });

  test("Bet values should be updated immediately when the odd changes", async ({
    homePage,
    liveBettingPage,
  }) => {
    await homePage.navigateToTheBasketballSeciton();
    await liveBettingPage.getAllLiveEventsAndSelectARandomOne();
    await liveBettingPage.addPickAndWaitForOddsToChangeAndAssert();
  });
});
