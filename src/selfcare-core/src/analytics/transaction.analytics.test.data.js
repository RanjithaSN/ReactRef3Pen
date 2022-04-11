export const simpleItem = {
  Discounts: [
    {
      Discount: {
        Id: 2747,
        Name: 'Kampanj Mobil 15GB (halva priset 4 mån)',
        StorefrontText: 'Kampanj Mobil 15GB (halva priset 4 mån)',
        Type: 3,
        Amount: 100.0000,
        Currency: 'SEK',
        RenewalCount: 4
      },
      DiscountSource: 9,
      DiscountSourceName: 'Postpaid Biller Discount',
      BillerRuleConfigurationId: '1928453298482000100',
      AppliedOnThisOrder: true
    }
  ],
  InventoryItems: null,
  Id: '20470067',
  Product: {
    Id: 724307,
    Name: 'TEST Mobil Data',
    StructureType: 1,
    ImageUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
    ThumbnailUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
    ReferenceDate: '2020-01-17T15:47:34.090Z',
    ExternalReferences: [
      {
        Id: 50410,
        ExternalId: 'BenefitApplicability',
        Value: 'MOBILE'
      }
    ],
    IndexName: 'TEST Mobil Data',
    AllowMultiplePurchases: true,
    Standalone: true,
    LineOfBusiness: 10054,
    PageId: '1925940217946000300',
    Subscription: false,
    ProductClassification: 1,
    Services: [],
    MaxNonBulkQuantity: 50,
    MaxBulkQuantity: 30000,
    LineOfBusinessName: 'Wireless',
    Status: 1
  },
  PricingPlan: {
    ProductId: 724307,
    AddDate: '2020-01-21T19:01:01.690Z',
    ModDate: '2020-04-21T16:46:16.900Z',
    Id: 48165,
    Name: 'TEST Mobil 15GB',
    PricingPlanName: 'TEST Mobil 15GB',
    ChargeAmount: 0.0000,
    RenewalChargeAmount: 0.0000,
    SecondaryRenewalAmount: 0.0000,
    Currency: 'SEK',
    Type: 2,
    BillerRuleInstanceThumbnails: [
      {
        Id: 4960,
        Status: 1,
        Amount: null,
        CurrencyCode: null,
        BillerRuleConfigurationId: '1934951289535001100',
        Name: 'TEST Penny Data (Hourly)',
        Description: 'TEST Penny Data (Hourly)',
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
        Id: 4961,
        Status: 2,
        Amount: 199.0000,
        CurrencyCode: 'SEK',
        BillerRuleConfigurationId: '1928453298482000100',
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
        Id: 4962,
        Status: 1,
        Amount: null,
        CurrencyCode: null,
        BillerRuleConfigurationId: '1928956760311000100',
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
      ProductId: 0,
      PricingPlanId: 48165,
      RecurringBillerRuleInstances: [
        {
          BillerRuleConfigurationId: '1928453298482000100',
          CurrencyCode: 'SEK',
          BillerRuleInstanceCharges: [
            {
              ChargeAmount: 199.0000
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
          Id: 4961,
          BillerRuleInstanceDiscounts: [
            {
              Added: '2020-01-21T19:02:25.843Z',
              Modified: '2020-04-21T16:46:16.960Z',
              Status: 1,
              Id: 138,
              DiscountId: 2747,
              IsDefault: true,
              AllowDiscountOverride: false
            }
          ]
        }
      ],
      TriggerBillerRuleInstances: [
        {
          BillerRuleConfigurationId: '1928956760311000100',
          BillerRuleInstanceGuid: '4130e598-8bc0-4064-9a4f-c8675b6669a9',
          Name: 'Mobil First Use',
          DisplayName: 'Mobil First Use',
          Actions: [
            {
              BillerRuleConfigurationId: '1928453298482000100',
              ActivationStatus: 3
            },
            {
              BillerRuleConfigurationId: '1934951289535001100',
              ActivationStatus: 3
            }
          ],
          TriggerType: 2,
          Type: 7,
          Id: 4962
        }
      ],
      OneTimeBillerRuleInstances: [],
      UsageBillerRuleInstances: [],
      CustomBillerRuleInstances: [],
      EntitlementBillerRuleInstances: [
        {
          BillerRuleConfigurationId: '1934951289535001100',
          EntitlementName: 'Mobil Data',
          EntitlementContextTypeCode: 1,
          UsageCost: 0.00000000,
          EntitlementGroups: [],
          Type: 3,
          Id: 4960,
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
        Id: 4653,
        ServiceTierId: 501,
        ServiceTierName: 'Default',
        ServiceId: 204,
        ServiceName: 'Penny Mobile Data'
      }
    ],
    TopDeliveryCapabilityId: 30414,
    HasConvergentBillerExtension: true,
    DeliveryCapabilityCodes: [
      30414
    ],
    AvailableWithinOffering: true,
    AvailableAsStandalone: false,
    ProductPricingPlanAssociationExternalReferences: [],
    Duration: 3,
    DurationPeriodType: 0
  },
  Amount: 0.0000,
  ReturnAmount: 0.0000,
  Status: 1,
  StatusName: 'Active',
  OfferingId: '2002170290447001000',
  OfferingInstanceId: '2011954931516001200',
  OrderedOfferingId: '2002170290447001000',
  OfferingOptionPriceId: '2002170290447001002',
  OfferingName: 'TEST Mobil',
  OrderItemChangeType: 2,
  OrderContractInstanceId: null,
  OrderContractInstance: null,
  PurchaseOrderNumber: null,
  ServiceFeatureProductAssociation: null,
  AdHocOverrideDetails: null,
  BillerRuleConfigurationDetails: null,
  PortInRequest: null,
  IsBuyersRemorse: false,
  BillingEffectiveDateIntention: 1,
  Quantity: 1
};
export const multipleBillingChargesItem = {
  Discounts: [
    {
      Discount: {
        Id: 2747,
        Name: 'Kampanj Mobil 15GB (halva priset 4 mån)',
        StorefrontText: 'Kampanj Mobil 15GB (halva priset 4 mån)',
        Type: 3,
        Amount: 100.0000,
        Currency: 'SEK',
        RenewalCount: 4
      },
      DiscountSource: 9,
      DiscountSourceName: 'Postpaid Biller Discount',
      BillerRuleConfigurationId: '1928453298482000100',
      AppliedOnThisOrder: true
    }
  ],
  InventoryItems: null,
  Id: '20470067',
  Product: {
    Id: 724307,
    Name: 'TEST Mobil Data',
    StructureType: 1,
    ImageUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
    ThumbnailUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
    ReferenceDate: '2020-01-17T15:47:34.090Z',
    ExternalReferences: [
      {
        Id: 50410,
        ExternalId: 'BenefitApplicability',
        Value: 'MOBILE'
      }
    ],
    IndexName: 'TEST Mobil Data',
    AllowMultiplePurchases: true,
    Standalone: true,
    LineOfBusiness: 10054,
    PageId: '1925940217946000300',
    Subscription: false,
    ProductClassification: 1,
    Services: [],
    MaxNonBulkQuantity: 50,
    MaxBulkQuantity: 30000,
    LineOfBusinessName: 'Wireless',
    Status: 1
  },
  PricingPlan: {
    ProductId: 724307,
    AddDate: '2020-01-21T19:01:01.690Z',
    ModDate: '2020-04-21T16:46:16.900Z',
    Id: 48165,
    Name: 'TEST Mobil 15GB',
    PricingPlanName: 'TEST Mobil 15GB',
    ChargeAmount: 0.0000,
    RenewalChargeAmount: 0.0000,
    SecondaryRenewalAmount: 0.0000,
    Currency: 'SEK',
    Type: 2,
    BillerRuleInstanceThumbnails: [
      {
        Id: 4960,
        Status: 1,
        Amount: null,
        CurrencyCode: null,
        BillerRuleConfigurationId: '1934951289535001100',
        Name: 'TEST Penny Data (Hourly)',
        Description: 'TEST Penny Data (Hourly)',
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
        Id: 4961,
        Status: 2,
        Amount: 199.0000,
        CurrencyCode: 'SEK',
        BillerRuleConfigurationId: '1928453298482000100',
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
        Id: 4962,
        Status: 1,
        Amount: null,
        CurrencyCode: null,
        BillerRuleConfigurationId: '1928956760311000100',
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
      ProductId: 0,
      PricingPlanId: 48165,
      RecurringBillerRuleInstances: [
        {
          BillerRuleConfigurationId: '1928453298482000100',
          CurrencyCode: 'SEK',
          BillerRuleInstanceCharges: [
            {
              ChargeAmount: 199.0000
            },
            {
              ChargeAmount: 199.0000
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
          Id: 4961,
          BillerRuleInstanceDiscounts: [
            {
              Added: '2020-01-21T19:02:25.843Z',
              Modified: '2020-04-21T16:46:16.960Z',
              Status: 1,
              Id: 138,
              DiscountId: 2747,
              IsDefault: true,
              AllowDiscountOverride: false
            }
          ]
        },
        {
          BillerRuleConfigurationId: '1928453298482000100',
          CurrencyCode: 'SEK',
          BillerRuleInstanceCharges: [
            {
              ChargeAmount: 199.0000
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
          Id: 4961,
          BillerRuleInstanceDiscounts: [
            {
              Added: '2020-01-21T19:02:25.843Z',
              Modified: '2020-04-21T16:46:16.960Z',
              Status: 1,
              Id: 138,
              DiscountId: 2747,
              IsDefault: true,
              AllowDiscountOverride: false
            }
          ]
        }
      ],
      TriggerBillerRuleInstances: [
        {
          BillerRuleConfigurationId: '1928956760311000100',
          BillerRuleInstanceGuid: '4130e598-8bc0-4064-9a4f-c8675b6669a9',
          Name: 'Mobil First Use',
          DisplayName: 'Mobil First Use',
          Actions: [
            {
              BillerRuleConfigurationId: '1928453298482000100',
              ActivationStatus: 3
            },
            {
              BillerRuleConfigurationId: '1934951289535001100',
              ActivationStatus: 3
            }
          ],
          TriggerType: 2,
          Type: 7,
          Id: 4962
        }
      ],
      OneTimeBillerRuleInstances: [],
      UsageBillerRuleInstances: [],
      CustomBillerRuleInstances: [],
      EntitlementBillerRuleInstances: [
        {
          BillerRuleConfigurationId: '1934951289535001100',
          EntitlementName: 'Mobil Data',
          EntitlementContextTypeCode: 1,
          UsageCost: 0.00000000,
          EntitlementGroups: [],
          Type: 3,
          Id: 4960,
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
        Id: 4653,
        ServiceTierId: 501,
        ServiceTierName: 'Default',
        ServiceId: 204,
        ServiceName: 'Penny Mobile Data'
      }
    ],
    TopDeliveryCapabilityId: 30414,
    HasConvergentBillerExtension: true,
    DeliveryCapabilityCodes: [
      30414
    ],
    AvailableWithinOffering: true,
    AvailableAsStandalone: false,
    ProductPricingPlanAssociationExternalReferences: [],
    Duration: 3,
    DurationPeriodType: 0
  },
  Amount: 0.0000,
  ReturnAmount: 0.0000,
  Status: 1,
  StatusName: 'Active',
  OfferingId: '2002170290447001000',
  OfferingInstanceId: '2011954931516001200',
  OrderedOfferingId: '2002170290447001000',
  OfferingOptionPriceId: '2002170290447001002',
  OfferingName: 'TEST Mobil',
  OrderItemChangeType: 2,
  OrderContractInstanceId: null,
  OrderContractInstance: null,
  PurchaseOrderNumber: null,
  ServiceFeatureProductAssociation: null,
  AdHocOverrideDetails: null,
  BillerRuleConfigurationDetails: null,
  PortInRequest: null,
  IsBuyersRemorse: false,
  BillingEffectiveDateIntention: 1,
  Quantity: 1
};

export const multipleDiscountsItem = {
  Discounts: [
    {
      Discount: {
        Id: 2747,
        Name: 'Kampanj Mobil 15GB (halva priset 4 mån)',
        StorefrontText: 'Kampanj Mobil 15GB (halva priset 4 mån)',
        Type: 3,
        Amount: 100.0000,
        Currency: 'SEK',
        RenewalCount: 4
      },
      DiscountSource: 9,
      DiscountSourceName: 'Postpaid Biller Discount',
      BillerRuleConfigurationId: '1928453298482000100',
      AppliedOnThisOrder: true
    },
    {
      Discount: {
        Id: 2748,
        Name: 'Kampanj Mobil 15GB (halva priset 4 mån)',
        StorefrontText: 'Kampanj Mobil 15GB (halva priset 4 mån)',
        Type: 3,
        Amount: 50.0000,
        Currency: 'SEK',
        RenewalCount: 4
      },
      DiscountSource: 9,
      DiscountSourceName: 'Postpaid Biller Discount',
      BillerRuleConfigurationId: '1928453298482000100',
      AppliedOnThisOrder: true
    }
  ],
  InventoryItems: null,
  Id: '20470067',
  Product: {
    Id: 724307,
    Name: 'TEST Mobil Data',
    StructureType: 1,
    ImageUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
    ThumbnailUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
    ReferenceDate: '2020-01-17T15:47:34.090Z',
    ExternalReferences: [
      {
        Id: 50410,
        ExternalId: 'BenefitApplicability',
        Value: 'MOBILE'
      }
    ],
    IndexName: 'TEST Mobil Data',
    AllowMultiplePurchases: true,
    Standalone: true,
    LineOfBusiness: 10054,
    PageId: '1925940217946000300',
    Subscription: false,
    ProductClassification: 1,
    Services: [],
    MaxNonBulkQuantity: 50,
    MaxBulkQuantity: 30000,
    LineOfBusinessName: 'Wireless',
    Status: 1
  },
  PricingPlan: {
    ProductId: 724307,
    AddDate: '2020-01-21T19:01:01.690Z',
    ModDate: '2020-04-21T16:46:16.900Z',
    Id: 48165,
    Name: 'TEST Mobil 15GB',
    PricingPlanName: 'TEST Mobil 15GB',
    ChargeAmount: 0.0000,
    RenewalChargeAmount: 0.0000,
    SecondaryRenewalAmount: 0.0000,
    Currency: 'SEK',
    Type: 2,
    BillerRuleInstanceThumbnails: [
      {
        Id: 4960,
        Status: 1,
        Amount: null,
        CurrencyCode: null,
        BillerRuleConfigurationId: '1934951289535001100',
        Name: 'TEST Penny Data (Hourly)',
        Description: 'TEST Penny Data (Hourly)',
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
        Id: 4961,
        Status: 2,
        Amount: 199.0000,
        CurrencyCode: 'SEK',
        BillerRuleConfigurationId: '1928453298482000100',
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
        Id: 4962,
        Status: 1,
        Amount: null,
        CurrencyCode: null,
        BillerRuleConfigurationId: '1928956760311000100',
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
      ProductId: 0,
      PricingPlanId: 48165,
      RecurringBillerRuleInstances: [
        {
          BillerRuleConfigurationId: '1928453298482000100',
          CurrencyCode: 'SEK',
          BillerRuleInstanceCharges: [
            {
              ChargeAmount: 199.0000
            },
            {
              ChargeAmount: 199.0000
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
          Id: 4961,
          BillerRuleInstanceDiscounts: [
            {
              Added: '2020-01-21T19:02:25.843Z',
              Modified: '2020-04-21T16:46:16.960Z',
              Status: 1,
              Id: 138,
              DiscountId: 2747,
              IsDefault: true,
              AllowDiscountOverride: false
            }
          ]
        },
        {
          BillerRuleConfigurationId: '1928453298482000100',
          CurrencyCode: 'SEK',
          BillerRuleInstanceCharges: [
            {
              ChargeAmount: 199.0000
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
          Id: 4961,
          BillerRuleInstanceDiscounts: [
            {
              Added: '2020-01-21T19:02:25.843Z',
              Modified: '2020-04-21T16:46:16.960Z',
              Status: 1,
              Id: 139,
              DiscountId: 2748,
              IsDefault: true,
              AllowDiscountOverride: false
            }
          ]
        }
      ],
      TriggerBillerRuleInstances: [
        {
          BillerRuleConfigurationId: '1928956760311000100',
          BillerRuleInstanceGuid: '4130e598-8bc0-4064-9a4f-c8675b6669a9',
          Name: 'Mobil First Use',
          DisplayName: 'Mobil First Use',
          Actions: [
            {
              BillerRuleConfigurationId: '1928453298482000100',
              ActivationStatus: 3
            },
            {
              BillerRuleConfigurationId: '1934951289535001100',
              ActivationStatus: 3
            }
          ],
          TriggerType: 2,
          Type: 7,
          Id: 4962
        }
      ],
      OneTimeBillerRuleInstances: [],
      UsageBillerRuleInstances: [],
      CustomBillerRuleInstances: [],
      EntitlementBillerRuleInstances: [
        {
          BillerRuleConfigurationId: '1934951289535001100',
          EntitlementName: 'Mobil Data',
          EntitlementContextTypeCode: 1,
          UsageCost: 0.00000000,
          EntitlementGroups: [],
          Type: 3,
          Id: 4960,
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
        Id: 4653,
        ServiceTierId: 501,
        ServiceTierName: 'Default',
        ServiceId: 204,
        ServiceName: 'Penny Mobile Data'
      }
    ],
    TopDeliveryCapabilityId: 30414,
    HasConvergentBillerExtension: true,
    DeliveryCapabilityCodes: [
      30414
    ],
    AvailableWithinOffering: true,
    AvailableAsStandalone: false,
    ProductPricingPlanAssociationExternalReferences: [],
    Duration: 3,
    DurationPeriodType: 0
  },
  Amount: 0.0000,
  ReturnAmount: 0.0000,
  Status: 1,
  StatusName: 'Active',
  OfferingId: '2002170290447001000',
  OfferingInstanceId: '2011954931516001200',
  OrderedOfferingId: '2002170290447001000',
  OfferingOptionPriceId: '2002170290447001002',
  OfferingName: 'TEST Mobil',
  OrderItemChangeType: 2,
  OrderContractInstanceId: null,
  OrderContractInstance: null,
  PurchaseOrderNumber: null,
  ServiceFeatureProductAssociation: null,
  AdHocOverrideDetails: null,
  BillerRuleConfigurationDetails: null,
  PortInRequest: null,
  IsBuyersRemorse: false,
  BillingEffectiveDateIntention: 1,
  Quantity: 1
};

export const simpleOrder = {
  Id: '18274474',
  Version: 1,
  OrderNumber: '117994586',
  Type: 1,
  TypeName: 'New',
  OrderStatus: 1,
  OrderStatusName: 'Open',
  Ordered: '2020-05-06T15:50:39.653Z',
  Currency: 'SEK',
  DeviceType: 1,
  DeviceTypeName: 'Unknown',
  Country: 'SWE',
  SubmittedBy: '',
  Items: [{
    ServiceAttributeValues: [{
      Value: 'MOBILE',
      Editable: false,
      ServiceAttributeId: 1000163,
      ServiceId: 103,
      ServiceAttributeType: 0
    }, {
      Value: 'Nytt nummer',
      Editable: false,
      ServiceAttributeId: 1000144,
      ServiceId: 103,
      ServiceAttributeType: 0
    }, {
      Value: '46790770259',
      Editable: false,
      ServiceAttributeId: 1000145,
      ServiceId: 103,
      ServiceAttributeType: 0
    }, {
      Value: 'Nej',
      Editable: false,
      ServiceAttributeId: 1000157,
      ServiceId: 103,
      ServiceAttributeType: 0
    }],
    InventoryItems: [{
      ReservationId: null,
      Attributes: [],
      NetworkName: null,
      InventoryTypeId: '1925940572718000300',
      Make: null,
      MakeId: null,
      Model: null,
      ModelId: null,
      Status: 0,
      ExternalProviderStatus: null,
      InventoryCategory: 1,
      StoreId: null,
      InventoryInternalStatus: 1,
      InstanceId: '46790770259',
      InventoryStateId: 0,
      SerialNumber: '46790770259',
      IsPreferred: false
    }],
    Id: '20484607',
    Product: {
      Id: 716537,
      Name: 'Mobil Connection',
      StructureType: 1,
      ImageUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
      ThumbnailUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
      ReferenceDate: '2019-10-15T14:22:36.667Z',
      ExternalReferences: [{
        Id: 50410,
        ExternalId: 'BenefitApplicability',
        Value: 'MOBILE'
      }],
      IndexName: 'Mobil Connection',
      AllowMultiplePurchases: true,
      Standalone: true,
      LineOfBusiness: 10054,
      Subscription: false,
      ProductClassification: 1,
      Services: [],
      MaxNonBulkQuantity: 50,
      MaxBulkQuantity: 30000,
      LineOfBusinessName: 'Wireless',
      Status: 1
    },
    PricingPlan: {
      ProductId: 716537,
      AddDate: '2019-10-15T14:23:18.510Z',
      ModDate: '2019-11-06T13:39:59.637Z',
      Id: 46800,
      Name: 'Mobil Connection',
      PricingPlanName: 'Mobil Connection',
      ChargeAmount: 0,
      RenewalChargeAmount: 0,
      SecondaryRenewalAmount: 0,
      Currency: 'SEK',
      Type: 2,
      BillerRuleInstanceThumbnails: [{
        Id: 2898,
        Status: 1,
        Amount: 0,
        CurrencyCode: 'SEK',
        BillerRuleConfigurationId: '1928849992177000100',
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
      }],
      PricingPlanBillerRuleInstances: {
        ProductId: 0,
        PricingPlanId: 46800,
        RecurringBillerRuleInstances: [],
        TriggerBillerRuleInstances: [],
        OneTimeBillerRuleInstances: [{
          BillerRuleConfigurationId: '1928849992177000100',
          CurrencyCode: 'SEK',
          BillerRuleInstanceCharges: [{
            ChargeAmount: 0
          }],
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
          Id: 2898,
          BillerRuleInstanceDiscounts: []
        }],
        UsageBillerRuleInstances: [],
        CustomBillerRuleInstances: [],
        EntitlementBillerRuleInstances: [],
        EarlyTerminationFeeBillerRuleInstances: [],
        FinanceBillerRuleInstances: [],
        SubscriptionBillerRuleInstances: []
      },
      Deposits: [],
      ServiceTiers: [{
        Id: 1166,
        ServiceTierId: 258,
        ServiceTierName: 'Default',
        ServiceId: 103,
        ServiceName: 'Penny Mobile'
      }],
      TopDeliveryCapabilityId: 30414,
      HasConvergentBillerExtension: true,
      DeliveryCapabilityCodes: [30414],
      AvailableWithinOffering: true,
      AvailableAsStandalone: false,
      ProductPricingPlanAssociationExternalReferences: []
    },
    Amount: 0,
    ReturnAmount: 0,
    Status: 1,
    StatusName: 'Active',
    OfferingId: '2002170290447001000',
    OfferingInstanceId: '2012756995543001000',
    OrderedOfferingId: '2002170290447001000',
    OfferingOptionPriceId: '2002170290447001000',
    OfferingName: 'TEST Mobil',
    OrderItemChangeType: 2,
    OrderContractInstanceId: null,
    OrderContractInstance: null,
    PurchaseOrderNumber: null,
    ServiceFeatureProductAssociation: null,
    AdHocOverrideDetails: null,
    BillerRuleConfigurationDetails: null,
    PortInRequest: null,
    IsBuyersRemorse: false,
    BillingEffectiveDateIntention: 1
  }, {
    InventoryItems: null,
    Id: '20484608',
    Product: {
      Id: 717123,
      Name: 'Mobil SMS',
      StructureType: 1,
      ImageUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
      ThumbnailUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
      ReferenceDate: '2019-10-17T11:44:26.743Z',
      IndexName: 'Mobil SMS',
      AllowMultiplePurchases: true,
      Standalone: true,
      LineOfBusiness: 10054,
      Subscription: false,
      ProductClassification: 1,
      Services: [],
      MaxNonBulkQuantity: 50,
      MaxBulkQuantity: 30000,
      LineOfBusinessName: 'Wireless',
      Status: 1
    },
    PricingPlan: {
      ProductId: 717123,
      AddDate: '2019-10-18T15:40:13.167Z',
      ModDate: '2020-02-05T08:53:13.663Z',
      Id: 46995,
      Name: 'Mobil SMS',
      PricingPlanName: 'Mobil SMS',
      ChargeAmount: 0,
      RenewalChargeAmount: 0,
      SecondaryRenewalAmount: 0,
      Currency: 'SEK',
      Type: 2,
      BillerRuleInstanceThumbnails: [{
        Id: 2986,
        Status: 2,
        Amount: 0,
        CurrencyCode: 'SEK',
        BillerRuleConfigurationId: '1928453298482000100',
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
      }, {
        Id: 2988,
        Status: 1,
        Amount: null,
        CurrencyCode: null,
        BillerRuleConfigurationId: '1925941359269000300',
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
      }, {
        Id: 2989,
        Status: 1,
        Amount: null,
        CurrencyCode: null,
        BillerRuleConfigurationId: '1928956760311000100',
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
      }],
      PricingPlanBillerRuleInstances: {
        ProductId: 0,
        PricingPlanId: 46995,
        RecurringBillerRuleInstances: [{
          BillerRuleConfigurationId: '1928453298482000100',
          CurrencyCode: 'SEK',
          BillerRuleInstanceCharges: [{
            ChargeAmount: 0
          }],
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
          Id: 2986,
          BillerRuleInstanceDiscounts: []
        }],
        TriggerBillerRuleInstances: [{
          BillerRuleConfigurationId: '1928956760311000100',
          BillerRuleInstanceGuid: '156ced19-628e-4bed-ba44-9c65b9b0532e',
          Name: 'Mobil First Use',
          DisplayName: 'Mobil First Use',
          Actions: [{
            BillerRuleConfigurationId: '1928453298482000100',
            ActivationStatus: 3
          }, {
            BillerRuleConfigurationId: '1925941359269000300',
            ActivationStatus: 3
          }],
          TriggerType: 2,
          Type: 7,
          Id: 2989
        }],
        OneTimeBillerRuleInstances: [],
        UsageBillerRuleInstances: [],
        CustomBillerRuleInstances: [],
        EntitlementBillerRuleInstances: [{
          BillerRuleConfigurationId: '1925941359269000300',
          EntitlementName: 'Mobil SMS',
          EntitlementContextTypeCode: 1,
          UsageCost: 0,
          EntitlementGroups: [],
          Type: 3,
          Id: 2988,
          BillerRuleInstanceDiscounts: []
        }],
        EarlyTerminationFeeBillerRuleInstances: [],
        FinanceBillerRuleInstances: [],
        SubscriptionBillerRuleInstances: []
      },
      Deposits: [],
      ServiceTiers: [],
      TopDeliveryCapabilityId: 30414,
      HasConvergentBillerExtension: true,
      DeliveryCapabilityCodes: [30414],
      AvailableWithinOffering: true,
      AvailableAsStandalone: false,
      ProductPricingPlanAssociationExternalReferences: [],
      Duration: 1,
      DurationPeriodType: 3
    },
    Amount: 0,
    ReturnAmount: 0,
    Status: 1,
    StatusName: 'Active',
    OfferingId: '2002170290447001000',
    OfferingInstanceId: '2012756995543001000',
    OrderedOfferingId: '2002170290447001000',
    OfferingOptionPriceId: '2002170290447001009',
    OfferingName: 'TEST Mobil',
    OrderItemChangeType: 2,
    OrderContractInstanceId: null,
    OrderContractInstance: null,
    PurchaseOrderNumber: null,
    ServiceFeatureProductAssociation: null,
    AdHocOverrideDetails: null,
    BillerRuleConfigurationDetails: null,
    PortInRequest: null,
    IsBuyersRemorse: false,
    BillingEffectiveDateIntention: 1
  }, {
    InventoryItems: null,
    Id: '20484609',
    Product: {
      Id: 717124,
      Name: 'Mobil Voice',
      StructureType: 1,
      ImageUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
      ThumbnailUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
      ReferenceDate: '2019-10-17T11:48:43.727Z',
      IndexName: 'Mobil Voice',
      AllowMultiplePurchases: true,
      Standalone: true,
      LineOfBusiness: 10054,
      Subscription: false,
      ProductClassification: 1,
      Services: [],
      MaxNonBulkQuantity: 50,
      MaxBulkQuantity: 30000,
      LineOfBusinessName: 'Wireless',
      Status: 1
    },
    PricingPlan: {
      ProductId: 717124,
      AddDate: '2019-10-18T15:43:33.597Z',
      ModDate: '2020-02-05T08:52:55.020Z',
      Id: 46996,
      Name: 'Mobil Voice',
      PricingPlanName: 'Mobil Voice',
      ChargeAmount: 0,
      RenewalChargeAmount: 0,
      SecondaryRenewalAmount: 0,
      Currency: 'SEK',
      Type: 2,
      BillerRuleInstanceThumbnails: [{
        Id: 2991,
        Status: 2,
        Amount: 0,
        CurrencyCode: 'SEK',
        BillerRuleConfigurationId: '1928453298482000100',
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
      }, {
        Id: 2992,
        Status: 1,
        Amount: null,
        CurrencyCode: null,
        BillerRuleConfigurationId: '1925941359269000301',
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
      }, {
        Id: 2993,
        Status: 1,
        Amount: null,
        CurrencyCode: null,
        BillerRuleConfigurationId: '1928956760311000100',
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
      }],
      PricingPlanBillerRuleInstances: {
        ProductId: 0,
        PricingPlanId: 46996,
        RecurringBillerRuleInstances: [{
          BillerRuleConfigurationId: '1928453298482000100',
          CurrencyCode: 'SEK',
          BillerRuleInstanceCharges: [{
            ChargeAmount: 0
          }],
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
          Id: 2991,
          BillerRuleInstanceDiscounts: []
        }],
        TriggerBillerRuleInstances: [{
          BillerRuleConfigurationId: '1928956760311000100',
          BillerRuleInstanceGuid: '1b250d4b-f101-46ec-9ad1-e37efb2a5bf1',
          Name: 'Mobil First Use',
          DisplayName: 'Mobil First Use',
          Actions: [{
            BillerRuleConfigurationId: '1928453298482000100',
            ActivationStatus: 3
          }, {
            BillerRuleConfigurationId: '1925941359269000301',
            ActivationStatus: 3
          }],
          TriggerType: 2,
          Type: 7,
          Id: 2993
        }],
        OneTimeBillerRuleInstances: [],
        UsageBillerRuleInstances: [],
        CustomBillerRuleInstances: [],
        EntitlementBillerRuleInstances: [{
          BillerRuleConfigurationId: '1925941359269000301',
          EntitlementName: 'Mobil Voice',
          EntitlementContextTypeCode: 1,
          UsageCost: 0,
          EntitlementGroups: [],
          Type: 3,
          Id: 2992,
          BillerRuleInstanceDiscounts: []
        }],
        EarlyTerminationFeeBillerRuleInstances: [],
        FinanceBillerRuleInstances: [],
        SubscriptionBillerRuleInstances: []
      },
      Deposits: [],
      ServiceTiers: [],
      TopDeliveryCapabilityId: 30414,
      HasConvergentBillerExtension: true,
      DeliveryCapabilityCodes: [30414],
      AvailableWithinOffering: true,
      AvailableAsStandalone: false,
      ProductPricingPlanAssociationExternalReferences: [],
      Duration: 1,
      DurationPeriodType: 3
    },
    Amount: 0,
    ReturnAmount: 0,
    Status: 1,
    StatusName: 'Active',
    OfferingId: '2002170290447001000',
    OfferingInstanceId: '2012756995543001000',
    OrderedOfferingId: '2002170290447001000',
    OfferingOptionPriceId: '2002170290447001010',
    OfferingName: 'TEST Mobil',
    OrderItemChangeType: 2,
    OrderContractInstanceId: null,
    OrderContractInstance: null,
    PurchaseOrderNumber: null,
    ServiceFeatureProductAssociation: null,
    AdHocOverrideDetails: null,
    BillerRuleConfigurationDetails: null,
    PortInRequest: null,
    IsBuyersRemorse: false,
    BillingEffectiveDateIntention: 1
  }, {
    Discounts: [{
      Discount: {
        Id: 2745,
        Name: 'Kampanj Mobil 3GB (halva priset 4 mån)',
        StorefrontText: 'Kampanj Mobil 3GB (halva priset 4 mån)',
        Type: 3,
        Amount: 50,
        Currency: 'SEK',
        RenewalCount: 4
      },
      DiscountSource: 9,
      DiscountSourceName: 'Postpaid Biller Discount',
      BillerRuleConfigurationId: '1928453298482000100',
      AppliedOnThisOrder: true
    }],
    InventoryItems: null,
    Id: '20484610',
    Product: {
      Id: 724307,
      Name: 'TEST Mobil Data',
      StructureType: 1,
      ImageUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
      ThumbnailUrl: 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
      ReferenceDate: '2020-01-17T15:47:34.090Z',
      ExternalReferences: [{
        Id: 50410,
        ExternalId: 'BenefitApplicability',
        Value: 'MOBILE'
      }],
      IndexName: 'TEST Mobil Data',
      AllowMultiplePurchases: true,
      Standalone: true,
      LineOfBusiness: 10054,
      PageId: '1925940217946000300',
      Subscription: false,
      ProductClassification: 1,
      Services: [],
      MaxNonBulkQuantity: 50,
      MaxBulkQuantity: 30000,
      LineOfBusinessName: 'Wireless',
      Status: 1
    },
    PricingPlan: {
      ProductId: 724307,
      AddDate: '2020-01-21T18:57:05.563Z',
      ModDate: '2020-04-23T14:05:46.527Z',
      Id: 48164,
      Name: 'TEST Mobil 3GB',
      PricingPlanName: 'TEST Mobil 3GB',
      ChargeAmount: 0,
      RenewalChargeAmount: 0,
      SecondaryRenewalAmount: 0,
      Currency: 'SEK',
      Type: 2,
      BillerRuleInstanceThumbnails: [{
        Id: 4957,
        Status: 1,
        Amount: null,
        CurrencyCode: null,
        BillerRuleConfigurationId: '1934951289535001100',
        Name: 'TEST Penny Data (Hourly)',
        Description: 'TEST Penny Data (Hourly)',
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
      }, {
        Id: 4958,
        Status: 2,
        Amount: 99,
        CurrencyCode: 'SEK',
        BillerRuleConfigurationId: '1928453298482000100',
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
      }, {
        Id: 4959,
        Status: 1,
        Amount: null,
        CurrencyCode: null,
        BillerRuleConfigurationId: '1928956760311000100',
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
      }],
      PricingPlanBillerRuleInstances: {
        ProductId: 0,
        PricingPlanId: 48164,
        RecurringBillerRuleInstances: [{
          BillerRuleConfigurationId: '1928453298482000100',
          CurrencyCode: 'SEK',
          BillerRuleInstanceCharges: [{
            ChargeAmount: 99
          }],
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
          Id: 4958,
          BillerRuleInstanceDiscounts: [{
            Added: '2020-01-21T18:58:26.473Z',
            Modified: '2020-04-23T14:07:27.817Z',
            Status: 1,
            Id: 137,
            DiscountId: 2745,
            IsDefault: true,
            AllowDiscountOverride: false
          }]
        }],
        TriggerBillerRuleInstances: [{
          BillerRuleConfigurationId: '1928956760311000100',
          BillerRuleInstanceGuid: '41518aca-1a96-433e-9801-80a36e424180',
          Name: 'Mobil First Use',
          DisplayName: 'Mobil First Use',
          Actions: [{
            BillerRuleConfigurationId: '1928453298482000100',
            ActivationStatus: 3
          }, {
            BillerRuleConfigurationId: '1934951289535001100',
            ActivationStatus: 3
          }],
          TriggerType: 2,
          Type: 7,
          Id: 4959
        }],
        OneTimeBillerRuleInstances: [],
        UsageBillerRuleInstances: [],
        CustomBillerRuleInstances: [],
        EntitlementBillerRuleInstances: [{
          BillerRuleConfigurationId: '1934951289535001100',
          EntitlementName: 'Mobil Data',
          EntitlementContextTypeCode: 1,
          UsageCost: 0,
          EntitlementGroups: [],
          Type: 3,
          Id: 4957,
          BillerRuleInstanceDiscounts: []
        }],
        EarlyTerminationFeeBillerRuleInstances: [],
        FinanceBillerRuleInstances: [],
        SubscriptionBillerRuleInstances: []
      },
      Deposits: [],
      ServiceTiers: [{
        Id: 4704,
        ServiceTierId: 501,
        ServiceTierName: 'Default',
        ServiceId: 204,
        ServiceName: 'Penny Mobile Data'
      }],
      TopDeliveryCapabilityId: 30414,
      HasConvergentBillerExtension: true,
      DeliveryCapabilityCodes: [30414],
      AvailableWithinOffering: true,
      AvailableAsStandalone: false,
      ProductPricingPlanAssociationExternalReferences: [],
      Duration: 1,
      DurationPeriodType: 3
    },
    Amount: 0,
    ReturnAmount: 0,
    Status: 1,
    StatusName: 'Active',
    OfferingId: '2002170290447001000',
    OfferingInstanceId: '2012756995543001000',
    OrderedOfferingId: '2002170290447001000',
    OfferingOptionPriceId: '2002170290447001003',
    OfferingName: 'TEST Mobil',
    OrderItemChangeType: 2,
    OrderContractInstanceId: null,
    OrderContractInstance: null,
    PurchaseOrderNumber: null,
    ServiceFeatureProductAssociation: null,
    AdHocOverrideDetails: null,
    BillerRuleConfigurationDetails: null,
    PortInRequest: null,
    IsBuyersRemorse: false,
    BillingEffectiveDateIntention: 1
  }],
  PaymentInstruments: [{
    PaymentInstrument: {
      Id: 950270,
      Type: 4,
      Name: 'mc - 0009',
      Default: true,
      Created: '2019-12-15T18:15:23.550Z',
      ExternalBill: {
        AccountNumber: '************4259',
        Type: 10111,
        NameOnAccount: 'Checkout Shopper PlaceHolder',
        ExternalBillData: '6DbiYDd6o1zJmfnpgUUMoPmLD54z703YbZPl1aYYNcs=',
        ExpirationMonth: '10',
        ExpirationYear: '2020'
      },
      ConvergentBillerPaymentInstrumentAccounts: []
    },
    PaymentStatus: 1,
    PaymentStatusName: 'Complete'
  }],
  DiscountName: '',
  BillCycleName: 'Penny Monthly Bill Cycle',
  OrderQualificationType: 1,
  Totals: {
    GrossAmount: 0,
    DiscountAmount: 0,
    SubTotalAmount: 0,
    TaxAmount: 0,
    TotalAmount: 0,
    ReturnAmount: 0,
    TotalReturnAmount: 0,
    NetTotalAmount: 0
  }
};
