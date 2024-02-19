import { test, expect, type Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  test.slow();
  await page.goto('https://demoqa.com/');
  await page.waitForLoadState();
  await page.getByRole('heading', { name: 'Alerts, Frame & Windows' }).click();
  await page.waitForLoadState();
});

test.afterEach(async () => {
  await page.close();
});

test('Browser Windows', async () => {
    await page.locator('li').filter({ hasText: 'Browser Windows' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'New Tab' }).click();
    const page1 = await page1Promise;
    await page.bringToFront();
    await page1.close();
    const page2Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'New Window', exact: true }).click();
    const page2 = await page2Promise;
    await page.bringToFront();
    await page2.close();
    const page3Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'New Window Message' }).click();
    const page3 = await page3Promise;
    await page.bringToFront();
    await page3.close();
});

test('Alerts', async () => {
    test.setTimeout(120000);
    test.slow();
    await page.locator('li').filter({ hasText: 'Alerts' }).click();
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
      });
      await page.locator('#alertButton').click();
      await page.locator('#timerAlertButton').click();
      page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
      });
      await page.locator('#confirmButton').click();
      page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
      });
      await page.locator('#confirmButton').click();
      page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
      });
      await page.locator('#promtButton').click();
      await page.locator('div').filter({ hasText: /^Click me$/ }).nth(3).click();
      page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
      });
      await page.locator('#promtButton').click();
});

test('Nested Frames', async () => {
  await page.locator('li').filter({ hasText: 'Nested Frames' }).click();
  await page.frameLocator('#frame1').getByText('Parent frame').click();
  await page.frameLocator('#frame1').frameLocator('iframe').getByText('Child Iframe').click();
});

test('Frames', async () => {
  await page.getByText('Frames', { exact: true }).click();
  await page.frameLocator('#frame1').getByRole('heading', { name: 'This is a sample page' }).click();
  await page.frameLocator('#frame2').getByRole('heading', { name: 'This is a sample page' }).click();
});


test('Modal Dialogs', async () => {
  await page.locator('li').filter({ hasText: 'Modal Dialogs' }).click();
  await page.getByRole('button', { name: 'Small modal' }).click();
  await page.locator('#closeSmallModal').click();
  await page.getByRole('button', { name: 'Small modal' }).click();
  await page.getByText('×Close').click();
  await page.getByRole('button', { name: 'Large modal' }).click();
  await page.locator('#closeLargeModal').click();
  await page.getByRole('button', { name: 'Large modal' }).click();
  await page.getByText('×Close').click();
});