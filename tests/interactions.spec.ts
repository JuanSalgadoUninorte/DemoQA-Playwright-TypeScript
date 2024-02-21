
import { test, expect, type Page } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

let page: Page;

test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    test.slow();
    await page.goto('https://demoqa.com/');
    await page.waitForLoadState();
    await page.getByRole('heading', { name: 'Interactions' }).click();
    await page.waitForLoadState();
});

test.afterEach(async () => {
    await page.close();
});

test('Sortable', async () => {
    await page.getByText('Sortable').click();
    async function dragAndDrop(page: Page, sourceLocator: string, targetLocator: string) {
        await page.locator(sourceElementLocator).hover();
        await page.mouse.down();
        await page.locator(targetElementLocator).hover();
        await page.mouse.up();
    }
    let sourceElementLocator = '#demo-tabpane-list > div > div:nth-child(6)';
    let targetElementLocator = '#demo-tabpane-list > div > div:nth-child(1)';

    for (let i = 0; i < 12; i++) {
        await dragAndDrop(page, sourceElementLocator, targetElementLocator);
    }

    await page.getByRole('tab', { name: 'Grid' }).click();
    sourceElementLocator = '#demo-tabpane-grid > div > div > div:nth-child(9)';
    targetElementLocator = '#demo-tabpane-grid > div > div > div:nth-child(1)';

    for (let i = 0; i < 18; i++) {
        await dragAndDrop(page, sourceElementLocator, targetElementLocator);
    }
});

test('Selectable', async () => { 
    await page.getByText('Selectable').click();
    await page.waitForLoadState();
    for (let f = 1; f < 5; f++) {
        await page.locator('#verticalListContainer > li:nth-child('+f+')').click();
    }
    await page.getByRole('tab', { name: 'Grid' }).click();
    for (let i = 1; i < 4; i++) {
        for (let j = 1; j <4; j++) {
            await page.locator('#row'+i+' > li:nth-child('+j+')').click();
        }
    }
});

test('Resizable', async () => { 
    await page.getByText('Resizable').click();
    await page.locator('#resizableBoxWithRestriction > span').hover();
    await page.mouse.down();
    await page.mouse.move(830, 590);
    await page.mouse.up();
    await page.locator('//*[@id="resizable"]/span').hover();
    await page.mouse.down();
    await page.mouse.move(1000, 800);
    await page.mouse.up();
});

test('Droppable', async () => { 
    await page.getByText('Droppable').click();
    await page.getByRole('tab', { name: 'Simple' }).click();
    await page.waitForSelector('#droppable');
    await page.locator('#draggable').dragTo(page.locator('//*/div[@class="simple-drop-container"]/*[@id="droppable"]'));
    await page.getByRole('tab', { name: 'Accept' }).click();
    await page.locator('//*[@id="acceptable"]').dragTo(page.locator("//*[@id='acceptDropContainer']/*[@id='droppable']"));
    await page.locator('//*[@id="notAcceptable"]').dragTo(page.locator('//*[@id="acceptable"]'));
    await page.getByRole('tab', { name: 'Revert Draggable' }).click();
    await page.locator('#revertable').dragTo(page.locator('//*/div[@id="revertableDropContainer"]/*[@id="droppable"]'));
    await page.locator('#notRevertable').dragTo(page.locator('//*/div[@id="revertableDropContainer"]/*[@id="droppable"]'));
    await page.getByRole('tab', { name: 'Prevent Propogation' }).click();
    await page.locator('#dragBox').dragTo(page.locator("//*/div[@id='droppableExample-tabpane-preventPropogation']//*/div[@id='notGreedyDropBox']"));
    await page.locator('#dragBox').dragTo(page.locator("//*/div[@id='droppableExample-tabpane-preventPropogation']//*/div[@id='greedyDropBoxInner']"));
    await page.locator('#dragBox').dragTo(page.locator("//*/div[@id='droppableExample-tabpane-preventPropogation']//*/div[@id='notGreedyInnerDropBox']"));
    await page.locator('#dragBox').dragTo(page.locator("//*/div[@id='droppableExample-tabpane-preventPropogation']//*/div[@id='greedyDropBox']"));
});

test('Dragabble', async () => { 
    await page.getByText('Dragabble').click();
    await page.getByRole('tab', { name: 'Axis Restricted' }).click();
    await page.getByRole('tab', { name: 'Container Restricted' }).click();
    await page.getByRole('tab', { name: 'Cursor Style' }).click();
    await page.getByRole('tab', { name: 'Container Restricted' }).click();
    await page.getByRole('tab', { name: 'Axis Restricted' }).click();
    await page.getByRole('tab', { name: 'Simple' }).click();
});