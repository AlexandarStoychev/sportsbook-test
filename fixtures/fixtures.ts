import { test as base } from "@playwright/test";
import { CommonMethods } from "../utils/commonMethods";
import { LiveBettingPage } from "../pages/liveBettingPage";

type Fixtures = {
  commonMethods: CommonMethods;
  liveBettingPage: LiveBettingPage;
};

export const test = base.extend<Fixtures>({
  commonMethods: async ({ page }, use) => {
    await use(new CommonMethods(page));
  },
  liveBettingPage: async ({ page }, use) => {
    await use(new LiveBettingPage(page));
  },
});

export { expect } from "@playwright/test";
