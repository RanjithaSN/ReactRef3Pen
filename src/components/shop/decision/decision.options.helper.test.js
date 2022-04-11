import { offeringContextShoppingCart } from '@selfcare/core/analytics/offering.context.shopping.cart.test.data';
import { savedShoppingCartTestData } from '@selfcare/core/analytics/saved.shopping.cart.test.data';
import { log } from '@selfcare/core/helpers/log';
import { getOptionsViewData, getOptionsViewDataByPricingPlanIds, getPricingPlanIdsFromOfferingContextShoppingCart, getPricingPlanIdsFromSavedShoppingCart } from './decision.options.helper';
import { decisionOptionViewData, marketingTemplate } from './decision.options.helper.test.data';

xdescribe('When using decision.options.helper...', () => {
  test('The getOptionsViewData should return Options in View Data format...', () => {
    const optionsViewData = getOptionsViewData(marketingTemplate, true);
    expect(optionsViewData).toEqual(decisionOptionViewData);
  });
  test('The getOptionsViewDataByIds should return a valid option by an array of Option Ids...', () => {
    const firstObject = decisionOptionViewData.find((decisionOptionViewDataOption) => decisionOptionViewDataOption.pricingPlanId === 37303);
    const expected = [firstObject];
    const received = getOptionsViewDataByPricingPlanIds(marketingTemplate, true, [37303]);
    expect(received).toEqual(expected);
  });
  test('The shoppingCartItems should produce a list of pricingPlanIds that can be used to getOptionsViewData...', () => {
    const received = getPricingPlanIdsFromOfferingContextShoppingCart(offeringContextShoppingCart);
    const expected = [37286, 37287, 37288, 37303];
    log('PRICING PLAN IDS:', received);
    log('OPTIONS VIEW DATA BY PP IDS:', getOptionsViewDataByPricingPlanIds(marketingTemplate, true, received));
    expect(received).toEqual(expected);
  });
  test('The shoppingCartItems should produce a list of pricingPlanIds that can be used to getOptionsViewData...', () => {
    const received = getPricingPlanIdsFromSavedShoppingCart(savedShoppingCartTestData);
    const expected = [37286, 37287, 37288, 37303];
    log('PRICING PLAN IDS:', received);
    log('OPTIONS VIEW DATA BY PP IDS:', getOptionsViewDataByPricingPlanIds(marketingTemplate, true, received));
    expect(received).toEqual(expected);
  });
});
