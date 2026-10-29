import { test, expect } from "@playwright/test";

test.describe("Site Navigation & Critical User Journeys", () => {
  test("homepage renders with title, hero, and main sections", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/JadeQuest/i);

    // Verify key sections exist
    const heroHeading = page.locator("h1");
    await expect(heroHeading).toBeVisible();

    const services = page.locator("section[aria-labelledby='services-title']");
    await expect(services).toBeVisible();

    const faq = page.locator("section[aria-labelledby='faq-title']");
    await expect(faq).toBeVisible();
  });

  test("technology page renders with all six pillars", async ({ page }) => {
    await page.goto("/technology");
    await expect(page).toHaveTitle(/Technology/i);
    await expect(page.getByText(/AI & Machine Learning/i).first()).toBeVisible();
    await expect(page.getByText(/Blockchain & Consortium DLT/i).first()).toBeVisible();
    await expect(page.getByText(/Cloud & DevOps/i).first()).toBeVisible();
  });

  test("case studies page allows category filtering", async ({ page }) => {
    await page.goto("/case-studies");
    await expect(page).toHaveTitle(/Case Studies/i);

    // Check filter buttons exist
    const blockchainFilter = page.getByRole("tab", { name: "Blockchain" });
    await expect(blockchainFilter).toBeVisible();
  });

  test("insights page displays technical articles", async ({ page }) => {
    await page.goto("/blog");
    await expect(page).toHaveTitle(/Insights/i);
    const searchInput = page.getByPlaceholder(/Search insights/i);
    await expect(searchInput).toBeVisible();
  });

  test("contact page displays validated form", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Contact/i);
    const form = page.locator("form");
    await expect(form).toBeVisible();
  });
});

