export const updateShoppingCart: any = {
  'ShoppingCart': {
    'Currency': 'SEK',
    'GrossAmount': 0.0000,
    'DiscountAmount': 0.0000,
    'DepositAmount': 0.0,
    'TotalAmount': 0.0000,
    'ShippingRequired': false,
    'HasSubscription': false,
    'PaymentInstrumentRequired': false,
    'BillerRuleTotals': [],
    'SubTotals': null,
    'AppliedCoupons': '',
    'Offerings': null,
    'HasOffCycleChargeRenewal': false,
    'Id': '535234',
    'Modified': '2021-04-13T11:51:20.830Z',
    'Items': [{
      'ProductId': 822310,
      'PricingPlanId': 51889,
      'OfferingId': '2025926970328000800',
      'OfferingInstanceId': '2110342680650000300',
      'OrderedOfferingId': '2025926970328000800',
      'OfferingOptionPriceId': '2025926970328000800',
      'Quantity': 1,
      'Details': {
        'Product': {
          'Id': 822310,
          'Name': 'Mobil Connection',
          'StructureType': 1,
          'ImageUrl': 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          'ThumbnailUrl': 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          'ReferenceDate': '2019-10-15T14:22:36.667Z',
          'ExternalReferences': [{
            'Id': 50453,
            'ExternalId': 'BenefitApplicability',
            'Value': 'MOBILE'
          }, {
            'Id': 50455,
            'ExternalId': 'PRODUCT_IDENTIFIER',
            'Value': 'MOBILE_CONNECTION'
          }],
          'IndexName': 'Mobil Connection',
          'AllowMultiplePurchases': true,
          'Standalone': true,
          'LineOfBusiness': 10096,
          'Subscription': false,
          'ProductClassification': 1,
          'Services': [],
          'MaxNonBulkQuantity': 50,
          'MaxBulkQuantity': 30000,
          'LineOfBusinessName': 'Wireless',
          'Status': 1
        },
        'PricingPlan': {
          'ProductId': 822310,
          'AddDate': '2020-09-14T14:51:38.283Z',
          'ModDate': '2020-09-14T14:51:38.283Z',
          'Id': 51889,
          'Name': 'Mobil Connection',
          'PricingPlanName': 'Mobil Connection',
          'ChargeAmount': 0.0000,
          'RenewalChargeAmount': 0.0000,
          'SecondaryRenewalAmount': 0.0000,
          'Currency': 'SEK',
          'Type': 2,
          'BillerRuleInstanceThumbnails': [{
            'Id': 8763,
            'Status': 1,
            'Amount': 0.0000,
            'DiscountAmount': null,
            'CurrencyCode': 'SEK',
            'BillerRuleConfigurationId': '2025827581296000800',
            'Type': 2,
            'RecurringPeriodTypeCode': '99'
          }],
          'PricingPlanBillerRuleInstances': {
            'ProductId': 822310,
            'PricingPlanId': 51889,
            'RecurringBillerRuleInstances': [],
            'TriggerBillerRuleInstances': [],
            'OneTimeBillerRuleInstances': [{
              'BillerRuleConfigurationId': '2025827581296000800',
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
              'Id': 8763,
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
            'Id': 5159,
            'ServiceTierId': 723,
            'ServiceTierName': 'Default',
            'ServiceId': 248,
            'ServiceName': 'Penny Mobile'
          }],
          'TopDeliveryCapabilityId': 30493,
          'HasConvergentBillerExtension': true,
          'DeliveryCapabilityCodes': [30493],
          'AvailableWithinOffering': true,
          'AvailableAsStandalone': false,
          'ProductPricingPlanAssociationExternalReferences': [],
          'ExcludeFromGracePeriod': false,
          'ServiceRelationshipType': 0,
          'IsShippable': false
        },
        'GrossAmount': 0.0000,
        'TotalAmount': 0.0000,
        'PerItemGrossAmount': 0.0000,
        'PerItemTotalAmount': 0.0000,
        'BundleItemGrossAmount': 0.0,
        'BundleItemTotalAmount': 0.0,
        'DiscountStorefrontText': ''
      },
      'ServiceAttributes': [{
        'Value': 'MOBILE',
        'Editable': false,
        'ServiceAttributeId': 1000366,
        'ServiceId': 248,
        'ServiceAttributeType': 0
      }, {
        'Value': 'Nytt nummer',
        'Editable': false,
        'ServiceAttributeId': 1000354,
        'ServiceId': 248,
        'ServiceAttributeType': 0
      }, {
        'Value': '46790761537',
        'Editable': false,
        'ServiceAttributeId': 1000368,
        'ServiceId': 248,
        'IsServiceIdentifier': true,
        'ServiceAttributeType': 0,
        'ServiceInstanceId': '2110342680066000300'
      }, {
        'Value': 'Nej',
        'Editable': false,
        'ServiceAttributeId': 1000342,
        'ServiceId': 248,
        'ServiceAttributeType': 0
      }, {
        'Value': '99999',
        'Editable': false,
        'ServiceAttributeId': 1000340,
        'ServiceId': 248,
        'ServiceAttributeType': 0
      }, {
        'Value': '01/01/0000',
        'Editable': false,
        'ServiceAttributeId': 1000361,
        'ServiceId': 248,
        'ServiceAttributeType': 0
      }, {
        'Value': '2021-04-14',
        'Editable': false,
        'ServiceAttributeId': 1000341,
        'ServiceId': 248,
        'ServiceAttributeType': 0
      }],
      'InventoryItemReservations': [{
        'InventoryTypeId': '2025821804770000800',
        'InstanceId': '46790761537',
        'Token': '46790761537||46790761537||8cf3cba5-1c6b-4827-bf8f-be75f24e9679',
        'SerialNumber': '46790761537'
      }],
      'OrderItemChangeType': null,
      'OrderContractId': null,
      'ExternalContractId': null,
      'EligibleForBuyersRemorse': false
    }, {
      'ProductId': 822313,
      'PricingPlanId': 51933,
      'OfferingId': '2025926970328000800',
      'OfferingInstanceId': '2110342680650000300',
      'OrderedOfferingId': '2025926970328000800',
      'OfferingOptionPriceId': '2025926970328000810',
      'Quantity': 1,
      'Details': {
        'Product': {
          'Id': 822313,
          'Name': 'Mobil SMS',
          'StructureType': 1,
          'ImageUrl': 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          'ThumbnailUrl': 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          'ReferenceDate': '2019-10-17T11:44:26.743Z',
          'IndexName': 'Mobil SMS',
          'AllowMultiplePurchases': true,
          'Standalone': true,
          'LineOfBusiness': 10096,
          'Subscription': false,
          'ProductClassification': 1,
          'Services': [],
          'MaxNonBulkQuantity': 50,
          'MaxBulkQuantity': 30000,
          'LineOfBusinessName': 'Wireless',
          'Status': 1
        },
        'PricingPlan': {
          'ProductId': 822313,
          'AddDate': '2020-09-15T06:39:03.417Z',
          'ModDate': '2020-09-15T06:39:03.417Z',
          'Id': 51933,
          'Name': 'Mobil SMS',
          'PricingPlanName': 'Mobil SMS',
          'ChargeAmount': 0.0000,
          'RenewalChargeAmount': 0.0000,
          'SecondaryRenewalAmount': 0.0000,
          'Currency': 'SEK',
          'Type': 2,
          'BillerRuleInstanceThumbnails': [{
            'Id': 8846,
            'Status': 2,
            'Amount': 0.0000,
            'DiscountAmount': null,
            'CurrencyCode': 'SEK',
            'BillerRuleConfigurationId': '2025826023384000300',
            'Type': 0,
            'RecurringPeriodTypeCode': '3'
          }, {
            'Id': 8847,
            'Status': 1,
            'Amount': null,
            'DiscountAmount': null,
            'CurrencyCode': null,
            'BillerRuleConfigurationId': '2025826732118000800',
            'Type': 3,
            'RecurringPeriodTypeCode': '99'
          }, {
            'Id': 8848,
            'Status': 1,
            'Amount': null,
            'DiscountAmount': null,
            'CurrencyCode': null,
            'BillerRuleConfigurationId': '2025826837399000300',
            'Type': 7,
            'RecurringPeriodTypeCode': '99'
          }],
          'PricingPlanBillerRuleInstances': {
            'ProductId': 822313,
            'PricingPlanId': 51933,
            'RecurringBillerRuleInstances': [{
              'BillerRuleConfigurationId': '2025826023384000300',
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
              'Id': 8846,
              'BillerRuleInstanceDiscounts': []
            }],
            'TriggerBillerRuleInstances': [{
              'BillerRuleConfigurationId': '2025826837399000300',
              'BillerRuleInstanceGuid': '58dd80fb-a744-47fc-9296-9aa95ac45e54',
              'Name': 'Mobil First Use',
              'DisplayName': 'Mobil First Use',
              'Actions': [{
                'BillerRuleConfigurationId': '2025826023384000300',
                'ActivationStatus': 3
              }, {
                'BillerRuleConfigurationId': '2025826732118000800',
                'ActivationStatus': 3
              }],
              'TriggerType': 2,
              'Type': 7,
              'Id': 8848
            }],
            'OneTimeBillerRuleInstances': [],
            'UsageBillerRuleInstances': [],
            'CustomBillerRuleInstances': [],
            'EntitlementBillerRuleInstances': [{
              'BillerRuleConfigurationId': '2025826732118000800',
              'EntitlementName': 'Mobil SMS',
              'EntitlementContextTypeCode': 1,
              'UsageCost': 0.00000000,
              'EntitlementGroups': [],
              'Type': 3,
              'Id': 8847,
              'BillerRuleInstanceDiscounts': []
            }],
            'EarlyTerminationFeeBillerRuleInstances': [],
            'FinanceBillerRuleInstances': [],
            'SubscriptionBillerRuleInstances': []
          },
          'Deposits': [],
          'ServiceTiers': [],
          'TopDeliveryCapabilityId': 30493,
          'HasConvergentBillerExtension': true,
          'DeliveryCapabilityCodes': [30493],
          'AvailableWithinOffering': true,
          'AvailableAsStandalone': false,
          'ProductPricingPlanAssociationExternalReferences': [],
          'Duration': 1,
          'DurationPeriodType': 3,
          'ExcludeFromGracePeriod': false,
          'ServiceRelationshipType': 0,
          'IsShippable': false
        },
        'GrossAmount': 0.0000,
        'TotalAmount': 0.0000,
        'PerItemGrossAmount': 0.0000,
        'PerItemTotalAmount': 0.0000,
        'BundleItemGrossAmount': 0.0,
        'BundleItemTotalAmount': 0.0,
        'DiscountStorefrontText': ''
      },
      'OrderItemChangeType': null,
      'OrderContractId': null,
      'ExternalContractId': null,
      'EligibleForBuyersRemorse': false
    }, {
      'ProductId': 822314,
      'PricingPlanId': 51934,
      'OfferingId': '2025926970328000800',
      'OfferingInstanceId': '2110342680650000300',
      'OrderedOfferingId': '2025926970328000800',
      'OfferingOptionPriceId': '2025926970328000811',
      'Quantity': 1,
      'Details': {
        'Product': {
          'Id': 822314,
          'Name': 'Mobil Voice',
          'StructureType': 1,
          'ImageUrl': 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          'ThumbnailUrl': 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          'ReferenceDate': '2019-10-17T11:48:43.727Z',
          'IndexName': 'Mobil Voice',
          'AllowMultiplePurchases': true,
          'Standalone': true,
          'LineOfBusiness': 10096,
          'Subscription': false,
          'ProductClassification': 1,
          'Services': [],
          'MaxNonBulkQuantity': 50,
          'MaxBulkQuantity': 30000,
          'LineOfBusinessName': 'Wireless',
          'Status': 1
        },
        'PricingPlan': {
          'ProductId': 822314,
          'AddDate': '2020-09-15T06:39:04.287Z',
          'ModDate': '2020-09-15T06:39:04.287Z',
          'Id': 51934,
          'Name': 'Mobil Voice',
          'PricingPlanName': 'Mobil Voice',
          'ChargeAmount': 0.0000,
          'RenewalChargeAmount': 0.0000,
          'SecondaryRenewalAmount': 0.0000,
          'Currency': 'SEK',
          'Type': 2,
          'BillerRuleInstanceThumbnails': [{
            'Id': 8849,
            'Status': 2,
            'Amount': 0.0000,
            'DiscountAmount': null,
            'CurrencyCode': 'SEK',
            'BillerRuleConfigurationId': '2025826023384000300',
            'Type': 0,
            'RecurringPeriodTypeCode': '3'
          }, {
            'Id': 8850,
            'Status': 1,
            'Amount': null,
            'DiscountAmount': null,
            'CurrencyCode': null,
            'BillerRuleConfigurationId': '2025826732123000800',
            'Type': 3,
            'RecurringPeriodTypeCode': '99'
          }, {
            'Id': 8851,
            'Status': 1,
            'Amount': null,
            'DiscountAmount': null,
            'CurrencyCode': null,
            'BillerRuleConfigurationId': '2025826837399000300',
            'Type': 7,
            'RecurringPeriodTypeCode': '99'
          }],
          'PricingPlanBillerRuleInstances': {
            'ProductId': 822314,
            'PricingPlanId': 51934,
            'RecurringBillerRuleInstances': [{
              'BillerRuleConfigurationId': '2025826023384000300',
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
              'Id': 8849,
              'BillerRuleInstanceDiscounts': []
            }],
            'TriggerBillerRuleInstances': [{
              'BillerRuleConfigurationId': '2025826837399000300',
              'BillerRuleInstanceGuid': 'fa33705d-3c0c-4d78-a9de-33661133528d',
              'Name': 'Mobil First Use',
              'DisplayName': 'Mobil First Use',
              'Actions': [{
                'BillerRuleConfigurationId': '2025826023384000300',
                'ActivationStatus': 3
              }, {
                'BillerRuleConfigurationId': '2025826732123000800',
                'ActivationStatus': 3
              }],
              'TriggerType': 2,
              'Type': 7,
              'Id': 8851
            }],
            'OneTimeBillerRuleInstances': [],
            'UsageBillerRuleInstances': [],
            'CustomBillerRuleInstances': [],
            'EntitlementBillerRuleInstances': [{
              'BillerRuleConfigurationId': '2025826732123000800',
              'EntitlementName': 'Mobil Voice',
              'EntitlementContextTypeCode': 1,
              'UsageCost': 0.00000000,
              'EntitlementGroups': [],
              'Type': 3,
              'Id': 8850,
              'BillerRuleInstanceDiscounts': []
            }],
            'EarlyTerminationFeeBillerRuleInstances': [],
            'FinanceBillerRuleInstances': [],
            'SubscriptionBillerRuleInstances': []
          },
          'Deposits': [],
          'ServiceTiers': [],
          'TopDeliveryCapabilityId': 30493,
          'HasConvergentBillerExtension': true,
          'DeliveryCapabilityCodes': [30493],
          'AvailableWithinOffering': true,
          'AvailableAsStandalone': false,
          'ProductPricingPlanAssociationExternalReferences': [],
          'Duration': 1,
          'DurationPeriodType': 3,
          'ExcludeFromGracePeriod': false,
          'ServiceRelationshipType': 0,
          'IsShippable': false
        },
        'GrossAmount': 0.0000,
        'TotalAmount': 0.0000,
        'PerItemGrossAmount': 0.0000,
        'PerItemTotalAmount': 0.0000,
        'BundleItemGrossAmount': 0.0,
        'BundleItemTotalAmount': 0.0,
        'DiscountStorefrontText': ''
      },
      'OrderItemChangeType': null,
      'OrderContractId': null,
      'ExternalContractId': null,
      'EligibleForBuyersRemorse': false
    }, {
      'ProductId': 822312,
      'PricingPlanId': 53263,
      'OfferingId': '2025926970328000800',
      'OfferingInstanceId': '2110342680650000300',
      'OrderedOfferingId': '2025926970328000800',
      'OfferingOptionPriceId': '2101545741452000601',
      'Quantity': 1,
      'Details': {
        'Product': {
          'Id': 822312,
          'Name': 'Mobil Data',
          'StructureType': 1,
          'ImageUrl': 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          'ThumbnailUrl': 'https://d2lv54fl5s826n.cloudfront.net/sbx/ascendon_logo.png',
          'ReferenceDate': '2019-10-17T11:33:21.030Z',
          'IndexName': 'Mobil Data',
          'AllowMultiplePurchases': true,
          'Standalone': true,
          'LineOfBusiness': 10096,
          'PageId': '2025557045432000800',
          'Subscription': false,
          'ProductClassification': 1,
          'Services': [],
          'MaxNonBulkQuantity': 50,
          'MaxBulkQuantity': 30000,
          'LineOfBusinessName': 'Wireless',
          'Status': 1
        },
        'PricingPlan': {
          'ProductId': 822312,
          'AddDate': '2021-01-15T11:54:16.273Z',
          'ModDate': '2021-01-27T14:12:50.067Z',
          'Id': 53263,
          'Name': 'Mobilt 3Gb',
          'PricingPlanName': 'Mobilt 3Gb',
          'Description': 'Mobilt 3Gb',
          'ChargeAmount': 0.0000,
          'RenewalChargeAmount': 0.0000,
          'SecondaryRenewalAmount': 0.0000,
          'Currency': 'SEK',
          'Type': 2,
          'BillerRuleInstanceThumbnails': [{
            'Id': 10106,
            'Status': 2,
            'Amount': 99.0000,
            'DiscountAmount': null,
            'CurrencyCode': 'SEK',
            'BillerRuleConfigurationId': '2025826023384000300',
            'Type': 0,
            'RecurringPeriodTypeCode': '3'
          }, {
            'Id': 10107,
            'Status': 1,
            'Amount': null,
            'DiscountAmount': null,
            'CurrencyCode': null,
            'BillerRuleConfigurationId': '2025826732112000800',
            'Type': 3,
            'RecurringPeriodTypeCode': '99'
          }, {
            'Id': 10108,
            'Status': 1,
            'Amount': null,
            'DiscountAmount': null,
            'CurrencyCode': null,
            'BillerRuleConfigurationId': '2025826837399000300',
            'Type': 7,
            'RecurringPeriodTypeCode': '99'
          }],
          'PricingPlanBillerRuleInstances': {
            'ProductId': 822312,
            'PricingPlanId': 53263,
            'RecurringBillerRuleInstances': [{
              'BillerRuleConfigurationId': '2025826023384000300',
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
              'LocationCode': 1,
              'Type': 0,
              'Id': 10106,
              'BillerRuleInstanceDiscounts': [{
                'Added': '2021-01-15T12:09:52.777Z',
                'Modified': '2021-01-27T14:12:50.097Z',
                'Status': 1,
                'Id': 2114,
                'DiscountId': 3291,
                'IsDefault': true,
                'AllowDiscountOverride': false
              }]
            }],
            'TriggerBillerRuleInstances': [{
              'BillerRuleConfigurationId': '2025826837399000300',
              'BillerRuleInstanceGuid': '7e08fbdd-3cce-4e56-8d3a-cf47326ed87f',
              'Name': 'Mobil First Use',
              'DisplayName': 'Mobil First Use',
              'Actions': [{
                'BillerRuleConfigurationId': '2025826023384000300',
                'ActivationStatus': 3
              }, {
                'BillerRuleConfigurationId': '2025826732112000800',
                'ActivationStatus': 3
              }],
              'TriggerType': 2,
              'Type': 7,
              'Id': 10108
            }],
            'OneTimeBillerRuleInstances': [],
            'UsageBillerRuleInstances': [],
            'CustomBillerRuleInstances': [],
            'EntitlementBillerRuleInstances': [{
              'BillerRuleConfigurationId': '2025826732112000800',
              'EntitlementName': 'Mobil Data',
              'EntitlementContextTypeCode': 1,
              'UsageCost': 0.00000000,
              'EntitlementGroups': [],
              'Type': 3,
              'Id': 10107,
              'BillerRuleInstanceDiscounts': []
            }],
            'EarlyTerminationFeeBillerRuleInstances': [],
            'FinanceBillerRuleInstances': [],
            'SubscriptionBillerRuleInstances': []
          },
          'Deposits': [],
          'ServiceTiers': [{
            'Id': 6032,
            'ServiceTierId': 670,
            'ServiceTierName': 'Default',
            'ServiceId': 245,
            'ServiceName': 'Penny Mobile Data'
          }],
          'TopDeliveryCapabilityId': 30493,
          'HasConvergentBillerExtension': true,
          'DeliveryCapabilityCodes': [30493],
          'AvailableWithinOffering': true,
          'AvailableAsStandalone': false,
          'ProductPricingPlanAssociationExternalReferences': [],
          'Duration': 1,
          'DurationPeriodType': 3,
          'ExcludeFromGracePeriod': false,
          'ServiceRelationshipType': 0,
          'IsShippable': false
        },
        'GrossAmount': 0.0000,
        'TotalAmount': 0.0000,
        'PerItemGrossAmount': 0.0000,
        'PerItemTotalAmount': 0.0000,
        'BundleItemGrossAmount': 0.0,
        'BundleItemTotalAmount': 0.0,
        'DiscountStorefrontText': ''
      },
      'Discounts': [{
        'DiscountId': 3291,
        'BillerRuleConfigurationId': '2025826023384000300',
        'Name': 'Mobilt 3Gb',
        'Amount': 50.0,
        'Type': 0,
        'PeriodTypeCode': '3',
        'AmountOverride': null,
        'Status': 1
      }],
      'OrderItemChangeType': null,
      'OrderContractId': null,
      'ExternalContractId': null,
      'EligibleForBuyersRemorse': false
    }]
  }
};
