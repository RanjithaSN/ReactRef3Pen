import { BILLER_RULE_INSTANCE_TYPES } from '@selfcare/core/constants/biller.rule.instance';
import { CONFIGURATION } from '@selfcare/core/constants/configuration.constants';
import * as ServiceFeatureSelectors from './product.service.feature.selectors';

describe('Product Service Feature selectors', () => {
  const CATALOG = [
    {
      Name: CONFIGURATION.PRODUCT_INFO_FOR_TOP_UP_DECISION,
      Id: `${CONFIGURATION.PRODUCT_INFO_FOR_TOP_UP_DECISION}-Id`
    },
    {
      Name: 'test-one',
      Id: 'test-one-Id'
    },
    {
      Name: CONFIGURATION.PRODUCT_INFO_FOR_ROAM_LIKE_HOME,
      Id: `${CONFIGURATION.PRODUCT_INFO_FOR_ROAM_LIKE_HOME}-Id`
    },
    {
      Name: 'test-two',
      Id: 'test-two-Id'
    },
    {
      Name: CONFIGURATION.PRODUCT_INFO_FOR_INTERNATIONAL_ROAMING,
      Id: `${CONFIGURATION.PRODUCT_INFO_FOR_INTERNATIONAL_ROAMING}-Id`
    }
  ];
  describe('When TopUpId is used', () => {
    test('It should return undefined when there is no catalog', () => {
      expect(ServiceFeatureSelectors.TopUpId.resultFunc([])).toEqual(undefined);
    });

    test('It should return a formatted list when there are products', () => {
      expect(ServiceFeatureSelectors.TopUpId.resultFunc(CATALOG)).toEqual(`${CONFIGURATION.PRODUCT_INFO_FOR_TOP_UP_DECISION}-Id`);
    });
  });
  describe('When RoamLikeHomeId is used', () => {
    test('It should return undefined when there is no catalog', () => {
      expect(ServiceFeatureSelectors.RoamLikeHomeId.resultFunc([])).toEqual(undefined);
    });

    test('It should return a formatted list when there are products', () => {
      expect(ServiceFeatureSelectors.RoamLikeHomeId.resultFunc(CATALOG)).toEqual(`${CONFIGURATION.PRODUCT_INFO_FOR_ROAM_LIKE_HOME}-Id`);
    });
  });
  describe('When InternationalRoamingId is used', () => {
    test('It should return undefined when there is no catalog', () => {
      expect(ServiceFeatureSelectors.InternationalRoamingId.resultFunc([])).toEqual(undefined);
    });

    test('It should return a formatted list when there are products', () => {
      expect(ServiceFeatureSelectors.InternationalRoamingId.resultFunc(CATALOG)).toEqual(`${CONFIGURATION.PRODUCT_INFO_FOR_INTERNATIONAL_ROAMING}-Id`);
    });
  });
  describe('When TopUpReadyToLoad is used', () => {
    const TOP_UP_ID = 1234;
    const PRODUCT_BASE = {
      [TOP_UP_ID]: {
        status: 'LOADING'
      }
    };
    const PRODUCT_CONTEXT_BASE = {
      [TOP_UP_ID]: {
        status: 'LOADING'
      }
    };
    test('It should return false when there is no catalog or product data loaded', () => {
      expect(ServiceFeatureSelectors.TopUpReadyToLoad.resultFunc(undefined, undefined, undefined)).toEqual(false);
    });
    test('It should return false when there is catalog data and product data has started loading', () => {
      expect(ServiceFeatureSelectors.TopUpReadyToLoad.resultFunc(TOP_UP_ID, PRODUCT_BASE, undefined)).toEqual(false);
      expect(ServiceFeatureSelectors.TopUpReadyToLoad.resultFunc(TOP_UP_ID, PRODUCT_BASE, PRODUCT_CONTEXT_BASE)).toEqual(false);
      expect(ServiceFeatureSelectors.TopUpReadyToLoad.resultFunc(TOP_UP_ID, undefined, PRODUCT_CONTEXT_BASE)).toEqual(false);
    });
    test('It should return true when there is catalog data but product data has not finished loading', () => {
      expect(ServiceFeatureSelectors.TopUpReadyToLoad.resultFunc(TOP_UP_ID, undefined, undefined)).toEqual(true);
    });
  });
  describe('When service feature getters are used', () => {
    const LOCALE = 'en-US';
    const CURRENCY = 'USD';
    const LOCATION = 'USA';
    const SERVICE_FEATURE_ID = 1234;
    const PLAN_1 = 1212;
    const PLAN_2 = 1112;
    const PLAN_3 = 1111;
    const LOADING_PRODUCT_BASE = {
      [SERVICE_FEATURE_ID]: {
        status: 'LOADING'
      }
    };
    const PRODUCT_BASE = {
      [SERVICE_FEATURE_ID]: {
        status: 'LOADED',
        product: {
          PricingPlans: [
            {
              AdditionalProperties: [{
                ExternalReference: ServiceFeatureSelectors.EXTERNAL_REFENCE_FOR_ISO_COUNTRIES,
                Values: [
                  'AAA,IOU,RRR,TES,TEE,TOP,USA,BOB'
                ]
              }, {
                Values: []
              }],
              Id: PLAN_1,
              Name: `${PLAN_1}_PRICINGPLAN_NAME`,
              BillerRuleInstances: [{
                Amount: 45,
                Type: BILLER_RULE_INSTANCE_TYPES.ONE_TIME
              }]
            },
            {
              AdditionalProperties: [{
                ExternalReference: ServiceFeatureSelectors.EXTERNAL_REFENCE_FOR_ISO_COUNTRIES,
                Values: [
                  'AAA,IOU,RRR,TES,TEE,TOP,USA,BOB'
                ]
              }, {
                Values: []
              }],
              Id: 4444,
              Name: '4444_PRICINGPLAN_NAME'
            },
            {
              Id: PLAN_2,
              Name: `${PLAN_2}_PRICINGPLAN_NAME`,
              BillerRuleInstances: [{
                Amount: 55,
                Type: 'a'
              }]
            },
            {
              AdditionalProperties: [{
                ExternalReference: ServiceFeatureSelectors.EXTERNAL_REFENCE_FOR_ISO_COUNTRIES,
                Values: [
                  'AAA,IOU,RRR,TES,TEE,TOP,USA,BOB'
                ]
              }, {
                Values: []
              }],
              Id: PLAN_3,
              Name: `${PLAN_3}_PRICINGPLAN_NAME`,
              BillerRuleInstances: [{
                Amount: 65,
                Type: BILLER_RULE_INSTANCE_TYPES.ONE_TIME
              }]
            }
          ]
        }
      }
    };
    const PRODUCT_CONTEXT_BASE = {
      [SERVICE_FEATURE_ID]: {
        status: 'LOADED',
        data: {
          ProductContext: {
            OrderablePricingPlans: [
              {
                Id: PLAN_3,
                Currency: CURRENCY
              },
              {
                Id: 5555,
                Currency: CURRENCY
              },
              {
                Id: PLAN_1,
                Currency: CURRENCY
              },
              {
                Id: PLAN_2,
                Currency: CURRENCY
              }
            ]
          }
        }
      }
    };
    describe('When AvailableTopUps is used', () => {
      test('It should return an empty array when there is no or paritail data loaded', () => {
        expect(ServiceFeatureSelectors.AvailableTopUps.resultFunc(undefined, undefined, undefined, undefined)).toEqual([]);
        expect(ServiceFeatureSelectors.AvailableTopUps.resultFunc(SERVICE_FEATURE_ID, undefined, undefined, LOCALE)).toEqual([]);
        expect(ServiceFeatureSelectors.AvailableTopUps.resultFunc(SERVICE_FEATURE_ID, LOADING_PRODUCT_BASE, LOADING_PRODUCT_BASE, LOCALE)).toEqual([]);
        expect(ServiceFeatureSelectors.AvailableTopUps.resultFunc(SERVICE_FEATURE_ID, PRODUCT_BASE, LOADING_PRODUCT_BASE, LOCALE)).toEqual([]);
        expect(ServiceFeatureSelectors.AvailableTopUps.resultFunc(SERVICE_FEATURE_ID, LOADING_PRODUCT_BASE, PRODUCT_CONTEXT_BASE, LOCALE)).toEqual([]);
      });
      test('It should return populated array of top ups when there is catalog data and product data', () => {
        expect(ServiceFeatureSelectors.AvailableTopUps.resultFunc(SERVICE_FEATURE_ID, PRODUCT_BASE, PRODUCT_CONTEXT_BASE, LOCALE)).toEqual([{
          cardHeader: `${PLAN_3}_PRICINGPLAN_NAME`,
          cost: 65,
          currencyCode: CURRENCY,
          currencyLocale: LOCALE,
          id: `${PLAN_3}`
        }, {
          cardHeader: `${PLAN_1}_PRICINGPLAN_NAME`,
          cost: 45,
          currencyCode: CURRENCY,
          currencyLocale: LOCALE,
          id: `${PLAN_1}`
        }, {
          cardHeader: `${PLAN_2}_PRICINGPLAN_NAME`,
          cost: undefined,
          currencyCode: CURRENCY,
          currencyLocale: LOCALE,
          id: `${PLAN_2}`
        }]);
      });
    });

    describe('When AvailableRoamLikeHome is used', () => {
      test('It should return an empty array when there is no or paritail data loaded', () => {
        expect(ServiceFeatureSelectors.AvailableRoamLikeHome.resultFunc(undefined, undefined, undefined, undefined)).toEqual([]);
        expect(ServiceFeatureSelectors.AvailableRoamLikeHome.resultFunc(SERVICE_FEATURE_ID, undefined, undefined, LOCALE, LOCATION)).toEqual([]);
        expect(ServiceFeatureSelectors.AvailableRoamLikeHome.resultFunc(SERVICE_FEATURE_ID, LOADING_PRODUCT_BASE, LOADING_PRODUCT_BASE, LOCALE, LOCATION)).toEqual([]);
        expect(ServiceFeatureSelectors.AvailableRoamLikeHome.resultFunc(SERVICE_FEATURE_ID, PRODUCT_BASE, LOADING_PRODUCT_BASE, LOCALE)).toEqual([]);
        expect(ServiceFeatureSelectors.AvailableRoamLikeHome.resultFunc(SERVICE_FEATURE_ID, LOADING_PRODUCT_BASE, PRODUCT_CONTEXT_BASE, LOCALE)).toEqual([]);
      });
      test('It should return populated array of roam like home packages when there is catalog data and product data', () => {
        expect(ServiceFeatureSelectors.AvailableRoamLikeHome.resultFunc(SERVICE_FEATURE_ID, PRODUCT_BASE, PRODUCT_CONTEXT_BASE, LOCALE, LOCATION)).toEqual([{
          cardHeader: `${PLAN_3}_PRICINGPLAN_NAME`,
          cost: 65,
          currencyCode: CURRENCY,
          currencyLocale: LOCALE,
          id: `${PLAN_3}`
        }, {
          cardHeader: `${PLAN_1}_PRICINGPLAN_NAME`,
          cost: 45,
          currencyCode: CURRENCY,
          currencyLocale: LOCALE,
          id: `${PLAN_1}`
        }]);
      });
    });

    xdescribe('When AvailableInternationalRoaming is used', () => {
      test('It should return an empty array when there is no or paritail data loaded', () => {
        expect(ServiceFeatureSelectors.AvailableInternationalRoaming.resultFunc(undefined, undefined, undefined, undefined)).toEqual([]);
        expect(ServiceFeatureSelectors.AvailableInternationalRoaming.resultFunc(SERVICE_FEATURE_ID, undefined, undefined, LOCALE, LOCATION)).toEqual([]);
        expect(ServiceFeatureSelectors.AvailableInternationalRoaming.resultFunc(SERVICE_FEATURE_ID, LOADING_PRODUCT_BASE, LOADING_PRODUCT_BASE, LOCALE, LOCATION)).toEqual([]);
        expect(ServiceFeatureSelectors.AvailableInternationalRoaming.resultFunc(SERVICE_FEATURE_ID, PRODUCT_BASE, LOADING_PRODUCT_BASE, LOCALE)).toEqual([]);
        expect(ServiceFeatureSelectors.AvailableInternationalRoaming.resultFunc(SERVICE_FEATURE_ID, LOADING_PRODUCT_BASE, PRODUCT_CONTEXT_BASE, LOCALE)).toEqual([]);
      });
      test('It should return populated array of international roaming packages when there is catalog data and product data', () => {
        expect(ServiceFeatureSelectors.AvailableInternationalRoaming.resultFunc(SERVICE_FEATURE_ID, PRODUCT_BASE, PRODUCT_CONTEXT_BASE, LOCALE, LOCATION)).toEqual([{
          cardHeader: `${PLAN_3}_PRICINGPLAN_NAME`,
          cost: 65,
          currencyCode: CURRENCY,
          currencyLocale: LOCALE,
          id: `${PLAN_3}`
        }, {
          cardHeader: `${PLAN_1}_PRICINGPLAN_NAME`,
          cost: 45,
          currencyCode: CURRENCY,
          currencyLocale: LOCALE,
          id: `${PLAN_1}`
        }]);
      });
    });
  });

  describe('When RoamingByServiceId is used', () => {
    const LOCATION = 'USA';
    const SERVICE_FEATURE_ID = 1234;
    const SERVICE_FEATURE_ID_TWO = 221234;
    const SERVICE_FEATURE_ID_THREE = 33221234;
    const PRODUCT_1 = 1212;
    const PRODUCT_2 = 1112;
    const PRODUCT_3 = 1111;
    const ROAM_LIKE_HOME_ENTITLEMENT = {
      BalanceRemaining: 100,
      EntitlementIdentifier: {
        SubscriberProductId: PRODUCT_2
      }
    };
    const INTERNATIONAL_ROAMING_ENTITLEMENT = {
      BalanceRemaining: 100,
      EntitlementIdentifier: {
        SubscriberProductId: PRODUCT_3
      }
    };
    const SERVICES = [{
      ServiceIdentifier: {
        Value: SERVICE_FEATURE_ID
      },
      EntitlementBalances: [{
        BalanceRemaining: 10,
        EntitlementIdentifier: {
          SubscriberProductId: PRODUCT_1
        }
      }, {
        BalanceRemaining: 0,
        EntitlementIdentifier: {
          SubscriberProductId: PRODUCT_1
        }
      }, {
        BalanceRemaining: 10
      }]
    }, {
      ServiceIdentifier: {
        Value: SERVICE_FEATURE_ID_TWO
      },
      EntitlementBalances: [ROAM_LIKE_HOME_ENTITLEMENT, {
        BalanceRemaining: 10
      }, {
        BalanceRemaining: 0,
        EntitlementIdentifier: {
          SubscriberProductId: PRODUCT_2
        }
      }]
    }, {
      ServiceIdentifier: {
        Value: SERVICE_FEATURE_ID_THREE
      },
      EntitlementBalances: [{
        BalanceRemaining: 10
      }, {
        BalanceRemaining: 0,
        EntitlementIdentifier: {
          SubscriberProductId: PRODUCT_3
        }
      }, INTERNATIONAL_ROAMING_ENTITLEMENT]
    }];
    const ROAM_LIKE_HOME_ID = 987;
    const INTERNATIONAL_ROAMING_ID = 789;
    test('It should return an empty object when there is no or paritail data loaded', () => {
      expect(ServiceFeatureSelectors.RoamingByServiceId.resultFunc([], [], undefined, [], undefined, [], undefined)).toEqual({});
    });
    test('It should return populated object of roaming data if services are populated.', () => {
      expect(ServiceFeatureSelectors.RoamingByServiceId.resultFunc(SERVICES, [], undefined, [], undefined, [], LOCATION)).toEqual({
        [SERVICE_FEATURE_ID]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        },
        [SERVICE_FEATURE_ID_TWO]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        },
        [SERVICE_FEATURE_ID_THREE]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        }
      });
      expect(ServiceFeatureSelectors.RoamingByServiceId.resultFunc(SERVICES, [], ROAM_LIKE_HOME_ID, [], INTERNATIONAL_ROAMING_ID, [], LOCATION)).toEqual({
        [SERVICE_FEATURE_ID]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        },
        [SERVICE_FEATURE_ID_TWO]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        },
        [SERVICE_FEATURE_ID_THREE]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        }
      });
    });
    test('It should return populated object of roaming data with roam from home true if services are populated.', () => {
      const LOCKER = [{
        Id: PRODUCT_2,
        Product: {
          Id: ROAM_LIKE_HOME_ID
        }
      }];
      const ROAM_LIKE_HOME = [{
        data: 'test'
      }];
      expect(ServiceFeatureSelectors.RoamingByServiceId.resultFunc(SERVICES, LOCKER, ROAM_LIKE_HOME_ID, ROAM_LIKE_HOME, INTERNATIONAL_ROAMING_ID, [], LOCATION)).toEqual({
        [SERVICE_FEATURE_ID]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        },
        [SERVICE_FEATURE_ID_TWO]: {
          hasRoamForHere: false,
          hasRoamLikeHome: true,
          entitlement: ROAM_LIKE_HOME_ENTITLEMENT,
          location: LOCATION
        },
        [SERVICE_FEATURE_ID_THREE]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        }
      });
    });
    test('It should return populated object of roaming data with international roaming true if services are populated.', () => {
      const PRICING_PLAN_ID = 654;
      const LOCKER = [{
        Id: PRODUCT_3,
        Product: {
          Id: INTERNATIONAL_ROAMING_ID
        },
        PricingPlan: {
          Id: PRICING_PLAN_ID
        }
      }];
      const INTERNATIONAL_ROAMING = [{
        id: `${PRICING_PLAN_ID}`,
        data: 'test'
      }];
      expect(ServiceFeatureSelectors.RoamingByServiceId.resultFunc(SERVICES, LOCKER, ROAM_LIKE_HOME_ID, [], INTERNATIONAL_ROAMING_ID, INTERNATIONAL_ROAMING, LOCATION)).toEqual({
        [SERVICE_FEATURE_ID]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        },
        [SERVICE_FEATURE_ID_TWO]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        },
        [SERVICE_FEATURE_ID_THREE]: {
          hasRoamForHere: true,
          hasRoamLikeHome: false,
          entitlement: INTERNATIONAL_ROAMING_ENTITLEMENT,
          location: LOCATION
        }
      });
    });
  });

  describe('When UnfilteredRoamingByServiceId is used', () => {
    const LOCATION = 'USA';
    const SERVICE_FEATURE_ID = 1234;
    const SERVICE_FEATURE_ID_TWO = 221234;
    const SERVICE_FEATURE_ID_THREE = 33221234;
    const PRODUCT_1 = 1212;
    const PRODUCT_2 = 1112;
    const PRODUCT_3 = 1111;
    const ROAM_LIKE_HOME_ENTITLEMENT = {
      BalanceRemaining: 100,
      EntitlementIdentifier: {
        SubscriberProductId: PRODUCT_2
      }
    };
    const INTERNATIONAL_ROAMING_ENTITLEMENT = {
      BalanceRemaining: 100,
      EntitlementIdentifier: {
        SubscriberProductId: PRODUCT_3
      }
    };
    const SERVICES = [{
      ServiceIdentifier: {
        Value: SERVICE_FEATURE_ID
      },
      EntitlementBalances: [{
        BalanceRemaining: 10,
        EntitlementIdentifier: {
          SubscriberProductId: PRODUCT_1
        }
      }, {
        BalanceRemaining: 0,
        EntitlementIdentifier: {
          SubscriberProductId: PRODUCT_1
        }
      }, {
        BalanceRemaining: 10
      }]
    }, {
      ServiceIdentifier: {
        Value: SERVICE_FEATURE_ID_TWO
      },
      EntitlementBalances: [ROAM_LIKE_HOME_ENTITLEMENT, {
        BalanceRemaining: 10
      }, {
        BalanceRemaining: 0,
        EntitlementIdentifier: {
          SubscriberProductId: PRODUCT_2
        }
      }]
    }, {
      ServiceIdentifier: {
        Value: SERVICE_FEATURE_ID_THREE
      },
      EntitlementBalances: [{
        BalanceRemaining: 10
      }, {
        BalanceRemaining: 0,
        EntitlementIdentifier: {
          SubscriberProductId: PRODUCT_3
        }
      }, INTERNATIONAL_ROAMING_ENTITLEMENT]
    }];
    const ROAM_LIKE_HOME_ID = 987;
    const INTERNATIONAL_ROAMING_ID = 789;
    test('It should return an empty object when there is no or paritail data loaded', () => {
      expect(ServiceFeatureSelectors.UnfilteredRoamingByServiceId.resultFunc([], [], undefined, [], undefined, [], undefined)).toEqual({});
    });
    test('It should return populated object of roaming data if services are populated.', () => {
      expect(ServiceFeatureSelectors.UnfilteredRoamingByServiceId.resultFunc(SERVICES, [], undefined, [], undefined, [], LOCATION)).toEqual({
        [SERVICE_FEATURE_ID]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        },
        [SERVICE_FEATURE_ID_TWO]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        },
        [SERVICE_FEATURE_ID_THREE]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        }
      });
      expect(ServiceFeatureSelectors.RoamingByServiceId.resultFunc(SERVICES, [], ROAM_LIKE_HOME_ID, [], INTERNATIONAL_ROAMING_ID, [], LOCATION)).toEqual({
        [SERVICE_FEATURE_ID]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        },
        [SERVICE_FEATURE_ID_TWO]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        },
        [SERVICE_FEATURE_ID_THREE]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        }
      });
    });
    test('It should return populated object of roaming data with roam from home true if services are populated.', () => {
      const LOCKER = [{
        Id: PRODUCT_2,
        Product: {
          Id: ROAM_LIKE_HOME_ID
        }
      }];
      const ROAM_LIKE_HOME = [{
        data: 'test'
      }];
      expect(ServiceFeatureSelectors.UnfilteredRoamingByServiceId.resultFunc(SERVICES, LOCKER, ROAM_LIKE_HOME_ID, ROAM_LIKE_HOME, INTERNATIONAL_ROAMING_ID, [], LOCATION)).toEqual({
        [SERVICE_FEATURE_ID]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        },
        [SERVICE_FEATURE_ID_TWO]: {
          hasRoamForHere: false,
          hasRoamLikeHome: true,
          entitlements: SERVICES[1].EntitlementBalances.filter((service) => service.EntitlementIdentifier),
          location: LOCATION
        },
        [SERVICE_FEATURE_ID_THREE]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        }
      });
    });
    test('It should return populated object of roaming data with international roaming true if services are populated.', () => {
      const PRICING_PLAN_ID = 654;
      const LOCKER = [{
        Id: PRODUCT_3,
        Product: {
          Id: INTERNATIONAL_ROAMING_ID
        },
        PricingPlan: {
          Id: PRICING_PLAN_ID
        }
      }];
      const INTERNATIONAL_ROAMING = [{
        id: `${PRICING_PLAN_ID}`,
        data: 'test'
      }];
      expect(ServiceFeatureSelectors.UnfilteredRoamingByServiceId.resultFunc(SERVICES, LOCKER, ROAM_LIKE_HOME_ID, [], INTERNATIONAL_ROAMING_ID, INTERNATIONAL_ROAMING, LOCATION)).toEqual({
        [SERVICE_FEATURE_ID]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        },
        [SERVICE_FEATURE_ID_TWO]: {
          hasRoamForHere: false,
          hasRoamLikeHome: false,
          location: LOCATION
        },
        [SERVICE_FEATURE_ID_THREE]: {
          hasRoamForHere: true,
          hasRoamLikeHome: false,
          entitlements: SERVICES[2].EntitlementBalances.filter((service) => service.EntitlementIdentifier),
          location: LOCATION
        }
      });
    });
  });
});
