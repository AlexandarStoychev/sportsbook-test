import { Page } from "@playwright/test";
import dotenv from "dotenv";
import * as fs from "fs";

export class CommonMethods {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async loadWebsite() {
    dotenv.config();
    const url = await this.extractDataFromEnvJson("baseUrl");
    console.log("Navigating to " + url);
    await this.page.goto(url, { timeout: 35000 });
  }

  // Default environment value is stored in the .env file, it can be overwritten by passing a command line parameter ENV='dev'
  async extractDataFromEnvJson(data: string) {
    const jsonData = JSON.parse(
      fs.readFileSync("environmentURLs.json", "utf8")
    );
    const environmentData = jsonData[process.env.ENV as keyof typeof jsonData];
    return environmentData[data].toString();
  }
}
