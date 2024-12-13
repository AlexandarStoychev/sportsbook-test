Project setup:

Run 'npm install' to download and install all dependacies
Run 'npm run test:bwin-desktop' in order to start the tests.

-- The npm run command should run properly on macOS and linux, but it might have an issue on Windows.
In case the npm run command does not start the test, run the script manually with
'npx cross-env npx playwright test --config=playwright.config.ts --headed --grep '@all' --project=chromium'

Project structure:
- fixtures - contains the file with all fixtures
- pages - contains all pages files containing locators and steps
- tests - contains all tests which are made of steps from the page files
- utils - contains (all will contain in future) helper methods
.env file - the environemnt is defaulting to "prod" at the moment, this way its not neccessary to add env everytime when the tests are runned. Passing ENV={env} in the run script will override it
environmentURLS.json - this file contains all urls of the site
playwright.config.ts, package.json and tscofig.json contain configurations for playwright