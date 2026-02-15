import { test, expect } from '../fixtures/pageObjectFixtures';

test.describe('Motor Vehicle Stamp Duty Checker - BDD', () => {
  test('User should be able to check motor vehicle stamp duty online', async ({
    motorVehicleStampDutyPage,
    revenueNSWStampDutyPage,
    revenueNSWDutyResultPopupPage,
    page,
  }) => {
    // GIVEN: User is on the Service NSW motor vehicle stamp duty page
    await motorVehicleStampDutyPage.navigateToMotorVehicleStampDutyPage();
    const pageTitle = await motorVehicleStampDutyPage.getPageTitle();
    expect(pageTitle).toContain('Check motor vehicle stamp duty');

    // WHEN: User clicks on the 'Check online' button
    await motorVehicleStampDutyPage.clickCheckOnlineButton();

    // THEN: User should be redirected to the Revenue NSW page
    const isRevenueNSWPageDisplayed = await motorVehicleStampDutyPage.isRevenueNSWPageDisplayed();
    expect(isRevenueNSWPageDisplayed).toBe(true);

    // AND: The URL should contain either revenue.nsw.gov.au or service.nsw.gov.au
    const currentUrl = motorVehicleStampDutyPage.getCurrentPageUrl();
    expect(currentUrl).toMatch(/revenue\.nsw\.gov\.au|service\.nsw\.gov\.au/);

    // AND: The Revenue NSW calculator page should be loaded
    const isCalculatorPageLoaded = await revenueNSWStampDutyPage.isPageLoaded();
    expect(isCalculatorPageLoaded).toBe(true);

    // Verify all page elements are loaded on the calculator form
    const isVehicleTypeLoaded = await revenueNSWStampDutyPage.isVehicleTypeFieldsetLoaded();
    expect(isVehicleTypeLoaded).toBe(true);

    const isPurchasePriceLoaded = await revenueNSWStampDutyPage.isPurchasePriceFieldLoaded();
    expect(isPurchasePriceLoaded).toBe(true);

    // Take screenshot of the calculator form and attach to allure report
    await page.screenshot({ path: 'test-results/calculator-form.png' });

    // WHEN: User selects 'Yes' for passenger vehicle
    await revenueNSWStampDutyPage.selectPassengerVehicleYes();

    // AND: User enters purchase price of 1000
    const purchasePrice = 1000;
    await revenueNSWStampDutyPage.enterPurchasePrice(purchasePrice);

    // AND: User clicks the Calculate button
    await revenueNSWStampDutyPage.clickCalculateButton();

    // THEN: A popup should be displayed with the calculation results
    const isPopupDisplayed = await revenueNSWDutyResultPopupPage.isPopupDisplayed();
    expect(isPopupDisplayed).toBe(true);

    // AND: All popup elements should be loaded
    const areAllElementsLoaded = await revenueNSWDutyResultPopupPage.areAllPopupElementsLoaded();
    expect(areAllElementsLoaded).toBe(true);

    // Verify each popup element individually
    const isHeadingLoaded = await revenueNSWDutyResultPopupPage.isResultHeadingLoaded();
    expect(isHeadingLoaded).toBe(true);

    const isLabelLoaded = await revenueNSWDutyResultPopupPage.isDutyPayableLabelLoaded();
    expect(isLabelLoaded).toBe(true);

    // Get and verify the duty payable value
    const dutyPayableValue = await revenueNSWDutyResultPopupPage.getDutyPayableValue();
    
    // Assert the duty payable value is $30.00 (within test, not in page object)
    expect(dutyPayableValue).toBe('$30.00');

    // Take screenshot of the result popup and attach to allure report
    await page.screenshot({ path: 'test-results/duty-result-popup.png' });
  });
});