import { chromium } from 'playwright-core';
import fs from 'node:fs/promises';

const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args: ['--no-sandbox'] });
const results = [];
for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: width === 1440 ? 900 : 844 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(12000);
  const result = await page.evaluate(() => ({
    title: document.title,
    background: getComputedStyle(document.body).backgroundColor,
    count: document.querySelectorAll('.text-snippet').length,
    text: document.body.innerText.slice(0, 200),
    linkCount: document.querySelectorAll('.text-snippet a').length,
    overflow: getComputedStyle(document.documentElement).overflow,
  }));
  await page.screenshot({ path: `docs/design-references/readitandweep-live-f1b7f8f1/root-8a5edab2/clone-${width}.png` });
  results.push({ width, ...result, errors });
  await page.close();
}
await fs.writeFile('docs/research/readitandweep-live-f1b7f8f1/root-8a5edab2/QA.json', JSON.stringify(results, null, 2));
console.log(results);
await browser.close();
