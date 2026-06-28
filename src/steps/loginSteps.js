import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/fixtures.js';

const { Given, When, Then } = createBdd(test);

// ──────────────────────────────────────────────────────────
// Given
// ──────────────────────────────────────────────────────────

Given('User launches the ParaBank application', async ({ loginPage }) => {
  await loginPage.launchApplication();
});

// ──────────────────────────────────────────────────────────
// When
// ──────────────────────────────────────────────────────────

When('User clicks on Register link', async ({ loginPage }) => {
  await loginPage.clickRegisterLink();
});

When('User fills the registration form with valid details', async ({ loginPage }) => {
  await loginPage.fillRegistrationFormWithValidDetails();
});

When('User submits the registration form', async ({ loginPage }) => {
  await loginPage.submitRegistrationForm();
});

When('User logs out of the application', async ({ loginPage }) => {
  await loginPage.logout();
});

When('User logs in with newly created credentials', async ({ loginPage }) => {
  await loginPage.loginWithCreatedCredentials();
});

// ──────────────────────────────────────────────────────────
// Then
// ──────────────────────────────────────────────────────────

Then('User account should be created successfully', async ({ loginPage }) => {
  await loginPage.verifyAccountCreatedSuccessfully();
});

Then('User should be navigated to Accounts Overview page', async ({ loginPage }) => {
  await loginPage.verifyAccountsOverviewPage();
});

Then('User should capture the account balance', async ({ loginPage }) => {
  await loginPage.captureAccountBalance();
});

Then('User prints the account balance', async ({ loginPage }) => {
  loginPage.printAccountBalance();
});
