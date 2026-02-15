import { Page } from '@playwright/test';

export class MotorVehicleStampDutyPage {
  private readonly page: Page;
  private readonly motorVehicleStampDutyUrl = 'https://www.service.nsw.gov.au/transaction/check-motor-vehicle-stamp-duty';

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the motor vehicle stamp duty page
   */
  async navigateToMotorVehicleStampDutyPage(): Promise<void> {
    await this.page.goto(this.motorVehicleStampDutyUrl);
  }

  /**
   * Click on 'Check online' button
   */
  async clickCheckOnlineButton(): Promise<void> {
    const checkOnlineButton = this.page.getByRole('button', { name: /Check online/ });
    await checkOnlineButton.waitFor({ state: 'visible' });
    await checkOnlineButton.click();
  }

  /**
   * Verify that Revenue NSW page is displayed
   */
  async isRevenueNSWPageDisplayed(): Promise<boolean> {
    const pageUrl = this.page.url();
    return pageUrl.includes('revenue.nsw.gov.au') || pageUrl.includes('service.nsw.gov.au');
  }

  /**
   * Get current page URL
   */
  getCurrentPageUrl(): string {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}
