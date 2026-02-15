import { Page, Locator } from '@playwright/test';

export class RevenueNSWDutyResultPopupPage {
  private readonly page: Page;
  
  // Locators for result popup
  private readonly popupContainer: Locator;
  private readonly dutyPayableLabel: Locator;
  private readonly dutyPayableValue: Locator;
  private readonly resultHeading: Locator;
  private readonly closeButton: Locator;
  private readonly popupBackdrop: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize locators for duty result popup elements using modal classes
    this.popupContainer = this.page.locator('[class*="modal"]').first();
    this.resultHeading = this.page.locator('.modal-title, [class*="modal-header"]').first();
    this.dutyPayableLabel = this.page.locator('.modal-body table td').filter({ hasText: /duty payable/i }).first();
    this.dutyPayableValue = this.page.locator('.modal-body table td').filter({ hasText: /\$/ }).last();
    this.closeButton = this.page.locator('.modal-body button:has-text("Close"), [class*="modal"] button:has-text("Close")').first();
    this.popupBackdrop = this.page.locator('[class*="backdrop"], [class*="overlay"]').first();
  }

  /**
   * Verify popup is displayed
   */
  async isPopupDisplayed(): Promise<boolean> {
    try {
      // Check if modal exists in DOM
      const count = await this.page.locator('[class*="modal"]').count();
      return count > 0;
    } catch {
      return false;
    }
  }

  /**
   * Verify result heading is loaded
   */
  async isResultHeadingLoaded(): Promise<boolean> {
    try {
      const headings = await this.page.locator('.modal-title, [class*="modal-header"]').count();
      return headings > 0;
    } catch {
      return false;
    }
  }

  /**
   * Verify duty payable label is loaded
   */
  async isDutyPayableLabelLoaded(): Promise<boolean> {
    try {
      const labels = await this.page.locator('.modal-body table td').filter({ hasText: /duty payable/i }).count();
      return labels > 0;
    } catch {
      return false;
    }
  }

  /**
   * Get duty payable value text
   */
  async getDutyPayableValue(): Promise<string> {
    try {
      // Find the row containing "Duty payable" and get the value from the next cell
      const dutyPayableRow = this.page.locator('.modal-body table tr').filter({ hasText: /Duty payable/ });
      const valueCell = dutyPayableRow.locator('td').last();
      const valueText = await valueCell.textContent();
      
      return valueText?.trim() || '';
    } catch (error) {
      throw new Error(`Failed to get duty payable value: ${error}`);
    }
  }

  /**
   * Verify all popup elements are loaded
   */
  async areAllPopupElementsLoaded(): Promise<boolean> {
    const isPopupDisplayed = await this.isPopupDisplayed();
    const isHeadingLoaded = await this.isResultHeadingLoaded();
    const isLabelLoaded = await this.isDutyPayableLabelLoaded();
    
    return isPopupDisplayed && isHeadingLoaded && isLabelLoaded;
  }

  /**
   * Close the popup
   */
  async closePopup(): Promise<void> {
    try {
      await this.closeButton.click();
      await this.popupContainer.waitFor({ state: 'hidden', timeout: 5000 });
    } catch (error) {
      throw new Error(`Failed to close popup: ${error}`);
    }
  }

  /**
   * Get popup heading text
   */
  async getPopupHeadingText(): Promise<string> {
    try {
      return await this.resultHeading.textContent() || '';
    } catch (error) {
      throw new Error(`Failed to get popup heading: ${error}`);
    }
  }

  /**
   * Get duty payable label text
   */
  async getDutyPayableLabelText(): Promise<string> {
    try {
      return await this.dutyPayableLabel.textContent() || '';
    } catch (error) {
      throw new Error(`Failed to get duty payable label: ${error}`);
    }
  }
}