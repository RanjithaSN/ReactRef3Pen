export const retrieveOfferingContext: any = {
  'RemoveItems': [],
  'InvalidInventoryItemReservations': [],
  'PurchaseOrderNumberHistory': [],
  'Context': {
    'OfferingIds': ['1933739917203002400'],
    'NonQualifiedProductIds': [],
    'NonQualifiedPricingPlanIds': [],
    'Pages': [{
      'Id': '1933150267545001800',
      'PageNumber': 1,
      'Name': 'Primary Package'
    }, {
      'Id': '0',
      'PageNumber': 2
    }],
    'Decisions': [{
      'Id': '2_1933739917203002401',
      'DecisionType': 2,
      'Name': 'Mobil Data',
      'ProductId': 390494,
      'PageId': '1933150267545001800',
      'DisplayOrder': 2147483647,
      'Options': [{
        'Id': '2101413472659002900',
        'PricingPlanId': 25934,
        'Name': 'Mobilt 40Gb',
        'Description': 'Mobil 40GB',
        'Quantity': 0,
        'MinimumQuantity': 0,
        'MaximumQuantity': 1,
        'Amount': 289.0000,
        'BillerRuleInstanceAmounts': [{
          'Amount': 139.0000,
          'CurrencyCode': 'SEK',
          'BillerRuleConfigurationId': '1933160506879001800',
          'Name': 'Mobile Monthly Charge',
          'Description': 'Mobile Monthly Charge',
          'Type': 0,
          'BulkChargeTypeCode': null,
          'TermAmount': null,
          'RemainingBalance': null,
          'MinimumDownPayment': null,
          'ChargeAmount': 289.0000,
          'DiscountAmount': 150.0000,
          'IsValid': true
        }],
        'BillerRuleInstanceThumbnails': [{
          'Id': 249,
          'Status': 2,
          'Amount': 289.0000,
          'DiscountAmount': 150.0000,
          'CurrencyCode': 'SEK',
          'BillerRuleConfigurationId': '1933160506879001800',
          'Type': 0,
          'RecurringPeriodTypeCode': '3'
        }],
        'PricingPlanBillerRuleInstances': {
          'ProductId': 390494,
          'PricingPlanId': 25934,
          'RecurringBillerRuleInstances': [{
            'BillerRuleConfigurationId': '1933160506879001800',
            'CurrencyCode': 'SEK',
            'BillerRuleInstanceCharges': [{
              'ChargeAmount': 289.0000
            }],
            'GuidanceCode': null,
            'DefaultActivationStatus': 2,
            'TaxAssociationCode': null,
            'UseActiveQuantity': false,
            'AllowChargeOverride': false,
            'AdHoc': false,
            'Credit': false,
            'InvoiceProperties': {},
            'QuantityPricingTypeCode': 1,
            'RecurringPeriodType': 3,
            'BillerRuleConfigurationChargeDetails': {
              'ChargeTiming': 4,
              'CycleLevel': 1,
              'TaxAssociationCode': 'Telephony Wireless Service',
              'TaxType': 1,
              'PaymentReservationRequired': false
            },
            'BulkChargeTypeCode': null,
            'Type': 0,
            'Id': 249,
            'BillerRuleInstanceDiscounts': [{
              'Added': '2021-01-14T03:43:25.723Z',
              'Modified': '2021-01-14T03:43:25.723Z',
              'Status': 1,
              'Id': 98,
              'DiscountId': 2932,
              'IsDefault': true,
              'AllowDiscountOverride': false
            }]
          }],
          'TriggerBillerRuleInstances': [{
            'BillerRuleConfigurationId': '1933663039580000400',
            'BillerRuleInstanceGuid': '1778ebfb-ae63-406a-9676-d68321780e75',
            'Name': 'Mobil First Use',
            'DisplayName': 'Mobil First Use',
            'Actions': [{
              'BillerRuleConfigurationId': '1933160506879001800',
              'ActivationStatus': 3
            }, {
              'BillerRuleConfigurationId': '1933160613987000500',
              'ActivationStatus': 3
            }],
            'TriggerType': 2,
            'Type': 7,
            'Id': 251
          }],
          'OneTimeBillerRuleInstances': [],
          'UsageBillerRuleInstances': [],
          'CustomBillerRuleInstances': [],
          'EntitlementBillerRuleInstances': [{
            'BillerRuleConfigurationId': '1933160613987000500',
            'EntitlementName': 'Mobil Data',
            'EntitlementContextTypeCode': 1,
            'UsageCost': 0.00000000,
            'EntitlementGroups': [],
            'Type': 3,
            'Id': 250,
            'BillerRuleInstanceDiscounts': []
          }],
          'EarlyTerminationFeeBillerRuleInstances': [],
          'FinanceBillerRuleInstances': [],
          'SubscriptionBillerRuleInstances': []
        },
        'BulkDetails': [],
        'Deposits': [],
        'CurrencyCode': 'SEK',
        'DiscountAmount': 150.0000,
        'Bulk': false,
        'HasServiceIdentifier': false,
        'Items': [],
        'DefaultSelectedDiscounts': [{
          'DiscountId': 2932,
          'BillerRuleConfigurationId': '1933160506879001800',
          'DiscountAmount': 150.0000,
          'IsGlobal': false
        }],
        'Weight': 40,
        'OrderScenario': 1
      }, {
        'Id': '2101412849977004500',
        'PricingPlanId': 25932,
        'Name': 'Mobilt 18Gb',
        'Description': 'Mobil 18GB',
        'Quantity': 0,
        'MinimumQuantity': 0,
        'MaximumQuantity': 1,
        'Amount': 199.0000,
        'BillerRuleInstanceAmounts': [{
          'Amount': 99.0000,
          'CurrencyCode': 'SEK',
          'BillerRuleConfigurationId': '1933160506879001800',
          'Name': 'Mobile Monthly Charge',
          'Description': 'Mobile Monthly Charge',
          'Type': 0,
          'BulkChargeTypeCode': null,
          'TermAmount': null,
          'RemainingBalance': null,
          'MinimumDownPayment': null,
          'ChargeAmount': 199.0000,
          'DiscountAmount': 100.0000,
          'IsValid': true
        }],
        'BillerRuleInstanceThumbnails': [{
          'Id': 243,
          'Status': 2,
          'Amount': 199.0000,
          'DiscountAmount': 100.0000,
          'CurrencyCode': 'SEK',
          'BillerRuleConfigurationId': '1933160506879001800',
          'Type': 0,
          'RecurringPeriodTypeCode': '3'
        }],
        'PricingPlanBillerRuleInstances': {
          'ProductId': 390494,
          'PricingPlanId': 25932,
          'RecurringBillerRuleInstances': [{
            'BillerRuleConfigurationId': '1933160506879001800',
            'CurrencyCode': 'SEK',
            'BillerRuleInstanceCharges': [{
              'ChargeAmount': 199.0000
            }],
            'GuidanceCode': null,
            'DefaultActivationStatus': 2,
            'TaxAssociationCode': null,
            'UseActiveQuantity': false,
            'AllowChargeOverride': false,
            'AdHoc': false,
            'Credit': false,
            'InvoiceProperties': {},
            'QuantityPricingTypeCode': 1,
            'RecurringPeriodType': 3,
            'BillerRuleConfigurationChargeDetails': {
              'ChargeTiming': 4,
              'CycleLevel': 1,
              'TaxAssociationCode': 'Telephony Wireless Service',
              'TaxType': 1,
              'PaymentReservationRequired': false
            },
            'BulkChargeTypeCode': null,
            'Type': 0,
            'Id': 243,
            'BillerRuleInstanceDiscounts': [{
              'Added': '2021-01-14T03:30:47.310Z',
              'Modified': '2021-01-14T03:30:47.310Z',
              'Status': 1,
              'Id': 94,
              'DiscountId': 2930,
              'IsDefault': true,
              'AllowDiscountOverride': false
            }]
          }],
          'TriggerBillerRuleInstances': [{
            'BillerRuleConfigurationId': '1933663039580000400',
            'BillerRuleInstanceGuid': '76dd6649-6c09-4789-b883-a7565f694148',
            'Name': 'Mobil First Use',
            'DisplayName': 'Mobil First Use',
            'Actions': [{
              'BillerRuleConfigurationId': '1933160506879001800',
              'ActivationStatus': 3
            }, {
              'BillerRuleConfigurationId': '1933160613987000500',
              'ActivationStatus': 3
            }],
            'TriggerType': 2,
            'Type': 7,
            'Id': 245
          }],
          'OneTimeBillerRuleInstances': [],
          'UsageBillerRuleInstances': [],
          'CustomBillerRuleInstances': [],
          'EntitlementBillerRuleInstances': [{
            'BillerRuleConfigurationId': '1933160613987000500',
            'EntitlementName': 'Mobil Data',
            'EntitlementContextTypeCode': 1,
            'UsageCost': 0.00000000,
            'EntitlementGroups': [],
            'Type': 3,
            'Id': 244,
            'BillerRuleInstanceDiscounts': []
          }],
          'EarlyTerminationFeeBillerRuleInstances': [],
          'FinanceBillerRuleInstances': [],
          'SubscriptionBillerRuleInstances': []
        },
        'BulkDetails': [],
        'Deposits': [],
        'CurrencyCode': 'SEK',
        'DiscountAmount': 100.0000,
        'Bulk': false,
        'HasServiceIdentifier': false,
        'Items': [],
        'DefaultSelectedDiscounts': [{
          'DiscountId': 2930,
          'BillerRuleConfigurationId': '1933160506879001800',
          'DiscountAmount': 100.0000,
          'IsGlobal': false
        }],
        'Weight': 30,
        'OrderScenario': 1
      }, {
        'Id': '2101413688656004300',
        'PricingPlanId': 25935,
        'Name': 'Mobilt 10Gb',
        'Description': 'Mobil 10GB',
        'Quantity': 0,
        'MinimumQuantity': 0,
        'MaximumQuantity': 1,
        'Amount': 149.0000,
        'BillerRuleInstanceAmounts': [{
          'Amount': 69.0000,
          'CurrencyCode': 'SEK',
          'BillerRuleConfigurationId': '1933160506879001800',
          'Name': 'Mobile Monthly Charge',
          'Description': 'Mobile Monthly Charge',
          'Type': 0,
          'BulkChargeTypeCode': null,
          'TermAmount': null,
          'RemainingBalance': null,
          'MinimumDownPayment': null,
          'ChargeAmount': 149.0000,
          'DiscountAmount': 80.0000,
          'IsValid': true
        }],
        'BillerRuleInstanceThumbnails': [{
          'Id': 252,
          'Status': 2,
          'Amount': 149.0000,
          'DiscountAmount': 80.0000,
          'CurrencyCode': 'SEK',
          'BillerRuleConfigurationId': '1933160506879001800',
          'Type': 0,
          'RecurringPeriodTypeCode': '3'
        }],
        'PricingPlanBillerRuleInstances': {
          'ProductId': 390494,
          'PricingPlanId': 25935,
          'RecurringBillerRuleInstances': [{
            'BillerRuleConfigurationId': '1933160506879001800',
            'CurrencyCode': 'SEK',
            'BillerRuleInstanceCharges': [{
              'ChargeAmount': 149.0000
            }],
            'GuidanceCode': null,
            'DefaultActivationStatus': 2,
            'TaxAssociationCode': null,
            'UseActiveQuantity': false,
            'AllowChargeOverride': false,
            'AdHoc': false,
            'Credit': false,
            'InvoiceProperties': {},
            'QuantityPricingTypeCode': 1,
            'RecurringPeriodType': 3,
            'BillerRuleConfigurationChargeDetails': {
              'ChargeTiming': 4,
              'CycleLevel': 1,
              'TaxAssociationCode': 'Telephony Wireless Service',
              'TaxType': 1,
              'PaymentReservationRequired': false
            },
            'BulkChargeTypeCode': null,
            'Type': 0,
            'Id': 252,
            'BillerRuleInstanceDiscounts': [{
              'Added': '2021-01-14T03:47:13.193Z',
              'Modified': '2021-01-14T03:47:13.193Z',
              'Status': 1,
              'Id': 100,
              'DiscountId': 2929,
              'IsDefault': true,
              'AllowDiscountOverride': false
            }]
          }],
          'TriggerBillerRuleInstances': [{
            'BillerRuleConfigurationId': '1933663039580000400',
            'BillerRuleInstanceGuid': 'ffd26746-39fa-4a5d-a682-7bf412f81262',
            'Name': 'Mobil First Use',
            'DisplayName': 'Mobil First Use',
            'Actions': [{
              'BillerRuleConfigurationId': '1933160506879001800',
              'ActivationStatus': 3
            }, {
              'BillerRuleConfigurationId': '1933160613987000500',
              'ActivationStatus': 3
            }],
            'TriggerType': 2,
            'Type': 7,
            'Id': 254
          }],
          'OneTimeBillerRuleInstances': [],
          'UsageBillerRuleInstances': [],
          'CustomBillerRuleInstances': [],
          'EntitlementBillerRuleInstances': [{
            'BillerRuleConfigurationId': '1933160613987000500',
            'EntitlementName': 'Mobil Data',
            'EntitlementContextTypeCode': 1,
            'UsageCost': 0.00000000,
            'EntitlementGroups': [],
            'Type': 3,
            'Id': 253,
            'BillerRuleInstanceDiscounts': []
          }],
          'EarlyTerminationFeeBillerRuleInstances': [],
          'FinanceBillerRuleInstances': [],
          'SubscriptionBillerRuleInstances': []
        },
        'BulkDetails': [],
        'Deposits': [],
        'CurrencyCode': 'SEK',
        'DiscountAmount': 80.0000,
        'Bulk': false,
        'HasServiceIdentifier': false,
        'Items': [],
        'DefaultSelectedDiscounts': [{
          'DiscountId': 2929,
          'BillerRuleConfigurationId': '1933160506879001800',
          'DiscountAmount': 80.0000,
          'IsGlobal': false
        }],
        'Weight': 20,
        'OrderScenario': 1
      }, {
        'Id': '2101413220074002900',
        'PricingPlanId': 25933,
        'Name': 'Mobilt 3Gb',
        'Description': 'Mobil 3GB',
        'Quantity': 1,
        'MinimumQuantity': 0,
        'MaximumQuantity': 1,
        'Amount': 99.0000,
        'BillerRuleInstanceAmounts': [{
          'Amount': 49.0000,
          'CurrencyCode': 'SEK',
          'BillerRuleConfigurationId': '1933160506879001800',
          'Name': 'Mobile Monthly Charge',
          'Description': 'Mobile Monthly Charge',
          'Type': 0,
          'BulkChargeTypeCode': null,
          'TermAmount': null,
          'RemainingBalance': null,
          'MinimumDownPayment': null,
          'ChargeAmount': 99.0000,
          'DiscountAmount': 50.0000,
          'IsValid': true
        }],
        'BillerRuleInstanceThumbnails': [{
          'Id': 246,
          'Status': 2,
          'Amount': 99.0000,
          'DiscountAmount': 50.0000,
          'CurrencyCode': 'SEK',
          'BillerRuleConfigurationId': '1933160506879001800',
          'Type': 0,
          'RecurringPeriodTypeCode': '3'
        }],
        'PricingPlanBillerRuleInstances': {
          'ProductId': 390494,
          'PricingPlanId': 25933,
          'RecurringBillerRuleInstances': [{
            'BillerRuleConfigurationId': '1933160506879001800',
            'CurrencyCode': 'SEK',
            'BillerRuleInstanceCharges': [{
              'ChargeAmount': 99.0000
            }],
            'GuidanceCode': null,
            'DefaultActivationStatus': 2,
            'TaxAssociationCode': null,
            'UseActiveQuantity': false,
            'AllowChargeOverride': false,
            'AdHoc': false,
            'Credit': false,
            'InvoiceProperties': {},
            'QuantityPricingTypeCode': 1,
            'RecurringPeriodType': 3,
            'BillerRuleConfigurationChargeDetails': {
              'ChargeTiming': 4,
              'CycleLevel': 1,
              'TaxAssociationCode': 'Telephony Wireless Service',
              'TaxType': 1,
              'PaymentReservationRequired': false
            },
            'BulkChargeTypeCode': null,
            'Type': 0,
            'Id': 246,
            'BillerRuleInstanceDiscounts': [{
              'Added': '2021-01-14T03:38:45.773Z',
              'Modified': '2021-01-14T03:39:01.787Z',
              'Status': 1,
              'Id': 96,
              'DiscountId': 2931,
              'IsDefault': true,
              'AllowDiscountOverride': false
            }]
          }],
          'TriggerBillerRuleInstances': [{
            'BillerRuleConfigurationId': '1933663039580000400',
            'BillerRuleInstanceGuid': '77417c82-8dab-43e1-9e60-2407b1f61bdc',
            'Name': 'Mobil First Use',
            'DisplayName': 'Mobil First Use',
            'Actions': [{
              'BillerRuleConfigurationId': '1933160506879001800',
              'ActivationStatus': 3
            }, {
              'BillerRuleConfigurationId': '1933160613987000500',
              'ActivationStatus': 3
            }],
            'TriggerType': 2,
            'Type': 7,
            'Id': 248
          }],
          'OneTimeBillerRuleInstances': [],
          'UsageBillerRuleInstances': [],
          'CustomBillerRuleInstances': [],
          'EntitlementBillerRuleInstances': [{
            'BillerRuleConfigurationId': '1933160613987000500',
            'EntitlementName': 'Mobil Data',
            'EntitlementContextTypeCode': 1,
            'UsageCost': 0.00000000,
            'EntitlementGroups': [],
            'Type': 3,
            'Id': 247,
            'BillerRuleInstanceDiscounts': []
          }],
          'EarlyTerminationFeeBillerRuleInstances': [],
          'FinanceBillerRuleInstances': [],
          'SubscriptionBillerRuleInstances': []
        },
        'BulkDetails': [],
        'Deposits': [],
        'CurrencyCode': 'SEK',
        'DiscountAmount': 50.0000,
        'Bulk': false,
        'HasServiceIdentifier': false,
        'Items': [],
        'DefaultSelectedDiscounts': [{
          'DiscountId': 2931,
          'BillerRuleConfigurationId': '1933160506879001800',
          'DiscountAmount': 50.0000,
          'IsGlobal': false
        }],
        'OfferingDecisionOptionInstances': [{
          'SelectedDiscounts': [{
            'DiscountId': 2931,
            'BillerRuleConfigurationId': '1933160506879001800',
            'DiscountAmount': 50.0000,
            'IsGlobal': false
          }]
        }],
        'Weight': 10,
        'OrderScenario': 1
      }],
      'NextDecisionId': '2_1933739917203002402',
      'MinimumQuantity': 0,
      'MaximumQuantity': 0,
      'RemainingOrderableQuantity': 0,
      'AllowEdit': true,
      'DisallowEditReason': null
    }, {
      'Id': '2_1933739917203002402',
      'DecisionType': 2,
      'Name': 'Mobil SMS',
      'ProductId': 390495,
      'PageId': '0',
      'DisplayOrder': 2147483647,
      'Options': [{
        'Id': '1933739917203002409',
        'PricingPlanId': 24474,
        'Name': 'Mobil SMS',
        'Quantity': 1,
        'MinimumQuantity': 0,
        'MaximumQuantity': 1,
        'Amount': 0.0000,
        'BillerRuleInstanceAmounts': [{
          'Amount': 0.0000,
          'CurrencyCode': 'SEK',
          'BillerRuleConfigurationId': '1933160506879001800',
          'Name': 'Mobile Monthly Charge',
          'Description': 'Mobile Monthly Charge',
          'Type': 0,
          'BulkChargeTypeCode': null,
          'TermAmount': null,
          'RemainingBalance': null,
          'MinimumDownPayment': null,
          'ChargeAmount': 0.0000,
          'IsValid': true
        }],
        'BillerRuleInstanceThumbnails': [{
          'Id': 48,
          'Status': 2,
          'Amount': 0.0000,
          'DiscountAmount': null,
          'CurrencyCode': 'SEK',
          'BillerRuleConfigurationId': '1933160506879001800',
          'Type': 0,
          'RecurringPeriodTypeCode': '3'
        }],
        'PricingPlanBillerRuleInstances': {
          'ProductId': 390495,
          'PricingPlanId': 24474,
          'RecurringBillerRuleInstances': [{
            'BillerRuleConfigurationId': '1933160506879001800',
            'CurrencyCode': 'SEK',
            'BillerRuleInstanceCharges': [{
              'ChargeAmount': 0.0000
            }],
            'GuidanceCode': null,
            'DefaultActivationStatus': 2,
            'TaxAssociationCode': null,
            'UseActiveQuantity': false,
            'AllowChargeOverride': false,
            'AdHoc': false,
            'Credit': false,
            'InvoiceProperties': {},
            'QuantityPricingTypeCode': 1,
            'RecurringPeriodType': 3,
            'BillerRuleConfigurationChargeDetails': {
              'ChargeTiming': 4,
              'CycleLevel': 1,
              'TaxAssociationCode': 'Telephony Wireless Service',
              'TaxType': 1,
              'PaymentReservationRequired': false
            },
            'BulkChargeTypeCode': null,
            'Type': 0,
            'Id': 48,
            'BillerRuleInstanceDiscounts': []
          }],
          'TriggerBillerRuleInstances': [{
            'BillerRuleConfigurationId': '1933663039580000400',
            'BillerRuleInstanceGuid': 'f66e9c9f-1632-45be-93e8-3fde1dfefa1a',
            'Name': 'Mobil First Use',
            'DisplayName': 'Mobil First Use',
            'Actions': [{
              'BillerRuleConfigurationId': '1933160506879001800',
              'ActivationStatus': 3
            }, {
              'BillerRuleConfigurationId': '1933160613987000501',
              'ActivationStatus': 3
            }],
            'TriggerType': 2,
            'Type': 7,
            'Id': 50
          }],
          'OneTimeBillerRuleInstances': [],
          'UsageBillerRuleInstances': [],
          'CustomBillerRuleInstances': [],
          'EntitlementBillerRuleInstances': [{
            'BillerRuleConfigurationId': '1933160613987000501',
            'EntitlementName': 'Mobil SMS',
            'EntitlementContextTypeCode': 1,
            'UsageCost': 0.00000000,
            'EntitlementGroups': [],
            'Type': 3,
            'Id': 49,
            'BillerRuleInstanceDiscounts': []
          }],
          'EarlyTerminationFeeBillerRuleInstances': [],
          'FinanceBillerRuleInstances': [],
          'SubscriptionBillerRuleInstances': []
        },
        'BulkDetails': [],
        'Deposits': [],
        'CurrencyCode': 'SEK',
        'DiscountAmount': 0.0,
        'Bulk': false,
        'HasServiceIdentifier': false,
        'Items': [],
        'OfferingDecisionOptionInstances': [{}],
        'Weight': 0,
        'OrderScenario': 1
      }],
      'PreviousDecisionId': '2_1933739917203002401',
      'NextDecisionId': '2_1933739917203002403',
      'MinimumQuantity': 0,
      'MaximumQuantity': 0,
      'RemainingOrderableQuantity': 0,
      'AllowEdit': true,
      'DisallowEditReason': null
    }, {
      'Id': '2_1933739917203002403',
      'DecisionType': 2,
      'Name': 'Mobil Voice',
      'ProductId': 390496,
      'PageId': '0',
      'DisplayOrder': 2147483647,
      'Options': [{
        'Id': '1933739917203002410',
        'PricingPlanId': 24475,
        'Name': 'Mobil Voice',
        'Quantity': 1,
        'MinimumQuantity': 0,
        'MaximumQuantity': 1,
        'Amount': 0.0000,
        'BillerRuleInstanceAmounts': [{
          'Amount': 0.0000,
          'CurrencyCode': 'SEK',
          'BillerRuleConfigurationId': '1933160506879001800',
          'Name': 'Mobile Monthly Charge',
          'Description': 'Mobile Monthly Charge',
          'Type': 0,
          'BulkChargeTypeCode': null,
          'TermAmount': null,
          'RemainingBalance': null,
          'MinimumDownPayment': null,
          'ChargeAmount': 0.0000,
          'IsValid': true
        }],
        'BillerRuleInstanceThumbnails': [{
          'Id': 51,
          'Status': 2,
          'Amount': 0.0000,
          'DiscountAmount': null,
          'CurrencyCode': 'SEK',
          'BillerRuleConfigurationId': '1933160506879001800',
          'Type': 0,
          'RecurringPeriodTypeCode': '3'
        }],
        'PricingPlanBillerRuleInstances': {
          'ProductId': 390496,
          'PricingPlanId': 24475,
          'RecurringBillerRuleInstances': [{
            'BillerRuleConfigurationId': '1933160506879001800',
            'CurrencyCode': 'SEK',
            'BillerRuleInstanceCharges': [{
              'ChargeAmount': 0.0000
            }],
            'GuidanceCode': null,
            'DefaultActivationStatus': 2,
            'TaxAssociationCode': null,
            'UseActiveQuantity': false,
            'AllowChargeOverride': false,
            'AdHoc': false,
            'Credit': false,
            'InvoiceProperties': {},
            'QuantityPricingTypeCode': 1,
            'RecurringPeriodType': 3,
            'BillerRuleConfigurationChargeDetails': {
              'ChargeTiming': 4,
              'CycleLevel': 1,
              'TaxAssociationCode': 'Telephony Wireless Service',
              'TaxType': 1,
              'PaymentReservationRequired': false
            },
            'BulkChargeTypeCode': null,
            'Type': 0,
            'Id': 51,
            'BillerRuleInstanceDiscounts': []
          }],
          'TriggerBillerRuleInstances': [{
            'BillerRuleConfigurationId': '1933663039580000400',
            'BillerRuleInstanceGuid': '78aa1189-c056-4990-a8d8-fbcae10dfc01',
            'Name': 'Mobil First Use',
            'DisplayName': 'Mobil First Use',
            'Actions': [{
              'BillerRuleConfigurationId': '1933160506879001800',
              'ActivationStatus': 3
            }, {
              'BillerRuleConfigurationId': '1933160613987000502',
              'ActivationStatus': 3
            }],
            'TriggerType': 2,
            'Type': 7,
            'Id': 53
          }],
          'OneTimeBillerRuleInstances': [],
          'UsageBillerRuleInstances': [],
          'CustomBillerRuleInstances': [],
          'EntitlementBillerRuleInstances': [{
            'BillerRuleConfigurationId': '1933160613987000502',
            'EntitlementName': 'Mobil Voice',
            'EntitlementContextTypeCode': 1,
            'UsageCost': 0.00000000,
            'EntitlementGroups': [],
            'Type': 3,
            'Id': 52,
            'BillerRuleInstanceDiscounts': []
          }],
          'EarlyTerminationFeeBillerRuleInstances': [],
          'FinanceBillerRuleInstances': [],
          'SubscriptionBillerRuleInstances': []
        },
        'BulkDetails': [],
        'Deposits': [],
        'CurrencyCode': 'SEK',
        'DiscountAmount': 0.0,
        'Bulk': false,
        'HasServiceIdentifier': false,
        'Items': [],
        'OfferingDecisionOptionInstances': [{}],
        'Weight': 0,
        'OrderScenario': 1
      }],
      'PreviousDecisionId': '2_1933739917203002402',
      'MinimumQuantity': 0,
      'MaximumQuantity': 0,
      'RemainingOrderableQuantity': 0,
      'AllowEdit': true,
      'DisallowEditReason': null
    }],
    'ValueDecisions': [],
    'RequiredOptions': [{
      'ProductId': 390493,
      'PricingPlanId': 24473
    }],
    'DeliveryDecisions': []
  },
  'ShoppingCart': {
    'Currency': 'SEK',
    'GrossAmount': 99.0000,
    'DiscountAmount': 50.0000,
    'DepositAmount': 0.0,
    'TotalAmount': 49.0000,
    'ShippingRequired': false,
    'HasSubscription': false,
    'PaymentInstrumentRequired': true,
    'BillerRuleTotals': [{
      'Amount': 0.0000,
      'TotalAmount': 0.0000,
      'InvoiceTiming': 1,
      'ChargeTiming': 3,
      'PeriodTypeCode': '99',
      'Type': 2
    }, {
      'Amount': 99.0000,
      'DiscountAmount': 50.0000,
      'TotalAmount': 49.0000,
      'InvoiceTiming': 1,
      'ChargeTiming': 4,
      'PeriodTypeCode': '3',
      'Type': 0
    }],
    'SubTotals': {
      'DueNextInvoice': null,
      'DueToday': 0.0000,
      'DueOnActivation': null,
      'DueOnFirstUse': 49.0000
    },
    'Offerings': [{
      'OfferingId': '1933739917203002400',
      'IsChangeable': true
    }],
    'HasOffCycleChargeRenewal': false,
    'Items': [{
      'ProductId': 390493,
      'PricingPlanId': 24473,
      'OfferingId': '1933739917203002400',
      'OrderedOfferingId': '1933739917203002400',
      'OrderedOfferingName': 'Mobil',
      'OfferingOptionPriceId': '1933739917203002400',
      'OfferingOptionId': '',
      'Quantity': 1,
      'Details': {
        'Product': {
          'Id': 390493,
          'Name': 'Mobil Connection',
          'StructureType': 1,
          'ImageUrl': 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          'ThumbnailUrl': 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          'ReferenceDate': '2019-10-15T14:22:36.667Z',
          'ExternalReferences': [{
            'Id': 50102,
            'ExternalId': 'BenefitApplicability',
            'Value': 'MOBILE'
          }, {
            'Id': 50112,
            'ExternalId': 'PRODUCT_IDENTIFIER',
            'Value': 'MOBILE_CONNECTION'
          }],
          'IndexName': 'Mobil Connection',
          'AllowMultiplePurchases': true,
          'Standalone': true,
          'LineOfBusiness': 10012,
          'Subscription': false,
          'ProductClassification': 1,
          'Services': [],
          'MaxNonBulkQuantity': 50,
          'MaxBulkQuantity': 30000,
          'LineOfBusinessName': 'Wireless',
          'Status': 1
        },
        'PricingPlan': {
          'ProductId': 390493,
          'AddDate': '2019-12-03T09:47:48.563Z',
          'ModDate': '2020-01-24T13:27:08.507Z',
          'Id': 24473,
          'Name': 'Mobil Connection',
          'PricingPlanName': 'Mobil Connection',
          'ChargeAmount': 0.0000,
          'RenewalChargeAmount': 0.0000,
          'SecondaryRenewalAmount': 0.0000,
          'Currency': 'SEK',
          'Type': 2,
          'BillerRuleInstanceThumbnails': [{
            'Id': 47,
            'Status': 1,
            'Amount': 0.0000,
            'DiscountAmount': null,
            'CurrencyCode': 'SEK',
            'BillerRuleConfigurationId': '1933160555183001800',
            'Type': 2,
            'RecurringPeriodTypeCode': '99'
          }],
          'PricingPlanBillerRuleInstances': {
            'ProductId': 390493,
            'PricingPlanId': 24473,
            'RecurringBillerRuleInstances': [],
            'TriggerBillerRuleInstances': [],
            'OneTimeBillerRuleInstances': [{
              'BillerRuleConfigurationId': '1933160555183001800',
              'CurrencyCode': 'SEK',
              'BillerRuleInstanceCharges': [{
                'ChargeAmount': 0.0000
              }],
              'TaxAssociationCode': null,
              'GuidanceCode': null,
              'DefaultActivationStatus': 1,
              'AllowChargeOverride': false,
              'AdHoc': false,
              'Credit': false,
              'InvoiceProperties': {},
              'QuantityPricingTypeCode': 1,
              'InvoiceTiming': 1,
              'BillerRuleConfigurationChargeDetails': {
                'ChargeTiming': 3,
                'CycleLevel': 1,
                'TaxAssociationCode': 'Telephony Wireless Service',
                'TaxType': 1,
                'PaymentReservationRequired': false
              },
              'BulkChargeTypeCode': null,
              'Type': 2,
              'Id': 47,
              'BillerRuleInstanceDiscounts': []
            }],
            'UsageBillerRuleInstances': [],
            'CustomBillerRuleInstances': [],
            'EntitlementBillerRuleInstances': [],
            'EarlyTerminationFeeBillerRuleInstances': [],
            'FinanceBillerRuleInstances': [],
            'SubscriptionBillerRuleInstances': []
          },
          'Deposits': [],
          'ServiceTiers': [{
            'Id': 2,
            'ServiceTierId': 1,
            'ServiceTierName': 'Default',
            'ServiceId': 1,
            'ServiceName': 'Penny Mobile'
          }],
          'TopDeliveryCapabilityId': 30356,
          'HasConvergentBillerExtension': true,
          'DeliveryCapabilityCodes': [30356],
          'AvailableWithinOffering': true,
          'AvailableAsStandalone': false,
          'ProductPricingPlanAssociationExternalReferences': [],
          'ServiceRelationshipType': 0,
          'IsShippable': false
        },
        'GrossAmount': 0.0000,
        'TotalAmount': 0.0000,
        'PerItemGrossAmount': 0.0,
        'PerItemTotalAmount': 0.0000,
        'BundleItemGrossAmount': 0.0,
        'BundleItemTotalAmount': 0.0,
        'BillerRuleTotals': [{
          'Amount': 0.0000,
          'TotalAmount': 0.0000,
          'InvoiceTiming': 1,
          'ChargeTiming': 3,
          'PeriodTypeCode': '99',
          'Type': 2
        }],
        'BillerRuleConfigurationDetails': [{
          'Id': 47,
          'BillerRuleConfigurationId': '1933160555183001800',
          'Type': 2,
          'WashStatus': 2,
          'TermLength': 0,
          'FullUpfrontPayment': false
        }]
      },
      'Discounts': [],
      'Deposits': [],
      'ServiceAttributes': [{
        'Value': 'MOBILE',
        'Editable': false,
        'ServiceAttributeId': 1000007,
        'ServiceId': 1,
        'ServiceAttributeName': 'Shipping Type',
        'ServiceAttributeType': 3
      }],
      'OrderItemChangeType': null,
      'OrderContractId': null,
      'ExternalContractId': null,
      'EligibleForBuyersRemorse': false,
      'DeliveryType': 1
    }, {
      'ProductId': 390494,
      'PricingPlanId': 25933,
      'OfferingId': '1933739917203002400',
      'OrderedOfferingId': '1933739917203002400',
      'OrderedOfferingName': 'Mobil',
      'OfferingOptionPriceId': '2101413220074002900',
      'OfferingOptionId': '2_1933739917203002401',
      'Quantity': 1,
      'Details': {
        'Product': {
          'Id': 390494,
          'Name': 'Mobil Data',
          'StructureType': 1,
          'ImageUrl': 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          'ThumbnailUrl': 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          'ReferenceDate': '2019-10-17T11:33:21.030Z',
          'ExternalReferences': [{
            'Id': 50102,
            'ExternalId': 'BenefitApplicability',
            'Value': 'MOBILE'
          }],
          'IndexName': 'Mobil Data',
          'AllowMultiplePurchases': true,
          'Standalone': true,
          'LineOfBusiness': 10012,
          'PageId': '1933150267545001800',
          'Subscription': false,
          'ProductClassification': 1,
          'Services': [],
          'MaxNonBulkQuantity': 50,
          'MaxBulkQuantity': 30000,
          'LineOfBusinessName': 'Wireless',
          'Status': 1
        },
        'PricingPlan': {
          'ProductId': 390494,
          'AddDate': '2021-01-14T03:36:10.140Z',
          'ModDate': '2021-01-14T03:37:52.500Z',
          'Id': 25933,
          'Name': 'Mobilt 3Gb',
          'PricingPlanName': 'Mobilt 3Gb',
          'Description': 'Mobil 3GB',
          'ChargeAmount': 0.0000,
          'RenewalChargeAmount': 0.0000,
          'SecondaryRenewalAmount': 0.0000,
          'Currency': 'SEK',
          'Type': 2,
          'BillerRuleInstanceThumbnails': [{
            'Id': 246,
            'Status': 2,
            'Amount': 99.0000,
            'DiscountAmount': 50.0000,
            'CurrencyCode': 'SEK',
            'BillerRuleConfigurationId': '1933160506879001800',
            'Type': 0,
            'RecurringPeriodTypeCode': '3'
          }],
          'PricingPlanBillerRuleInstances': {
            'ProductId': 390494,
            'PricingPlanId': 25933,
            'RecurringBillerRuleInstances': [{
              'BillerRuleConfigurationId': '1933160506879001800',
              'CurrencyCode': 'SEK',
              'BillerRuleInstanceCharges': [{
                'ChargeAmount': 99.0000
              }],
              'GuidanceCode': null,
              'DefaultActivationStatus': 2,
              'TaxAssociationCode': null,
              'UseActiveQuantity': false,
              'AllowChargeOverride': false,
              'AdHoc': false,
              'Credit': false,
              'InvoiceProperties': {},
              'QuantityPricingTypeCode': 1,
              'RecurringPeriodType': 3,
              'BillerRuleConfigurationChargeDetails': {
                'ChargeTiming': 4,
                'CycleLevel': 1,
                'TaxAssociationCode': 'Telephony Wireless Service',
                'TaxType': 1,
                'PaymentReservationRequired': false
              },
              'BulkChargeTypeCode': null,
              'Type': 0,
              'Id': 246,
              'BillerRuleInstanceDiscounts': [{
                'Added': '2021-01-14T03:38:45.773Z',
                'Modified': '2021-01-14T03:39:01.787Z',
                'Status': 1,
                'Id': 96,
                'DiscountId': 2931,
                'IsDefault': true,
                'AllowDiscountOverride': false
              }]
            }],
            'TriggerBillerRuleInstances': [{
              'BillerRuleConfigurationId': '1933663039580000400',
              'BillerRuleInstanceGuid': '77417c82-8dab-43e1-9e60-2407b1f61bdc',
              'Name': 'Mobil First Use',
              'DisplayName': 'Mobil First Use',
              'Actions': [{
                'BillerRuleConfigurationId': '1933160506879001800',
                'ActivationStatus': 3
              }, {
                'BillerRuleConfigurationId': '1933160613987000500',
                'ActivationStatus': 3
              }],
              'TriggerType': 2,
              'Type': 7,
              'Id': 248
            }],
            'OneTimeBillerRuleInstances': [],
            'UsageBillerRuleInstances': [],
            'CustomBillerRuleInstances': [],
            'EntitlementBillerRuleInstances': [{
              'BillerRuleConfigurationId': '1933160613987000500',
              'EntitlementName': 'Mobil Data',
              'EntitlementContextTypeCode': 1,
              'UsageCost': 0.00000000,
              'EntitlementGroups': [],
              'Type': 3,
              'Id': 247,
              'BillerRuleInstanceDiscounts': []
            }],
            'EarlyTerminationFeeBillerRuleInstances': [],
            'FinanceBillerRuleInstances': [],
            'SubscriptionBillerRuleInstances': []
          },
          'Deposits': [],
          'ServiceTiers': [{
            'Id': 171,
            'ServiceTierId': 15,
            'ServiceTierName': 'Default',
            'ServiceId': 7,
            'ServiceName': 'Penny Mobile Data'
          }],
          'TopDeliveryCapabilityId': 30356,
          'HasConvergentBillerExtension': true,
          'DeliveryCapabilityCodes': [30356],
          'AvailableWithinOffering': true,
          'AvailableAsStandalone': false,
          'ProductPricingPlanAssociationExternalReferences': [],
          'Duration': 1,
          'DurationPeriodType': 3,
          'ExcludeFromGracePeriod': false,
          'ServiceRelationshipType': 0,
          'IsShippable': false
        },
        'GrossAmount': 99.0000,
        'TotalAmount': 99.0000,
        'PerItemGrossAmount': 0.0,
        'PerItemTotalAmount': 99.0000,
        'BundleItemGrossAmount': 0.0,
        'BundleItemTotalAmount': 0.0,
        'DiscountDescription': 'Mobilt 3Gb',
        'BillerRuleTotals': [{
          'Amount': 99.0000,
          'DiscountAmount': 50.0000,
          'TotalAmount': 49.0000,
          'InvoiceTiming': 1,
          'ChargeTiming': 4,
          'PeriodTypeCode': '3',
          'Type': 0
        }],
        'BillerRuleConfigurationDetails': []
      },
      'Discounts': [{
        'DiscountId': 2931,
        'BillerRuleConfigurationId': '1933160506879001800',
        'Name': 'Mobilt 3Gb',
        'Amount': 50.0000,
        'Type': 0,
        'PeriodTypeCode': '3',
        'AmountOverride': null,
        'Status': 1
      }],
      'Deposits': [],
      'ServiceAttributes': [],
      'OrderItemChangeType': null,
      'OrderContractId': null,
      'ExternalContractId': null,
      'EligibleForBuyersRemorse': false
    }, {
      'ProductId': 390495,
      'PricingPlanId': 24474,
      'OfferingId': '1933739917203002400',
      'OrderedOfferingId': '1933739917203002400',
      'OrderedOfferingName': 'Mobil',
      'OfferingOptionPriceId': '1933739917203002409',
      'OfferingOptionId': '2_1933739917203002402',
      'Quantity': 1,
      'Details': {
        'Product': {
          'Id': 390495,
          'Name': 'Mobil SMS',
          'StructureType': 1,
          'ImageUrl': 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          'ThumbnailUrl': 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          'ReferenceDate': '2019-10-17T11:44:26.743Z',
          'IndexName': 'Mobil SMS',
          'AllowMultiplePurchases': true,
          'Standalone': true,
          'LineOfBusiness': 10012,
          'Subscription': false,
          'ProductClassification': 1,
          'Services': [],
          'MaxNonBulkQuantity': 50,
          'MaxBulkQuantity': 30000,
          'LineOfBusinessName': 'Wireless',
          'Status': 1
        },
        'PricingPlan': {
          'ProductId': 390495,
          'AddDate': '2019-12-03T09:47:50.907Z',
          'ModDate': '2020-04-09T03:03:31.677Z',
          'Id': 24474,
          'Name': 'Mobil SMS',
          'PricingPlanName': 'Mobil SMS',
          'ChargeAmount': 0.0000,
          'RenewalChargeAmount': 0.0000,
          'SecondaryRenewalAmount': 0.0000,
          'Currency': 'SEK',
          'Type': 2,
          'BillerRuleInstanceThumbnails': [{
            'Id': 48,
            'Status': 2,
            'Amount': 0.0000,
            'DiscountAmount': null,
            'CurrencyCode': 'SEK',
            'BillerRuleConfigurationId': '1933160506879001800',
            'Type': 0,
            'RecurringPeriodTypeCode': '3'
          }],
          'PricingPlanBillerRuleInstances': {
            'ProductId': 390495,
            'PricingPlanId': 24474,
            'RecurringBillerRuleInstances': [{
              'BillerRuleConfigurationId': '1933160506879001800',
              'CurrencyCode': 'SEK',
              'BillerRuleInstanceCharges': [{
                'ChargeAmount': 0.0000
              }],
              'GuidanceCode': null,
              'DefaultActivationStatus': 2,
              'TaxAssociationCode': null,
              'UseActiveQuantity': false,
              'AllowChargeOverride': false,
              'AdHoc': false,
              'Credit': false,
              'InvoiceProperties': {},
              'QuantityPricingTypeCode': 1,
              'RecurringPeriodType': 3,
              'BillerRuleConfigurationChargeDetails': {
                'ChargeTiming': 4,
                'CycleLevel': 1,
                'TaxAssociationCode': 'Telephony Wireless Service',
                'TaxType': 1,
                'PaymentReservationRequired': false
              },
              'BulkChargeTypeCode': null,
              'Type': 0,
              'Id': 48,
              'BillerRuleInstanceDiscounts': []
            }],
            'TriggerBillerRuleInstances': [{
              'BillerRuleConfigurationId': '1933663039580000400',
              'BillerRuleInstanceGuid': 'f66e9c9f-1632-45be-93e8-3fde1dfefa1a',
              'Name': 'Mobil First Use',
              'DisplayName': 'Mobil First Use',
              'Actions': [{
                'BillerRuleConfigurationId': '1933160506879001800',
                'ActivationStatus': 3
              }, {
                'BillerRuleConfigurationId': '1933160613987000501',
                'ActivationStatus': 3
              }],
              'TriggerType': 2,
              'Type': 7,
              'Id': 50
            }],
            'OneTimeBillerRuleInstances': [],
            'UsageBillerRuleInstances': [],
            'CustomBillerRuleInstances': [],
            'EntitlementBillerRuleInstances': [{
              'BillerRuleConfigurationId': '1933160613987000501',
              'EntitlementName': 'Mobil SMS',
              'EntitlementContextTypeCode': 1,
              'UsageCost': 0.00000000,
              'EntitlementGroups': [],
              'Type': 3,
              'Id': 49,
              'BillerRuleInstanceDiscounts': []
            }],
            'EarlyTerminationFeeBillerRuleInstances': [],
            'FinanceBillerRuleInstances': [],
            'SubscriptionBillerRuleInstances': []
          },
          'Deposits': [],
          'ServiceTiers': [],
          'TopDeliveryCapabilityId': 30356,
          'HasConvergentBillerExtension': true,
          'DeliveryCapabilityCodes': [30356],
          'AvailableWithinOffering': true,
          'AvailableAsStandalone': false,
          'ProductPricingPlanAssociationExternalReferences': [],
          'Duration': 1,
          'DurationPeriodType': 3,
          'ServiceRelationshipType': 0,
          'IsShippable': false
        },
        'GrossAmount': 0.0000,
        'TotalAmount': 0.0000,
        'PerItemGrossAmount': 0.0,
        'PerItemTotalAmount': 0.0000,
        'BundleItemGrossAmount': 0.0,
        'BundleItemTotalAmount': 0.0,
        'BillerRuleTotals': [{
          'Amount': 0.0000,
          'TotalAmount': 0.0000,
          'InvoiceTiming': 1,
          'ChargeTiming': 4,
          'PeriodTypeCode': '3',
          'Type': 0
        }],
        'BillerRuleConfigurationDetails': []
      },
      'Discounts': [],
      'Deposits': [],
      'ServiceAttributes': [],
      'OrderItemChangeType': null,
      'OrderContractId': null,
      'ExternalContractId': null,
      'EligibleForBuyersRemorse': false
    }, {
      'ProductId': 390496,
      'PricingPlanId': 24475,
      'OfferingId': '1933739917203002400',
      'OrderedOfferingId': '1933739917203002400',
      'OrderedOfferingName': 'Mobil',
      'OfferingOptionPriceId': '1933739917203002410',
      'OfferingOptionId': '2_1933739917203002403',
      'Quantity': 1,
      'Details': {
        'Product': {
          'Id': 390496,
          'Name': 'Mobil Voice',
          'StructureType': 1,
          'ImageUrl': 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          'ThumbnailUrl': 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          'ReferenceDate': '2019-10-17T11:48:43.727Z',
          'IndexName': 'Mobil Voice',
          'AllowMultiplePurchases': true,
          'Standalone': true,
          'LineOfBusiness': 10012,
          'Subscription': false,
          'ProductClassification': 1,
          'Services': [],
          'MaxNonBulkQuantity': 50,
          'MaxBulkQuantity': 30000,
          'LineOfBusinessName': 'Wireless',
          'Status': 1
        },
        'PricingPlan': {
          'ProductId': 390496,
          'AddDate': '2019-12-03T09:47:53.657Z',
          'ModDate': '2020-04-09T03:04:27.240Z',
          'Id': 24475,
          'Name': 'Mobil Voice',
          'PricingPlanName': 'Mobil Voice',
          'ChargeAmount': 0.0000,
          'RenewalChargeAmount': 0.0000,
          'SecondaryRenewalAmount': 0.0000,
          'Currency': 'SEK',
          'Type': 2,
          'BillerRuleInstanceThumbnails': [{
            'Id': 51,
            'Status': 2,
            'Amount': 0.0000,
            'DiscountAmount': null,
            'CurrencyCode': 'SEK',
            'BillerRuleConfigurationId': '1933160506879001800',
            'Type': 0,
            'RecurringPeriodTypeCode': '3'
          }],
          'PricingPlanBillerRuleInstances': {
            'ProductId': 390496,
            'PricingPlanId': 24475,
            'RecurringBillerRuleInstances': [{
              'BillerRuleConfigurationId': '1933160506879001800',
              'CurrencyCode': 'SEK',
              'BillerRuleInstanceCharges': [{
                'ChargeAmount': 0.0000
              }],
              'GuidanceCode': null,
              'DefaultActivationStatus': 2,
              'TaxAssociationCode': null,
              'UseActiveQuantity': false,
              'AllowChargeOverride': false,
              'AdHoc': false,
              'Credit': false,
              'InvoiceProperties': {},
              'QuantityPricingTypeCode': 1,
              'RecurringPeriodType': 3,
              'BillerRuleConfigurationChargeDetails': {
                'ChargeTiming': 4,
                'CycleLevel': 1,
                'TaxAssociationCode': 'Telephony Wireless Service',
                'TaxType': 1,
                'PaymentReservationRequired': false
              },
              'BulkChargeTypeCode': null,
              'Type': 0,
              'Id': 51,
              'BillerRuleInstanceDiscounts': []
            }],
            'TriggerBillerRuleInstances': [{
              'BillerRuleConfigurationId': '1933663039580000400',
              'BillerRuleInstanceGuid': '78aa1189-c056-4990-a8d8-fbcae10dfc01',
              'Name': 'Mobil First Use',
              'DisplayName': 'Mobil First Use',
              'Actions': [{
                'BillerRuleConfigurationId': '1933160506879001800',
                'ActivationStatus': 3
              }, {
                'BillerRuleConfigurationId': '1933160613987000502',
                'ActivationStatus': 3
              }],
              'TriggerType': 2,
              'Type': 7,
              'Id': 53
            }],
            'OneTimeBillerRuleInstances': [],
            'UsageBillerRuleInstances': [],
            'CustomBillerRuleInstances': [],
            'EntitlementBillerRuleInstances': [{
              'BillerRuleConfigurationId': '1933160613987000502',
              'EntitlementName': 'Mobil Voice',
              'EntitlementContextTypeCode': 1,
              'UsageCost': 0.00000000,
              'EntitlementGroups': [],
              'Type': 3,
              'Id': 52,
              'BillerRuleInstanceDiscounts': []
            }],
            'EarlyTerminationFeeBillerRuleInstances': [],
            'FinanceBillerRuleInstances': [],
            'SubscriptionBillerRuleInstances': []
          },
          'Deposits': [],
          'ServiceTiers': [],
          'TopDeliveryCapabilityId': 30356,
          'HasConvergentBillerExtension': true,
          'DeliveryCapabilityCodes': [30356],
          'AvailableWithinOffering': true,
          'AvailableAsStandalone': false,
          'ProductPricingPlanAssociationExternalReferences': [],
          'Duration': 1,
          'DurationPeriodType': 3,
          'ServiceRelationshipType': 0,
          'IsShippable': false
        },
        'GrossAmount': 0.0000,
        'TotalAmount': 0.0000,
        'PerItemGrossAmount': 0.0,
        'PerItemTotalAmount': 0.0000,
        'BundleItemGrossAmount': 0.0,
        'BundleItemTotalAmount': 0.0,
        'BillerRuleTotals': [{
          'Amount': 0.0000,
          'TotalAmount': 0.0000,
          'InvoiceTiming': 1,
          'ChargeTiming': 4,
          'PeriodTypeCode': '3',
          'Type': 0
        }],
        'BillerRuleConfigurationDetails': []
      },
      'Discounts': [],
      'Deposits': [],
      'ServiceAttributes': [],
      'OrderItemChangeType': null,
      'OrderContractId': null,
      'ExternalContractId': null,
      'EligibleForBuyersRemorse': false
    }]
  },
  'AddItems': [],
  'ModifyItems': [],
  'TransitionOutcomes': [],
  'PricingPlanIdsNotFulfillingRequiredPricingPlanConditions': []
};
