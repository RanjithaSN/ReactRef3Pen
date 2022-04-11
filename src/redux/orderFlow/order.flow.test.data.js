export const customOfferingContext = {
  RemoveItems: [],
  InvalidInventoryItemReservations: [],
  PurchaseOrderNumberHistory: [],
  Context: {
    OfferingIds: [
      '1804379150946001500'
    ],
    NonQualifiedProductIds: [],
    NonQualifiedPricingPlanIds: [],
    Prepaid: true,
    Pages: [{
      Id: '1607107734677000200',
      PageNumber: 1,
      Name: 'Primary Package'
    },
    {
      Id: '1607107734755000202',
      PageNumber: 2,
      Name: 'Add-ons'
    }
    ],
    Decisions: [{
      Id: '1_1804380804827001500',
      DecisionType: 1,
      Name: 'Vue Ultra',
      Description: 'Introducing the Ultra TV experience, with premium networks HBO® and SHOWTIME® included. With 90+ networks to enjoy, this plan has something for everyone.',
      PageId: '1607107734677000200',
      DisplayOrder: 2147483647,
      Options: [{
        Id: '1804380804827001500',
        Name: 'Vue Ultra',
        Selected: true,
        Description: 'Introducing the Ultra TV experience, with premium networks HBO® and SHOWTIME® included. With 90+ networks to enjoy, this plan has something for everyone',
        Quantity: 1,
        Amount: 74.9900,
        BillerRuleInstanceAmounts: [{
          Amount: 74.9900,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1618249947913000400',
          Name: 'Prepaid Monthly Video',
          Description: 'Prepaid Monthly Video',
          Type: 0,
          BulkChargeTypeCode: null,
          TermAmount: null
        }],
        BillerRuleInstanceThumbnails: [],
        BulkDetails: [],
        Deposits: [],
        DiscountAmount: 0.0,
        Bulk: false,
        HasServiceIdentifier: false,
        Items: [{
          DecisionGroupOptionItemId: '1804380804827001500',
          ProductName: 'Vue Ultra',
          PricingPlanName: 'Vue Ultra Monthly',
          MinimumQuantity: 1,
          MaximumQuantity: 1,
          DefaultQuantity: 1,
          Quantity: 1,
          Amount: 74.9900,
          BillerRuleInstanceAmounts: [{
            Amount: 74.9900,
            CurrencyCode: 'USD',
            BillerRuleConfigurationId: '1618249947913000400',
            Name: 'Prepaid Monthly Video',
            Description: 'Prepaid Monthly Video',
            Type: 0,
            BulkChargeTypeCode: null,
            TermAmount: null
          }],
          BillerRuleInstanceThumbnails: [{
            Id: 2031,
            Amount: 74.9900,
            DiscountAmount: null,
            CurrencyCode: 'USD',
            BillerRuleConfigurationId: '1618249947913000400',
            Name: 'Prepaid Monthly Video',
            Description: 'Prepaid Monthly Video',
            Type: 0,
            RecurringPeriodTypeCode: '3',
            Bulk: false,
            BulkChargeTypeCode: null,
            StartQuantity: null,
            EndQuantity: null,
            QuantityPricingTypeCode: 1,
            DefaultActivationStatus: 1,
            SubscriptionBillingCycle: null,
            InvoiceTiming: 1
          }],
          PricingPlanBillerRuleInstances: {
            ProductId: 0,
            PricingPlanId: 33409,
            RecurringBillerRuleInstances: [{
              BillerRuleConfigurationId: '1618249947913000400',
              BillerRuleInstanceCharges: [{
                ChargeAmount: 74.9900
              }],
              GuidanceCode: null,
              TaxAssociationCode: null,
              TaxType: 0,
              BulkChargeTypeCode: 0,
              QuantityPricingTypeCode: 0,
              DefaultActivationStatus: 1,
              UseActiveQuantity: false,
              AllowChargeOverride: false,
              AdHoc: false,
              Credit: false,
              Id: 2031,
              BillerRuleInstanceDiscounts: []
            }],
            TriggerBillerRuleInstances: [],
            OneTimeBillerRuleInstances: [],
            UsageBillerRuleInstances: [],
            CustomBillerRuleInstances: [],
            EntitlementBillerRuleInstances: [],
            EarlyTerminationFeeBillerRuleInstances: [],
            FinanceBillerRuleInstances: []
          },
          BulkDetails: [],
          Deposits: [],
          DiscountAmount: 0.0,
          Bulk: false
        }]
      },
      {
        Id: '1804380804827001501',
        Name: 'Epix Included',
        Quantity: null,
        Amount: 0.0100,
        BillerRuleInstanceAmounts: [{
          Amount: 0.0100,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1618249947913000400',
          Name: 'Prepaid Monthly Video',
          Description: 'Prepaid Monthly Video',
          Type: 0,
          BulkChargeTypeCode: null,
          TermAmount: null
        }],
        BillerRuleInstanceThumbnails: [],
        BulkDetails: [],
        Deposits: [],
        DiscountAmount: 0.0,
        Bulk: false,
        HasServiceIdentifier: false,
        Items: [{
          DecisionGroupOptionItemId: '1804380804827001501',
          ProductName: 'Epix',
          PricingPlanName: 'Epix Monthly Included with Elite/Ultra',
          MinimumQuantity: 1,
          MaximumQuantity: 1,
          DefaultQuantity: 1,
          Quantity: 1,
          Amount: 0.0100,
          BillerRuleInstanceAmounts: [{
            Amount: 0.0100,
            CurrencyCode: 'USD',
            BillerRuleConfigurationId: '1618249947913000400',
            Name: 'Prepaid Monthly Video',
            Description: 'Prepaid Monthly Video',
            Type: 0,
            BulkChargeTypeCode: null,
            TermAmount: null
          }],
          BillerRuleInstanceThumbnails: [{
            Id: 2034,
            Amount: 0.0100,
            DiscountAmount: null,
            CurrencyCode: 'USD',
            BillerRuleConfigurationId: '1618249947913000400',
            Name: 'Prepaid Monthly Video',
            Description: 'Prepaid Monthly Video',
            Type: 0,
            RecurringPeriodTypeCode: '3',
            Bulk: false,
            BulkChargeTypeCode: null,
            StartQuantity: null,
            EndQuantity: null,
            QuantityPricingTypeCode: 1,
            DefaultActivationStatus: 1,
            SubscriptionBillingCycle: null,
            InvoiceTiming: 1
          }],
          PricingPlanBillerRuleInstances: {
            ProductId: 0,
            PricingPlanId: 33412,
            RecurringBillerRuleInstances: [{
              BillerRuleConfigurationId: '1618249947913000400',
              BillerRuleInstanceCharges: [{
                ChargeAmount: 0.0100
              }],
              GuidanceCode: null,
              TaxAssociationCode: null,
              TaxType: 0,
              BulkChargeTypeCode: 0,
              QuantityPricingTypeCode: 0,
              DefaultActivationStatus: 1,
              UseActiveQuantity: false,
              AllowChargeOverride: false,
              AdHoc: false,
              Credit: false,
              Id: 2034,
              BillerRuleInstanceDiscounts: []
            }],
            TriggerBillerRuleInstances: [],
            OneTimeBillerRuleInstances: [],
            UsageBillerRuleInstances: [],
            CustomBillerRuleInstances: [],
            EntitlementBillerRuleInstances: [],
            EarlyTerminationFeeBillerRuleInstances: [],
            FinanceBillerRuleInstances: []
          },
          BulkDetails: [],
          Deposits: [],
          DiscountAmount: 0.0,
          Bulk: false
        }]
      },
      {
        Id: '1804380804827001502',
        Name: 'HBO Included',
        Quantity: null,
        Amount: 0.0100,
        BillerRuleInstanceAmounts: [{
          Amount: 0.0100,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1618249947913000400',
          Name: 'Prepaid Monthly Video',
          Description: 'Prepaid Monthly Video',
          Type: 0,
          BulkChargeTypeCode: null,
          TermAmount: null
        }],
        BillerRuleInstanceThumbnails: [],
        BulkDetails: [],
        Deposits: [],
        DiscountAmount: 0.0,
        Bulk: false,
        HasServiceIdentifier: false,
        Items: [{
          DecisionGroupOptionItemId: '1804380804827001502',
          ProductName: 'HBO (Vue)',
          PricingPlanName: 'HBO Monthly Included in Ultra',
          MinimumQuantity: 1,
          MaximumQuantity: 1,
          DefaultQuantity: 1,
          Quantity: 1,
          Amount: 0.0100,
          BillerRuleInstanceAmounts: [{
            Amount: 0.0100,
            CurrencyCode: 'USD',
            BillerRuleConfigurationId: '1618249947913000400',
            Name: 'Prepaid Monthly Video',
            Description: 'Prepaid Monthly Video',
            Type: 0,
            BulkChargeTypeCode: null,
            TermAmount: null
          }],
          BillerRuleInstanceThumbnails: [{
            Id: 2035,
            Amount: 0.0100,
            DiscountAmount: null,
            CurrencyCode: 'USD',
            BillerRuleConfigurationId: '1618249947913000400',
            Name: 'Prepaid Monthly Video',
            Description: 'Prepaid Monthly Video',
            Type: 0,
            RecurringPeriodTypeCode: '3',
            Bulk: false,
            BulkChargeTypeCode: null,
            StartQuantity: null,
            EndQuantity: null,
            QuantityPricingTypeCode: 1,
            DefaultActivationStatus: 1,
            SubscriptionBillingCycle: null,
            InvoiceTiming: 1
          }],
          PricingPlanBillerRuleInstances: {
            ProductId: 0,
            PricingPlanId: 33413,
            RecurringBillerRuleInstances: [{
              BillerRuleConfigurationId: '1618249947913000400',
              BillerRuleInstanceCharges: [{
                ChargeAmount: 0.0100
              }],
              GuidanceCode: null,
              TaxAssociationCode: null,
              TaxType: 0,
              BulkChargeTypeCode: 0,
              QuantityPricingTypeCode: 0,
              DefaultActivationStatus: 1,
              UseActiveQuantity: false,
              AllowChargeOverride: false,
              AdHoc: false,
              Credit: false,
              Id: 2035,
              BillerRuleInstanceDiscounts: []
            }],
            TriggerBillerRuleInstances: [],
            OneTimeBillerRuleInstances: [],
            UsageBillerRuleInstances: [],
            CustomBillerRuleInstances: [],
            EntitlementBillerRuleInstances: [],
            EarlyTerminationFeeBillerRuleInstances: [],
            FinanceBillerRuleInstances: []
          },
          BulkDetails: [],
          Deposits: [],
          DiscountAmount: 0.0,
          Bulk: false
        }]
      },
      {
        Id: '1804380804827001503',
        Name: 'Showtime Included',
        Quantity: null,
        Amount: 0.0100,
        BillerRuleInstanceAmounts: [{
          Amount: 0.0100,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1618249947913000400',
          Name: 'Prepaid Monthly Video',
          Description: 'Prepaid Monthly Video',
          Type: 0,
          BulkChargeTypeCode: null,
          TermAmount: null
        }],
        BillerRuleInstanceThumbnails: [],
        BulkDetails: [],
        Deposits: [],
        DiscountAmount: 0.0,
        Bulk: false,
        HasServiceIdentifier: false,
        Items: [{
          DecisionGroupOptionItemId: '1804380804827001503',
          ProductName: 'Showtime',
          PricingPlanName: 'Showtime Monthly Included in Ultra',
          MinimumQuantity: 1,
          MaximumQuantity: 1,
          DefaultQuantity: 1,
          Quantity: 1,
          Amount: 0.0100,
          BillerRuleInstanceAmounts: [{
            Amount: 0.0100,
            CurrencyCode: 'USD',
            BillerRuleConfigurationId: '1618249947913000400',
            Name: 'Prepaid Monthly Video',
            Description: 'Prepaid Monthly Video',
            Type: 0,
            BulkChargeTypeCode: null,
            TermAmount: null
          }],
          BillerRuleInstanceThumbnails: [{
            Id: 2036,
            Amount: 0.0100,
            DiscountAmount: null,
            CurrencyCode: 'USD',
            BillerRuleConfigurationId: '1618249947913000400',
            Name: 'Prepaid Monthly Video',
            Description: 'Prepaid Monthly Video',
            Type: 0,
            RecurringPeriodTypeCode: '3',
            Bulk: false,
            BulkChargeTypeCode: null,
            StartQuantity: null,
            EndQuantity: null,
            QuantityPricingTypeCode: 1,
            DefaultActivationStatus: 1,
            SubscriptionBillingCycle: null,
            InvoiceTiming: 1
          }],
          PricingPlanBillerRuleInstances: {
            ProductId: 0,
            PricingPlanId: 33414,
            RecurringBillerRuleInstances: [{
              BillerRuleConfigurationId: '1618249947913000400',
              BillerRuleInstanceCharges: [{
                ChargeAmount: 0.0100
              }],
              GuidanceCode: null,
              TaxAssociationCode: null,
              TaxType: 0,
              BulkChargeTypeCode: 0,
              QuantityPricingTypeCode: 0,
              DefaultActivationStatus: 1,
              UseActiveQuantity: false,
              AllowChargeOverride: false,
              AdHoc: false,
              Credit: false,
              Id: 2036,
              BillerRuleInstanceDiscounts: []
            }],
            TriggerBillerRuleInstances: [],
            OneTimeBillerRuleInstances: [],
            UsageBillerRuleInstances: [],
            CustomBillerRuleInstances: [],
            EntitlementBillerRuleInstances: [],
            EarlyTerminationFeeBillerRuleInstances: [],
            FinanceBillerRuleInstances: []
          },
          BulkDetails: [],
          Deposits: [],
          DiscountAmount: 0.0,
          Bulk: false
        }]
      }
      ],
      NextDecisionId: '1_1804380804827001501',
      MinimumQuantity: 1,
      MaximumQuantity: 4,
      RemainingOrderableQuantity: 0
    },
    {
      Id: '1_1804380804827001501',
      DecisionType: 1,
      Name: 'Add-on Packages',
      Description: 'Get more from your multi-channel plan by adding on select channels and bundles.',
      PageId: '1607107734755000202',
      DisplayOrder: 2147483647,
      Options: [{
        Id: '1804380804827001504',
        Name: 'Sports Pack',
        Selected: true,
        Description: 'Requires Core, Elite or Ultra Plan',
        Quantity: 1,
        Amount: 10.0000,
        BillerRuleInstanceAmounts: [{
          Amount: 10.0000,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1618249947913000400',
          Name: 'Prepaid Monthly Video',
          Description: 'Prepaid Monthly Video',
          Type: 0,
          BulkChargeTypeCode: null,
          TermAmount: null
        }],
        BillerRuleInstanceThumbnails: [],
        BulkDetails: [],
        Deposits: [],
        DiscountAmount: 0.0,
        Bulk: false,
        HasServiceIdentifier: false,
        Items: [{
          DecisionGroupOptionItemId: '1804380804827001504',
          ProductName: 'Sports Pack',
          PricingPlanName: 'Sports Pack Monthly',
          MinimumQuantity: 1,
          MaximumQuantity: 1,
          DefaultQuantity: 1,
          Quantity: 1,
          Amount: 10.0000,
          BillerRuleInstanceAmounts: [{
            Amount: 10.0000,
            CurrencyCode: 'USD',
            BillerRuleConfigurationId: '1618249947913000400',
            Name: 'Prepaid Monthly Video',
            Description: 'Prepaid Monthly Video',
            Type: 0,
            BulkChargeTypeCode: null,
            TermAmount: null
          }],
          BillerRuleInstanceThumbnails: [{
            Id: 2025,
            Amount: 10.0000,
            DiscountAmount: null,
            CurrencyCode: 'USD',
            BillerRuleConfigurationId: '1618249947913000400',
            Name: 'Prepaid Monthly Video',
            Description: 'Prepaid Monthly Video',
            Type: 0,
            RecurringPeriodTypeCode: '3',
            Bulk: false,
            BulkChargeTypeCode: null,
            StartQuantity: null,
            EndQuantity: null,
            QuantityPricingTypeCode: 1,
            DefaultActivationStatus: 1,
            SubscriptionBillingCycle: null,
            InvoiceTiming: 1
          }],
          PricingPlanBillerRuleInstances: {
            ProductId: 0,
            PricingPlanId: 33404,
            RecurringBillerRuleInstances: [{
              BillerRuleConfigurationId: '1618249947913000400',
              BillerRuleInstanceCharges: [{
                ChargeAmount: 10.0000
              }],
              GuidanceCode: null,
              TaxAssociationCode: null,
              TaxType: 0,
              BulkChargeTypeCode: 0,
              QuantityPricingTypeCode: 0,
              DefaultActivationStatus: 1,
              UseActiveQuantity: false,
              AllowChargeOverride: false,
              AdHoc: false,
              Credit: false,
              Id: 2025,
              BillerRuleInstanceDiscounts: []
            }],
            TriggerBillerRuleInstances: [],
            OneTimeBillerRuleInstances: [],
            UsageBillerRuleInstances: [],
            CustomBillerRuleInstances: [],
            EntitlementBillerRuleInstances: [],
            EarlyTerminationFeeBillerRuleInstances: [],
            FinanceBillerRuleInstances: []
          },
          BulkDetails: [],
          Deposits: [],
          DiscountAmount: 0.0,
          Bulk: false
        }]
      },
      {
        Id: '1804380877678001500',
        Name: 'Espanol Pack',
        Quantity: null,
        Amount: 3.9900,
        BillerRuleInstanceAmounts: [{
          Amount: 3.9900,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1618249947913000400',
          Name: 'Prepaid Monthly Video',
          Description: 'Prepaid Monthly Video',
          Type: 0,
          BulkChargeTypeCode: null,
          TermAmount: null
        }],
        BillerRuleInstanceThumbnails: [],
        BulkDetails: [],
        Deposits: [],
        DiscountAmount: 0.0,
        Bulk: false,
        HasServiceIdentifier: false,
        Items: [{
          DecisionGroupOptionItemId: '1804380877678001500',
          ProductName: 'Espanol Pack',
          PricingPlanName: 'Espanol Pack',
          MinimumQuantity: 1,
          MaximumQuantity: 1,
          DefaultQuantity: 1,
          Quantity: 1,
          Amount: 3.9900,
          BillerRuleInstanceAmounts: [{
            Amount: 3.9900,
            CurrencyCode: 'USD',
            BillerRuleConfigurationId: '1618249947913000400',
            Name: 'Prepaid Monthly Video',
            Description: 'Prepaid Monthly Video',
            Type: 0,
            BulkChargeTypeCode: null,
            TermAmount: null
          }],
          BillerRuleInstanceThumbnails: [{
            Id: 2027,
            Amount: 3.9900,
            DiscountAmount: null,
            CurrencyCode: 'USD',
            BillerRuleConfigurationId: '1618249947913000400',
            Name: 'Prepaid Monthly Video',
            Description: 'Prepaid Monthly Video',
            Type: 0,
            RecurringPeriodTypeCode: '3',
            Bulk: false,
            BulkChargeTypeCode: null,
            StartQuantity: null,
            EndQuantity: null,
            QuantityPricingTypeCode: 1,
            DefaultActivationStatus: 1,
            SubscriptionBillingCycle: null,
            InvoiceTiming: 1
          }],
          PricingPlanBillerRuleInstances: {
            ProductId: 0,
            PricingPlanId: 33405,
            RecurringBillerRuleInstances: [{
              BillerRuleConfigurationId: '1618249947913000400',
              BillerRuleInstanceCharges: [{
                ChargeAmount: 3.9900
              }],
              GuidanceCode: null,
              TaxAssociationCode: null,
              TaxType: 0,
              BulkChargeTypeCode: 0,
              QuantityPricingTypeCode: 0,
              DefaultActivationStatus: 1,
              UseActiveQuantity: false,
              AllowChargeOverride: false,
              AdHoc: false,
              Credit: false,
              Id: 2027,
              BillerRuleInstanceDiscounts: []
            }],
            TriggerBillerRuleInstances: [],
            OneTimeBillerRuleInstances: [],
            UsageBillerRuleInstances: [],
            CustomBillerRuleInstances: [],
            EntitlementBillerRuleInstances: [],
            EarlyTerminationFeeBillerRuleInstances: [],
            FinanceBillerRuleInstances: []
          },
          BulkDetails: [],
          Deposits: [],
          DiscountAmount: 0.0,
          Bulk: false
        }]
      }
      ],
      PreviousDecisionId: '1_1804380804827001500',
      NextDecisionId: '1_1804380877678001500',
      MinimumQuantity: 1,
      MaximumQuantity: 2,
      RemainingOrderableQuantity: 0
    },
    {
      Id: '1_1804380877678001500',
      DecisionType: 1,
      Name: 'Standalone Channels',
      Description: 'Add to any multi-channel plan or enjoy them on their own. Available nationwide with a 7-day free trial.',
      PageId: '1607107734755000202',
      DisplayOrder: 2147483647,
      Options: [{
        Id: '1804380877678001501',
        Name: 'Cinemax',
        Selected: true,
        Quantity: 1,
        Amount: 15.0000,
        BillerRuleInstanceAmounts: [{
          Amount: 15.0000,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1618249947913000400',
          Name: 'Prepaid Monthly Video',
          Description: 'Prepaid Monthly Video',
          Type: 0,
          BulkChargeTypeCode: null,
          TermAmount: null
        }],
        BillerRuleInstanceThumbnails: [],
        BulkDetails: [],
        Deposits: [],
        DiscountAmount: 0.0,
        Bulk: false,
        HasServiceIdentifier: false,
        Items: [{
          DecisionGroupOptionItemId: '1804380877678001501',
          ProductName: 'Cinemax',
          PricingPlanName: 'Cinemax Monthly',
          MinimumQuantity: 1,
          MaximumQuantity: 1,
          DefaultQuantity: 1,
          Quantity: 1,
          Amount: 15.0000,
          BillerRuleInstanceAmounts: [{
            Amount: 15.0000,
            CurrencyCode: 'USD',
            BillerRuleConfigurationId: '1618249947913000400',
            Name: 'Prepaid Monthly Video',
            Description: 'Prepaid Monthly Video',
            Type: 0,
            BulkChargeTypeCode: null,
            TermAmount: null
          }],
          BillerRuleInstanceThumbnails: [{
            Id: 2024,
            Amount: 15.0000,
            DiscountAmount: null,
            CurrencyCode: 'USD',
            BillerRuleConfigurationId: '1618249947913000400',
            Name: 'Prepaid Monthly Video',
            Description: 'Prepaid Monthly Video',
            Type: 0,
            RecurringPeriodTypeCode: '3',
            Bulk: false,
            BulkChargeTypeCode: null,
            StartQuantity: null,
            EndQuantity: null,
            QuantityPricingTypeCode: 1,
            DefaultActivationStatus: 1,
            SubscriptionBillingCycle: null,
            InvoiceTiming: 1
          }],
          PricingPlanBillerRuleInstances: {
            ProductId: 0,
            PricingPlanId: 33403,
            RecurringBillerRuleInstances: [{
              BillerRuleConfigurationId: '1618249947913000400',
              BillerRuleInstanceCharges: [{
                ChargeAmount: 15.0000
              }],
              GuidanceCode: null,
              TaxAssociationCode: null,
              TaxType: 0,
              BulkChargeTypeCode: 0,
              QuantityPricingTypeCode: 0,
              DefaultActivationStatus: 1,
              UseActiveQuantity: false,
              AllowChargeOverride: false,
              AdHoc: false,
              Credit: false,
              Id: 2024,
              BillerRuleInstanceDiscounts: []
            }],
            TriggerBillerRuleInstances: [],
            OneTimeBillerRuleInstances: [],
            UsageBillerRuleInstances: [],
            CustomBillerRuleInstances: [],
            EntitlementBillerRuleInstances: [],
            EarlyTerminationFeeBillerRuleInstances: [],
            FinanceBillerRuleInstances: []
          },
          BulkDetails: [],
          Deposits: [],
          DiscountAmount: 0.0,
          Bulk: false
        }]
      },
      {
        Id: '1804380877678001502',
        Name: 'Fox Soccer Plus',
        Quantity: null,
        Amount: 12.9900,
        BillerRuleInstanceAmounts: [{
          Amount: 12.9900,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1618249947913000400',
          Name: 'Prepaid Monthly Video',
          Description: 'Prepaid Monthly Video',
          Type: 0,
          BulkChargeTypeCode: null,
          TermAmount: null
        }],
        BillerRuleInstanceThumbnails: [],
        BulkDetails: [],
        Deposits: [],
        DiscountAmount: 0.0,
        Bulk: false,
        HasServiceIdentifier: false,
        Items: [{
          DecisionGroupOptionItemId: '1804380877678001502',
          ProductName: 'Fox Soccer Plus',
          PricingPlanName: 'Fox Soccer Pluss Monthly',
          MinimumQuantity: 1,
          MaximumQuantity: 1,
          DefaultQuantity: 1,
          Quantity: 1,
          Amount: 12.9900,
          BillerRuleInstanceAmounts: [{
            Amount: 12.9900,
            CurrencyCode: 'USD',
            BillerRuleConfigurationId: '1618249947913000400',
            Name: 'Prepaid Monthly Video',
            Description: 'Prepaid Monthly Video',
            Type: 0,
            BulkChargeTypeCode: null,
            TermAmount: null
          }],
          BillerRuleInstanceThumbnails: [{
            Id: 2021,
            Amount: 12.9900,
            DiscountAmount: null,
            CurrencyCode: 'USD',
            BillerRuleConfigurationId: '1618249947913000400',
            Name: 'Prepaid Monthly Video',
            Description: 'Prepaid Monthly Video',
            Type: 0,
            RecurringPeriodTypeCode: '3',
            Bulk: false,
            BulkChargeTypeCode: null,
            StartQuantity: null,
            EndQuantity: null,
            QuantityPricingTypeCode: 1,
            DefaultActivationStatus: 1,
            SubscriptionBillingCycle: null,
            InvoiceTiming: 1
          }],
          PricingPlanBillerRuleInstances: {
            ProductId: 0,
            PricingPlanId: 33399,
            RecurringBillerRuleInstances: [{
              BillerRuleConfigurationId: '1618249947913000400',
              BillerRuleInstanceCharges: [{
                ChargeAmount: 12.9900
              }],
              GuidanceCode: null,
              TaxAssociationCode: null,
              TaxType: 0,
              BulkChargeTypeCode: 0,
              QuantityPricingTypeCode: 0,
              DefaultActivationStatus: 1,
              UseActiveQuantity: false,
              AllowChargeOverride: false,
              AdHoc: false,
              Credit: false,
              Id: 2021,
              BillerRuleInstanceDiscounts: []
            }],
            TriggerBillerRuleInstances: [],
            OneTimeBillerRuleInstances: [],
            UsageBillerRuleInstances: [],
            CustomBillerRuleInstances: [],
            EntitlementBillerRuleInstances: [],
            EarlyTerminationFeeBillerRuleInstances: [],
            FinanceBillerRuleInstances: []
          },
          BulkDetails: [],
          Deposits: [],
          DiscountAmount: 0.0,
          Bulk: false
        }]
      }
      ],
      PreviousDecisionId: '1_1804380804827001501',
      MinimumQuantity: 1,
      MaximumQuantity: 2,
      RemainingOrderableQuantity: 0
    }
    ],
    ValueDecisions: [],
    RequiredOptions: [{
      ProductId: 594950,
      PricingPlanId: 33409
    },
    {
      ProductId: 594945,
      PricingPlanId: 33404
    },
    {
      ProductId: 594943,
      PricingPlanId: 33413
    },
    {
      ProductId: 594941,
      PricingPlanId: 33414
    },
    {
      ProductId: 594944,
      PricingPlanId: 33403
    },
    {
      ProductId: 594940,
      PricingPlanId: 33399
    },
    {
      ProductId: 594946,
      PricingPlanId: 33405
    }
    ]
  },
  ShoppingCart: {
    Currency: 'USD',
    GrossAmount: 99.9900,
    DiscountAmount: 0.0,
    DepositAmount: 0.0,
    TotalAmount: 99.9900,
    ShippingRequired: false,
    HasSubscription: false,
    PaymentInstrumentRequired: true,
    Items: [{
      ProductId: 594950,
      PricingPlanId: 33409,
      OfferingId: '1804379150946001500',
      OrderedOfferingId: '1804379150946001500',
      OrderedOfferingName: 'Vue Ultra',
      OfferingOptionPriceId: '1804379150946001500',
      DecisionGroupOptionId: '1804380804827001500',
      DecisionGroupOptionItemIndex: 1,
      OfferingOptionId: '',
      Quantity: 1,
      Details: {
        Product: {
          Id: 594950,
          Name: 'Vue Ultra',
          StructureType: 1,
          ImageUrl: 'http://cdn.contentdirect.tv/GlobalContent/noImageURL.png',
          ThumbnailUrl: 'http://cdn.contentdirect.tv/GlobalContent/noThumbURL.png',
          ReferenceDate: '2018-02-12T20:38:17.827Z',
          IndexName: 'Vue Ultra',
          AllowMultiplePurchases: true,
          Standalone: true,
          LineOfBusiness: 10043,
          Subscription: false,
          ProductClassification: 1,
          Services: [],
          MaxNonBulkQuantity: 0,
          MaxBulkQuantity: 0,
          LineOfBusinessName: 'Cable',
          Status: 1
        },
        PricingPlan: {
          ProductId: 594950,
          AddDate: '2018-02-12T20:38:44.943Z',
          ModDate: '2018-02-12T20:38:44.943Z',
          Id: 33409,
          Name: 'Vue Ultra Monthly',
          ChargeAmount: 0.0000,
          RenewalChargeAmount: 0.0000,
          SecondaryRenewalAmount: 0.0000,
          Currency: 'USD',
          Type: 2,
          RequiresAuthentication: true,
          BillerRuleInstanceThumbnails: [{
            Id: 2031,
            Amount: 74.9900,
            DiscountAmount: null,
            CurrencyCode: 'USD',
            BillerRuleConfigurationId: '1618249947913000400',
            Name: 'Prepaid Monthly Video',
            Description: 'Prepaid Monthly Video',
            Type: 0,
            RecurringPeriodTypeCode: '3',
            Bulk: false,
            BulkChargeTypeCode: null,
            StartQuantity: null,
            EndQuantity: null,
            QuantityPricingTypeCode: 1,
            DefaultActivationStatus: 1,
            SubscriptionBillingCycle: null,
            InvoiceTiming: 1
          }],
          PricingPlanBillerRuleInstances: {
            ProductId: 0,
            PricingPlanId: 33409,
            RecurringBillerRuleInstances: [{
              BillerRuleConfigurationId: '1618249947913000400',
              BillerRuleInstanceCharges: [{
                ChargeAmount: 74.9900
              }],
              GuidanceCode: null,
              TaxAssociationCode: null,
              TaxType: 0,
              BulkChargeTypeCode: 0,
              QuantityPricingTypeCode: 0,
              DefaultActivationStatus: 1,
              UseActiveQuantity: false,
              AllowChargeOverride: false,
              AdHoc: false,
              Credit: false,
              Id: 2031,
              BillerRuleInstanceDiscounts: []
            }],
            TriggerBillerRuleInstances: [],
            OneTimeBillerRuleInstances: [],
            UsageBillerRuleInstances: [],
            CustomBillerRuleInstances: [],
            EntitlementBillerRuleInstances: [],
            EarlyTerminationFeeBillerRuleInstances: [],
            FinanceBillerRuleInstances: []
          },
          Deposits: [],
          ServiceTiers: [],
          Prepaid: true,
          TopDeliveryCapabilityId: 30327,
          HasConvergentBillerExtension: true,
          DeliveryCapabilityCodes: [
            30327
          ],
          AvailableWithinOffering: null
        },
        GrossAmount: 74.9900,
        TotalAmount: 74.9900,
        PerItemGrossAmount: 74.9900,
        PerItemTotalAmount: 74.9900,
        BundleItemGrossAmount: 0.0,
        BundleItemTotalAmount: 0.0,
        BillerRuleTotals: [{
          Amount: 74.9900,
          DiscountAmount: 0.0,
          TotalAmount: 74.9900,
          InvoiceTiming: 1,
          PeriodTypeCode: '3',
          Type: 0
        }]
      },
      Discounts: [],
      Deposits: [],
      ServiceAttributes: [],
      OrderItemChangeType: null,
      OrderContractId: null,
      ExternalContractId: null
    },
    {
      ProductId: 594945,
      PricingPlanId: 33404,
      OfferingId: '1804379150946001500',
      OrderedOfferingId: '1804379150946001500',
      OrderedOfferingName: 'Vue Ultra',
      OfferingOptionPriceId: '1804379710715001500',
      DecisionGroupOptionId: '1804380804827001504',
      DecisionGroupOptionItemIndex: 1,
      OfferingOptionId: '',
      Quantity: 1,
      Details: {
        Product: {
          Id: 594945,
          Name: 'Sports Pack',
          StructureType: 1,
          ImageUrl: 'http://cdn.contentdirect.tv/GlobalContent/noImageURL.png',
          ThumbnailUrl: 'http://cdn.contentdirect.tv/GlobalContent/noThumbURL.png',
          ReferenceDate: '2018-02-12T20:04:22.907Z',
          IndexName: 'Sports Pack',
          AllowMultiplePurchases: true,
          Standalone: true,
          LineOfBusiness: 10043,
          Subscription: false,
          ProductClassification: 1,
          Services: [],
          MaxNonBulkQuantity: 0,
          MaxBulkQuantity: 0,
          LineOfBusinessName: 'Cable',
          Status: 1
        },
        PricingPlan: {
          ProductId: 594945,
          AddDate: '2018-02-12T20:04:50.920Z',
          ModDate: '2018-02-12T20:04:50.920Z',
          Id: 33404,
          Name: 'Sports Pack Monthly',
          ChargeAmount: 0.0000,
          RenewalChargeAmount: 0.0000,
          SecondaryRenewalAmount: 0.0000,
          Currency: 'USD',
          Type: 2,
          RequiresAuthentication: true,
          BillerRuleInstanceThumbnails: [{
            Id: 2025,
            Amount: 10.0000,
            DiscountAmount: null,
            CurrencyCode: 'USD',
            BillerRuleConfigurationId: '1618249947913000400',
            Name: 'Prepaid Monthly Video',
            Description: 'Prepaid Monthly Video',
            Type: 0,
            RecurringPeriodTypeCode: '3',
            Bulk: false,
            BulkChargeTypeCode: null,
            StartQuantity: null,
            EndQuantity: null,
            QuantityPricingTypeCode: 1,
            DefaultActivationStatus: 1,
            SubscriptionBillingCycle: null,
            InvoiceTiming: 1
          }],
          PricingPlanBillerRuleInstances: {
            ProductId: 0,
            PricingPlanId: 33404,
            RecurringBillerRuleInstances: [{
              BillerRuleConfigurationId: '1618249947913000400',
              BillerRuleInstanceCharges: [{
                ChargeAmount: 10.0000
              }],
              GuidanceCode: null,
              TaxAssociationCode: null,
              TaxType: 0,
              BulkChargeTypeCode: 0,
              QuantityPricingTypeCode: 0,
              DefaultActivationStatus: 1,
              UseActiveQuantity: false,
              AllowChargeOverride: false,
              AdHoc: false,
              Credit: false,
              Id: 2025,
              BillerRuleInstanceDiscounts: []
            }],
            TriggerBillerRuleInstances: [],
            OneTimeBillerRuleInstances: [],
            UsageBillerRuleInstances: [],
            CustomBillerRuleInstances: [],
            EntitlementBillerRuleInstances: [],
            EarlyTerminationFeeBillerRuleInstances: [],
            FinanceBillerRuleInstances: []
          },
          Deposits: [],
          ServiceTiers: [],
          Prepaid: true,
          TopDeliveryCapabilityId: 30327,
          HasConvergentBillerExtension: true,
          DeliveryCapabilityCodes: [
            30327
          ],
          AvailableWithinOffering: null
        },
        GrossAmount: 10.0000,
        TotalAmount: 10.0000,
        PerItemGrossAmount: 10.0000,
        PerItemTotalAmount: 10.0000,
        BundleItemGrossAmount: 0.0,
        BundleItemTotalAmount: 0.0,
        BillerRuleTotals: [{
          Amount: 10.0000,
          DiscountAmount: 0.0,
          TotalAmount: 10.0000,
          InvoiceTiming: 1,
          PeriodTypeCode: '3',
          Type: 0
        }]
      },
      Discounts: [],
      Deposits: [],
      ServiceAttributes: [],
      OrderItemChangeType: null,
      OrderContractId: null,
      ExternalContractId: null
    },
    {
      ProductId: 594944,
      PricingPlanId: 33403,
      OfferingId: '1804379150946001500',
      OrderedOfferingId: '1804379150946001500',
      OrderedOfferingName: 'Vue Ultra',
      OfferingOptionPriceId: '1804380585278001500',
      DecisionGroupOptionId: '1804380877678001501',
      DecisionGroupOptionItemIndex: 1,
      OfferingOptionId: '',
      Quantity: 1,
      Details: {
        Product: {
          Id: 594944,
          Name: 'Cinemax',
          StructureType: 1,
          ImageUrl: 'http://cdn.contentdirect.tv/GlobalContent/noImageURL.png',
          ThumbnailUrl: 'http://cdn.contentdirect.tv/GlobalContent/noThumbURL.png',
          ReferenceDate: '2018-02-12T20:03:04.800Z',
          IndexName: 'Cinemax',
          AllowMultiplePurchases: true,
          Standalone: true,
          LineOfBusiness: 10043,
          Subscription: false,
          ProductClassification: 1,
          Services: [],
          MaxNonBulkQuantity: 0,
          MaxBulkQuantity: 0,
          LineOfBusinessName: 'Cable',
          Status: 1
        },
        PricingPlan: {
          ProductId: 594944,
          AddDate: '2018-02-12T20:03:29.370Z',
          ModDate: '2018-02-12T20:03:29.370Z',
          Id: 33403,
          Name: 'Cinemax Monthly',
          ChargeAmount: 0.0000,
          RenewalChargeAmount: 0.0000,
          SecondaryRenewalAmount: 0.0000,
          Currency: 'USD',
          Type: 2,
          RequiresAuthentication: true,
          BillerRuleInstanceThumbnails: [{
            Id: 2024,
            Amount: 15.0000,
            DiscountAmount: null,
            CurrencyCode: 'USD',
            BillerRuleConfigurationId: '1618249947913000400',
            Name: 'Prepaid Monthly Video',
            Description: 'Prepaid Monthly Video',
            Type: 0,
            RecurringPeriodTypeCode: '3',
            Bulk: false,
            BulkChargeTypeCode: null,
            StartQuantity: null,
            EndQuantity: null,
            QuantityPricingTypeCode: 1,
            DefaultActivationStatus: 1,
            SubscriptionBillingCycle: null,
            InvoiceTiming: 1
          }],
          PricingPlanBillerRuleInstances: {
            ProductId: 0,
            PricingPlanId: 33403,
            RecurringBillerRuleInstances: [{
              BillerRuleConfigurationId: '1618249947913000400',
              BillerRuleInstanceCharges: [{
                ChargeAmount: 15.0000
              }],
              GuidanceCode: null,
              TaxAssociationCode: null,
              TaxType: 0,
              BulkChargeTypeCode: 0,
              QuantityPricingTypeCode: 0,
              DefaultActivationStatus: 1,
              UseActiveQuantity: false,
              AllowChargeOverride: false,
              AdHoc: false,
              Credit: false,
              Id: 2024,
              BillerRuleInstanceDiscounts: []
            }],
            TriggerBillerRuleInstances: [],
            OneTimeBillerRuleInstances: [],
            UsageBillerRuleInstances: [],
            CustomBillerRuleInstances: [],
            EntitlementBillerRuleInstances: [],
            EarlyTerminationFeeBillerRuleInstances: [],
            FinanceBillerRuleInstances: []
          },
          Deposits: [],
          ServiceTiers: [],
          Prepaid: true,
          TopDeliveryCapabilityId: 30327,
          HasConvergentBillerExtension: true,
          DeliveryCapabilityCodes: [
            30327
          ],
          AvailableWithinOffering: null
        },
        GrossAmount: 15.0000,
        TotalAmount: 15.0000,
        PerItemGrossAmount: 15.0000,
        PerItemTotalAmount: 15.0000,
        BundleItemGrossAmount: 0.0,
        BundleItemTotalAmount: 0.0,
        BillerRuleTotals: [{
          Amount: 15.0000,
          DiscountAmount: 0.0,
          TotalAmount: 15.0000,
          InvoiceTiming: 1,
          PeriodTypeCode: '3',
          Type: 0
        }]
      },
      Discounts: [],
      Deposits: [],
      ServiceAttributes: [],
      OrderItemChangeType: null,
      OrderContractId: null,
      ExternalContractId: null
    }
    ],
    BillerRuleTotals: [{
      Amount: 99.9900,
      DiscountAmount: 0.0,
      TotalAmount: 99.9900,
      InvoiceTiming: 1,
      PeriodTypeCode: '3',
      Type: 0
    }]
  },
  AddItems: [],
  ModifyItems: [],
  TransitionOutcomes: []
};

