import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const USER = 'standard_user';
const PASS = 'secret_sauce';

test.describe('SauceDemo — core user flows', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('1. login page loads with expected elements', async ({ page }) => {
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('2. valid login redirects to inventory', async ({ page }) => {
    await page.getByPlaceholder('Username').fill(USER);
    await page.getByPlaceholder('Password').fill(PASS);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('3. invalid login shows error message', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('wrong_user');
    await page.getByPlaceholder('Password').fill('wrong_pass');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  });

  test('4. add product to cart updates badge', async ({ page }) => {
    await page.getByPlaceholder('Username').fill(USER);
    await page.getByPlaceholder('Password').fill(PASS);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('5. complete checkout flow end-to-end', async ({ page }) => {
    await page.getByPlaceholder('Username').fill(USER);
    await page.getByPlaceholder('Password').fill(PASS);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.locator('.shopping_cart_link').click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.locator('[data-test="firstName"]').fill('Isehaq');
    await page.locator('[data-test="lastName"]').fill('Al Wahaibi');
    await page.locator('[data-test="postalCode"]').fill('100');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page.locator('.complete-header')).toContainText('Thank you for your order');
  });

  test('API: list users returns expected schema', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users');
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.length).toBeGreaterThan(0);
  expect(body[0]).toHaveProperty('email');
  expect(body[0]).toHaveProperty('name');
});

});
