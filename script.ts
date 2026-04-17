import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.kookie-kollective.com/');
  const servicesText = await page.locator('#services').innerText().catch(() => 'Not found');
  const servicesHTML = await page.locator('#services').innerHTML().catch(() => 'Not found');
  console.log("TEXT:", servicesText);
  console.log("HTML:", servicesHTML.substring(0, 1000));
  await browser.close();
})();
