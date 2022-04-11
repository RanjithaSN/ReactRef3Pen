import * as ConvergentBilling from './convergent.billing.selectors';

describe('ConvergentBilling', () => {
  const CONVERGENT_BILLING = {
    summary: 1,
    accountDetails: 2
  };

  const SUBSCRIBER_API = {
    convergentBiller: CONVERGENT_BILLING
  };

  const ASCENDON = {
    subscriberApi: SUBSCRIBER_API
  };

  const EXAMPLE_STATE = {
    ascendon: ASCENDON
  };

  describe('When the ConvergentBiller  is used...', () => {
    test('It should return the value of the convergent billing attribute when one exists.', () => {
      expect(ConvergentBilling.ConvergentBiller(EXAMPLE_STATE)).toEqual(CONVERGENT_BILLING);
    });

    test('It should return null where there is no store passed in.', () => {
      expect(ConvergentBilling.ConvergentBiller()).toBeNull();
    });

    test('It should return null when there is no convergent billing attribute.', () => {
      expect(ConvergentBilling.ConvergentBiller.resultFunc({})).toBeNull();
    });
  });
});
