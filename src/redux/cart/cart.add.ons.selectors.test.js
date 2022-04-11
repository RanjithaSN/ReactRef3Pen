import { BILLER_RULE_INSTANCE_TYPES } from '@selfcare/core/constants/biller.rule.instance';
import { NonZeroAddOnCartItems } from './cart.add.ons.selectors';

const items = [{
  Details: {
    Product: {
      Id: 2,
      Name: 'Product 1',
      Services: [{
        Id: 1,
        Name: 'Service 1'
      }]
    },
    PricingPlan: {
      Id: 3,
      BillerRuleInstanceThumbnails: [{
        Amount: null
      }, {
        Amount: 30,
        CurrencyCode: 'CAD'
      }, {
        Amount: 40,
        CurrencyCode: 'CAD'
      }]
    }
  },
  ServiceFeatureProductAssociation: {
    ServiceIdentifierValue: '8675308'
  },
  Id: 'A1',
  Quantity: 4
}, {
  Details: {
    Product: {
      Id: 6,
      Name: 'Product 2',
      Services: [{
        Id: 5,
        Name: 'Service 2'
      }]
    },
    PricingPlan: {
      Id: 7,
      BillerRuleInstanceThumbnails: [{
        Amount: 70,
        CurrencyCode: 'USD',
        Type: BILLER_RULE_INSTANCE_TYPES.ONE_TIME
      }, {
        Amount: 80,
        CurrencyCode: 'USD',
        Type: BILLER_RULE_INSTANCE_TYPES.RECURRING
      }, {
        Amount: null
      }]
    }
  },
  ServiceFeatureProductAssociation: {
    ServiceIdentifierValue: '8675309'
  },
  Id: 'A2',
  Quantity: 4
}];

const nonZeroItems = [items[1]];

const planQuantityLookup = {
  1: {
    8675308: {
      2: {
        3: 4
      }
    }
  },
  5: {
    8675309: {
      6: {
        7: 8
      }
    }
  }
};

describe('NonZeroAddOnCartItems', () => {
  test('it should return an empty list the shopping cart has offers', () => {
    expect(NonZeroAddOnCartItems.resultFunc([{}], true, planQuantityLookup)).toEqual([]);
  });

  test('it should return a list of offer cart items when a name and cost list are present', () => {
    expect(NonZeroAddOnCartItems.resultFunc(items, false, planQuantityLookup)).toEqual(nonZeroItems);
  });
});
