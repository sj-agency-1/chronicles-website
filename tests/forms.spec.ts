import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('Form Submission Tests', () => {
  test('Consultation Form Submission', async ({ page }) => {
    // Navigate to the main page where NeedConsultationCard is present
    await page.goto('/');

    // Find the button that opens the consultation modal
    // The button has data-modal-open attribute starting with consultation-modal-
    const modalButton = page.locator('button[data-modal-open^="consultation-modal-"]').first();

    // Ensure the button is visible and click it
    await expect(modalButton).toBeVisible();
    await modalButton.click();

    // Wait for the modal to be visible
    const modal = page.locator('dialog[open]');
    // Note: The implementation of Modal.astro might use <dialog> or a div with specific classes.
    // Based on common Astro patterns, it might be a dialog or a div.
    // Let's assume standard HTML dialog or check for visibility of the form.
    const form = modal.locator('#consultation-form');
    await expect(form).toBeVisible();

    // Fill out the form
    await form.locator('input[name="consultation-form__name"]').fill('Test User');
    await form.locator('input[name="consultation-form__email"]').fill('test@example.com');
    await form.locator('select[name="consultation-form__service"]').selectOption({ index: 1 }); // Select first available option
    await form.locator('textarea[name="consultation-form__details"]').fill('This is a test inquiry from Playwright.');

    // Submit the form
    await form.locator('#consultation-form__submit-button').click();

    // Check for success message
    const statusMessage = form.locator('#consultation-form__form-status');
    await expect(statusMessage).toBeVisible();
    await expect(statusMessage).toContainText('Ваша заявка успешно отправлена');
  });

  test('Vacancies Form Submission', async ({ page }) => {
    // Navigate to the vacancies page
    await page.goto('/vacancies');

    const form = page.locator('#vacancies-form');
    await expect(form).toBeVisible();

    // Fill out the form
    await form.locator('input[name="vacancies-form__name"]').fill('Test Candidate');
    await form.locator('input[name="vacancies-form__whatsapp"]').fill('+79990000000');
    await form.locator('input[name="vacancies-form__email"]').fill('candidate@example.com');

    // Select a vacancy
    await form.locator('select[name="vacancies-form__vacancy"]').selectOption({ index: 1 });

    await form.locator('textarea[name="vacancies-form__about"]').fill('I am interested in this position.');

    // Upload resume
    const fileInput = form.locator('input[name="vacancies-form__resume"]');
    const filePath = path.join(__dirname, 'fixtures', 'resume.docx');
    await fileInput.setInputFiles(filePath);

    // Submit the form
    await form.locator('#vacancies-form__submit-button').click();

    // Check for success message
    const statusMessage = form.locator('#vacancies-form__form-status');
    await expect(statusMessage).toBeVisible();
    await expect(statusMessage).toContainText('Ваша заявка успешно отправлена');
  });
});
