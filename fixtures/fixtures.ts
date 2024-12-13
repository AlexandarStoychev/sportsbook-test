import { test as base } from "@playwright/test";
import { CommonMethods } from "../utils/commonMethods";
import { LiveBettingPage } from "../pages/liveBettingPage";
import { HomePage } from "pages/homePage";

type Fixtures = {
  commonMethods: CommonMethods;
  homePage: HomePage;
  liveBettingPage: LiveBettingPage;
};

export const test = base.extend<Fixtures>({
  commonMethods: async ({ page }, use) => {
    await use(new CommonMethods(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  liveBettingPage: async ({ page }, use) => {
    await use(new LiveBettingPage(page));
  },
});

export { expect } from "@playwright/test";
