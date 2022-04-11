import Immutable from 'seamless-immutable';
import { DECISION_TYPE } from '../../../constants/order.constants';
import {
  DISPLAY_ORDER_FOR_PORT_IN_INTENT,
  DISPLAY_ORDER_FOR_PORT_IN_NUMBER
} from './attributes.order.flow.constants';
import { AllAttribute, Attributes, AttributesPresentAndValid, FormattedAttributes, OfferingAttributes, OfferingAttributesForEdit, OfferingAttributesForSimSwap, OrderIsPortIn, PortInNumberInvalid } from './attributes.order.flow.selectors';
import { ATTRIBUTE_COMPLETED_DECISIONS, ATTRIBUTE_FROMATTED_METHOD, ATTRIBUTE_OFFER_ID, ATTRIBUTE_PRESENT_STORE, ATTRIBUTE_STORE, ATTRIBUTE_VALUES_STORE, ATTRIBUTE_VALUE_TEXT } from './attributes.order.flow.test.data';

describe('Attributes Order Flow ', () => {
  describe('Attributes', () => {
    test('returns the Attributes empty state', () => {
      expect(Attributes({
        client: {
          orderFlow: {
            attributesByDecision: {}
          }
        }
      })).toEqual({});
      expect(Attributes({
        orderFlow: {}
      })).toEqual({});
    });
    test('returns the attributeByDescision populated state', () => {
      const currentState = {
        client: {
          orderFlow: {
            attributesByDecision: {
              attributes: ATTRIBUTE_STORE
            }
          }
        }
      };
      expect(Attributes(currentState)).toEqual(currentState.client.orderFlow.attributesByDecision);
    });
  });
  describe('AttributesPresentAndValid', () => {
    test('returns an empty object with an empty state', () => {
      expect(AttributesPresentAndValid({
        client: {
          orderFlow: {
            attributePresentAndValid: {
              attributeState: {}
            }
          }
        }
      })).toEqual({});
      expect(AttributesPresentAndValid({
        orderFlow: {}
      })).toEqual({});
    });
    test('returns an object of formatted decisions with a populated state', () => {
      expect(AttributesPresentAndValid(Immutable({
        client: {
          orderFlow: {
            attributePresentAndValid: {
              attributeState: ATTRIBUTE_PRESENT_STORE
            }
          }
        }
      }))).toEqual(ATTRIBUTE_PRESENT_STORE);
    });
  });
  describe('AllAttribute', () => {
    test('returns an empty object with an empty state', () => {
      expect(AllAttribute({
        client: {
          orderFlow: {
            attributesByDecision: {
              attributes: {}
            }
          }
        }
      })).toEqual({});
      expect(AllAttribute({
        orderFlow: {}
      })).toEqual({});
    });
    test('returns an object of formatted decisions with a populated state', () => {
      expect(AllAttribute(Immutable({
        client: {
          orderFlow: {
            attributesByDecision: {
              attributes: ATTRIBUTE_STORE
            }
          }
        }
      }))).toEqual(ATTRIBUTE_FROMATTED_METHOD(false).attributes);
    });
  });
  xdescribe('FormattedAttributes', () => {
    test('returns an empty array with an empty state', () => {
      expect(FormattedAttributes({
        client: {
          orderFlow: {
            attributePresentAndValid: {
              attributeState: {}
            },
            attributesByDecision: {
              attributes: {}
            }
          }
        }
      })).toEqual([]);
      expect(FormattedAttributes({
        orderFlow: {}
      })).toEqual([]);
    });
    test('returns an completed decisions array with a populated state', () => {
      expect(FormattedAttributes(Immutable({
        client: {
          orderFlow: {
            activeOfferId: ATTRIBUTE_OFFER_ID,
            attributePresentAndValid: {
              attributeState: ATTRIBUTE_PRESENT_STORE
            },
            attributesByDecision: {
              attributes: ATTRIBUTE_STORE
            }
          }
        }
      }))).toEqual(ATTRIBUTE_COMPLETED_DECISIONS);
    });
    test('returns an completed decisions array including updated values with a populated state', () => {
      expect(FormattedAttributes(Immutable({
        client: {
          orderFlow: {
            activeOfferId: ATTRIBUTE_OFFER_ID,
            attributePresentAndValid: {
              attributeState: ATTRIBUTE_PRESENT_STORE
            },
            attributesByDecision: {
              attributes: ATTRIBUTE_STORE,
              values: ATTRIBUTE_VALUES_STORE
            }
          }
        }
      }))).toEqual(ATTRIBUTE_COMPLETED_DECISIONS.concat([{
        DisplayOrder: 1,
        formValue: undefined,
        DecisionType: DECISION_TYPE.SERVICE_ATTRIBUTE,
        Id: '30501-1-1000025-54',
        InventoryItemReservation: undefined,
        Name: 'Telephone Number Port',
        SelectedValue: ATTRIBUTE_VALUE_TEXT,
        OfferingId: ATTRIBUTE_OFFER_ID,
        PricingPlanId: 30501,
        ServiceInstanceId: undefined
      }]));
    });
  });

  describe('OfferingAttributes', () => {
    test('returns an empty object if there are no attributes', () => {
      expect(OfferingAttributes()).toEqual({});
    });
    test('returns a sorted, transformed, and annotated object of the filtered attributes', () => {
      const valueDecisions = Immutable([
        {
          Id: '36463-1-1002222-2218',
          DecisionType: 3,
          Name: 'Port-In Intent',
          Description: 'User indicates, using a check-box, if he\'d like to port-in existing number after order process.',
          DisplayOrder: DISPLAY_ORDER_FOR_PORT_IN_INTENT,
          PossibleValues: [
            'Y',
            'N'
          ],
          ProductName: 'Penny Mobile Connectivity',
          PricingPlanName: 'Penny connectivity PP',
          PricingPlanId: 36463,
          InstanceNumber: 1,
          IsRequired: true,
          SelectedValue: 'Y',
          InventoryProviderType: 0,
          EnableWildcardSearch: false,
          ServiceDisplayOrder: 1,
          ServiceIdentifierFlag: false,
          DependentServiceAttributeId: '',
          OfferingOptionPriceId: '1921044487770000004',
          IsPortable: false,
          InventoryTypeId: null,
          InventoryCategoryCode: 0,
          IsServiceFeatureAvailable: true,
          ServiceId: 2219,
          ServiceAttributeId: 1002222,
          ServiceAttributeType: 1,
          AllowEdit: true
        },
        {
          Id: '36463-1-1002223-2219',
          DecisionType: 3,
          Name: 'Telephone Number',
          Description: 'Accept one Penny MSISDN out of 5',
          DisplayOrder: DISPLAY_ORDER_FOR_PORT_IN_NUMBER,
          PossibleValues: [],
          ProductName: 'Penny Mobile Connectivity',
          PricingPlanName: 'Penny connectivity PP',
          PricingPlanId: 36463,
          InstanceNumber: 2,
          IsRequired: true,
          SelectedValue: '0732188473',
          InventoryProviderType: 1,
          EnableWildcardSearch: false,
          ServiceDisplayOrder: 1,
          ServiceIdentifierFlag: true,
          DependentServiceAttributeId: '',
          InventoryItemReservation: {
            InventoryTypeId: '1923144358899000300',
            InstanceId: '1',
            Token: '1||0732188473||dfcf5782-146a-40e6-9ecd-6e8ac18e8b83',
            SerialNumber: '0732188473'
          },
          OfferingOptionPriceId: '1921044487770000004',
          IsPortable: false,
          InventoryTypeId: '1923144358899000300',
          InventoryCategoryCode: 1,
          IsServiceFeatureAvailable: true,
          ServiceId: 2219,
          ServiceAttributeId: 1002223,
          ServiceAttributeType: 1,
          AllowEdit: true
        }
      ]);
      const offerId = 321;
      const results = OfferingAttributes.resultFunc(offerId, valueDecisions);

      // 36463-1 has InventoryProviderType of 0, should not be filtered, and should exist
      expect(results[offerId][0].data.Id).toEqual(valueDecisions[0].Id);

      // 36463-2 has InventoryProviderType of 1, should be filtered, and should not exist
      expect(results[offerId][0].data.Id).not.toEqual(valueDecisions[1].Id);

      expect(Object.keys(results[offerId]).length).toEqual(1);
    });
    test('returns a sorted, transformed, and annotated object of the filtered attributes with user entered form values', () => {
      const valueDecisions = Immutable([
        {
          Id: '36463-1-1002222-2218',
          DecisionType: 3,
          Name: 'Port-In Intent',
          Description: 'User indicates, using a check-box, if he\'d like to port-in existing number after order process.',
          DisplayOrder: DISPLAY_ORDER_FOR_PORT_IN_INTENT,
          PossibleValues: [
            'Y',
            'N'
          ],
          ProductName: 'Penny Mobile Connectivity',
          PricingPlanName: 'Penny connectivity PP',
          PricingPlanId: 36463,
          InstanceNumber: 1,
          IsRequired: true,
          SelectedValue: 'Y',
          InventoryProviderType: 0,
          EnableWildcardSearch: false,
          ServiceDisplayOrder: 1,
          ServiceIdentifierFlag: false,
          DependentServiceAttributeId: '',
          OfferingOptionPriceId: '1921044487770000004',
          IsPortable: false,
          InventoryTypeId: null,
          InventoryCategoryCode: 0,
          IsServiceFeatureAvailable: true,
          ServiceId: 2219,
          ServiceAttributeId: 1002222,
          ServiceAttributeType: 1,
          AllowEdit: true
        },
        {
          Id: '36463-1-1002223-2219',
          DecisionType: 3,
          Name: 'Telephone Number',
          Description: 'Accept one Penny MSISDN out of 5',
          DisplayOrder: DISPLAY_ORDER_FOR_PORT_IN_NUMBER,
          PossibleValues: [],
          ProductName: 'Penny Mobile Connectivity',
          PricingPlanName: 'Penny connectivity PP',
          PricingPlanId: 36463,
          InstanceNumber: 2,
          IsRequired: true,
          SelectedValue: '0732188473',
          InventoryProviderType: 0,
          EnableWildcardSearch: false,
          ServiceDisplayOrder: 1,
          ServiceIdentifierFlag: true,
          DependentServiceAttributeId: '',
          InventoryItemReservation: {
            InventoryTypeId: '1923144358899000300',
            InstanceId: '1',
            Token: '1||0732188473||dfcf5782-146a-40e6-9ecd-6e8ac18e8b83',
            SerialNumber: '0732188473'
          },
          OfferingOptionPriceId: '1921044487770000004',
          IsPortable: false,
          InventoryTypeId: '1923144358899000300',
          InventoryCategoryCode: 1,
          IsServiceFeatureAvailable: true,
          ServiceId: 2219,
          ServiceAttributeId: 1002223,
          ServiceAttributeType: 1,
          AllowEdit: true
        },
        {
          Id: '36463-1-1002223-2219',
          DecisionType: 3,
          Name: 'Telephone Number 2',
          Description: 'Accept one Penny MSISDN out of 5',
          DisplayOrder: 1001,
          PossibleValues: [],
          ProductName: 'Penny Mobile Connectivity',
          PricingPlanName: 'Penny connectivity PP',
          PricingPlanId: 36463,
          InstanceNumber: 2,
          IsRequired: true,
          SelectedValue: '0732188473',
          InventoryProviderType: 0,
          EnableWildcardSearch: false,
          ServiceDisplayOrder: 1,
          ServiceIdentifierFlag: true,
          DependentServiceAttributeId: '',
          InventoryItemReservation: {
            InventoryTypeId: '1923144358899000300',
            InstanceId: '1',
            Token: '1||0732188473||dfcf5782-146a-40e6-9ecd-6e8ac18e8b83',
            SerialNumber: '0732188473'
          },
          OfferingOptionPriceId: '1921044487770000004',
          IsPortable: false,
          InventoryTypeId: '1923144358899000300',
          InventoryCategoryCode: 1,
          IsServiceFeatureAvailable: true,
          ServiceId: 2219,
          ServiceAttributeId: 1002223,
          ServiceAttributeType: 1,
          AllowEdit: true
        }
      ]);
      const offerId = 321;
      const values = {
        values: {
          [DECISION_TYPE.QUANTITY]: {
            [valueDecisions[0].OfferingOptionPriceId]: {
              [valueDecisions[0].Id]: {
                value: 'N'
              },
              [valueDecisions[1].Id]: {
                value: 'TWO'
              }
            }
          }
        }
      };
      const msisdnNumbers = [{
        SerialNumber: 12345
      }, {
        SerialNumber: 54321
      }];
      const results = OfferingAttributes.resultFunc(offerId, valueDecisions, values, msisdnNumbers);

      expect(results[offerId][0].data.Id).toEqual(valueDecisions[0].Id);
      expect(results[offerId][0].formValue).toEqual(values.values[DECISION_TYPE.QUANTITY][valueDecisions[0].OfferingOptionPriceId][valueDecisions[0].Id].value);
      expect(results[offerId][1].data.Id).toEqual(valueDecisions[1].Id);
      expect(results[offerId][1].formValue).toEqual(values.values[DECISION_TYPE.QUANTITY][valueDecisions[0].OfferingOptionPriceId][valueDecisions[1].Id].value);

      // First offer is not mobile, so we shouldn't have any itemReservations. Second one had 1 in the inital data, 2 passed in, so 3 total
      expect(results[offerId][0].inventoryItemReservation).toEqual(null);
      expect(results[offerId][1].inventoryItemReservation.options.length).toEqual(3);

      // The next one has a display order at or over 1000 and should be filtered out so there should only be 2
      expect(Object.keys(results[offerId]).length).toEqual(2);
    });
  });

  describe('OfferingAttributesForEdit', () => {
    test('returns an empty object if there are no attributes', () => {
      expect(OfferingAttributesForEdit()).toEqual({});
    });
    test('returns a sorted, transformed, and annotated object of the filtered attributes', () => {
      const valueDecisions = Immutable([
        {
          Id: '36463-1-1002222-2218',
          DecisionType: 3,
          Name: 'Port-In Intent',
          Description: 'User indicates, using a check-box, if he\'d like to port-in existing number after order process.',
          DisplayOrder: DISPLAY_ORDER_FOR_PORT_IN_INTENT,
          PossibleValues: [
            'Y',
            'N'
          ],
          ProductName: 'Penny Mobile Connectivity',
          PricingPlanName: 'Penny connectivity PP',
          PricingPlanId: 36463,
          InstanceNumber: 1,
          IsRequired: true,
          SelectedValue: 'Y',
          InventoryProviderType: 0,
          EnableWildcardSearch: false,
          ServiceDisplayOrder: 1,
          ServiceIdentifierFlag: false,
          DependentServiceAttributeId: '',
          OfferingOptionPriceId: '1921044487770000004',
          IsPortable: false,
          InventoryTypeId: null,
          InventoryCategoryCode: 0,
          IsServiceFeatureAvailable: true,
          ServiceId: 2219,
          ServiceAttributeId: 1002222,
          ServiceAttributeType: 1,
          AllowEdit: true
        },
        {
          AllowEdit: true,
          DecisionType: 3,
          DependentServiceAttributeId: '',
          Description: 'Replace SIM Card (lost or stolen)',
          DisplayOrder: 1010,
          EnableWildcardSearch: false,
          Id: '46800-1-1000164-103',
          InstanceNumber: 1,
          InventoryCategoryCode: 0,
          InventoryProviderType: 0,
          InventoryTypeId: null,
          IsPortable: false,
          IsRequired: false,
          IsServiceFeatureAvailable: false,
          Name: 'Replace SIM Card',
          OfferingOptionPriceId: '1929156790996000006',
          PossibleValues: ['Yes'],
          PricingPlanId: 46800,
          PricingPlanName: 'Mobil Connection',
          ProductName: 'Mobil Connection',
          ServiceAttributeId: 1000164,
          ServiceAttributeType: 4,
          ServiceDisplayOrder: 1,
          ServiceId: 103,
          ServiceIdentifierFlag: false,
          SubscriberProductId: '827723'
        },
        {
          Id: '36463-1-1002223-2219',
          DecisionType: 3,
          Name: 'Telephone Number',
          Description: 'Accept one Penny MSISDN out of 5',
          DisplayOrder: 1000,
          PossibleValues: [],
          ProductName: 'Penny Mobile Connectivity',
          PricingPlanName: 'Penny connectivity PP',
          PricingPlanId: 36463,
          InstanceNumber: 2,
          IsRequired: true,
          SelectedValue: '0732188473',
          InventoryProviderType: 0,
          EnableWildcardSearch: false,
          ServiceDisplayOrder: 1,
          ServiceIdentifierFlag: true,
          DependentServiceAttributeId: '',
          InventoryItemReservation: {
            InventoryTypeId: '1923144358899000300',
            InstanceId: '1',
            Token: '1||0732188473||dfcf5782-146a-40e6-9ecd-6e8ac18e8b83',
            SerialNumber: '0732188473'
          },
          OfferingOptionPriceId: '1921044487770000004',
          IsPortable: false,
          InventoryTypeId: '1923144358899000300',
          InventoryCategoryCode: 1,
          IsServiceFeatureAvailable: true,
          ServiceId: 2219,
          ServiceAttributeId: 1002223,
          ServiceAttributeType: 1,
          AllowEdit: true
        }
      ]);
      const results = OfferingAttributesForSimSwap.resultFunc(valueDecisions);

      expect(results.Id).toEqual(valueDecisions[1].Id);
    });
  });

  describe('OfferingAttributesForSimSwap', () => {
    test('returns an empty object if there are no attributes', () => {
      expect(OfferingAttributesForSimSwap()).toEqual({});
    });
    test('returns a sorted, transformed, and annotated object of the filtered attributes', () => {
      const valueDecisions = Immutable([
        {
          Id: '36463-1-1002222-2218',
          DecisionType: 3,
          Name: 'Port-In Intent',
          Description: 'User indicates, using a check-box, if he\'d like to port-in existing number after order process.',
          DisplayOrder: DISPLAY_ORDER_FOR_PORT_IN_NUMBER,
          PossibleValues: [
            'Y',
            'N'
          ],
          ProductName: 'Penny Mobile Connectivity',
          PricingPlanName: 'Penny connectivity PP',
          PricingPlanId: 36463,
          InstanceNumber: 1,
          IsRequired: true,
          SelectedValue: 'Y',
          InventoryProviderType: 0,
          EnableWildcardSearch: false,
          ServiceDisplayOrder: 1,
          ServiceIdentifierFlag: false,
          DependentServiceAttributeId: '',
          OfferingOptionPriceId: '1921044487770000004',
          IsPortable: false,
          InventoryTypeId: null,
          InventoryCategoryCode: 0,
          IsServiceFeatureAvailable: true,
          ServiceId: 2219,
          ServiceAttributeId: 1002222,
          ServiceAttributeType: 1,
          AllowEdit: true
        },
        {
          Id: '36463-1-1002223-2219',
          DecisionType: 3,
          Name: 'Telephone Number',
          Description: 'Accept one Penny MSISDN out of 5',
          DisplayOrder: 1000,
          PossibleValues: [],
          ProductName: 'Penny Mobile Connectivity',
          PricingPlanName: 'Penny connectivity PP',
          PricingPlanId: 36463,
          InstanceNumber: 2,
          IsRequired: true,
          SelectedValue: '0732188473',
          InventoryProviderType: 0,
          EnableWildcardSearch: false,
          ServiceDisplayOrder: 1,
          ServiceIdentifierFlag: true,
          DependentServiceAttributeId: '',
          InventoryItemReservation: {
            InventoryTypeId: '1923144358899000300',
            InstanceId: '1',
            Token: '1||0732188473||dfcf5782-146a-40e6-9ecd-6e8ac18e8b83',
            SerialNumber: '0732188473'
          },
          OfferingOptionPriceId: '1921044487770000004',
          IsPortable: false,
          InventoryTypeId: '1923144358899000300',
          InventoryCategoryCode: 1,
          IsServiceFeatureAvailable: true,
          ServiceId: 2219,
          ServiceAttributeId: 1002223,
          ServiceAttributeType: 1,
          AllowEdit: true
        }
      ]);
      const offerId = 321;
      const results = OfferingAttributesForEdit.resultFunc(offerId, valueDecisions);

      // 36463-1 has InventoryProviderType of 0 so should not be filtered for that, but has a display order of less than 1000 so should not exist
      expect(results[offerId][0].data.Id).not.toEqual(valueDecisions[0].Id);

      // 36463-2 has InventoryProviderType of 0 so should not be filtered, and has a display order over 100 so should exist
      expect(results[offerId][0].data.Id).toEqual(valueDecisions[1].Id);

      expect(Object.keys(results[offerId]).length).toEqual(1);
    });
  });

  describe('PortInNumberInvalid', () => {
    test('returns the portInNumberInvalid populated state', () => {
      const currentState = {
        client: {
          orderFlow: {
            attributesByDecision: {
              portInNumberInvalid: true
            }
          }
        }
      };
      expect(PortInNumberInvalid(currentState)).toEqual(currentState.client.orderFlow.attributesByDecision.portInNumberInvalid);
    });
  });

  describe('OrderIsPortIn', () => {
    test('returns true if port-in intent is set to Behâll nummer', () => {
      const currentState = {
        client: {
          orderFlow: {
            attributesByDecision: {
              attributes: {
                2: {
                  2011137828075000100: [{
                    Id: '37286-1-1002272-2259',
                    DisplayOrder: 2,
                    SelectedValue: 'Nytt nummer'
                  }]
                }
              },
              values: {
                2: {
                  2011137828075000100: {
                    '37286-1-1002272-2259': {
                      value: 'Behâll nummer'
                    }
                  }
                }
              }
            }
          }
        }
      };
      expect(OrderIsPortIn(currentState)).toEqual(true);
    });
    test('returns false if port-in intent is set to Nytt nummer', () => {
      const currentState = {
        client: {
          orderFlow: {
            attributesByDecision: {
              attributes: {
                2: {
                  2011137828075000100: [{
                    Id: '37286-1-1002272-2259',
                    DisplayOrder: 2,
                    SelectedValue: 'Nytt nummer'
                  }]
                }
              },
              values: {
                2: {
                  2011137828075000100: {
                    '37286-1-1002272-2259': {
                      value: 'Nytt nummer'
                    }
                  }
                }
              }
            }
          }
        }
      };
      expect(OrderIsPortIn(currentState)).toEqual(false);
    });
  });
});
