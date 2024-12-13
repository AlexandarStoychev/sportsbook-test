import { HomePage } from "pages/homePage";
import { expect, test } from "../fixtures/fixtures";

test.beforeEach(async ({ commonMethods }) => {
  await commonMethods.loadWebsite();
});

test.describe("Sport sorting", { tag: "@all" }, () => {
  test("Specific sport page should be opened when selected from the A-Z page", async ({
    homePage,
  }) => {
    await homePage.navigateToTheAZPage();
    await homePage.navigateToTheFormula1Page();
    await homePage.assertThatTheFormula1TabIsSelected();
    await homePage.assertThatTheUrlContainsFormula1();
  });
});