export const completedDecisions = [{
  DecisionType: 1,
  Id: '1804380804827001500',
  ItemDecisions: [{
    DecisionGroupOptionItemId: '1804380804827001500',
    Quantity: 1
  }],
  Quantity: 1,
  SelectedValue: '1804380804827001500'
}, {
  DecisionType: 1,
  Id: '1804380804827001500',
  ItemDecisions: [{
    DecisionGroupOptionItemId: '1804380804827001501',
    Quantity: 1
  }],
  Quantity: 0,
  SelectedValue: '1804380804827001501'
}, {
  DecisionType: 1,
  Id: '1804380804827001500',
  ItemDecisions: [{
    DecisionGroupOptionItemId: '1804380804827001502',
    Quantity: 1
  }],
  Quantity: 0,
  SelectedValue: '1804380804827001502'
}, {
  DecisionType: 1,
  Id: '1804380804827001500',
  ItemDecisions: [{
    DecisionGroupOptionItemId: '1804380804827001503',
    Quantity: 1
  }],
  Quantity: 0,
  SelectedValue: '1804380804827001503'
}, {
  DecisionType: 1,
  Id: '1804380804827001501',
  ItemDecisions: [{
    DecisionGroupOptionItemId: '1804380804827001504',
    Quantity: 1
  }],
  Quantity: 1,
  SelectedValue: '1804380804827001504'
}, {
  DecisionType: 1,
  Id: '1804380804827001501',
  ItemDecisions: [{
    DecisionGroupOptionItemId: '1804380877678001500',
    Quantity: 1
  }],
  Quantity: 0,
  SelectedValue: '1804380877678001500'
}, {
  DecisionType: 1,
  Id: '1804380877678001500',
  ItemDecisions: [{
    DecisionGroupOptionItemId: '1804380877678001501',
    Quantity: 1
  }],
  Quantity: 1,
  SelectedValue: '1804380877678001501'
}, {
  DecisionType: 1,
  Id: '1804380877678001500',
  ItemDecisions: [{
    DecisionGroupOptionItemId: '1804380877678001502',
    Quantity: 1
  }],
  Quantity: 0,
  SelectedValue: '1804380877678001502'
}];

