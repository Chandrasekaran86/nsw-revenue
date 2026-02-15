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
    
    // Initialize locators for duty result popup elements
    // Try both dialog element and modal classes for flexibility
    this.popupContainer = this.page.locator('dialog, [class*="modal"]').first();
    this.resultHeading = this.page.locator('dialog h4, .modal-title, [class*="modal-header"]').first();
    this.dutyPayableLabel = this.page.locator('dialog table td, .modal-body table td').filter({ hasText: /duty payable/i }).first();
    this.dutyPayableValue = this.page.locator('dialog table td, .modal-body table td').filter({ hasText: /\$/ }).last();
    this.closeButton = this.page.locator('dialog button:has-text("Close"), .modal-body button:has-text("Close"), [class*="modal"] button:has-text("Close")').first();
    this.popupBackdrop = this.page.locator('[class*="backdrop"], [class*="overlay"]').first();
  }

  /**
   * Verify popup is displayed - checks both dialog element and modal classes
   */
  async isPopupDisplayed(): Promise<boolean> {
    try {
      // First try to find dialog element (actual HTML5 dialog)
      const dialogCount = await this.page.locator('dialog').count();
      if (dialogCount > 0) {
        // Wait for dialog to be visible/attached
        await this.page.locator('dialog').first().waitFor({ state: 'attached', timeout: 3000 });
        return true;
      }
      
      // Fallback: check for modal classes
      const modalCount = await this.page.locator('[class*="modal"]').count();
      if (modalCount > 0) {
        await this.page.locator('[class*="modal"]').first().waitFor({ state: 'attached', timeout: 3000 });
        return true;
      }
      
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Verify result heading is loaded - checks both dialog and modal
   */
  async isResultHeadingLoaded(): Promise<boolean> {
    try {
      // Try dialog h4 first
      let headings = await this.page.locator('dialog h4').count();
      if (headings > 0) return true;
      
      // Fallback to modal classes
      headings = await this.page.locator('.modal-title, [class*="modal-header"]').count();
      return headings > 0;
    } catch {
      return false;
    }
  }

  /**
   * Verify duty payable label is loaded - checks both dialog and modal
   */
  async isDutyPayableLabelLoaded(): Promise<boolean> {
    try {
      // Try dialog table first
      let labels = await this.page.locator('dialog table td').filter({ hasText: /duty payable/i }).count();
      if (labels > 0) return true;
      
      // Fallback to modal classes
      labels = await this.page.locator('.modal-body table td').filter({ hasText: /duty payable/i }).count();
      return labels > 0;
    } catch {
      return false;
    }
  }

  /**
   * Get duty payable value text - handles both dialog and modal structures
   */
  async getDutyPayableValue(): Promise<string> {
    try {
      // Try finding in dialog table first
      let dutyPayableRow = this.page.locator('dialog table tr').filter({ hasText: /Duty payable/ });
      let rowCount = await dutyPayableRow.count();
      
      // If not in dialog, try modal classes
      if (rowCount === 0) {
        dutyPayableRow = this.page.locator('.modal-body table tr').filter({ hasText: /Duty payable/ });
        rowCount = await dutyPayableRow.count();
      }
      
      if (rowCount > 0) {
        const valueCell = dutyPayableRow.locator('td').last();
        const valueText = await valueCell.textContent();
        return valueText?.trim() || '';
      }
      
      return '';
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