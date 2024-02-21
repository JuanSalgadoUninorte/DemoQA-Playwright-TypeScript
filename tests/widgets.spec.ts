import { test, expect, type Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  test.slow();
  await page.goto('https://demoqa.com/');
  await page.waitForLoadState();
  await page.getByRole('heading', { name: 'Widgets' }).click();
  await page.waitForLoadState();
});

test.afterEach(async () => {
  await page.close();
});

test('Accordian', async () => {
  await page.locator('li').filter({ hasText: 'Accordian' }).click();
  await page.getByText('What is Lorem Ipsum?').click();
  await page.getByText('Lorem Ipsum is simply dummy').click();
  await page.getByText('Where does it come from?').click();
  await page.getByText('Contrary to popular belief,').click();
  await page.getByText('The standard chunk of Lorem').click();
  await page.getByText('Where does it come from?').click();
  await page.getByText('Why do we use it?').click();
  await page.getByText('It is a long established fact').click();
});

test('Auto Complete', async () => {
  await page.getByText('Auto Complete').click();
  await page.locator('.auto-complete__value-container').first().click();
  await page.locator('#autoCompleteMultipleInput').fill('Blue');
  await page.locator('#react-select-2-option-0').click();
  await page.locator('#autoCompleteMultipleInput').fill('Aqua');
  await page.locator('#react-select-2-option-0').click();
  await page.locator('#autoCompleteMultipleInput').fill('Black');
  await page.locator('#react-select-2-option-0').click();
  await page.locator('#autoCompleteMultipleInput').fill('Green');
  await page.locator('#react-select-2-option-0').click();
  await page.locator('#autoCompleteMultipleInput').fill('Indigo');
  await page.locator('#react-select-2-option-0').click();
  await page.locator('#autoCompleteMultipleInput').fill('White');
  await page.locator('#react-select-2-option-0').click();
  await page.locator('#autoCompleteMultipleInput').fill('Red');
  await page.locator('#react-select-2-option-0').click();
  await page.locator('#autoCompleteMultipleInput').fill('Purple');
  await page.locator('#react-select-2-option-0').click();
  await page.locator('#autoCompleteMultipleInput').fill('Magenta');
  await page.locator('#react-select-2-option-0').click();
  await page.locator('#autoCompleteMultipleInput').fill('Yellow');
  await page.locator('#react-select-2-option-0').click();
  await page.locator('#autoCompleteMultipleInput').fill('Voilet');
  await page.locator('#react-select-2-option-0').click();
  await page.locator('#autoCompleteSingleContainer > .auto-complete__control > .auto-complete__value-container').click();
  await page.locator('#autoCompleteSingleInput').fill('Green');
  await page.locator('#react-select-3-option-0').click();
});

test('Date Picker', async () => {
  await page.getByText('Date Picker').click();
  await page.locator('#datePickerMonthYearInput').click();
  await page.locator('div').filter({ hasText: /^JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember$/ }).getByRole('combobox').selectOption('7');
  await page.getByRole('combobox').nth(1).selectOption('2008');
  await page.getByLabel('Choose Wednesday, August 20th,').click();
});

test('Slider', async () => {

  await page.locator('li').filter({ hasText: 'Slider' }).click();
  async function setSliderValue(page: Page, sliderXPath: string, valueAsPercent: number) {
    const sliderBound = await page.locator(sliderXPath).boundingBox();
    const targetX = sliderBound.x + (sliderBound.width * valueAsPercent / 100);
    const targetY = sliderBound.y + sliderBound.height / 2;
    await page.mouse.move(targetX, targetY);
    await page.mouse.down();
    await page.mouse.move(sliderBound.x + (sliderBound.width * valueAsPercent) / 100, sliderBound.y + sliderBound.height / 2);
    await page.mouse.up();
  }

  await setSliderValue(page, '//*[@id="sliderContainer"]/div[1]', 20);
  await setSliderValue(page, '//*[@id="sliderContainer"]/div[1]', 30);
  await setSliderValue(page, '//*[@id="sliderContainer"]/div[1]', 40);
  await setSliderValue(page, '//*[@id="sliderContainer"]/div[1]', 50);
  await setSliderValue(page, '//*[@id="sliderContainer"]/div[1]', 100);

});

test('Progress Bar', async () => {
  await page.getByText('Progress Bar').click();
  await page.getByRole('button', { name: 'Start' }).click();
  await page.getByRole('button', { name: 'Reset' }).click();
});

test('Tabs', async () => {
  await page.getByText('Tabs').click();
  await page.getByRole('tab', { name: 'What' }).click();
  await page.getByRole('tab', { name: 'Origin' }).click();
  await page.getByRole('tab', { name: 'Use' }).click();
  await page.getByText('WhatOriginUseMore').click();
  await page.getByRole('tab', { name: 'What' }).click();
  await page.getByRole('tab', { name: 'Origin' }).click();
  await page.getByRole('tab', { name: 'Use' }).click();
});

test('Tool Tips', async () => {
  await page.locator('li').filter({ hasText: 'Tool Tips' }).click();
  await page.getByRole('button', { name: 'Hover me to see' }).click();
  await page.getByPlaceholder('Hover me to see').click();
  await page.getByRole('link', { name: 'Contrary' }).click();
  await page.getByRole('link', { name: '1.10.32' }).click();
});

test('Menu', async () => {
  await page.locator('li').filter({ hasText: /^Menu$/ }).click();
  await page.getByRole('link', { name: 'Main Item 1' }).click();
  await page.getByRole('link', { name: 'Main Item 2' }).click();
  await page.getByRole('link', { name: 'Sub Item' }).first().click();
  await page.getByRole('link', { name: 'Sub Item' }).nth(1).click();
  await page.getByRole('link', { name: 'SUB SUB LIST »' }).click();
  await page.getByRole('link', { name: 'Sub Sub Item 1' }).click();
  await page.getByRole('link', { name: 'Sub Sub Item 2' }).click();
  await page.getByRole('link', { name: 'Main Item 3' }).click();
});

test('Select Manu', async () => {
  await page.locator('li').filter({ hasText: 'Select Menu' }).click();
  await page.locator('#withOptGroup div').filter({ hasText: 'Select Option' }).nth(1).click();
  await page.getByText('Group 1, option 1', { exact: true }).click();
  await page.locator('#selectOne div').filter({ hasText: 'Select Title' }).nth(1).click();
  await page.getByText('Mr.', { exact: true }).click();
  await page.locator('#oldSelectMenu').selectOption('4');
  await page.locator('#selectMenuContainer svg').nth(2).click();
  await page.locator('#react-select-6-option-0').click();
  await page.locator('#react-select-6-option-1').click();
  await page.locator('#react-select-6-option-2').click();
  await page.locator('#react-select-6-option-3').click();
  await page.locator('#cars').selectOption('saab');
});