export const formattedCompletedDecisions = {
  '1804380804827001500': {
    decisionQuantity: 1,
    id: '1804380804827001500',
    maximumQuantity: 4,
    minimumQuantity: 1,
    quantity: 1,
    selectedOptionId: '1804380804827001500',
    type: 1
  },
  '1804380804827001501': {
    decisionQuantity: 1,
    id: '1804380804827001501',
    maximumQuantity: 4,
    minimumQuantity: 1,
    quantity: 0,
    selectedOptionId: '1804380804827001501',
    type: 1
  },
  '1804380804827001502': {
    decisionQuantity: 1,
    id: '1804380804827001502',
    maximumQuantity: 4,
    minimumQuantity: 1,
    quantity: 0,
    selectedOptionId: '1804380804827001502',
    type: 1
  },
  '1804380804827001503': {
    decisionQuantity: 1,
    id: '1804380804827001503',
    maximumQuantity: 4,
    minimumQuantity: 1,
    quantity: 0,
    selectedOptionId: '1804380804827001503',
    type: 1
  },
  '1804380804827001504': {
    decisionQuantity: 1,
    id: '1804380804827001504',
    maximumQuantity: 2,
    minimumQuantity: 1,
    quantity: 1,
    selectedOptionId: '1804380804827001504',
    type: 1
  },
  '1804380877678001500': {
    decisionQuantity: 1,
    id: '1804380877678001500',
    maximumQuantity: 2,
    minimumQuantity: 1,
    quantity: 0,
    selectedOptionId: '1804380877678001500',
    type: 1
  },
  '1804380877678001501': {
    decisionQuantity: 1,
    id: '1804380877678001501',
    maximumQuantity: 2,
    minimumQuantity: 1,
    quantity: 1,
    selectedOptionId: '1804380877678001501',
    type: 1
  },
  '1804380877678001502': {
    decisionQuantity: 1,
    id: '1804380877678001502',
    maximumQuantity: 2,
    minimumQuantity: 1,
    quantity: 0,
    selectedOptionId: '1804380877678001502',
    type: 1
  }
};

