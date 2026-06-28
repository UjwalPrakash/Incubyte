// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import envConfig from './config/envConfig.js';

/**
 * playwright-bdd: generate Playwright test files from .feature files.
 * The generated tests are written to .features-gen/ by default.
 * @see https://vitalets.github.io/playwright-bdd/
 */
const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: [
    'src/steps/**/*.js',
    'src/hooks/hooks.js',
    'src/fixtures/fixtures.js',
  ],
});

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir,
  /* Run scenarios sequentially to avoid shared-state issues */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporters: HTML for local viewing + list for CI logs */
  reporter: [
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['list'],
  ],
  /* Shared settings for all the projects below. */
  use: {
    /* Base URL driven by ENV environment variable (dev | staging | prod) */
    baseURL: envConfig.baseUrl,

    /* Timeouts from env config */
    navigationTimeout: envConfig.timeouts.navigationTimeout,
    actionTimeout:     envConfig.timeouts.actionTimeout,

    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video on failure */
    video: 'retain-on-failure',
  },

  /* Global timeout driven by env config */
  timeout: envConfig.timeouts.defaultTimeout,

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

