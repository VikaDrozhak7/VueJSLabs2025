import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('textbox', { name: 'Назва *' }).click();
    await page.getByRole('textbox', { name: 'Назва *' }).fill('лаб 7');
    await page.locator('form').getByLabel('Пріоритет').selectOption('high');
    await page.getByText('НизькийСереднійВисокийДодатиПоля з * обов’язкові').click();
    await page.getByRole('textbox', { name: 'Опис' }).click();
    await page.getByRole('textbox', { name: 'Опис' }).fill('аааа');
    await page.getByRole('button', { name: 'Додати' }).click();
    await page.getByRole('textbox', { name: 'Title contains...' }).click();
    await page.getByRole('textbox', { name: 'Title contains...' }).fill('лаб 7');
    await page.getByRole('button', { name: 'Очистити фільтри' }).click();
    await page.getByRole('button', { name: 'Редагувати' }).click();
    await page.getByRole('cell', { name: 'Високий' }).getByRole('combobox').selectOption('medium');
    await page.getByRole('button', { name: 'Зберегти' }).click();
    await page.getByRole('checkbox', { name: 'Позначити виконаною' }).check();
    await page.getByRole('button', { name: 'Видалити' }).click();
});