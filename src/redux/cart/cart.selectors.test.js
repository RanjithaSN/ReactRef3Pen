import { AllExternalDisplayNames } from '@selfcare/core/redux/offeringContext/offering.context.constants';
import Immutable from 'seamless-immutable';
import { CartHasAddOns, CartHasOffers, CartHasPlay, CartHasSubscriberOffers, CartItemCount, SavedShoppingCartItemsWithDownPayments } from './cart.selectors';

describe('Cart Selectors', () => {
  describe('CartHasOffers...', () => {
    test('it should return true when cart items contain offering IDs', () => {
      expect(CartHasOffers.resultFunc([{
        OfferingId: 1
      }])).toBe(true);
    });

    test('it should return false when cart items do not contain offering IDs', () => {
      expect(CartHasOffers.resultFunc([{
        Id: 1
      }])).toBe(false);
    });

    test('it should return false when shopping cart items are empty', () => {
      expect(CartHasOffers.resultFunc([])).toBe(false);
    });
  });

  describe('CartHasSubscriberOffers...', () => {
    test('it should return true when cart items contain subscriber offering IDs', () => {
      expect(CartHasSubscriberOffers.resultFunc([{
        OfferingInstanceId: 1
      }, {
        OfferingInstanceId: 2
      }], [{
        OfferingInstanceId: 2
      }])).toBe(true);
    });

    test('it should return false when cart items do not contain subscriber offering IDs', () => {
      expect(CartHasSubscriberOffers.resultFunc([{
        OfferingInstanceId: 1
      }, {
        OfferingInstanceId: 2
      }], [{
        Id: 1
      }])).toBe(false);
    });

    test('it should return false when shopping cart items are empty', () => {
      expect(CartHasSubscriberOffers.resultFunc([])).toBe(false);
    });
  });

  describe('CartHasAddOns...', () => {
    test('it should return true when a saved cart is loaded and does not contain offers', () => {
      expect(CartHasAddOns.resultFunc(true, [{}], false)).toBe(true);
    });

    test('it should return false when a saved cart is loaded and does contain offers', () => {
      expect(CartHasAddOns.resultFunc(true, [{}], true)).toBe(false);
    });

    test('it should return false when a saved cart is not loaded and does not contain offers', () => {
      expect(CartHasAddOns.resultFunc(false, [{}], false)).toBe(false);
    });

    test('it should return false when a saved cart is not loaded and does contain offers', () => {
      expect(CartHasAddOns.resultFunc(false, [{}], true)).toBe(false);
    });

    test('it should return false when a saved cart is loaded and does not contain items', () => {
      expect(CartHasAddOns.resultFunc(true, [], true)).toBe(false);
    });
  });

  describe('CartItemCount...', () => {
    test('it should return 0 when order data exists', () => {
      expect(
        CartItemCount.resultFunc(true, false, [], {}, false)
      ).toBe(0);
    });

    test('it should return 0 when ', () => {
      expect(CartItemCount.resultFunc(true, false, [], null, true)).toBe(0);
    });

    test('it should return 0 when no preconditions are satisfied', () => {
      expect(
        CartItemCount.resultFunc(false, false, [], null, false)
      ).toBe(0);
    });

    test('it should return 1 for new offers', () => {
      expect(
        CartItemCount.resultFunc(true, false, [{}], null, false)
      ).toBe(1);
    });

    test('it should return an aggregate quantity when add-ons exist', () => {
      expect(
        CartItemCount.resultFunc(false, true, [{
          Quantity: 6
        }], null, false)
      ).toBe(6);
    });
  });

  describe('SavedShoppingCartWithDownPayments', () => {
    const items = Immutable([{
      Id: '123'
    }, {
      Id: '456'
    }]);

    let result;

    beforeEach(() => {
      result = SavedShoppingCartItemsWithDownPayments.resultFunc(items);
    });

    test('It should leave items unchanged with no down payment', () => {
      expect(result[0]).toEqual(items[0]);
    });

    test('It should return items with down payment', () => {
      expect(result[1]).toEqual({
        ...items[1],
        DownPaymentAmount: undefined
      });
    });
  });

  describe('When CartHasPlay is used...', () => {
    const externalOfferIds = {
      [AllExternalDisplayNames.PLAY]: {
        offerId: 'bob'
      },
      [AllExternalDisplayNames.MOBILE]: {
        offerId: 'mobile'
      }
    };
    test('It should return true if the cart items include a play offer', () => {
      const items = [{
        Details: {
          Product: {
            Id: 1,
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
        Id: '167216',
        ProductId: 401171,
        PricingPlanId: 38133,
        OfferingId: 'bob',
        OfferingInstanceId: '2010553385544000400',
        OrderedOfferingId: '2008561929942000100',
        OrderedOfferingName: 'Penny Play Offer 2',
        OfferingOptionPriceId: '2008565015319000100',
        OfferingOptionId: '',
        Quantity: 1,
        Details: {
          Product: {
            Id: 401171,
            Name: 'OTT Penny Play',
            StructureType: 1,
            ImageUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
            ThumbnailUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
            ReferenceDate: '2020-03-25T17:51:43.167Z',
            ExternalReferences: [
              {
                Id: 50234,
                ExternalId: 'BenefitApplicability',
                Value: 'Penny_Play'
              }
            ],
            IndexName: 'OTT Penny Play',
            AllowMultiplePurchases: true,
            Standalone: true,
            LineOfBusiness: 10083,
            Subscription: false,
            ProductClassification: 1,
            Services: [],
            MaxNonBulkQuantity: 50,
            MaxBulkQuantity: 30000,
            LineOfBusinessName: 'Wireless',
            Status: 1
          },
          PricingPlan: {
            ProductId: 401171,
            AddDate: '2020-03-25T18:02:26.010Z',
            ModDate: '2020-04-07T18:09:37.623Z',
            Id: 38133,
            Name: 'Penny Play Monthly Subscription 3',
            PricingPlanName: 'Penny Play Monthly Subscription 3',
            ChargeAmount: 0,
            RenewalChargeAmount: 0,
            SecondaryRenewalAmount: 0,
            Currency: 'SEK',
            Type: 2,
            BillerRuleInstanceThumbnails: [
              {
                Id: 13211,
                Status: 1,
                Amount: 0,
                CurrencyCode: 'SEK',
                BillerRuleConfigurationId: '2005500172309000200',
                Name: null,
                Description: null,
                Type: 0,
                RecurringPeriodTypeCode: '3',
                Bulk: false,
                BulkChargeTypeCode: null,
                StartQuantity: null,
                EndQuantity: null,
                QuantityPricingTypeCode: 1,
                DefaultActivationStatus: 1,
                SubscriptionBillingCycle: null,
                InvoiceTiming: 0,
                DefaultTermLength: 0,
                FullUpfrontPayment: false
              }
            ],
            PricingPlanBillerRuleInstances: {
              ProductId: 0,
              PricingPlanId: 38133,
              RecurringBillerRuleInstances: [
                {
                  BillerRuleConfigurationId: '2005500172309000200',
                  CurrencyCode: 'SEK',
                  BillerRuleInstanceCharges: [
                    {
                      ChargeAmount: 0
                    }
                  ],
                  GuidanceCode: null,
                  DefaultActivationStatus: 1,
                  TaxAssociationCode: null,
                  UseActiveQuantity: false,
                  AllowChargeOverride: false,
                  AdHoc: false,
                  Credit: false,
                  InvoiceProperties: {},
                  QuantityPricingTypeCode: 1,
                  RecurringPeriodTypeCode: 3,
                  BillerRuleConfigurationChargeDetails: {
                    ChargeTiming: 3,
                    CycleLevel: 1,
                    TaxAssociationCode: 'No Tax',
                    TaxType: 2,
                    PaymentReservationRequired: false
                  },
                  BulkChargeTypeCode: null,
                  Type: 0,
                  Id: 13211,
                  BillerRuleInstanceDiscounts: []
                }
              ],
              TriggerBillerRuleInstances: [],
              OneTimeBillerRuleInstances: [],
              UsageBillerRuleInstances: [],
              CustomBillerRuleInstances: [],
              EntitlementBillerRuleInstances: [],
              EarlyTerminationFeeBillerRuleInstances: [],
              FinanceBillerRuleInstances: [],
              SubscriptionBillerRuleInstances: []
            },
            Deposits: [],
            ServiceTiers: [],
            TopDeliveryCapabilityId: 30475,
            HasConvergentBillerExtension: true,
            DeliveryCapabilityCodes: [
              30475
            ],
            AvailableWithinOffering: true,
            AvailableAsStandalone: true,
            ProductPricingPlanAssociationExternalReferences: [],
            Duration: 2,
            DurationPeriodType: 0
          },
          GrossAmount: 0,
          TotalAmount: 0,
          PerItemGrossAmount: 0,
          PerItemTotalAmount: 0,
          BundleItemGrossAmount: 0,
          BundleItemTotalAmount: 0,
          BillerRuleTotals: [
            {
              Amount: 0,
              TotalAmount: 0,
              InvoiceTiming: 1,
              ChargeTiming: 3,
              PeriodTypeCode: '3',
              Type: 0
            }
          ],
          BillerRuleConfigurationDetails: []
        },
        Discounts: [],
        Deposits: [],
        ServiceAttributes: [],
        OrderItemChangeType: null,
        OrderContractId: null,
        ExternalContractId: null,
        EligibleForBuyersRemorse: false
      }];
      expect(CartHasPlay.resultFunc(items, externalOfferIds)).toEqual(true);
    });
    test('It should return false if no play items in the cart', () => {
      expect(CartHasPlay.resultFunc([], externalOfferIds)).toEqual(false);
    });
  });
});
