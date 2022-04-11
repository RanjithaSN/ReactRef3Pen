import { OFFERING_STATUS } from '@selfcare/core/redux/subscriberOfferings/subscriber.offering.constants';
import { Offerings } from './plans.services.selectors';

describe('Plans & Services ', () => {
  describe('When Offerings is used...', () => {
    test('It should return BillerTypeAmounts with bulk item details when bulk price is present on recurring option', () => {
      const OFFERINGS = [{
        OfferingId: '10',
        Options: [{
          BillerRuleType: '1',
          BillerItemBulkPrices: [{
            Amount: 100,
            BillerRuleConfigurationId: '1730076686940000700',
            BulkType: 2, // Bulk unit
            Quantity: 4,
            TotalAmount: 400,
            Type: 0 // Recurring
          }],
          BillerTypeAmounts: [{
            Amount: 100,
            BillerRuleConfigurationId: '1730076686940000700',
            BillerRuleConfigurationName: 'ATT SIM Recurring Charge',
            Status: OFFERING_STATUS.ACTIVE,
            TotalAmount: 100,
            Type: 0 // Recurring
          }]
        }, {
          BillerRuleType: '2',
          Status: OFFERING_STATUS.ACTIVE,
          BillerTypeAmounts: []
        }],
        Status: OFFERING_STATUS.ACTIVE
      }];
      const isDbss = true;
      const result = Offerings.resultFunc(isDbss, OFFERINGS);
      expect(result[0].Options[0].BillerTypeAmounts).toEqual([{
        ...OFFERINGS[0].Options[0].BillerTypeAmounts[0],
        BulkAmount: 100,
        BulkTotalAmount: 400,
        BulkType: 2,
        Quantity: 4
      }]);
    });
  });
});
