import { test, expect, type Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  test.slow();
  await page.goto('https://demoqa.com/');
  await page.waitForLoadState();
  await page.locator('path').first().click();
  await page.waitForLoadState();
});

test.afterEach(async () => {
  await page.close();
});

test('Text Box', async () => {
  await page.locator('li').filter({ hasText: 'Text Box' }).click();
  await page.getByPlaceholder('Full Name').fill('Camilo Zapata');
  await page.getByPlaceholder('name@example.com').fill('c.zapata@gmail.com');
  await page.getByPlaceholder('Current Address').fill('8787 Boule BD, 7854 Beberly Hills, NA, USA');
  await page.locator('#permanentAddress').fill('PORLETTE');
  await page.getByRole('button', { name: 'Submit' }).click();
});

test('Check Box', async () => {
  await page.locator('li').filter({ hasText: 'Check Box' }).click();
  await page.getByLabel('Expand all').click();
  await page.locator('label').filter({ hasText: 'Excel File.doc' }).getByRole('img').first().click();
  await page.locator('label').filter({ hasText: 'Word File.doc' }).getByRole('img').first().click();
  await page.locator('label').filter({ hasText: 'Downloads' }).locator('path').first().click();
  await page.locator('label').filter({ hasText: 'General' }).getByRole('img').first().click();
  await page.locator('label').filter({ hasText: 'Classified' }).getByRole('img').first().click();
  await page.locator('label').filter({ hasText: 'Private' }).getByRole('img').first().click();
  await page.locator('label').filter({ hasText: 'Public' }).getByRole('img').first().click();
  await page.locator('label').filter({ hasText: 'Office' }).locator('path').first().click();
  await page.locator('label').filter({ hasText: 'Veu' }).getByRole('img').first().click();
  await page.locator('label').filter({ hasText: 'Angular' }).getByRole('img').first().click();
  await page.locator('label').filter({ hasText: 'React' }).getByRole('img').first().click();
  await page.locator('label').filter({ hasText: 'WorkSpace' }).locator('path').first().click();
  await page.locator('label').filter({ hasText: 'Documents' }).getByRole('img').first().click();
  await page.locator('label').filter({ hasText: 'Commands' }).getByRole('img').first().click();
  await page.locator('label').filter({ hasText: 'Notes' }).getByRole('img').first().click();
  await page.locator('label').filter({ hasText: 'Desktop' }).locator('path').first().click();
  await page.locator('label').filter({ hasText: 'Home' }).getByRole('img').first().click();
  await page.locator('label').filter({ hasText: 'Home' }).locator('path').first().click();
});

test('Raddio Button', async () => {
  await page.locator('li').filter({ hasText: 'Radio Button' }).click();
  await page.locator('div').filter({ hasText: /^Yes$/ }).click();
  await page.locator('div').filter({ hasText: /^Impressive$/ }).click();
  await page.locator('div').filter({ hasText: /^No$/ }).click();
});

test('Web Tables', async () => {
  await page.locator('li').filter({ hasText: 'Web Tables' }).click();
  await page.locator('#edit-record-1').getByRole('img').click();
  await page.getByPlaceholder('Department').fill('Businesss');
  await page.getByPlaceholder('Salary').click();
  await page.getByPlaceholder('Salary').fill('100000');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.locator('#edit-record-3').getByRole('img').click();
  await page.getByPlaceholder('First Name').fill('Kierra Lorena');
  await page.getByPlaceholder('Last Name').fill('Gentry Arias');
  await page.getByPlaceholder('name@example.com').fill('kl.ga@example.com');
  await page.getByPlaceholder('Age').fill('40');
  await page.getByPlaceholder('Salary').fill('20000');
  await page.getByPlaceholder('Department').fill('Legal Inssurance');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByPlaceholder('First Name').fill('Louisa');
  await page.getByPlaceholder('Last Name').fill('Peña');
  await page.getByPlaceholder('name@example.com').fill('kapa@lp.com');
  await page.getByPlaceholder('Age').fill('65');
  await page.getByPlaceholder('Salary').fill('245000');
  await page.getByPlaceholder('Department').fill('Legal');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Type to search').click();
  await page.getByPlaceholder('Type to search').press('CapsLock');
  await page.getByPlaceholder('Type to search').fill('L');
  await page.getByText('Web TablesAddFirst NameLast').click();
  await page.getByPlaceholder('Type to search').press('CapsLock');
  await page.getByPlaceholder('Type to search').fill('Louisa');
  await page.getByPlaceholder('Type to search').press('Enter');
  await page.getByTitle('Delete').locator('path').click();
  await page.getByPlaceholder('Type to search').click();
  await page.getByPlaceholder('Type to search').fill('');
  await page.locator('#delete-record-1').getByRole('img').click();
  await page.locator('#delete-record-2 path').click();
  await page.getByTitle('Delete').locator('path').click();
});

test('Buttons', async () => {
  await page.locator('li').filter({ hasText: 'Buttons' }).click();
  await page.getByRole('button', { name: 'Double Click Me' }).dblclick();
  await page.getByRole('button', { name: 'Right Click Me' }).click({
    button: 'right'
  });
  await page.getByRole('button', { name: 'Click Me', exact: true }).click();
});

test('Links', async () => {
  await page.locator('li').filter({ hasText: /^Links$/ }).click();
  await page.waitForLoadState();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Home', exact: true }).click();
  const page1 = await page1Promise;
  await page1.waitForLoadState();
  await page.bringToFront();
  await page1.close();
  const page2Promise = page.waitForEvent('popup');
  await page.waitForLoadState();
  await page.click("#dynamicLink");
  const page2 = await page2Promise;
  await page2.waitForLoadState();
  await page2.close();
  await page.bringToFront();
  await page.getByRole('link', { name: 'Created' }).click();
  await page.getByRole('link', { name: 'No Content' }).click();
  await page.getByRole('link', { name: 'Moved' }).click();
  await page.getByRole('link', { name: 'Bad Request' }).click();
  await page.getByRole('link', { name: 'Unauthorized' }).click();
  await page.getByRole('link', { name: 'Forbidden' }).click();
  await page.getByRole('link', { name: 'Not Found' }).click();
});

test('Broken Links - Images', async () => {
  await page.getByText('Broken Links - Images').click();
  await page.locator('img').nth(3).click();
  await page.getByRole('link', { name: 'Click Here for Valid Link' }).click();
  await page.waitForLoadState();
  await page.goBack();
  await page.waitForLoadState();
  await page.getByRole('link', { name: 'Click Here for Broken Link' }).click();
  await page.waitForSelector('#content > div > h3');
  await page.goBack();
  await page.waitForSelector('//*[@id="item-7"]');
});

test('Upload and Download', async () => {
  await page.getByText('Upload and Download').click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download' }).click();
  const download = await downloadPromise;
  await page.getByLabel('Select a file').click();
  await page.getByLabel('Select a file').setInputFiles('Materias.xlsx');

});

test('Dynamic Properties', async () => {
  await page.getByText('Dynamic Properties').click();
});