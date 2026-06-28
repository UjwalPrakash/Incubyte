const { Before, After, BeforeAll, AfterAll, AfterStep, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

setDefaultTimeout(180 * 1000); // 180 seconds

let browser;

BeforeAll(async function () {
  fs.mkdirSync(path.join(process.cwd(), 'reports', 'videos'), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), 'reports', 'history'), { recursive: true });
  browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
});

Before(async function () {
  this.context = await browser.newContext({
    viewport: null,
    recordVideo: {
      dir: path.join(process.cwd(), 'reports', 'videos'),
      size: { width: 1280, height: 720 }
    }
  });
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(180000);
  this.page.setDefaultNavigationTimeout(180000);
});

After(async function () {
  // Capture video path before closing (recording is still active at this point)
  const videoPath = this.page ? await this.page.video()?.path() : null;

  if (this.context) {
    await this.context.close(); // finalizes the video file
  }

  // Embed the completed video directly in the Cucumber HTML report
  if (videoPath && fs.existsSync(videoPath)) {
    const videoBuffer = fs.readFileSync(videoPath);
    await this.attach(videoBuffer, 'video/webm');
  }
});

AfterStep(async function ({ result }) {
  if (!this.page) {
    return;
  }

  const status = String(result?.status || '').toLowerCase();
  if (status !== 'failed') {
    return;
  }

  const screenshot = await this.page.screenshot({ fullPage: true });
  // Embed screenshot directly in the Cucumber HTML report (no separate folder)
  await this.attach(screenshot, 'image/png');
});

AfterAll(async function () {
  // Don't close browser - keep it open for inspection
});
