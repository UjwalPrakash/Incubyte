import { test as base } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage.js';

/**
 * Custom fixtures that extend playwright-bdd's base `test`.
 *
 * Each fixture creates an instance of a Page Object and passes it
 * to the test / step definition via dependency injection.
 *
 * Usage in steps:
 *   const { Given, When, Then } = createBdd(test);
 *   Given('...', async ({ loginPage }) => { ... });
 */
export const test = base.extend({
  // ----- Page Object fixtures -----

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';
