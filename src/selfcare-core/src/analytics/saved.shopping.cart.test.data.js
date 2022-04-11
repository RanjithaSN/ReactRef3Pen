export const savedShoppingCartTestData = {
  Currency: 'SEK',
  GrossAmount: 0,
  DiscountAmount: 0,
  DepositAmount: 0,
  TotalAmount: 0,
  ShippingRequired: false,
  HasSubscription: false,
  PaymentInstrumentRequired: false,
  BillerRuleTotals: [],
  SubTotals: null,
  AppliedCoupons: '',
  Offerings: null,
  HasOffCycleChargeRenewal: false,
  Id: '175745',
  Modified: '2020-08-14T12:00:39.203Z',
  Items: [
    {
      Id: '172963',
      ProductId: 400346,
      PricingPlanId: 37286,
      OfferingId: '2011137828077000100',
      OfferingInstanceId: '2022743239116000400',
      OrderedOfferingId: '2011137828077000100',
      OrderedOfferingName: 'Mobil',
      OfferingOptionPriceId: '2011137828075000100',
      Quantity: 1,
      Details: {
        Product: {
          Id: 400346,
          Name: 'Mobil Connection',
          StructureType: 1,
          ImageUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          ThumbnailUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          ReferenceDate: '2019-10-15T14:22:36.667Z',
          ExternalReferences: [
            {
              Id: 50234,
              ExternalId: 'BenefitApplicability',
              Value: 'MOBILE'
            }
          ],
          IndexName: 'Mobil Connection',
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
          ProductId: 400346,
          AddDate: '2019-11-06T14:50:21.437Z',
          ModDate: '2020-07-30T09:15:42.247Z',
          Id: 37286,
          Name: 'Mobil Connection',
          PricingPlanName: 'Mobil Connection',
          ChargeAmount: 0,
          RenewalChargeAmount: 0,
          SecondaryRenewalAmount: 0,
          Currency: 'SEK',
          Type: 2,
          BillerRuleInstanceThumbnails: [
            {
              Id: 11331,
              Status: 1,
              Amount: 0,
              DiscountAmount: null,
              CurrencyCode: 'SEK',
              BillerRuleConfigurationId: '1930431858611000100',
              Name: 'Mobile Connection',
              Description: 'Mobile Connection',
              Type: 2,
              RecurringPeriodTypeCode: '99',
              Bulk: false,
              BulkChargeTypeCode: null,
              StartQuantity: null,
              EndQuantity: null,
              QuantityPricingTypeCode: 1,
              DefaultActivationStatus: 1,
              SubscriptionBillingCycle: null,
              InvoiceTiming: 1,
              DefaultTermLength: 0,
              FullUpfrontPayment: false
            }
          ],
          PricingPlanBillerRuleInstances: {
            ProductId: 400346,
            PricingPlanId: 37286,
            RecurringBillerRuleInstances: [],
            TriggerBillerRuleInstances: [],
            OneTimeBillerRuleInstances: [
              {
                BillerRuleConfigurationId: '1930431858611000100',
                CurrencyCode: 'SEK',
                BillerRuleInstanceCharges: [
                  {
                    ChargeAmount: 0
                  }
                ],
                TaxAssociationCode: null,
                GuidanceCode: null,
                DefaultActivationStatus: 1,
                AllowChargeOverride: false,
                AdHoc: false,
                Credit: false,
                InvoiceProperties: {},
                QuantityPricingTypeCode: 1,
                InvoiceTiming: 1,
                BillerRuleConfigurationChargeDetails: {
                  ChargeTiming: 3,
                  CycleLevel: 1,
                  TaxAssociationCode: 'Telephony Wireless Service',
                  TaxType: 1,
                  PaymentReservationRequired: false
                },
                BulkChargeTypeCode: null,
                Type: 2,
                Id: 11331,
                BillerRuleInstanceDiscounts: []
              }
            ],
            UsageBillerRuleInstances: [],
            CustomBillerRuleInstances: [],
            EntitlementBillerRuleInstances: [],
            EarlyTerminationFeeBillerRuleInstances: [],
            FinanceBillerRuleInstances: [],
            SubscriptionBillerRuleInstances: []
          },
          Deposits: [],
          ServiceTiers: [
            {
              Id: 9925,
              ServiceTierId: 2525,
              ServiceTierName: 'Default',
              ServiceId: 2259,
              ServiceName: 'Penny Mobile'
            }
          ],
          TopDeliveryCapabilityId: 30475,
          HasConvergentBillerExtension: true,
          DeliveryCapabilityCodes: [
            30475
          ],
          AvailableWithinOffering: true,
          AvailableAsStandalone: false,
          ProductPricingPlanAssociationExternalReferences: [],
          ExcludeFromGracePeriod: false
        },
        GrossAmount: 0,
        TotalAmount: 0,
        PerItemGrossAmount: 0,
        PerItemTotalAmount: 0,
        BundleItemGrossAmount: 0,
        BundleItemTotalAmount: 0,
        DiscountStorefrontText: ''
      },
      ServiceAttributes: [
        {
          Value: 'MOBILE',
          Editable: false,
          ServiceAttributeId: 1002306,
          ServiceId: 2259,
          ServiceAttributeType: 0
        },
        {
          Value: 'Nytt nummer',
          Editable: false,
          ServiceAttributeId: 1002272,
          ServiceId: 2259,
          ServiceAttributeType: 0
        },
        {
          Value: '46790781620',
          Editable: false,
          ServiceAttributeId: 1002273,
          ServiceId: 2259,
          ServiceAttributeType: 0,
          ServiceInstanceId: '2022743238516000000'
        },
        {
          Value: 'Nej',
          Editable: false,
          ServiceAttributeId: 1002295,
          ServiceId: 2259,
          ServiceAttributeType: 0
        },
        {
          Value: '99999',
          Editable: false,
          ServiceAttributeId: 1002361,
          ServiceId: 2259,
          ServiceAttributeType: 0
        },
        {
          Value: '01/01/0000',
          Editable: false,
          ServiceAttributeId: 1003838,
          ServiceId: 2259,
          ServiceAttributeType: 0
        },
        {
          Value: '08/17/2020',
          Editable: false,
          ServiceAttributeId: 1003839,
          ServiceId: 2259,
          ServiceAttributeType: 0
        }
      ],
      InventoryItemReservations: [
        {
          InventoryTypeId: '1923844877600000300',
          InstanceId: '46790781620',
          Token: '46790781620||46790781620||51e99590-0bb4-414b-916f-b6105b355648',
          SerialNumber: '46790781620'
        }
      ],
      OrderItemChangeType: null,
      OrderContractId: null,
      ExternalContractId: null,
      EligibleForBuyersRemorse: false
    },
    {
      Id: '172964',
      ProductId: 400348,
      PricingPlanId: 37287,
      OfferingId: '2011137828077000100',
      OfferingInstanceId: '2022743239116000400',
      OrderedOfferingId: '2011137828077000100',
      OrderedOfferingName: 'Mobil',
      OfferingOptionPriceId: '2011137828075000105',
      Quantity: 1,
      Details: {
        Product: {
          Id: 400348,
          Name: 'Mobil SMS',
          StructureType: 1,
          ImageUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          ThumbnailUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          ReferenceDate: '2019-10-17T11:44:26.743Z',
          IndexName: 'Mobil SMS',
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
          ProductId: 400348,
          AddDate: '2019-11-06T14:50:21.907Z',
          ModDate: '2020-05-28T14:44:04.823Z',
          Id: 37287,
          Name: 'Mobil SMS',
          PricingPlanName: 'Mobil SMS',
          ChargeAmount: 0,
          RenewalChargeAmount: 0,
          SecondaryRenewalAmount: 0,
          Currency: 'SEK',
          Type: 2,
          BillerRuleInstanceThumbnails: [
            {
              Id: 11332,
              Status: 2,
              Amount: 0,
              DiscountAmount: null,
              CurrencyCode: 'SEK',
              BillerRuleConfigurationId: '1930431539117000100',
              Name: 'Mobile Monthly Charge',
              Description: 'Mobile Monthly Charge',
              Type: 0,
              RecurringPeriodTypeCode: '3',
              Bulk: false,
              BulkChargeTypeCode: null,
              StartQuantity: null,
              EndQuantity: null,
              QuantityPricingTypeCode: 1,
              DefaultActivationStatus: 2,
              SubscriptionBillingCycle: null,
              InvoiceTiming: 1,
              DefaultTermLength: 0,
              FullUpfrontPayment: false
            },
            {
              Id: 11333,
              Status: 1,
              Amount: null,
              DiscountAmount: null,
              CurrencyCode: null,
              BillerRuleConfigurationId: '1923844943674000300',
              Name: 'Penny SMS',
              Description: 'Penny SMS',
              Type: 3,
              RecurringPeriodTypeCode: '99',
              Bulk: false,
              BulkChargeTypeCode: null,
              StartQuantity: null,
              EndQuantity: null,
              QuantityPricingTypeCode: 1,
              DefaultActivationStatus: 1,
              SubscriptionBillingCycle: null,
              InvoiceTiming: 1,
              DefaultTermLength: 0,
              FullUpfrontPayment: false
            },
            {
              Id: 11334,
              Status: 1,
              Amount: null,
              DiscountAmount: null,
              CurrencyCode: null,
              BillerRuleConfigurationId: '1931033417654000100',
              Name: 'First Use',
              Description: 'First Use Trigger',
              Type: 7,
              RecurringPeriodTypeCode: '99',
              Bulk: false,
              BulkChargeTypeCode: null,
              StartQuantity: null,
              EndQuantity: null,
              QuantityPricingTypeCode: 1,
              DefaultActivationStatus: 1,
              SubscriptionBillingCycle: null,
              InvoiceTiming: 1,
              DefaultTermLength: 0,
              FullUpfrontPayment: false
            }
          ],
          PricingPlanBillerRuleInstances: {
            ProductId: 400348,
            PricingPlanId: 37287,
            RecurringBillerRuleInstances: [
              {
                BillerRuleConfigurationId: '1930431539117000100',
                CurrencyCode: 'SEK',
                BillerRuleInstanceCharges: [
                  {
                    ChargeAmount: 0
                  }
                ],
                GuidanceCode: null,
                DefaultActivationStatus: 2,
                TaxAssociationCode: null,
                UseActiveQuantity: false,
                AllowChargeOverride: false,
                AdHoc: false,
                Credit: false,
                InvoiceProperties: {},
                QuantityPricingTypeCode: 1,
                RecurringPeriodType: 3,
                BillerRuleConfigurationChargeDetails: {
                  ChargeTiming: 4,
                  CycleLevel: 1,
                  TaxAssociationCode: 'Telephony Wireless Service',
                  TaxType: 1,
                  PaymentReservationRequired: false
                },
                BulkChargeTypeCode: null,
                Type: 0,
                Id: 11332,
                BillerRuleInstanceDiscounts: []
              }
            ],
            TriggerBillerRuleInstances: [
              {
                BillerRuleConfigurationId: '1931033417654000100',
                BillerRuleInstanceGuid: '2a66c726-a05e-4154-9e77-cd2f3e3d41bd',
                Name: 'Mobil First Use',
                DisplayName: 'Mobil First Use',
                Actions: [
                  {
                    BillerRuleConfigurationId: '1930431539117000100',
                    ActivationStatus: 3
                  },
                  {
                    BillerRuleConfigurationId: '1923844943674000300',
                    ActivationStatus: 3
                  }
                ],
                TriggerType: 2,
                Type: 7,
                Id: 11334
              }
            ],
            OneTimeBillerRuleInstances: [],
            UsageBillerRuleInstances: [],
            CustomBillerRuleInstances: [],
            EntitlementBillerRuleInstances: [
              {
                BillerRuleConfigurationId: '1923844943674000300',
                EntitlementName: 'Mobil SMS',
                EntitlementContextTypeCode: 1,
                UsageCost: 0,
                EntitlementGroups: [],
                Type: 3,
                Id: 11333,
                BillerRuleInstanceDiscounts: []
              }
            ],
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
          AvailableAsStandalone: false,
          ProductPricingPlanAssociationExternalReferences: [],
          Duration: 1,
          DurationPeriodType: 2
        },
        GrossAmount: 0,
        TotalAmount: 0,
        PerItemGrossAmount: 0,
        PerItemTotalAmount: 0,
        BundleItemGrossAmount: 0,
        BundleItemTotalAmount: 0,
        DiscountStorefrontText: ''
      },
      OrderItemChangeType: null,
      OrderContractId: null,
      ExternalContractId: null,
      EligibleForBuyersRemorse: false
    },
    {
      Id: '172965',
      ProductId: 400349,
      PricingPlanId: 37288,
      OfferingId: '2011137828077000100',
      OfferingInstanceId: '2022743239116000400',
      OrderedOfferingId: '2011137828077000100',
      OrderedOfferingName: 'Mobil',
      OfferingOptionPriceId: '2011137828075000106',
      Quantity: 1,
      Details: {
        Product: {
          Id: 400349,
          Name: 'Mobil Voice',
          StructureType: 1,
          ImageUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          ThumbnailUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          ReferenceDate: '2019-10-17T11:48:43.727Z',
          IndexName: 'Mobil Voice',
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
          ProductId: 400349,
          AddDate: '2019-11-06T14:50:22.420Z',
          ModDate: '2020-05-28T14:44:23.867Z',
          Id: 37288,
          Name: 'Mobil Voice',
          PricingPlanName: 'Mobil Voice',
          ChargeAmount: 0,
          RenewalChargeAmount: 0,
          SecondaryRenewalAmount: 0,
          Currency: 'SEK',
          Type: 2,
          BillerRuleInstanceThumbnails: [
            {
              Id: 11335,
              Status: 2,
              Amount: 0,
              DiscountAmount: null,
              CurrencyCode: 'SEK',
              BillerRuleConfigurationId: '1930431539117000100',
              Name: 'Mobile Monthly Charge',
              Description: 'Mobile Monthly Charge',
              Type: 0,
              RecurringPeriodTypeCode: '3',
              Bulk: false,
              BulkChargeTypeCode: null,
              StartQuantity: null,
              EndQuantity: null,
              QuantityPricingTypeCode: 1,
              DefaultActivationStatus: 2,
              SubscriptionBillingCycle: null,
              InvoiceTiming: 1,
              DefaultTermLength: 0,
              FullUpfrontPayment: false
            },
            {
              Id: 11336,
              Status: 1,
              Amount: null,
              DiscountAmount: null,
              CurrencyCode: null,
              BillerRuleConfigurationId: '1923844943674000301',
              Name: 'Penny Voice',
              Description: 'Penny Voice',
              Type: 3,
              RecurringPeriodTypeCode: '99',
              Bulk: false,
              BulkChargeTypeCode: null,
              StartQuantity: null,
              EndQuantity: null,
              QuantityPricingTypeCode: 1,
              DefaultActivationStatus: 1,
              SubscriptionBillingCycle: null,
              InvoiceTiming: 1,
              DefaultTermLength: 0,
              FullUpfrontPayment: false
            },
            {
              Id: 11337,
              Status: 1,
              Amount: null,
              DiscountAmount: null,
              CurrencyCode: null,
              BillerRuleConfigurationId: '1931033417654000100',
              Name: 'First Use',
              Description: 'First Use Trigger',
              Type: 7,
              RecurringPeriodTypeCode: '99',
              Bulk: false,
              BulkChargeTypeCode: null,
              StartQuantity: null,
              EndQuantity: null,
              QuantityPricingTypeCode: 1,
              DefaultActivationStatus: 1,
              SubscriptionBillingCycle: null,
              InvoiceTiming: 1,
              DefaultTermLength: 0,
              FullUpfrontPayment: false
            }
          ],
          PricingPlanBillerRuleInstances: {
            ProductId: 400349,
            PricingPlanId: 37288,
            RecurringBillerRuleInstances: [
              {
                BillerRuleConfigurationId: '1930431539117000100',
                CurrencyCode: 'SEK',
                BillerRuleInstanceCharges: [
                  {
                    ChargeAmount: 0
                  }
                ],
                GuidanceCode: null,
                DefaultActivationStatus: 2,
                TaxAssociationCode: null,
                UseActiveQuantity: false,
                AllowChargeOverride: false,
                AdHoc: false,
                Credit: false,
                InvoiceProperties: {},
                QuantityPricingTypeCode: 1,
                RecurringPeriodType: 3,
                BillerRuleConfigurationChargeDetails: {
                  ChargeTiming: 4,
                  CycleLevel: 1,
                  TaxAssociationCode: 'Telephony Wireless Service',
                  TaxType: 1,
                  PaymentReservationRequired: false
                },
                BulkChargeTypeCode: null,
                Type: 0,
                Id: 11335,
                BillerRuleInstanceDiscounts: []
              }
            ],
            TriggerBillerRuleInstances: [
              {
                BillerRuleConfigurationId: '1931033417654000100',
                BillerRuleInstanceGuid: '6edbd2dc-b12d-45c2-8b50-19ad5ce79a3e',
                Name: 'Mobil First Use',
                DisplayName: 'Mobil First Use',
                Actions: [
                  {
                    BillerRuleConfigurationId: '1930431539117000100',
                    ActivationStatus: 3
                  },
                  {
                    BillerRuleConfigurationId: '1923844943674000301',
                    ActivationStatus: 3
                  }
                ],
                TriggerType: 2,
                Type: 7,
                Id: 11337
              }
            ],
            OneTimeBillerRuleInstances: [],
            UsageBillerRuleInstances: [],
            CustomBillerRuleInstances: [],
            EntitlementBillerRuleInstances: [
              {
                BillerRuleConfigurationId: '1923844943674000301',
                EntitlementName: 'Mobil Voice',
                EntitlementContextTypeCode: 1,
                UsageCost: 0,
                EntitlementGroups: [],
                Type: 3,
                Id: 11336,
                BillerRuleInstanceDiscounts: []
              }
            ],
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
          AvailableAsStandalone: false,
          ProductPricingPlanAssociationExternalReferences: [],
          Duration: 1,
          DurationPeriodType: 2
        },
        GrossAmount: 0,
        TotalAmount: 0,
        PerItemGrossAmount: 0,
        PerItemTotalAmount: 0,
        BundleItemGrossAmount: 0,
        BundleItemTotalAmount: 0,
        DiscountStorefrontText: ''
      },
      OrderItemChangeType: null,
      OrderContractId: null,
      ExternalContractId: null,
      EligibleForBuyersRemorse: false
    },
    {
      Id: '172966',
      ProductId: 400347,
      PricingPlanId: 37303,
      OfferingId: '2011137828077000100',
      OfferingInstanceId: '2022743239116000400',
      OrderedOfferingId: '2011137828077000100',
      OrderedOfferingName: 'Mobil',
      OfferingOptionPriceId: '2011137828075000103',
      Quantity: 1,
      Details: {
        Product: {
          Id: 400347,
          Name: 'Mobil Data',
          StructureType: 1,
          ImageUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          ThumbnailUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          ReferenceDate: '2019-10-17T11:33:21.030Z',
          ExternalReferences: [
            {
              Id: 50234,
              ExternalId: 'BenefitApplicability',
              Value: 'MOBILE'
            },
            {
              Id: 50244,
              ExternalId: 'GoogleTag',
              Value: 'MOBILE_DATA'
            }
          ],
          IndexName: 'Mobil Data',
          AllowMultiplePurchases: true,
          Standalone: true,
          LineOfBusiness: 10083,
          PageId: '1923844821809000200',
          Subscription: false,
          ProductClassification: 1,
          Services: [],
          MaxNonBulkQuantity: 50,
          MaxBulkQuantity: 30000,
          LineOfBusinessName: 'Wireless',
          Status: 1
        },
        PricingPlan: {
          ProductId: 400347,
          AddDate: '2019-11-06T17:33:27.673Z',
          ModDate: '2020-05-28T14:42:37.420Z',
          Id: 37303,
          Name: 'Mobil 3GB',
          PricingPlanName: 'Mobil 3GB',
          ChargeAmount: 0,
          RenewalChargeAmount: 0,
          SecondaryRenewalAmount: 0,
          Currency: 'SEK',
          Type: 2,
          BillerRuleInstanceThumbnails: [
            {
              Id: 11366,
              Status: 2,
              Amount: 99,
              DiscountAmount: null,
              CurrencyCode: 'SEK',
              BillerRuleConfigurationId: '1930431539117000100',
              Name: 'Mobile Monthly Charge',
              Description: 'Mobile Monthly Charge',
              Type: 0,
              RecurringPeriodTypeCode: '3',
              Bulk: false,
              BulkChargeTypeCode: null,
              StartQuantity: null,
              EndQuantity: null,
              QuantityPricingTypeCode: 1,
              DefaultActivationStatus: 2,
              SubscriptionBillingCycle: null,
              InvoiceTiming: 1,
              DefaultTermLength: 0,
              FullUpfrontPayment: false
            },
            {
              Id: 11367,
              Status: 1,
              Amount: null,
              DiscountAmount: null,
              CurrencyCode: null,
              BillerRuleConfigurationId: '1923844943659000302',
              Name: 'Penny Data',
              Description: 'Penny Data',
              Type: 3,
              RecurringPeriodTypeCode: '99',
              Bulk: false,
              BulkChargeTypeCode: null,
              StartQuantity: null,
              EndQuantity: null,
              QuantityPricingTypeCode: 1,
              DefaultActivationStatus: 1,
              SubscriptionBillingCycle: null,
              InvoiceTiming: 1,
              DefaultTermLength: 0,
              FullUpfrontPayment: false
            },
            {
              Id: 11368,
              Status: 1,
              Amount: null,
              DiscountAmount: null,
              CurrencyCode: null,
              BillerRuleConfigurationId: '1931033417654000100',
              Name: 'First Use',
              Description: 'First Use Trigger',
              Type: 7,
              RecurringPeriodTypeCode: '99',
              Bulk: false,
              BulkChargeTypeCode: null,
              StartQuantity: null,
              EndQuantity: null,
              QuantityPricingTypeCode: 1,
              DefaultActivationStatus: 1,
              SubscriptionBillingCycle: null,
              InvoiceTiming: 1,
              DefaultTermLength: 0,
              FullUpfrontPayment: false
            }
          ],
          PricingPlanBillerRuleInstances: {
            ProductId: 400347,
            PricingPlanId: 37303,
            RecurringBillerRuleInstances: [
              {
                BillerRuleConfigurationId: '1930431539117000100',
                CurrencyCode: 'SEK',
                BillerRuleInstanceCharges: [
                  {
                    ChargeAmount: 99
                  }
                ],
                GuidanceCode: null,
                DefaultActivationStatus: 2,
                TaxAssociationCode: null,
                UseActiveQuantity: false,
                AllowChargeOverride: false,
                AdHoc: false,
                Credit: false,
                InvoiceProperties: {},
                QuantityPricingTypeCode: 1,
                RecurringPeriodType: 3,
                BillerRuleConfigurationChargeDetails: {
                  ChargeTiming: 4,
                  CycleLevel: 1,
                  TaxAssociationCode: 'Telephony Wireless Service',
                  TaxType: 1,
                  PaymentReservationRequired: false
                },
                BulkChargeTypeCode: null,
                LocationCode: 1,
                Type: 0,
                Id: 11366,
                BillerRuleInstanceDiscounts: [
                  {
                    Added: '2020-01-09T12:56:23.437Z',
                    Modified: '2020-05-29T06:35:33.773Z',
                    Status: 1,
                    Id: 1664,
                    DiscountId: 2133,
                    IsDefault: true,
                    AllowDiscountOverride: false
                  }
                ]
              }
            ],
            TriggerBillerRuleInstances: [
              {
                BillerRuleConfigurationId: '1931033417654000100',
                BillerRuleInstanceGuid: '4dc08173-11db-457f-8447-c9b21a85a19b',
                Name: 'Mobil First Use',
                DisplayName: 'Mobil First Use',
                Actions: [
                  {
                    BillerRuleConfigurationId: '1930431539117000100',
                    ActivationStatus: 3
                  },
                  {
                    BillerRuleConfigurationId: '1923844943659000302',
                    ActivationStatus: 3
                  }
                ],
                TriggerType: 2,
                Type: 7,
                Id: 11368
              }
            ],
            OneTimeBillerRuleInstances: [],
            UsageBillerRuleInstances: [],
            CustomBillerRuleInstances: [],
            EntitlementBillerRuleInstances: [
              {
                BillerRuleConfigurationId: '1923844943659000302',
                EntitlementName: 'Mobil Data',
                EntitlementContextTypeCode: 1,
                UsageCost: 0,
                EntitlementGroups: [],
                Type: 3,
                Id: 11367,
                BillerRuleInstanceDiscounts: []
              }
            ],
            EarlyTerminationFeeBillerRuleInstances: [],
            FinanceBillerRuleInstances: [],
            SubscriptionBillerRuleInstances: []
          },
          Deposits: [],
          ServiceTiers: [
            {
              Id: 9518,
              ServiceTierId: 2658,
              ServiceTierName: 'Default',
              ServiceId: 2321,
              ServiceName: 'Penny Mobile Data'
            }
          ],
          TopDeliveryCapabilityId: 30475,
          HasConvergentBillerExtension: true,
          DeliveryCapabilityCodes: [
            30475
          ],
          AvailableWithinOffering: true,
          AvailableAsStandalone: false,
          ProductPricingPlanAssociationExternalReferences: [],
          Duration: 1,
          DurationPeriodType: 2
        },
        GrossAmount: 0,
        TotalAmount: 0,
        PerItemGrossAmount: 0,
        PerItemTotalAmount: 0,
        BundleItemGrossAmount: 0,
        BundleItemTotalAmount: 0,
        DiscountStorefrontText: ''
      },
      Discounts: [
        {
          DiscountId: 2133,
          BillerRuleConfigurationId: '1930431539117000100',
          Name: 'Kampanj Mobil 3GB (halva priset 4 mån)',
          Amount: 50,
          Type: 0,
          PeriodTypeCode: '3',
          AmountOverride: null,
          Status: 1
        }
      ],
      OrderItemChangeType: null,
      OrderContractId: null,
      ExternalContractId: null,
      EligibleForBuyersRemorse: false
    }
  ]
};
