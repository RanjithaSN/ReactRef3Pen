import { OFFERING_OVERALL_STATUS } from '@selfcare/core/redux/subscriberOfferings/subscriber.offering.constants';
import format from 'date-fns/format';
import { ENTITLEMENT_NAMES } from './products.constants';
import { ActiveWirelessProducts, AllowanceProduct, AllowancesForSelectedProduct, AllProducts, CrossSellProducts, HasPennyPlayProduct, IsHandlingProductAction, MainProductsList, PortInNumberFromAttributesOrCart, RightToReturnReasons, SelectedProduct, SelectedProductMobileEntitlements, SelectedProductSetting, SelectedProductValue, SubscriberProductTypes, UpcomingPaymentsAcrossProducts, UsageDetailsForSelectedProduct } from './products.selectors';
import { ShoppingCartItems } from './products.selectors.test.data';

describe('ProductsSelectors', () => {
  const selectedId = 'test00';

  const offerings = [{
    Name: 'test11',
    OfferingInstanceId: 'test11',
    OfferingId: '1234',
    DisplayName: 'My first test product',
    ThumbnailUrl: 'https://s3-us-east-2.amazonaws.com/csg-penny-dev/wp-content/uploads/2019/10/15191046/mobile.png',
    Options: [{
      PricingPlanId: 46574,
      SubscriberProductId: 222,
      SubscriberProductExpiration: {
        NextExpiryDate: undefined
      },
      ServiceAttributeValues: [{
        Value: 'Y'
      }, {
        Value: 343,
        IsServiceIdentifier: true
      }, {
        Value: 'MOBILE'
      }],
      LineOfBusinessName: 'Broadband',
      OfferingOptionPriceId: '123',
      OffCycleDetail: {
        NextRenewalDate: undefined
      }
    }, {
      PlanName: 'Small',
      ServiceAttributeValues: []
    }],
    CurrencyCode: 'SEK',
    Status: 1,
    TotalAmount: 399,
    ConnectedDate: undefined
  }, {
    Name: 'test12',
    OfferingInstanceId: 'test11',
    OfferingId: '1234',
    DisplayName: 'My second test product',
    Options: [{
      SubscriberProductExpiration: {
        NextExpiryDate: undefined
      },
      ServiceAttributeValues: [{
        Value: 'Y'
      }, {
        Value: 343,
        IsServiceIdentifier: true
      }, {
        Value: 'MOBILE'
      }],
      LineOfBusinessName: 'Broadband',
      OffCycleDetail: {
        NextRenewalDate: undefined
      }
    }, {
      PlanName: 'Small',
      ServiceAttributeValues: []
    }],
    CurrencyCode: 'SEK',
    Status: 1,
    TotalAmount: 399,
    ConnectedDate: undefined
  }];

  const primaryDecision = {
    test11: {
      Options: [{
        Id: '343'
      }, {
        Id: '123'
      }]
    }
  };

  const externalReferences = {
    Broadband: {
      offerId: '1234',
      type: 'Broadband1',
      status: 'Loaded'
    }
  };


  const allExpectedOfferings = [
    {
      billing: {
        nextChargeDate: 'Invalid Date',
        totalAmount: 0
      },
      campaign: {
        amount: 0,
        totalAmount: 0,
        discountExpirationDate: 'Invalid Date',
        discountHasNotCycledOff: false
      },
      canOptOutOnRenew: false,
      currencyCode: 'SEK',
      device: {
        attributes: {
          Value: 'test',
          ServiceAttributeId: 1
        },
        msisdn: 343,
        pukCode: null,
        sim: 1234
      },
      displayName: 'My first test product',
      thumbnailUrl: 'https://s3-us-east-2.amazonaws.com/csg-penny-dev/wp-content/uploads/2019/10/15191046/mobile.png',
      entitlements: [
        {
          BalanceConsumed: 2,
          BalanceRemaining: 3,
          BalanceUnitCode: '7',
          EntitlementName: 'Penny Data',
          ExpirationDate: undefined,
          InitialBalance: 5,
          ServiceIdentifier: {
            ServiceIdentifierName: 'SERVICE_NAME',
            Value: '343'
          },
          Unlimited: false,
          unitOfMeasure: 'GB'
        }
      ],
      id: 'test11',
      intentToPort: true,
      inventoryItem: {
        SubscriberProductId: 222,
        Items: [{
          Id: 3
        }]
      },
      isAllowance: false,
      isBroadband: true,
      isWireless: false,
      hasPrimaryOption: '',
      planName: null,
      name: 'test11',
      offeringId: '1234',
      offeringInstanceId: 'test11',

      options: [{
        SubscriberProductExpiration: {
          NextExpiryDate: undefined
        },
        OfferingOptionPriceId: '123',
        ServiceAttributeValues: [{
          Value: 'Y'
        }, {
          Value: 343,
          IsServiceIdentifier: true
        }, {
          Value: 'MOBILE'
        }],
        LineOfBusinessName: 'Broadband',
        SubscriberProductId: 222,
        PricingPlanId: 46574,
        OffCycleDetail: {
          NextRenewalDate: undefined
        }
      }, {
        PlanName: 'Small',
        ServiceAttributeValues: []
      }],
      productName: 'My first test product',
      rightToReturn: true,
      rightToReturnDaysLeft: {
        days: 14
      },
      serviceIdentifier: 343,
      status: 4,
      hasFirstUsage: false
    },
    {
      billing: {
        nextChargeDate: 'Invalid Date',
        totalAmount: 0
      },
      campaign: {
        amount: 0,
        totalAmount: 0,
        discountExpirationDate: 'Invalid Date',
        discountHasNotCycledOff: false
      },
      canOptOutOnRenew: false,
      currencyCode: 'SEK',
      device: {
        attributes: {
          Value: 'test',
          ServiceAttributeId: 1
        },
        msisdn: 343,
        pukCode: null,
        sim: 1234
      },
      displayName: 'My second test product',
      thumbnailUrl: '',
      entitlements: [{
        BalanceUnitCode: '7',
        InitialBalance: 5,
        BalanceRemaining: 3,
        ExpirationDate: undefined,
        ServiceIdentifier: {
          ServiceIdentifierName: 'SERVICE_NAME',
          Value: '343'
        },
        EntitlementName: 'Penny Data',
        Unlimited: false,
        BalanceConsumed: 2,
        unitOfMeasure: 'GB'
      }],
      id: 'test11',
      intentToPort: true,
      inventoryItem: undefined,
      isAllowance: false,
      isBroadband: true,
      isWireless: false,
      hasPrimaryOption: '',
      planName: null,
      name: 'test12',
      offeringId: '1234',
      offeringInstanceId: 'test11',
      productName: 'My second test product',
      options: [{
        SubscriberProductExpiration: {
          NextExpiryDate: undefined
        },
        ServiceAttributeValues: [{
          Value: 'Y'
        }, {
          Value: 343,
          IsServiceIdentifier: true
        }, {
          Value: 'MOBILE'
        }],
        LineOfBusinessName: 'Broadband',
        OffCycleDetail: {
          NextRenewalDate: undefined
        }
      }, {
        PlanName: 'Small',
        ServiceAttributeValues: []
      }],
      rightToReturn: true,
      rightToReturnDaysLeft: {
        days: 14
      },
      serviceIdentifier: 343,
      status: 4,
      hasFirstUsage: false
    }
  ];
  const entitlements = {
    545: [],
    343: [{
      BalanceUnitCode: '7',
      InitialBalance: 5,
      BalanceRemaining: 3,
      ExpirationDate: undefined,
      ServiceIdentifier: {
        ServiceIdentifierName: 'SERVICE_NAME',
        Value: '343'
      },
      EntitlementName: 'Penny Data',
      Unlimited: false,
      BalanceConsumed: 2,
      unitOfMeasure: 'GB'
    }]
  };

  // offering to use for selectedProduct selector tests
  const selectedProductOfferings = [{
    offeringInstanceId: 'notTheRightOne'
  }, {
    offeringInstanceId: 'test00',
    displayName: 'Display Name',
    productName: 'Display Name',
    CurrencyCode: 'SEK',
    rightToReturn: true,
    intentToPort: true,
    inventoryItem: {
      SubscriberProductId: 222,
      Items: [{
        Id: 3
      }]
    },
    device: {
      attributes: {
        Value: 'test',
        ServiceAttributeId: 1
      },
      msisdn: undefined,
      pukCode: null,
      sim: 1234
    },
    options: [],
    TotalAmount: '399',
    canOptOutOnRenew: true
  }];

  const subscriberInventory = [{
    SubscriberProductId: 222,
    Items: [{
      Id: 3
    }]
  }];

  const expected = {
    id: selectedProductOfferings[1].offeringInstanceId,
    displayName: selectedProductOfferings[1].displayName,
    productName: selectedProductOfferings[1].displayName,
    status: selectedProductOfferings[1].Status,
    currencyCode: selectedProductOfferings[1].CurrencyCode,
    options: [],
    billing: {
      totalAmount: selectedProductOfferings[1].TotalAmount,
      nextChargeDate: '2001-1-1'
    },
    campaign: {
      amount: '400',
      totalAmount: selectedProductOfferings[1].TotalAmount,
      discountExpirationDate: '2001-1-1',
      discountHasNotCycledOff: false
    },
    device: {
      msisdn: undefined,
      sim: 1234,
      attributes: {
        Value: 'test',
        ServiceAttributeId: 1
      },
      pukCode: null
    },
    canOptOutOnRenew: true,
    planName: 'Small',
    rightToReturn: true,
    inventoryItem: {
      SubscriberProductId: 222,
      Items: [{
        Id: 3
      }]
    },
    rightToReturnDaysLeft: {
      days: 14
    },
    intentToPort: true
  };
  describe('When AllProducts is used', () => {
    test('It should return null when there is no products', () => {
      expect(AllProducts.resultFunc([])).toEqual([]);
    });

    const valueDecisions = {
      Value: 'test',
      ServiceAttributeId: 1
    };

    xtest('It should return a formatted list when there are products', () => {
      expect(AllProducts.resultFunc(offerings, entitlements, entitlements, valueDecisions, subscriberInventory, primaryDecision, externalReferences)).toEqual(allExpectedOfferings);
    });
  });

  describe('When HasPennyPlayProduct is used', () => {
    test('It should return true if there is any product that is marked as penny play', () => {
      expect(HasPennyPlayProduct.resultFunc([{
        isPennyPlay: true
      }, {
        isBroadand: true
      }])).toBe(true);
    });
    test('It should return false if there is no product that is marked as penny play', () => {
      expect(HasPennyPlayProduct.resultFunc([{
        isPennyPlay: false
      }])).toBe(false);
      expect(HasPennyPlayProduct.resultFunc([{
        isBroadband: true
      }])).toBe(false);
      expect(HasPennyPlayProduct.resultFunc([])).toBe(false);
    });
  });

  describe('When SelectedProductValue is used', () => {
    test('It should return null when there is no selected product.', () => {
      expect(SelectedProductValue.resultFunc({})).toEqual(null);
    });
    test('It should return selected product Id when a product is selected', () => {
      expect(SelectedProductValue.resultFunc({
        selectedProductId: selectedId
      })).toEqual(selectedId);
    });
  });
  describe('When SelectedProduct is used', () => {
    test('It should return a base object when there is no selected product', () => {
      expect(SelectedProduct.resultFunc({}, selectedProductOfferings)).toEqual({
        name: '',
        id: null,
        externalDisplayName: null,
        isBenify: false,
        isPennyPlay: false,
        marketingTemplate: {},
        isStudent: false,
        rightToReturnTimeLeft: {
          days: 0,
          hours: 0
        },
        hasPrimaryOption: '',
        inGracePeriod: false,
        planName: '',
        displayServiceIdentifier: '',
        smsAndVoiceIds: [],
        futureActivationDate: '',
        primaryOptionDisplayInfo: {},
        offeringInstanceId: null,
        offeringId: null,
        displayName: null,
        hasFirstUsage: false,
        canOptOutOnRenew: false,
        options: [],
        status: null,
        productName: null,
        currencyCode: null,
        thumbnailUrl: '',
        serviceIdentifier: undefined,
        billing: {
          totalAmount: 0,
          nextChargeDate: '',
          unformattedNextChargeDate: '',
          paymentDevice: null
        },
        campaign: {
          amount: 0,
          totalAmount: 0,
          discountExpirationDate: '',
          discountHasNotCycledOff: false
        },
        inventoryItem: [],
        rightToReturn: true,
        intentToPort: false,
        isAllowance: false,
        isWireless: false,
        isBroadband: false,
        placeholder: true
      });
    });
    test('It should return selected product Id when a product is selected', () => {
      const result = SelectedProduct.resultFunc(selectedId, selectedProductOfferings, {}, [], subscriberInventory);
      expect(result.offeringInstanceId).toEqual(expected.id);
      expect(result.displayName).toEqual(expected.displayName);
      expect(result.options).toEqual(expected.options);
      expect(result.productName).toEqual(expected.productName);
      expect(result.rightToReturn).toEqual(expected.rightToReturn);
      expect(result.canOptOutOnRenew).toEqual(expected.canOptOutOnRenew);
      expect(result.intentToPort).toEqual(expected.intentToPort);
      expect(result.inventoryItem).toEqual(expected.inventoryItem);
      expect(result.device).toEqual(expected.device);
    });
  });
  describe('When IsHandlingProductAction is used', () => {
    test('It should return false when all the inputs are loaded.', () => {
      expect(IsHandlingProductAction.resultFunc(false, false, false, false, false, false, false, false)).toBe(false);
    });
    test('It should return true if ActivationIsLoading ', () => {
      expect(IsHandlingProductAction.resultFunc(true, false, false, false, false, false, false)).toBe(true);
    });
    test('It should return true if IsCalculatingDecisionBeingModified ', () => {
      expect(IsHandlingProductAction.resultFunc(false, true, false, false, false, false, false)).toBe(true);
    });
    test('It should return true if IsLoadingOfferingContextForDecision ', () => {
      expect(IsHandlingProductAction.resultFunc(false, false, true, false, false, false, false)).toBe(true);
    });
    test('It should return true if IsSubmittingOrder ', () => {
      expect(IsHandlingProductAction.resultFunc(false, false, false, true, false, false, false)).toBe(true);
    });
    test('It should return true if SubscriberOfferingsIsLoading ', () => {
      expect(IsHandlingProductAction.resultFunc(false, false, false, false, true, false, false)).toBe(true);
    });
    test('It should return true if HasOfferingContextStatusUpdating ', () => {
      expect(IsHandlingProductAction.resultFunc(false, false, false, false, false, true, false)).toBe(true);
    });
    test('It should return true if SubmitOneTimePaymentIsLoading ', () => {
      expect(IsHandlingProductAction.resultFunc(false, false, false, false, false, false, true)).toBe(true);
    });
  });

  describe('When MainProductsList is used', () => {
    test('It should return a list of wireless and broadband and products.', () => {
      const allowanceProduct = [{
        isAllowance: true,
        isBroadband: false,
        isWireless: false,
        id: 23
      }];
      expect(MainProductsList.resultFunc(allExpectedOfferings.concat(allowanceProduct))).toEqual(allExpectedOfferings);
    });
    test('It should return an empty array when there is no wireless or broadband products.', () => {
      expect(MainProductsList.resultFunc([])).toEqual([]);
    });
  });

  describe('When AllowanceProduct is used', () => {
    const allowanceProduct = [{
      isAllowance: true,
      isBroadband: false,
      isWireless: false,
      id: 23,
      options: []
    }];
    const allowanceMarketingTemplate = {
      Options: [{
        OptionPrices: [{
          Weight: 3,
          PricingPlanId: 4
        }]
      }],
      PricingPlanThumbnails: {
        4: {
          Name: 'Allowance',
          BillerRuleInstanceThumbnails: [{
            Amount: 400
          }]
        }
      }
    };
    const accountSummary = {
      EntitlementBalances: [{
        EntitlementName: 'Currency Allowance',
        BalanceRemaining: 1700
      }]
    };

    test('It should return an empty object if an allowance product is not found.', () => {
      expect(AllowanceProduct.resultFunc(allExpectedOfferings)).toEqual({});
    });

    test('It should return an empty object if an account summary is not found.', () => {
      expect(AllowanceProduct.resultFunc(allExpectedOfferings.concat(allowanceProduct), null, allowanceMarketingTemplate)).toEqual({});
    });

    test('It should return an empty object if an allowance marketing template is not found.', () => {
      expect(AllowanceProduct.resultFunc(allExpectedOfferings.concat(allowanceProduct), accountSummary, null)).toEqual({});
    });
  });

  describe('When SelectedProductMobileEntitlements is used', () => {
    test('it should return a condensed object of the entitlements, summing remaining data', () => {
      const todayDate = new Date();
      const todayDateString = `${todayDate.getMonth() + 1}/${todayDate.getDate()}/${todayDate.getFullYear()}`;
      const futureDateString = `${todayDate.getMonth() + 1}/${todayDate.getDate() + 5}/${todayDate.getFullYear()}`;
      const serviceIdentifier = 99882282;
      const product = {
        serviceIdentifier
      };
      const entitlementData = {
        [serviceIdentifier]: [
          {
            EntitlementName: ENTITLEMENT_NAMES.MOBILE_DATA,
            BalanceRemaining: 8,
            unitOfMeasure: 'GB',
            ExpirationDate: futureDateString // current
          }, {
            EntitlementName: ENTITLEMENT_NAMES.MOBILE_DATA,
            BalanceRemaining: 5,
            unitOfMeasure: 'GB',
            ExpirationDate: todayDateString // rollover
          }, {
            EntitlementName: ENTITLEMENT_NAMES.DATA_ADD_ON,
            BalanceRemaining: 3
          }, {
            EntitlementName: 'Some other name',
            BalanceRemaining: 1
          }
        ]
      };
      const roamingData = {
        [serviceIdentifier]: []
      };
      const result = SelectedProductMobileEntitlements.resultFunc([], product, entitlementData, roamingData);
      expect(result.totalMonthlyDataRemaining).toEqual(3);
      expect(result.totalRolloverData).toEqual(0);
    });
    test('it should return a condensed object of the entitlements, summing remaining data with bonus data', () => {
      const todayDate = new Date();
      const todayPlusDateString = `${todayDate.getMonth() + 1}/${todayDate.getDate() + 6}/${todayDate.getFullYear()}`;
      const futureDateString = `${todayDate.getMonth() + 1}/${todayDate.getDate() + 15}/${todayDate.getFullYear()}`;
      const serviceIdentifier = 99882282;
      const product = {
        serviceIdentifier
      };
      const bonusData = {
        EntitlementName: ENTITLEMENT_NAMES.MOBILE_DATA,
        BalanceRemaining: 85,
        unitOfMeasure: 'GB',
        ExpirationDate: futureDateString, // current
        EntitlementIdentifier: {
          SubscriberProductId: '123123'
        }
      };
      const entitlementData = {
        [serviceIdentifier]: [
          {
            EntitlementName: ENTITLEMENT_NAMES.MOBILE_DATA,
            BalanceRemaining: 18,
            unitOfMeasure: 'GB',
            ExpirationDate: futureDateString // current
          }, {
            EntitlementName: ENTITLEMENT_NAMES.MOBILE_DATA,
            BalanceRemaining: 2,
            unitOfMeasure: 'GB',
            ExpirationDate: todayPlusDateString // rollover
          }, {
            EntitlementName: ENTITLEMENT_NAMES.DATA_ADD_ON,
            BalanceRemaining: 3
          }, {
            EntitlementName: 'Some other name',
            BalanceRemaining: 1
          }, bonusData
        ]
      };
      const roamingData = {
        [serviceIdentifier]: []
      };
      const result = SelectedProductMobileEntitlements.resultFunc([], product, entitlementData, roamingData, bonusData);
      expect(result.totalMonthlyDataRemaining).toEqual(88);
      expect(result.totalRolloverData).toEqual(0);
    });

    test('it should return a blank values when no mobile entitlements are present', () => {
      const serviceIdentifier = 99882282;
      const product = {
        serviceIdentifier
      };
      const entitlementData = {
        [serviceIdentifier]: [
          {
            EntitlementName: 'Some other name',
            BalanceRemaining: 1
          }
        ]
      };
      const roamingData = {
        [serviceIdentifier]: []
      };
      const result = SelectedProductMobileEntitlements.resultFunc([], product, entitlementData, roamingData);
      expect(result.totalMonthlyDataRemaining).toEqual(0);
      expect(result.monthlyDataUnitOfMeasure).toEqual('');
      expect(result.totalRolloverData).toEqual(0);
      expect(result.rolloverUnitOfMeasure).toEqual('');
    });

    test('it should return a blank values when no entitlements are passed in', () => {
      const result = SelectedProductMobileEntitlements.resultFunc([], {}, {}, {});
      expect(result.totalMonthlyDataRemaining).toEqual(0);
      expect(result.monthlyDataUnitOfMeasure).toEqual('');
      expect(result.totalRolloverData).toEqual(0);
      expect(result.rolloverUnitOfMeasure).toEqual('');
    });
  });

  xdescribe('When UpcomingPaymentsAcrossProducts is used', () => {
    test('It should return a list of objects to be consumed by a data table.', () => {
      const upcomingPayments = [{
        status: 3,
        billing: {
          nextChargeDate: null,
          totalAmount: 399
        },
        campaign: {
          amount: 0,
          totalAmount: 0,
          discountExpirationDate: '2020-02-01',
          discountHasNotCycledOff: false
        },
        displayName: 'My third test product',
        hasFirstUsage: true
      }, {
        status: 3,
        billing: {
          nextChargeDate: 'December 17, 1995 03:24:00',
          totalAmount: 400
        },
        campaign: {
          amount: 0,
          totalAmount: 0,
          discountExpirationDate: '2020-02-01',
          discountHasNotCycledOff: false
        },
        displayName: 'My middle test product',
        hasFirstUsage: true
      }, {
        status: 1,
        billing: {
          nextChargeDate: null,
          totalAmount: 402
        },
        campaign: {
          amount: 0,
          totalAmount: 0,
          discountExpirationDate: '2020-02-01',
          discountHasNotCycledOff: false
        },
        displayName: 'My fourth test product',
        hasFirstUsage: false
      }];
      expect(UpcomingPaymentsAcrossProducts(upcomingPayments)).toEqual([
        {
          status: 3,
          billing: {
            nextChargeDate: 'December 17, 1995 03:24:00',
            totalAmount: 400
          },
          campaign: {
            amount: 0,
            totalAmount: 0,
            discountExpirationDate: '2020-02-01',
            discountHasNotCycledOff: false
          },
          displayName: 'My middle test product',
          hasFirstUsage: true,
          date: 'December 17, 1995 03:24:00',
          product: 'My middle test product',
          amount: 400,
          campaignOriginalPrice: 0,
          campaignPrice: 0,
          campaignDiscountExpirationDate: '2020-02-01'
        },
        {
          status: 3,
          billing: {
            nextChargeDate: null,
            totalAmount: 399
          },
          campaign: {
            amount: 0,
            totalAmount: 0,
            discountExpirationDate: '2020-02-01',
            discountHasNotCycledOff: false
          },
          displayName: 'My third test product',
          hasFirstUsage: true,
          date: null,
          product: 'My third test product',
          amount: 399,
          campaignOriginalPrice: 0,
          campaignPrice: 0,
          campaignDiscountExpirationDate: '2020-02-01'
        },
        {
          status: 1,
          billing: {
            nextChargeDate: null,
            totalAmount: 402
          },
          campaign: {
            amount: 0,
            totalAmount: 0,
            discountExpirationDate: '2020-02-01',
            discountHasNotCycledOff: false
          },
          displayName: 'My fourth test product',
          hasFirstUsage: false,
          date: null,
          product: 'My fourth test product',
          amount: 402,
          campaignOriginalPrice: 0,
          campaignPrice: 0,
          campaignDiscountExpirationDate: '2020-02-01'
        }
      ]);
    });
    test('It should return an empty array when there is no upcoming payments.', () => {
      expect(UpcomingPaymentsAcrossProducts([])).toEqual([]);
    });
  });

  describe('When SelectedProductSetting is used', () => {
    const OFFERING_INSTANCE_ID_WITH_NO_SIM = 123213;
    const OFFERING_INSTANCE_ID_WITH_SIM = 9829348;
    const OFFERING_INSTANCE_ID_WITH_ONLY_SIM = 12394722;
    const ATTRIBUTES_OBJECT = {
      12: [{
        formValue: '12_1'
      }, {
        formValue: '12_2'
      }],
      [OFFERING_INSTANCE_ID_WITH_NO_SIM]: [{
        formValue: `${OFFERING_INSTANCE_ID_WITH_NO_SIM}_1`
      }, {
        formValue: `${OFFERING_INSTANCE_ID_WITH_NO_SIM}_2`
      }, {
        formValue: `${OFFERING_INSTANCE_ID_WITH_NO_SIM}_3`
      }],
      [OFFERING_INSTANCE_ID_WITH_SIM]: [{
        formValue: `${OFFERING_INSTANCE_ID_WITH_SIM}_1`
      }, {
        formValue: `${OFFERING_INSTANCE_ID_WITH_SIM}_2`
      }, {
        formValue: `${OFFERING_INSTANCE_ID_WITH_SIM}_3`
      }],
      12394722: [{
        formValue: `${OFFERING_INSTANCE_ID_WITH_ONLY_SIM}_1`
      }]
    };
    const SELECTED_PRODUCT_SERVICES = [{
      Value: 'MOBILE',
      Editable: false,
      ServiceAttributeId: 1000163,
      ServiceId: 103,
      ServiceAttributeName: 'Shipping Type',
      DisplayOrder: 100,
      ExternalReference: 'SHIPPING_TYPE',
      ServiceAttributeType: 0
    }, {
      Value: '46790761753',
      Editable: false,
      ServiceAttributeId: 1000145,
      ServiceId: 103,
      ServiceAttributeName: 'Telephone Number',
      IsServiceIdentifier: true,
      DisplayOrder: 2,
      ExternalReference: 'TELEPHONE_NUMBER',
      ServiceAttributeType: 0,
      ServiceInstanceId: '1935360780670000200'
    }, {
      Value: 'N',
      Editable: false,
      ServiceAttributeId: 1000144,
      ServiceId: 103,
      ServiceAttributeName: 'Port-In Intent',
      DisplayOrder: 40,
      ExternalReference: 'PORT_IN_INTENT',
      ServiceAttributeType: 0
    }, {
      Value: 'Yes',
      Editable: false,
      ServiceAttributeId: 1000157,
      ServiceId: 103,
      ServiceAttributeName: 'Hidden Number',
      DisplayOrder: 1000,
      ExternalReference: 'HIDDEN_NUMBER',
      ServiceAttributeType: 0
    }, {
      Value: '89462098014000013870',
      Editable: false,
      ServiceAttributeId: 1000142,
      ServiceId: 103,
      ServiceAttributeName: 'ICCID',
      DisplayOrder: 1020,
      ExternalReference: 'ICCID',
      ServiceAttributeType: 0
    }, {
      Value: '240075550701387',
      Editable: false,
      ServiceAttributeId: 1000165,
      ServiceId: 103,
      ServiceAttributeName: 'IMSI',
      IsServiceIdentifier: true,
      DisplayOrder: 1021,
      ExternalReference: 'IMSI',
      ServiceAttributeType: 0
    }, {
      Value: '00000000',
      Editable: false,
      ServiceAttributeId: 1000218,
      ServiceId: 103,
      ServiceAttributeName: 'PUK1',
      DisplayOrder: 1022,
      ExternalReference: 'PUK1',
      ServiceAttributeType: 0
    }, {
      Value: '00000000',
      Editable: false,
      ServiceAttributeId: 1000219,
      ServiceId: 103,
      ServiceAttributeName: 'PUK2',
      DisplayOrder: 1023,
      ExternalReference: 'PUK2',
      ServiceAttributeType: 0
    }];
    test('It should return a valid object with no SIM ID if that attribute is not included.', () => {
      const SELECTED_PRODUCT = {
        offeringInstanceId: OFFERING_INSTANCE_ID_WITH_NO_SIM,
        serviceIdentifier: '0988888221'
      };
      expect(SelectedProductSetting.resultFunc(SELECTED_PRODUCT, ATTRIBUTES_OBJECT)).toEqual({
        attributes: {
          [OFFERING_INSTANCE_ID_WITH_NO_SIM]: ATTRIBUTES_OBJECT[OFFERING_INSTANCE_ID_WITH_NO_SIM]
        },
        msisdn: SELECTED_PRODUCT.serviceIdentifier,
        pukCode: undefined,
        sim: undefined
      });
    });
    test('It should return a valid object with a SIM ID if that attribute is included.', () => {
      const SELECTED_PRODUCT = {
        offeringInstanceId: OFFERING_INSTANCE_ID_WITH_SIM,
        serviceIdentifier: '0988888221'
      };

      expect(SelectedProductSetting.resultFunc(SELECTED_PRODUCT, ATTRIBUTES_OBJECT, {
        [SELECTED_PRODUCT.serviceIdentifier]: {
          ServiceThumbnails: [{
            ServiceAttributeValues: SELECTED_PRODUCT_SERVICES
          }]
        }
      })).toEqual({
        attributes: {
          [OFFERING_INSTANCE_ID_WITH_SIM]: [{
            formValue: `${OFFERING_INSTANCE_ID_WITH_SIM}_1`
          }, {
            formValue: `${OFFERING_INSTANCE_ID_WITH_SIM}_2`
          }, {
            formValue: `${OFFERING_INSTANCE_ID_WITH_SIM}_3`
          }]
        },
        msisdn: SELECTED_PRODUCT.serviceIdentifier,
        pukCode: [
          '00000000',
          '00000000'
        ],
        sim: '89462098014000013870'
      });
    });
    test('It should return a valid object with a SIM ID if that attribute the only one included.', () => {
      const SELECTED_PRODUCT = {
        offeringInstanceId: OFFERING_INSTANCE_ID_WITH_ONLY_SIM,
        serviceIdentifier: '0988888221'
      };
      expect(SelectedProductSetting.resultFunc(SELECTED_PRODUCT, ATTRIBUTES_OBJECT, {
        [SELECTED_PRODUCT.serviceIdentifier]: {
          ServiceThumbnails: [{
            ServiceAttributeValues: SELECTED_PRODUCT_SERVICES
          }]
        }
      })).toEqual({
        attributes: {
          [OFFERING_INSTANCE_ID_WITH_ONLY_SIM]: [{
            formValue: `${OFFERING_INSTANCE_ID_WITH_ONLY_SIM}_1`
          }]
        },
        msisdn: SELECTED_PRODUCT.serviceIdentifier,
        pukCode: [
          '00000000',
          '00000000'
        ],
        sim: '89462098014000013870'
      });
    });
    test('It should return an partically filled in object if no attribute data is given.', () => {
      const SELECTED_PRODUCT = {
        offeringInstanceId: OFFERING_INSTANCE_ID_WITH_NO_SIM,
        serviceIdentifier: '0988888221'
      };
      expect(SelectedProductSetting.resultFunc(SELECTED_PRODUCT, {}, {})).toEqual({
        attributes: {
          [OFFERING_INSTANCE_ID_WITH_NO_SIM]: []
        },
        msisdn: SELECTED_PRODUCT.serviceIdentifier,
        pukCode: undefined,
        sim: undefined
      });
    });
    test('It should return an undefined object if no product is given.', () => {
      expect(SelectedProductSetting.resultFunc({}, ATTRIBUTES_OBJECT, {})).toEqual({
        attributes: {
          undefined: []
        },
        msisdn: undefined,
        pukCode: undefined,
        sim: undefined
      });
    });
    test('It should return an undefined object if no data is given.', () => {
      expect(SelectedProductSetting.resultFunc({}, {}, {})).toEqual({
        attributes: {
          undefined: []
        },
        msisdn: undefined,
        pukCode: undefined,
        sim: undefined
      });
    });
  });

  describe('When ActiveWirelessProducts is used...', () => {
    const products = [
      {
        id: '12345',
        isWireless: true,
        hasFirstUsage: true,
        status: OFFERING_OVERALL_STATUS.ACTIVE
      }, {
        id: '54321',
        isWireless: false,
        hasFirstUsage: false,
        status: OFFERING_OVERALL_STATUS.REMOVED
      }, {
        id: '43617',
        isWireless: true,
        hasFirstUsage: true,
        status: OFFERING_OVERALL_STATUS.REMOVED
      }
    ];
    test('It should return an empty array if there are no products.', () => {
      expect(ActiveWirelessProducts.resultFunc([])).toEqual([]);
    });

    test('It should return an array of all active mobile offers.', () => {
      expect(ActiveWirelessProducts.resultFunc(products)).toEqual([products[0], products[2]]);
    });
  });

  xdescribe('When CrossSellProducts is used...', () => {
    test('It should Add Mobile key when it is broadband and no mobile', () => {
      const offers = [{
        isWireless: false
      }, {
        isBroadband: true
      }, {
        isPennyPlay: true
      }];

      expect(CrossSellProducts(offers, true)).toEqual(['Add Mobile']);
    });

    test('It should Add More Mobile key when it is broadband and mobile', () => {
      const offers = [{
        isWireless: true
      }, {
        isBroadband: true
      }, {
        isPennyPlay: true
      }];

      expect(CrossSellProducts.resultFunc(offers, true)).toEqual(['Add More Mobile']);
    });

    test('It should Add Broadband key when it is mobile and no broadband', () => {
      const offers = [{
        isWireless: true
      }, {
        isBroadband: false
      }, {
        isPennyPlay: true
      }];

      expect(CrossSellProducts.resultFunc(offers, true)).toEqual(['Add Broadband']);
    });

    test('It should Add Broadband key and Play key when it is mobile and no broadband or play', () => {
      const offers = [{
        isWireless: true
      }, {
        isBroadband: false
      }];

      expect(CrossSellProducts.resultFunc(offers, false)).toEqual(['Add Penny Play', 'Add Broadband']);
    });

    test('It should Add Mobile key and Play key when it is no mobile or play', () => {
      const offers = [{
        isWireless: false
      }];

      expect(CrossSellProducts.resultFunc(offers, false)).toEqual(['Add Penny Play', 'Add Mobile']);
    });

    test('It should Add More Mobile key and Play key when it is broadband and mobilea with no play', () => {
      const offers = [{
        isWireless: true
      }, {
        isBroadband: true
      }];

      expect(CrossSellProducts.resultFunc(offers, false)).toEqual(['Add Penny Play', 'Add More Mobile']);
    });
  });

  describe('When SubscriberProductTypes is used...', () => {
    const emptySubscriberResult = {
      isLoggedIn: false,
      hasMobileOffers: false,
      hasBroadbandOffers: false
    };
    const validSubscriberResult = {
      isLoggedIn: true,
      hasMobileOffers: true,
      hasBroadbandOffers: true
    };

    const subscriber = {
      id: 123456
    };

    const offers = [{
      isWireless: true
    }, {
      isBroadband: true
    }];

    test('It should return false for all values when not logged in', () => {
      expect(SubscriberProductTypes.resultFunc(null, [])).toEqual(emptySubscriberResult);
    });

    test('It should return the proper data when logged in', () => {
      expect(SubscriberProductTypes.resultFunc(subscriber, offers)).toEqual(validSubscriberResult);
    });
  });

  const codes = [{
    Value: '10025',
    Name: 'Återvänder till tidigare leverantör',
    AdditionalProperties: {
      order_type_code: '8',
      order_change_type_code: '6'
    }
  }, {
    Value: '10020',
    Name: 'Bindningstid hos tidigare operatör',
    AdditionalProperties: {
      order_type_code: '8',
      order_change_type_code: '6'
    }
  }, {
    Value: '9',
    Name: 'FirstUse Payment Failure',
    Description: 'This order is a removal due to firstuse payment failure',
    Global: true,
    AdditionalProperties: {
      order_type_code: '8',
      order_change_type_code: '9'
    }
  }, {
    Value: '10021',
    Name: 'Fungerar inte som förväntat',
    AdditionalProperties: {
      order_type_code: '8',
      order_change_type_code: '6'
    }
  }, {
    Value: '10',
    Name: 'Life Cycle Plan Transition',
    Description: 'This order is a life cycle step transition from 1 pricing plan to another',
    Global: true,
    AdditionalProperties: {
      order_type_code: '8',
      order_change_type_code: '10'
    }
  }, {
    Value: '10048',
    Name: 'Payment Failure',
    Description: 'Payment Failure - used when suspending the service on Ascendon only.',
    AdditionalProperties: {
      order_type_code: '4',
      order_change_type_code: '7'
    }
  }, {
    Value: '10049',
    Name: 'Port In',
    Description: 'Port In reason code for Journey Orchestration',
    AdditionalProperties: {
      order_type_code: '8',
      order_change_type_code: ''
    }
  }, {
    Value: '8345345345',
    Name: 'Pricing Plan Expiration',
    Description: 'This order is a removal due to TBC pricing plan expiration',
    Global: true,
    AdditionalProperties: {
      order_type_code: '8',
      order_change_type_code: '8'
    }
  }, {
    Value: '10023',
    Name: 'Pris motsvarar inte förväntning',
    AdditionalProperties: {
      order_type_code: '8',
      order_change_type_code: '6'
    }
  }, {
    Value: '10050',
    Name: 'Right to Return',
    Description: 'This code supports the use case where a suspended service (for payment failure) needs to be able to do a RTR (i.e. cancel). Service has to be restored on Ascendon before cancellation can be processed.',
    AdditionalProperties: {
      order_type_code: '5',
      order_change_type_code: ''
    }
  }, {
    Value: '10024',
    Name: 'Vill ha Hårdvara',
    AdditionalProperties: {
      order_type_code: '8',
      order_change_type_code: '6'
    }
  }];
  describe('When RightToReturnReasons is used...', () => {
    test('It should return an empty array if no codes available', () => {
      expect(RightToReturnReasons.resultFunc([])).toEqual([]);
    });

    test('It should return the list of codes when codes available', () => {
      expect(RightToReturnReasons.resultFunc(codes)).toEqual([
        {
          label: 'Återvänder till tidigare leverantör',
          value: '10025'
        },
        {
          label: 'Bindningstid hos tidigare operatör',
          value: '10020'
        },
        {
          label: 'Fungerar inte som förväntat',
          value: '10021'
        },
        {
          label: 'Pris motsvarar inte förväntning',
          value: '10023'
        },
        {
          label: 'Vill ha Hårdvara',
          value: '10024'
        }
      ]);
    });
  });
  describe('When the UsageDetailsForSelectedProduct selector is used...', () => {
    const date = new Date();
    const usage = [
      {
        EventStartTime: date,
        UsageAmount: 1,
        UnitOfMeasureCode: '7'
      }, {
        EventStartTime: date,
        UsageAmount: 1024,
        UnitOfMeasureCode: '6'
      }, {
        EventStartTime: date,
        UsageAmount: 1024 * 1024,
        UnitOfMeasureCode: '5'
      }, {
        EventStartTime: date,
        UsageAmount: 1024 * 1024 * 1024,
        UnitOfMeasureCode: '4'
      }
    ];

    const measurementsObject = {
      4: {
        Name: 'Bytes',
        Conversion: 1024 * 1024 * 1024
      },
      5: {
        Name: 'Kilobytes',
        Conversion: 1024 * 1024
      },
      6: {
        Name: 'Megabytes',
        Conversion: 1024
      },
      7: {
        Name: 'Gigabytes',
        Conversion: 1
      }
    };

    const formattedUsage = [
      {
        month: format(date, 'MMM'),
        usage: (4).toFixed(2)
      }
    ];
    test('It should return an empty array when there is no usage data', () => {
      expect(UsageDetailsForSelectedProduct.resultFunc([], [])).toEqual([]);
    });

    test('It should return a formatted list of usage data by month', () => {
      expect(UsageDetailsForSelectedProduct.resultFunc(usage, measurementsObject)).toEqual(formattedUsage);
    });
  });
  describe('When AllowancesForSelectedProduct is used...', () => {
    test('It should return an empty list when nothing exists', () => {
      expect(AllowancesForSelectedProduct.resultFunc([], {})).toEqual([]);
    });
    test('It should filter out any items that do not match the sender or receiver', () => {
      const allowances = [{
        sender: 'tester 1',
        receiver: 'tester 2'
      }, {
        sender: 'tester 2',
        receiver: 'tester 3'
      }, {
        sender: 'tester 2',
        receiver: 'tester 1'
      }];
      const selectedProduct = {
        serviceIdentifier: 'tester 1'
      };
      const response = AllowancesForSelectedProduct.resultFunc(allowances, selectedProduct);
      expect(response.length).toBe(2);
      expect(response[0]).toBe(allowances[0]);
      expect(response[1]).toBe(allowances[2]);
    });
  });
  describe('When we have a PortInNumber avialable in the Shopping Cart or ServiceAttributes', () => {
    const cartItems = ShoppingCartItems;
    test('It should return the PortInNumber if its in ServiceAttributes!', () => {
      const result = PortInNumberFromAttributesOrCart.resultFunc('46711111111', cartItems);
      expect(result).toEqual('46711111111');
    });
    test('It should return the PortInNumber if its in the CartItems and not present in ServiceAttributes', () => {
      const result = PortInNumberFromAttributesOrCart.resultFunc('', cartItems);
      expect(result.value).toEqual('46711111111');
    });
  });
});
