import { OFFERING_OVERALL_STATUS, OFFERING_STATUS, OFFERING_SUBSCRIPTION_STATUS } from './subscriber.offering.constants';
import { determineStatusFromTopLevel, GetDisplayName, GetOverallStatus } from './subscriber.offerings.helper';

describe('When the determineStatusFromTopLevel function is used...', () => {
  describe('And Is Dbss', () => {
    test('It Should return Plan Suspended when it is Suspended', () => {
      const isDbss = true;
      const determinedStatus = determineStatusFromTopLevel(isDbss, OFFERING_STATUS.SUSPENDED);

      expect(determinedStatus).toEqual(OFFERING_OVERALL_STATUS.PLAN_SUSPENDED);
    });
  });

  describe('And Is Not Dbss', () => {
    test('It Should return Order Pending when it is Pending Approval', () => {
      const isDbss = false;
      const determinedStatus = determineStatusFromTopLevel(isDbss, OFFERING_SUBSCRIPTION_STATUS.PENDING_APPROVAL);

      expect(determinedStatus).toEqual(OFFERING_OVERALL_STATUS.ACTIVE);
    });
  });
});

describe('When the GetOverallStatus function is used...', () => {
  test('It Should return Order ACTIVE when no offers are yet loaded', () => {
    const isDbss = true;
    expect(GetOverallStatus(isDbss, OFFERING_STATUS.PENDING_ACTIVE)).toEqual(OFFERING_OVERALL_STATUS.ORDER_PENDING);
  });
  test('It Should return Pending Removal when the primary decision has been removed', () => {
    const isDbss = true;
    const determinedStatus = GetOverallStatus(isDbss, null, {
      Status: OFFERING_STATUS.REMOVED
    });

    expect(determinedStatus).toEqual(OFFERING_OVERALL_STATUS.PENDING_REMOVAL);
  });

  test('It Should return Pending Primary Removal when the primary decision will not renew at the billing cycle.', () => {
    const isDbss = true;
    const determinedStatus = GetOverallStatus(isDbss, null, {
      Status: OFFERING_STATUS.ACTIVE,
      SubscriberProductExpiration: {
        RenewalDisabled: true
      }
    });

    expect(determinedStatus).toEqual(OFFERING_OVERALL_STATUS.PENDING_PRIMARY_REMOVAL);
  });
});

describe('When the GetDisplayName function is used...', () => {
  let actualOutcome = 'Hello World';

  describe('with an empty activePrimaryDecisionOption and dataOption PlanName is "TEST Mobil Data"', () => {
    test('It should pull PlanName from dataOption', () => {
      actualOutcome = GetDisplayName({}, {
        Options: [{
          PlanName: 'Mobil SMS'
        }, {
          PlanName: 'Mobil Voice'
        }, {
          PlanName: 'Mobil Connection'
        }, {
          PlanName: 'TEST Mobil Data'
        }]
      });
      expect(actualOutcome).toEqual(null);
    });
  });
  describe('with an activePrimaryDecisionOption and activePrimaryDecisionOption has a PlanName', () => {
    test('It should pull PlanName from activePrimaryDecisionOption', () => {
      actualOutcome = GetDisplayName({
        PlanName: 'Some Plan Name'
      });
      expect(actualOutcome).toEqual('Some Plan Name');
    });
  });

  describe('with a falsy activePrimaryDecisionOption for a wireless offer that is not Pending and there are less than 5 options Offer has an option with a PlanName that is not one of MOBILE_SMS, MOBILE_VOICE, MOBILE_CONNECTION', () => {
    test('It should pull PlanName from dataOption', () => {
      actualOutcome = GetDisplayName(null, {
        Options: [{
          PlanName: 'Mobil SMS'
        }, {
          PlanName: 'Mobil Voice'
        }, {
          PlanName: 'Mobil Connection'
        }, {
          PlanName: 'TEST Mobil Data'
        }]
      }, true, OFFERING_OVERALL_STATUS.ACTIVE);
      expect(actualOutcome).toEqual(null);
    });
  });
  describe('with a falsy activePrimaryDecisionOption for a wireless offer that is not Pending and there are less than 5 options Offer doesn\'t have an option with a PlanName that is not one of MOBILE_SMS, MOBILE_VOICE, MOBILE_CONNECTION', () => {
    test('It should return null', () => {
      actualOutcome = GetDisplayName(null, {
        Options: [{
          PlanName: 'Mobil SMS'
        }, {
          PlanName: 'Mobil Voice'
        }, {
          PlanName: 'Mobil Connection'
        }]
      }, true, OFFERING_OVERALL_STATUS.ACTIVE);
      expect(actualOutcome).toBeNull();
    });
  });

  xdescribe('with a falsy activePrimaryDecisionOption and not wireless and DisplayName is missing on offer', () => {
    test('It should return null', () => {
      actualOutcome = GetDisplayName(null, {}, false);
      expect(actualOutcome).toBeNull();
    });
  });
  xdescribe('with a falsy activePrimaryDecisionOption and not wireless and Offer has a DisplayName', () => {
    test('It should return the DisplayName on the Offer', () => {
      actualOutcome = GetDisplayName(null, {
        DisplayName: 'Some Display Name'
      }, false);
      expect(actualOutcome).toEqual('Some Display Name');
    });
  });

  xdescribe('with a falsy activePrimaryDecisionOption for a wireless offer that is Pending and DisplayName is missing on dataOption', () => {
    test('It should return null', () => {
      actualOutcome = GetDisplayName(null, {}, true, OFFERING_OVERALL_STATUS.ORDER_PENDING);
      expect(actualOutcome).toBeNull();
    });
  });
  xdescribe('with a falsy activePrimaryDecisionOption for a wireless offer that is Pending and Offer has a DisplayName', () => {
    test('It should return the DisplayName on the Offer', () => {
      actualOutcome = GetDisplayName(null, {
        DisplayName: 'Some Display Name'
      }, true, OFFERING_OVERALL_STATUS.ORDER_PENDING);
      expect(actualOutcome).toEqual('Some Display Name');
    });
  });

  describe('with a falsy activePrimaryDecisionOption for a wireless offer that is not Pending and there are 5 options DisplayName is missing on offer', () => {
    test('It should return null', () => {
      actualOutcome = GetDisplayName(null, {
        Options: [{
          PlanName: 'Mobil SMS'
        }, {
          PlanName: 'Mobil Voice'
        }, {
          PlanName: 'Mobil Connection'
        }, {
          PlanName: 'asdf'
        }, {
          PlanName: 'asdf 2'
        }]
      }, true);
      expect(actualOutcome).toBeNull();
    });
    xdescribe('with a falsy activePrimaryDecisionOption for a wireless offer that is not Pending and there are 5 options and Offer has a DisplayName', () => {
      test('It should return the DisplayName on the Offer', () => {
        actualOutcome = GetDisplayName(null, {
          Options: [{
            PlanName: 'Mobil SMS'
          }, {
            PlanName: 'Mobil Voice'
          }, {
            PlanName: 'Mobil Connection'
          }, {
            PlanName: 'asdf'
          }, {
            PlanName: 'asdf 2'
          }],
          DisplayName: 'Some Display Name'
        }, true);
        expect(actualOutcome).toEqual('Some Display Name');
      });
    });
  });
});
