import fs from 'node:fs';
import path from 'node:path';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/fixtures.js';

const { AfterStep } = createBdd(test);

AfterStep(async ({ page, $step, $testInfo }) => {
  const screenshotsDir = path.join(process.cwd(), 'reports', 'screenshots', 'steps');
  fs.mkdirSync(screenshotsDir, { recursive: true });

  const stepName = String($step?.title || 'step')
    .replace(/[^a-zA-Z0-9-_ ]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 80);

  const fileName = `${Date.now()}_step_${$step?.index ?? 'x'}_${stepName}.png`;
  const filePath = path.join(screenshotsDir, fileName);

  await page.screenshot({ path: filePath, fullPage: true });

  await $testInfo.attach(fileName, {
    body: fs.readFileSync(filePath),
    contentType: 'image/png',
  });
});
