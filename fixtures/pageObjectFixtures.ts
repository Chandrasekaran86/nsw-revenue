import { test as base, Page } from '@playwright/test';
import { MotorVehicleStampDutyPage } from '../pageobjects/MotorVehicleStampDutyPage';
import { RevenueNSWStampDutyPage } from '../pageobjects/RevenueNSWStampDutyPage';
import { RevenueNSWDutyResultPopupPage } from '../pageobjects/RevenueNSWDutyResultPopupPage';

/**
 * Define custom fixtures for page objects
 */
type PageObjects = {
  motorVehicleStampDutyPage: MotorVehicleStampDutyPage;
  revenueNSWStampDutyPage: RevenueNSWStampDutyPage;
  revenueNSWDutyResultPopupPage: RevenueNSWDutyResultPopupPage;
};

export const test = base.extend<PageObjects>({
  /**
   * Initialize MotorVehicleStampDutyPage fixture
   */
  motorVehicleStampDutyPage: async ({ page }, use) => {
    const motorVehicleStampDutyPage = new MotorVehicleStampDutyPage(page);
    await use(motorVehicleStampDutyPage);
  },

  /**
   * Initialize RevenueNSWStampDutyPage fixture
   */
  revenueNSWStampDutyPage: async ({ page }, use) => {
    const revenueNSWStampDutyPage = new RevenueNSWStampDutyPage(page);
    await use(revenueNSWStampDutyPage);
  },

  /**
   * Initialize RevenueNSWDutyResultPopupPage fixture
   */
  revenueNSWDutyResultPopupPage: async ({ page }, use) => {
    const revenueNSWDutyResultPopupPage = new RevenueNSWDutyResultPopupPage(page);
    await use(revenueNSWDutyResultPopupPage);
  },
});

export { expect } from '@playwright/test';