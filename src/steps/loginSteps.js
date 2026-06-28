import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/fixtures.js';

const { Given, When, Then } = createBdd(test);

const registrationState = {
  username: '',
  password: '',
  accountBalance: '',
};

function createCredentials() {
  const suffix = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

  return {
    username: `user${suffix}`,
    password: `Pass${suffix}!`,
  };
}

// ──────────────────────────────────────────────────────────
// Given
// ──────────────────────────────────────────────────────────

Given('User launches the ParaBank application', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Customer Login')).toBeVisible();
});

// ──────────────────────────────────────────────────────────
// When
// ──────────────────────────────────────────────────────────

When('User clicks on Register link', async ({ page }) => {
  await page.getByRole('link', { name: /^Register$/i }).click();
});

When('User fills the registration form with valid details', async ({ page }) => {
  const credentials = createCredentials();

  registrationState.username = credentials.username;
  registrationState.password = credentials.password;

  await page.locator('input[name="customer.firstName"]').fill('John');
  await page.locator('input[name="customer.lastName"]').fill('Doe');
  await page.locator('input[name="customer.address.street"]').fill('123 Main Street');
  await page.locator('input[name="customer.address.city"]').fill('New York');
  await page.locator('input[name="customer.address.state"]').fill('NY');
  await page.locator('input[name="customer.address.zipCode"]').fill('10001');
  await page.locator('input[name="customer.phoneNumber"]').fill('5551234567');
  await page.locator('input[name="customer.ssn"]').fill('123-45-6789');
  await page.locator('input[name="customer.username"]').fill(registrationState.username);
  await page.locator('input[name="customer.password"]').fill(registrationState.password);
  await page.locator('input[name="repeatedPassword"]').fill(registrationState.password);
});

When('User submits the registration form', async ({ page }) => {
  await page.locator('input[type="submit"], button[type="submit"]').first().click();
});

When('User logs out of the application', async ({ page }) => {
  await page.getByRole('link', { name: /Log Out/i }).click();
});

When('User logs in with newly created credentials', async ({ page }) => {
  await page.locator('input[name="username"]').fill(registrationState.username);
  await page.locator('input[name="password"]').fill(registrationState.password);
  await page.locator('input[type="submit"], button[type="submit"]').first().click();
});

// ──────────────────────────────────────────────────────────
// Then
// ──────────────────────────────────────────────────────────

Then('User account should be created successfully', async ({ page }) => {
  await expect(page.getByText(/Your account was created successfully/i)).toBeVisible();
});

Then('User should be navigated to Accounts Overview page', async ({ page }) => {
  await expect(page.getByText(/Accounts Overview/i)).toBeVisible();
});

Then('User should capture the account balance', async ({ page }) => {
  const balanceLocator = page
    .locator('td, th, span, div')
    .filter({ hasText: /^\$?\d[\d,]*(?:\.\d{2})?$/ })
    .first();

  registrationState.accountBalance = (await balanceLocator.textContent())?.trim() ?? '';
  await expect(balanceLocator).toBeVisible();
});

Then('User prints the account balance', async () => {
  console.log(`Account balance: ${registrationState.accountBalance}`);
});