export const bulkOfferingStore = {
  '1_1830959903646000100': {
    Id: '1_1830959903646000100',
    DecisionType: 1,
    Name: 'Bulk Decisions',
    PageId: '1607107734677000200',
    DisplayOrder: 2147483647,
    Options: [{
      Id: '1830959903646000100',
      Name: '5 unit plans',
      Selected: true,
      Quantity: 1,
      Amount: 500,
      BillerRuleInstanceAmounts: [{
        Amount: 250,
        CurrencyCode: 'USD',
        BillerRuleConfigurationId: '1707477027796000600',
        Name: 'Mobile Activation Bulk',
        Description: 'Mobile Activation Bulk',
        Type: 2,
        BulkChargeTypeCode: null,
        TermAmount: null
      }, {
        Amount: 500,
        CurrencyCode: 'USD',
        BillerRuleConfigurationId: '1701375714296000600',
        Name: 'Postpaid Monthly Wireless Bulk',
        Description: 'Postpaid Monthly Wireless Bulk',
        Type: 0,
        BulkChargeTypeCode: null,
        TermAmount: null
      }],
      BillerRuleInstanceThumbnails: [],
      BulkDetails: [],
      Deposits: [],
      DiscountAmount: 0,
      Bulk: true,
      HasServiceIdentifier: false,
      Items: [{
        DecisionGroupOptionItemId: '1830959903647000100',
        ProductName: 'venkata postpaid bulk',
        PricingPlanName: 'unit plan',
        MinimumQuantity: 5,
        MaximumQuantity: 5,
        DefaultQuantity: 5,
        Quantity: 5,
        Amount: 100,
        BillerRuleInstanceAmounts: [{
          Amount: 50,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1707477027796000600',
          Name: 'Mobile Activation Bulk',
          Description: 'Mobile Activation Bulk',
          Type: 2,
          BulkChargeTypeCode: null,
          TermAmount: null
        }, {
          Amount: 100,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1701375714296000600',
          Name: 'Postpaid Monthly Wireless Bulk',
          Description: 'Postpaid Monthly Wireless Bulk',
          Type: 0,
          BulkChargeTypeCode: null,
          TermAmount: null
        }],
        BillerRuleInstanceThumbnails: [{
          Id: 3918,
          Amount: 50,
          DiscountAmount: null,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1707477027796000600',
          Name: 'Mobile Activation Bulk',
          Description: 'Mobile Activation Bulk',
          Type: 2,
          RecurringPeriodTypeCode: '99',
          Bulk: true,
          BulkChargeTypeCode: 2,
          StartQuantity: null,
          EndQuantity: null,
          QuantityPricingTypeCode: 1,
          DefaultActivationStatus: 1,
          SubscriptionBillingCycle: null,
          InvoiceTiming: 1
        }, {
          Id: 3919,
          Amount: 100,
          DiscountAmount: null,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1701375714296000600',
          Name: 'Postpaid Monthly Wireless Bulk',
          Description: 'Postpaid Monthly Wireless Bulk',
          Type: 0,
          RecurringPeriodTypeCode: '3',
          Bulk: true,
          BulkChargeTypeCode: 2,
          StartQuantity: null,
          EndQuantity: null,
          QuantityPricingTypeCode: 1,
          DefaultActivationStatus: 1,
          SubscriptionBillingCycle: null,
          InvoiceTiming: 1
        }],
        PricingPlanBillerRuleInstances: {
          ProductId: 0,
          PricingPlanId: 35751,
          RecurringBillerRuleInstances: [{
            BillerRuleConfigurationId: '1701375714296000600',
            BillerRuleInstanceCharges: [{
              ChargeAmount: 100
            }],
            GuidanceCode: null,
            TaxAssociationCode: null,
            TaxType: 0,
            BulkChargeTypeCode: 0,
            QuantityPricingTypeCode: 0,
            DefaultActivationStatus: 1,
            UseActiveQuantity: false,
            AllowChargeOverride: false,
            AdHoc: false,
            Credit: false,
            Id: 3919,
            BillerRuleInstanceDiscounts: []
          }],
          TriggerBillerRuleInstances: [],
          OneTimeBillerRuleInstances: [{
            BillerRuleConfigurationId: '1707477027796000600',
            BillerRuleInstanceCharges: [{
              ChargeAmount: 50
            }],
            GuidanceCode: null,
            TaxAssociationCode: null,
            TaxType: 0,
            BulkChargeTypeCode: 0,
            QuantityPricingTypeCode: 0,
            DefaultActivationStatus: 0,
            AllowChargeOverride: false,
            AdHoc: false,
            Credit: false,
            Id: 3918,
            BillerRuleInstanceDiscounts: []
          }],
          UsageBillerRuleInstances: [],
          CustomBillerRuleInstances: [],
          EntitlementBillerRuleInstances: [],
          EarlyTerminationFeeBillerRuleInstances: [],
          FinanceBillerRuleInstances: []
        },
        BulkDetails: [],
        Deposits: [],
        DiscountAmount: 0,
        Bulk: true
      }]
    }, {
      Id: '1830959903647000100',
      Name: '5 Flat Plans',
      Quantity: null,
      Amount: 5000,
      BillerRuleInstanceAmounts: [{
        Amount: 5000,
        CurrencyCode: 'USD',
        BillerRuleConfigurationId: '1701375714296000600',
        Name: 'Postpaid Monthly Wireless Bulk',
        Description: 'Postpaid Monthly Wireless Bulk',
        Type: 0,
        BulkChargeTypeCode: null,
        TermAmount: null
      }, {
        Amount: 2250,
        CurrencyCode: 'USD',
        BillerRuleConfigurationId: '1707477027796000600',
        Name: 'Mobile Activation Bulk',
        Description: 'Mobile Activation Bulk',
        Type: 2,
        BulkChargeTypeCode: null,
        TermAmount: null
      }],
      BillerRuleInstanceThumbnails: [],
      BulkDetails: [],
      Deposits: [],
      DiscountAmount: 0,
      Bulk: true,
      HasServiceIdentifier: false,
      Items: [{
        DecisionGroupOptionItemId: '1830959903647000101',
        ProductName: 'venkata postpaid bulk',
        PricingPlanName: 'flat plan',
        MinimumQuantity: 5,
        MaximumQuantity: 5,
        DefaultQuantity: 5,
        Quantity: 5,
        Amount: 1000,
        BillerRuleInstanceAmounts: [{
          Amount: 1000,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1701375714296000600',
          Name: 'Postpaid Monthly Wireless Bulk',
          Description: 'Postpaid Monthly Wireless Bulk',
          Type: 0,
          BulkChargeTypeCode: null,
          TermAmount: null
        }, {
          Amount: 450,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1707477027796000600',
          Name: 'Mobile Activation Bulk',
          Description: 'Mobile Activation Bulk',
          Type: 2,
          BulkChargeTypeCode: null,
          TermAmount: null
        }],
        BillerRuleInstanceThumbnails: [{
          Id: 3920,
          Amount: 1000,
          DiscountAmount: null,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1701375714296000600',
          Name: 'Postpaid Monthly Wireless Bulk',
          Description: 'Postpaid Monthly Wireless Bulk',
          Type: 0,
          RecurringPeriodTypeCode: '3',
          Bulk: true,
          BulkChargeTypeCode: 1,
          StartQuantity: null,
          EndQuantity: null,
          QuantityPricingTypeCode: 1,
          DefaultActivationStatus: 1,
          SubscriptionBillingCycle: null,
          InvoiceTiming: 1
        }, {
          Id: 3921,
          Amount: 450,
          DiscountAmount: null,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1707477027796000600',
          Name: 'Mobile Activation Bulk',
          Description: 'Mobile Activation Bulk',
          Type: 2,
          RecurringPeriodTypeCode: '99',
          Bulk: true,
          BulkChargeTypeCode: 1,
          StartQuantity: null,
          EndQuantity: null,
          QuantityPricingTypeCode: 1,
          DefaultActivationStatus: 1,
          SubscriptionBillingCycle: null,
          InvoiceTiming: 1
        }],
        PricingPlanBillerRuleInstances: {
          ProductId: 0,
          PricingPlanId: 35752,
          RecurringBillerRuleInstances: [{
            BillerRuleConfigurationId: '1701375714296000600',
            BillerRuleInstanceCharges: [{
              ChargeAmount: 1000
            }],
            GuidanceCode: null,
            TaxAssociationCode: null,
            TaxType: 0,
            BulkChargeTypeCode: 0,
            QuantityPricingTypeCode: 0,
            DefaultActivationStatus: 1,
            UseActiveQuantity: false,
            AllowChargeOverride: false,
            AdHoc: false,
            Credit: false,
            Id: 3920,
            BillerRuleInstanceDiscounts: []
          }],
          TriggerBillerRuleInstances: [],
          OneTimeBillerRuleInstances: [{
            BillerRuleConfigurationId: '1707477027796000600',
            BillerRuleInstanceCharges: [{
              ChargeAmount: 450
            }],
            GuidanceCode: null,
            TaxAssociationCode: null,
            TaxType: 0,
            BulkChargeTypeCode: 0,
            QuantityPricingTypeCode: 0,
            DefaultActivationStatus: 0,
            AllowChargeOverride: false,
            AdHoc: false,
            Credit: false,
            Id: 3921,
            BillerRuleInstanceDiscounts: []
          }],
          UsageBillerRuleInstances: [],
          CustomBillerRuleInstances: [],
          EntitlementBillerRuleInstances: [],
          EarlyTerminationFeeBillerRuleInstances: [],
          FinanceBillerRuleInstances: []
        },
        BulkDetails: [],
        Deposits: [],
        DiscountAmount: 0,
        Bulk: true
      }]
    }, {
      Id: '1830959903647000101',
      Name: 'Flat And Unit',
      Quantity: null,
      Amount: 5500,
      BillerRuleInstanceAmounts: [{
        Amount: 5500,
        CurrencyCode: 'USD',
        BillerRuleConfigurationId: '1701375714296000600',
        Name: 'Postpaid Monthly Wireless Bulk',
        Description: 'Postpaid Monthly Wireless Bulk',
        Type: 0,
        BulkChargeTypeCode: null,
        TermAmount: null
      }, {
        Amount: 2500,
        CurrencyCode: 'USD',
        BillerRuleConfigurationId: '1707477027796000600',
        Name: 'Mobile Activation Bulk',
        Description: 'Mobile Activation Bulk',
        Type: 2,
        BulkChargeTypeCode: null,
        TermAmount: null
      }],
      BillerRuleInstanceThumbnails: [],
      BulkDetails: [],
      Deposits: [],
      DiscountAmount: 0,
      Bulk: true,
      HasServiceIdentifier: false,
      Items: [{
        DecisionGroupOptionItemId: '1830959903647000102',
        ProductName: 'venkata postpaid bulk',
        PricingPlanName: 'flat plan',
        MinimumQuantity: 5,
        MaximumQuantity: 5,
        DefaultQuantity: 5,
        Quantity: 5,
        Amount: 1000,
        BillerRuleInstanceAmounts: [{
          Amount: 1000,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1701375714296000600',
          Name: 'Postpaid Monthly Wireless Bulk',
          Description: 'Postpaid Monthly Wireless Bulk',
          Type: 0,
          BulkChargeTypeCode: null,
          TermAmount: null
        }, {
          Amount: 450,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1707477027796000600',
          Name: 'Mobile Activation Bulk',
          Description: 'Mobile Activation Bulk',
          Type: 2,
          BulkChargeTypeCode: null,
          TermAmount: null
        }],
        BillerRuleInstanceThumbnails: [{
          Id: 3920,
          Amount: 1000,
          DiscountAmount: null,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1701375714296000600',
          Name: 'Postpaid Monthly Wireless Bulk',
          Description: 'Postpaid Monthly Wireless Bulk',
          Type: 0,
          RecurringPeriodTypeCode: '3',
          Bulk: true,
          BulkChargeTypeCode: 1,
          StartQuantity: null,
          EndQuantity: null,
          QuantityPricingTypeCode: 1,
          DefaultActivationStatus: 1,
          SubscriptionBillingCycle: null,
          InvoiceTiming: 1
        }, {
          Id: 3921,
          Amount: 450,
          DiscountAmount: null,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1707477027796000600',
          Name: 'Mobile Activation Bulk',
          Description: 'Mobile Activation Bulk',
          Type: 2,
          RecurringPeriodTypeCode: '99',
          Bulk: true,
          BulkChargeTypeCode: 1,
          StartQuantity: null,
          EndQuantity: null,
          QuantityPricingTypeCode: 1,
          DefaultActivationStatus: 1,
          SubscriptionBillingCycle: null,
          InvoiceTiming: 1
        }],
        PricingPlanBillerRuleInstances: {
          ProductId: 0,
          PricingPlanId: 35752,
          RecurringBillerRuleInstances: [{
            BillerRuleConfigurationId: '1701375714296000600',
            BillerRuleInstanceCharges: [{
              ChargeAmount: 1000
            }],
            GuidanceCode: null,
            TaxAssociationCode: null,
            TaxType: 0,
            BulkChargeTypeCode: 0,
            QuantityPricingTypeCode: 0,
            DefaultActivationStatus: 1,
            UseActiveQuantity: false,
            AllowChargeOverride: false,
            AdHoc: false,
            Credit: false,
            Id: 3920,
            BillerRuleInstanceDiscounts: []
          }],
          TriggerBillerRuleInstances: [],
          OneTimeBillerRuleInstances: [{
            BillerRuleConfigurationId: '1707477027796000600',
            BillerRuleInstanceCharges: [{
              ChargeAmount: 450
            }],
            GuidanceCode: null,
            TaxAssociationCode: null,
            TaxType: 0,
            BulkChargeTypeCode: 0,
            QuantityPricingTypeCode: 0,
            DefaultActivationStatus: 0,
            AllowChargeOverride: false,
            AdHoc: false,
            Credit: false,
            Id: 3921,
            BillerRuleInstanceDiscounts: []
          }],
          UsageBillerRuleInstances: [],
          CustomBillerRuleInstances: [],
          EntitlementBillerRuleInstances: [],
          EarlyTerminationFeeBillerRuleInstances: [],
          FinanceBillerRuleInstances: []
        },
        BulkDetails: [],
        Deposits: [],
        DiscountAmount: 0,
        Bulk: true
      }, {
        DecisionGroupOptionItemId: '1830959903647000103',
        ProductName: 'venkata postpaid bulk',
        PricingPlanName: 'unit plan',
        MinimumQuantity: 5,
        MaximumQuantity: 5,
        DefaultQuantity: 5,
        Quantity: 5,
        Amount: 100,
        BillerRuleInstanceAmounts: [{
          Amount: 50,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1707477027796000600',
          Name: 'Mobile Activation Bulk',
          Description: 'Mobile Activation Bulk',
          Type: 2,
          BulkChargeTypeCode: null,
          TermAmount: null
        }, {
          Amount: 100,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1701375714296000600',
          Name: 'Postpaid Monthly Wireless Bulk',
          Description: 'Postpaid Monthly Wireless Bulk',
          Type: 0,
          BulkChargeTypeCode: null,
          TermAmount: null
        }],
        BillerRuleInstanceThumbnails: [{
          Id: 3918,
          Amount: 50,
          DiscountAmount: null,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1707477027796000600',
          Name: 'Mobile Activation Bulk',
          Description: 'Mobile Activation Bulk',
          Type: 2,
          RecurringPeriodTypeCode: '99',
          Bulk: true,
          BulkChargeTypeCode: 2,
          StartQuantity: null,
          EndQuantity: null,
          QuantityPricingTypeCode: 1,
          DefaultActivationStatus: 1,
          SubscriptionBillingCycle: null,
          InvoiceTiming: 1
        }, {
          Id: 3919,
          Amount: 100,
          DiscountAmount: null,
          CurrencyCode: 'USD',
          BillerRuleConfigurationId: '1701375714296000600',
          Name: 'Postpaid Monthly Wireless Bulk',
          Description: 'Postpaid Monthly Wireless Bulk',
          Type: 0,
          RecurringPeriodTypeCode: '3',
          Bulk: true,
          BulkChargeTypeCode: 2,
          StartQuantity: null,
          EndQuantity: null,
          QuantityPricingTypeCode: 1,
          DefaultActivationStatus: 1,
          SubscriptionBillingCycle: null,
          InvoiceTiming: 1
        }],
        PricingPlanBillerRuleInstances: {
          ProductId: 0,
          PricingPlanId: 35751,
          RecurringBillerRuleInstances: [{
            BillerRuleConfigurationId: '1701375714296000600',
            BillerRuleInstanceCharges: [{
              ChargeAmount: 100
            }],
            GuidanceCode: null,
            TaxAssociationCode: null,
            TaxType: 0,
            BulkChargeTypeCode: 0,
            QuantityPricingTypeCode: 0,
            DefaultActivationStatus: 1,
            UseActiveQuantity: false,
            AllowChargeOverride: false,
            AdHoc: false,
            Credit: false,
            Id: 3919,
            BillerRuleInstanceDiscounts: []
          }],
          TriggerBillerRuleInstances: [],
          OneTimeBillerRuleInstances: [{
            BillerRuleConfigurationId: '1707477027796000600',
            BillerRuleInstanceCharges: [{
              ChargeAmount: 50
            }],
            GuidanceCode: null,
            TaxAssociationCode: null,
            TaxType: 0,
            BulkChargeTypeCode: 0,
            QuantityPricingTypeCode: 0,
            DefaultActivationStatus: 0,
            AllowChargeOverride: false,
            AdHoc: false,
            Credit: false,
            Id: 3918,
            BillerRuleInstanceDiscounts: []
          }],
          UsageBillerRuleInstances: [],
          CustomBillerRuleInstances: [],
          EntitlementBillerRuleInstances: [],
          EarlyTerminationFeeBillerRuleInstances: [],
          FinanceBillerRuleInstances: []
        },
        BulkDetails: [],
        Deposits: [],
        DiscountAmount: 0,
        Bulk: true
      }]
    }],
    MinimumQuantity: 1,
    MaximumQuantity: 3,
    RemainingOrderableQuantity: 0
  }
};

export const bulkFormattedCompletedDecisions = [{
  DecisionType: 1,
  Id: '1830959903646000100',
  ItemDecisions: [{
    DecisionGroupOptionItemId: '1830959903647000100',
    Quantity: 5
  }],
  Quantity: 1,
  SelectedValue: '1830959903646000100'
}, {
  DecisionType: 1,
  Id: '1830959903646000100',
  ItemDecisions: [{
    DecisionGroupOptionItemId: '1830959903647000101',
    Quantity: 5
  }],
  Quantity: 0,
  SelectedValue: '1830959903647000100'
}, {
  DecisionType: 1,
  Id: '1830959903646000100',
  ItemDecisions: [{
    DecisionGroupOptionItemId: '1830959903647000102',
    Quantity: 5
  }, {
    DecisionGroupOptionItemId: '1830959903647000103',
    Quantity: 5
  }],
  Quantity: 0,
  SelectedValue: '1830959903647000101'
}];
