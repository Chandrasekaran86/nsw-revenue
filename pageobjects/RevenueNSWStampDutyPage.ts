import { Page, Locator } from '@playwright/test';

export class RevenueNSWStampDutyPage {
  private readonly page: Page;
  
  // Locators for Revenue NSW Stamp Duty Calculator
  private readonly passengerVehicleYesRadio: Locator;
  private readonly purchasePriceInput: Locator;
  private readonly calculateButton: Locator;
  private readonly pageHeading: Locator;
  private readonly vehicleTypeFieldset: Locator;
  private readonly purchasePriceField: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize locators for calculator form elements
    this.passengerVehicleYesRadio = this.page.locator('input[type="radio"]').first();
    this.purchasePriceInput = this.page.getByLabel(/Purchase price or value/);
    this.calculateButton = this.page.getByRole('button', { name: /Calculate/i });
    this.pageHeading = this.page.getByRole('heading', { level: 1 });
    this.vehicleTypeFieldset = this.page.locator('group').first();
    this.purchasePriceField = this.page.getByLabel(/Purchase price or value/);
  }

  /**
   * Verify page is loaded and heading is visible
   */
  async isPageLoaded(): Promise<boolean> {
    try {
      await this.pageHeading.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Select 'Yes' for passenger vehicle question
   */
  async selectPassengerVehicleYes(): Promise<void> {
    try {
      // Click on the label associated with the Yes radio button
      const yesLabel = this.page.locator('label[for="passenger_Y"]');
      await yesLabel.waitFor({ state: 'visible', timeout: 5000 });
      await yesLabel.click();
    } catch (error) {
      throw new Error(`Failed to select passenger vehicle Yes option: ${error}`);
    }
  }

  /**
   * Enter purchase price
   * @param price The purchase price to enter
   */
  async enterPurchasePrice(price: number): Promise<void> {
    try {
      await this.purchasePriceInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.purchasePriceInput.fill(String(price));
    } catch (error) {
      throw new Error(`Failed to enter purchase price: ${error}`);
    }
  }

  /**
   * Click Calculate button
   */
  async clickCalculateButton(): Promise<void> {
    try {
      await this.calculateButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.calculateButton.click();
      // Wait for result dialog/modal to appear
      await this.page.locator('dialog, [class*="modal"]').first().waitFor({ state: 'attached', timeout: 10000 });
    } catch (error) {
      throw new Error(`Failed to click Calculate button: ${error}`);
    }
  }

  /**
   * Verify vehicle type fieldset is loaded
   */
  async isVehicleTypeFieldsetLoaded(): Promise<boolean> {
    try {
      const radioButtons = this.page.locator('input[type="radio"]');
      await radioButtons.first().waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verify purchase price field is loaded
   */
  async isPurchasePriceFieldLoaded(): Promise<boolean> {
    try {
      await this.purchasePriceField.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get page URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}