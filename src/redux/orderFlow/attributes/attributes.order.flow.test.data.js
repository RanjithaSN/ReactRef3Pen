import i18next from 'i18next';
import { DECISION_TYPE } from '../../../constants/order.constants';

export const ATTRIBUTE_STORE = {
  [DECISION_TYPE.DECISION_GROUP]: {
    '1607109442365000211': [{
      Id: '30499-1-1000025-53',
      DecisionType: 3,
      Name: 'Telephone Number Port',
      DisplayOrder: 1,
      PossibleValues: ['True', 'False'],
      ProductName: 'Wireline test',
      PricingPlanName: '200 Minutes',
      PricingPlanId: 30499,
      InstanceNumber: 1,
      IsRequired: true,
      InventoryProviderType: 0,
      ServiceDisplayOrder: 1000,
      ServiceIdentifierFlag: false,
      DependentServiceAttributeId: '',
      OfferingOptionPriceId: '1607109442365000219',
      DecisionGroupOptionId: '1607109442365000211'
    }, {
      Id: '30499-1-1000026-53',
      DecisionType: 3,
      Name: 'Telephone Number',
      DisplayOrder: 2,
      PossibleValues: [],
      ProductName: 'Wireline test',
      PricingPlanName: '200 Minutes',
      PricingPlanId: 30499,
      InstanceNumber: 1,
      IsRequired: true,
      InventoryProviderType: 0,
      ServiceDisplayOrder: 1000,
      ServiceIdentifierFlag: true,
      DependentServiceAttributeId: '30499-1-1000025-53',
      DependentValues: 'True',
      OfferingOptionPriceId: '1607109442365000219',
      DecisionGroupOptionId: '1607109442365000211'
    }, {
      Id: '30499-1-1000027-53',
      DecisionType: 3,
      Name: 'Telephone Number Selection',
      DisplayOrder: 2,
      PossibleValues: [],
      ProductName: 'Wireline test',
      PricingPlanName: '200 Minutes',
      PricingPlanId: 30499,
      InstanceNumber: 1,
      IsRequired: true,
      SelectedValue: '2617422627',
      InventoryProviderType: 0,
      ServiceDisplayOrder: 1000,
      ServiceIdentifierFlag: true,
      DependentServiceAttributeId: '30499-1-1000025-53',
      DependentValues: 'False',
      InventoryItemReservation: {
        InventoryTypeId: '1709653004696000700',
        InstanceId: '15000921',
        Token: '15000921||2617422627||8616b8a9-84a9-42c7-bf0c-355351470374',
        SerialNumber: '2617422627'
      },
      OfferingOptionPriceId: '1607109442365000219',
      DecisionGroupOptionId: '1607109442365000211'
    }, {
      Id: '30499-1-1000028-53',
      DecisionType: 3,
      Name: 'Directory Listing',
      DisplayOrder: 4,
      PossibleValues: ['True', 'False'],
      ProductName: 'Wireline test',
      PricingPlanName: '200 Minutes',
      PricingPlanId: 30499,
      InstanceNumber: 1,
      IsRequired: false,
      InventoryProviderType: 0,
      ServiceDisplayOrder: 1000,
      ServiceIdentifierFlag: false,
      DependentServiceAttributeId: '',
      OfferingOptionPriceId: '1607109442365000219',
      DecisionGroupOptionId: '1607109442365000211'
    }, {
      Id: '30499-1-1000029-53',
      DecisionType: 3,
      Name: 'Call Waiting',
      DisplayOrder: 3,
      PossibleValues: ['True', 'False'],
      ProductName: 'Wireline test',
      PricingPlanName: '200 Minutes',
      PricingPlanId: 30499,
      InstanceNumber: 1,
      IsRequired: false,
      InventoryProviderType: 0,
      ServiceDisplayOrder: 1000,
      ServiceIdentifierFlag: false,
      DependentServiceAttributeId: '',
      OfferingOptionPriceId: '1607109442365000219',
      DecisionGroupOptionId: '1607109442365000211'
    }, {
      Id: '30499-1-1000042-53',
      DecisionType: 3,
      Name: 'Caller ID Name',
      Description: 'Name you want to display on caller ID when using your number to call Mike. ',
      DisplayOrder: 5,
      PossibleValues: [],
      ProductName: 'Wireline test',
      PricingPlanName: '200 Minutes',
      PricingPlanId: 30499,
      InstanceNumber: 1,
      IsRequired: true,
      InventoryProviderType: 0,
      ServiceDisplayOrder: 1000,
      ServiceIdentifierFlag: false,
      DependentServiceAttributeId: '',
      OfferingOptionPriceId: '1607109442365000219',
      DecisionGroupOptionId: '1607109442365000211'
    }, {
      Id: '30499-1-1000048-53',
      DecisionType: 3,
      Name: 'Serial Number',
      Description: 'Serial Number',
      DisplayOrder: 0,
      PossibleValues: [],
      ProductName: 'Wireline test',
      PricingPlanName: '200 Minutes',
      PricingPlanId: 30499,
      InstanceNumber: 1,
      IsRequired: true,
      SelectedValue: '6883565288',
      InventoryProviderType: 0,
      ServiceDisplayOrder: 1000,
      ServiceIdentifierFlag: false,
      DependentServiceAttributeId: '',
      InventoryItemReservation: {
        InventoryTypeId: '1709757832649000700',
        InstanceId: '15005082',
        Token: '15005082||6883565288||265202a7-895b-4ff6-a97d-bf2d265d80f7',
        SerialNumber: '6883565288'
      },
      OfferingOptionPriceId: '1607109442365000219',
      DecisionGroupOptionId: '1607109442365000211'
    }],
    '1607109442365000204': [{
      Id: '30496-1-1000044-52',
      DecisionType: 3,
      Name: 'Mac Address',
      Description: 'Internet, DO:500',
      DisplayOrder: 500,
      PossibleValues: [],
      ProductName: 'Internet Speed',
      PricingPlanName: '25 Mbps',
      PricingPlanId: 30496,
      InstanceNumber: 1,
      IsRequired: false,
      InventoryProviderType: 0,
      ServiceDisplayOrder: 1000,
      ServiceIdentifierFlag: false,
      DependentServiceAttributeId: '',
      OfferingOptionPriceId: '1607109442365000210',
      DecisionGroupOptionId: '1607109442365000204'
    }, {
      Id: '30496-1-1000054-52',
      DecisionType: 3,
      Name: 'Internet Connection Property',
      Description: 'Internet Connection Property',
      DisplayOrder: 700,
      PossibleValues: ['Email Address'],
      ProductName: 'Internet Speed',
      PricingPlanName: '25 Mbps',
      PricingPlanId: 30496,
      InstanceNumber: 1,
      IsRequired: false,
      InventoryProviderType: 0,
      ServiceDisplayOrder: 1000,
      ServiceIdentifierFlag: false,
      DependentServiceAttributeId: '',
      OfferingOptionPriceId: '1607109442365000210',
      DecisionGroupOptionId: '1607109442365000204'
    }, {
      Id: '30496-1-1000056-52',
      DecisionType: 3,
      Name: 'Email Address',
      DisplayOrder: 710,
      PossibleValues: ['Tom@csgi.com', 'Dan@csgi.com', 'John@csgi.com'],
      ProductName: 'Internet Speed',
      PricingPlanName: '25 Mbps',
      PricingPlanId: 30496,
      InstanceNumber: 1,
      IsRequired: false,
      InventoryProviderType: 0,
      ServiceDisplayOrder: 1000,
      ServiceIdentifierFlag: false,
      DependentServiceAttributeId: '30496-1-1000054-52',
      DependentValues: 'Email Address',
      OfferingOptionPriceId: '1607109442365000210',
      DecisionGroupOptionId: '1607109442365000204'
    }, {
      Id: '30496-1-1000057-52',
      DecisionType: 3,
      Name: 'Auto forward Email',
      DisplayOrder: 716,
      PossibleValues: ['True', 'False'],
      ProductName: 'Internet Speed',
      PricingPlanName: '25 Mbps',
      PricingPlanId: 30496,
      InstanceNumber: 1,
      IsRequired: false,
      InventoryProviderType: 0,
      ServiceDisplayOrder: 1000,
      ServiceIdentifierFlag: false,
      DependentServiceAttributeId: '30496-1-1000056-52',
      DependentValues: 'Tom@csgi.com,Dan@csgi.com',
      OfferingOptionPriceId: '1607109442365000210',
      DecisionGroupOptionId: '1607109442365000204'
    }, {
      Id: '30496-1-1000058-52',
      DecisionType: 3,
      Name: 'Email Signature',
      DisplayOrder: 720,
      PossibleValues: [],
      ProductName: 'Internet Speed',
      PricingPlanName: '25 Mbps',
      PricingPlanId: 30496,
      InstanceNumber: 1,
      IsRequired: true,
      RegularExpression: '^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$',
      InventoryProviderType: 0,
      ServiceDisplayOrder: 1000,
      ServiceIdentifierFlag: false,
      DependentServiceAttributeId: '30496-1-1000057-52',
      DependentValues: 'True',
      OfferingOptionPriceId: '1607109442365000210',
      DecisionGroupOptionId: '1607109442365000204'
    }],
    '1607109442365000207': [{
      Id: '30501-1-1000025-54',
      DecisionType: 3,
      Name: 'Telephone Number Port',
      DisplayOrder: 1,
      PossibleValues: ['True', 'False'],
      ProductName: 'Wireless Data',
      PricingPlanName: '1 GB Free; $10/GB',
      PricingPlanId: 30501,
      InstanceNumber: 1,
      IsRequired: true,
      InventoryProviderType: 0,
      ServiceDisplayOrder: 1000,
      ServiceIdentifierFlag: false,
      DependentServiceAttributeId: '',
      OfferingOptionPriceId: '1607109442365000215',
      DecisionGroupOptionId: '1607109442365000207'
    }, {
      Id: '30501-1-1000026-54',
      DecisionType: 3,
      Name: 'Telephone Number',
      DisplayOrder: 2,
      PossibleValues: [],
      ProductName: 'Wireless Data',
      PricingPlanName: '1 GB Free; $10/GB',
      PricingPlanId: 30501,
      InstanceNumber: 1,
      IsRequired: true,
      InventoryProviderType: 0,
      ServiceDisplayOrder: 1000,
      ServiceIdentifierFlag: true,
      DependentServiceAttributeId: '30501-1-1000025-54',
      DependentValues: 'True',
      OfferingOptionPriceId: '1607109442365000215',
      DecisionGroupOptionId: '1607109442365000207'
    }, {
      Id: '30501-1-1000027-54',
      DecisionType: 3,
      Name: 'Telephone Number Selection',
      DisplayOrder: 2,
      PossibleValues: [],
      ProductName: 'Wireless Data',
      PricingPlanName: '1 GB Free; $10/GB',
      PricingPlanId: 30501,
      InstanceNumber: 1,
      IsRequired: true,
      SelectedValue: '2617422064',
      InventoryProviderType: 0,
      ServiceDisplayOrder: 1000,
      ServiceIdentifierFlag: true,
      DependentServiceAttributeId: '30501-1-1000025-54',
      DependentValues: 'False',
      InventoryItemReservation: {
        InventoryTypeId: '1709653004696000700',
        InstanceId: '15000358',
        Token: '15000358||2617422064||c908af4f-ed00-4113-a940-ba6ae3de583c',
        SerialNumber: '2617422064'
      },
      OfferingOptionPriceId: '1607109442365000215',
      DecisionGroupOptionId: '1607109442365000207'
    }, {
      Id: '30501-1-1000028-54',
      DecisionType: 3,
      Name: 'Directory Listing',
      DisplayOrder: 4,
      PossibleValues: ['True', 'False'],
      ProductName: 'Wireless Data',
      PricingPlanName: '1 GB Free; $10/GB',
      PricingPlanId: 30501,
      InstanceNumber: 1,
      IsRequired: false,
      InventoryProviderType: 0,
      ServiceDisplayOrder: 1000,
      ServiceIdentifierFlag: false,
      DependentServiceAttributeId: '',
      OfferingOptionPriceId: '1607109442365000215',
      DecisionGroupOptionId: '1607109442365000207'
    }, {
      Id: '30501-1-1000029-54',
      DecisionType: 3,
      Name: 'Call Waiting',
      DisplayOrder: 3,
      PossibleValues: ['True', 'False'],
      ProductName: 'Wireless Data',
      PricingPlanName: '1 GB Free; $10/GB',
      PricingPlanId: 30501,
      InstanceNumber: 1,
      IsRequired: false,
      InventoryProviderType: 0,
      ServiceDisplayOrder: 1000,
      ServiceIdentifierFlag: false,
      DependentServiceAttributeId: '',
      OfferingOptionPriceId: '1607109442365000215',
      DecisionGroupOptionId: '1607109442365000207'
    }, {
      Id: '30501-1-1000043-54',
      DecisionType: 3,
      Name: 'Spending Limit',
      Description: 'Spending limit for overage per mobile service',
      DisplayOrder: 6,
      PossibleValues: ['5', '10', '15', '20', '50'],
      ProductName: 'Wireless Data',
      PricingPlanName: '1 GB Free; $10/GB',
      PricingPlanId: 30501,
      InstanceNumber: 1,
      IsRequired: false,
      InventoryProviderType: 0,
      ServiceDisplayOrder: 1000,
      ServiceIdentifierFlag: false,
      DependentServiceAttributeId: '',
      OfferingOptionPriceId: '1607109442365000215',
      DecisionGroupOptionId: '1607109442365000207'
    }, {
      Id: '30501-1-1000048-54',
      DecisionType: 3,
      Name: 'Serial Number',
      Description: 'Serial Number',
      DisplayOrder: 0,
      PossibleValues: [],
      ProductName: 'Wireless Data',
      PricingPlanName: '1 GB Free; $10/GB',
      PricingPlanId: 30501,
      InstanceNumber: 1,
      IsRequired: true,
      SelectedValue: '6883565084',
      InventoryProviderType: 0,
      ServiceDisplayOrder: 1000,
      ServiceIdentifierFlag: false,
      DependentServiceAttributeId: '',
      InventoryItemReservation: {
        InventoryTypeId: '1709757832649000700',
        InstanceId: '15004878',
        Token: '15004878||6883565084||ce48e497-8f2c-4658-ad37-96aa15d5a3e8',
        SerialNumber: '6883565084'
      },
      OfferingOptionPriceId: '1607109442365000215',
      DecisionGroupOptionId: '1607109442365000207'
    }]
  }
};
export const ATTRIBUTE_PRESENT_STORE = {
  [DECISION_TYPE.DECISION_GROUP]: {
    '1607109442365000211': {
      present: true
    },
    '1607109442365000204': {
      present: true
    },
    '1607109442365000207': {
      present: true
    }
  }
};
export const ATTRIBUTE_VALUE_TEXT = 'FALSE-TEST-FALSE';
export const ATTRIBUTE_VALUES_STORE = {
  [DECISION_TYPE.DECISION_GROUP]: {
    '1607109442365000207': {
      '30501-1-1000025-54': {
        value: ATTRIBUTE_VALUE_TEXT
      }
    }
  }
};

export const ATTRIBUTE_FROMATTED_METHOD = (includePlaceholder) => {
  const decisionGroup = ATTRIBUTE_STORE[DECISION_TYPE.DECISION_GROUP];
  const JSONData = {
    attributes: {
      [DECISION_TYPE.DECISION_GROUP]: {
        '1607109442365000211': {
          '30499-1': [{
            id: '30499-1-1000048-53',
            instanceNumber: 1,
            name: 'Serial Number',
            dependentServiceAttributeId: '',
            description: 'Serial Number',
            dependentValues: undefined,
            isRequired: true,
            possibleValues: [],
            pricingPlanId: 30499,
            pricingPlanName: '200 Minutes',
            regularExpression: undefined,
            formValue: '6883565288',
            inventoryItemReservation: {
              inventoryTypeId: '1709757832649000700',
              options: [{
                SerialNumber: '6883565288'
              }]
            },
            showDivider: false,
            isRadio: true,
            isSelect: false,
            isDate: false,
            title: null,
            data: decisionGroup['1607109442365000211'].find((item) => item.Id === '30499-1-1000048-53')
          }, {
            id: '30499-1-1000025-53',
            instanceNumber: 1,
            name: 'Telephone Number Port',
            dependentServiceAttributeId: '',
            dependentValues: undefined,
            description: null,
            showDivider: true,
            isRequired: true,
            possibleValues: ['True', 'False'],
            pricingPlanId: 30499,
            pricingPlanName: '200 Minutes',
            regularExpression: undefined,
            formValue: '',
            inventoryItemReservation: null,
            isRadio: false,
            isSelect: true,
            isDate: false,
            title: null,
            data: decisionGroup['1607109442365000211'].find((item) => item.Id === '30499-1-1000025-53')
          }, {
            id: '30499-1-1000029-53',
            instanceNumber: 1,
            name: 'Call Waiting',
            dependentServiceAttributeId: '',
            dependentValues: undefined,
            description: null,
            showDivider: true,
            isRequired: false,
            possibleValues: ['True', 'False'],
            pricingPlanId: 30499,
            pricingPlanName: '200 Minutes',
            regularExpression: undefined,
            formValue: '',
            inventoryItemReservation: null,
            isRadio: false,
            isSelect: true,
            isDate: false,
            title: null,
            data: decisionGroup['1607109442365000211'].find((item) => item.Id === '30499-1-1000029-53')
          }, {
            id: '30499-1-1000028-53',
            instanceNumber: 1,
            name: 'Directory Listing',
            dependentServiceAttributeId: '',
            dependentValues: undefined,
            description: null,
            showDivider: true,
            isRequired: false,
            possibleValues: ['True', 'False'],
            pricingPlanId: 30499,
            pricingPlanName: '200 Minutes',
            regularExpression: undefined,
            formValue: '',
            inventoryItemReservation: null,
            isRadio: false,
            isSelect: true,
            isDate: false,
            title: null,
            data: decisionGroup['1607109442365000211'].find((item) => item.Id === '30499-1-1000028-53')
          }, {
            id: '30499-1-1000042-53',
            instanceNumber: 1,
            name: 'Caller ID Name',
            dependentServiceAttributeId: '',
            description: 'Name you want to display on caller ID when using your number to call Mike. ',
            dependentValues: undefined,
            showDivider: true,
            isRequired: true,
            possibleValues: [],
            pricingPlanId: 30499,
            pricingPlanName: '200 Minutes',
            regularExpression: undefined,
            formValue: '',
            inventoryItemReservation: null,
            isRadio: false,
            isSelect: false,
            isDate: false,
            title: null,
            data: decisionGroup['1607109442365000211'].find((item) => item.Id === '30499-1-1000042-53')
          }]
        },
        '1607109442365000204': {
          '30496-1': [{
            id: '30496-1-1000044-52',
            instanceNumber: 1,
            name: 'Mac Address',
            dependentServiceAttributeId: '',
            dependentValues: undefined,
            description: 'Internet, DO:500',
            showDivider: false,
            isRequired: false,
            possibleValues: [],
            pricingPlanId: 30496,
            pricingPlanName: '25 Mbps',
            regularExpression: undefined,
            formValue: '',
            inventoryItemReservation: null,
            isRadio: false,
            isSelect: false,
            isDate: false,
            title: null,
            data: decisionGroup['1607109442365000204'].find((item) => item.Id === '30496-1-1000044-52')
          }, {
            id: '30496-1-1000054-52',
            instanceNumber: 1,
            name: 'Internet Connection Property',
            dependentServiceAttributeId: '',
            description: 'Internet Connection Property',
            dependentValues: undefined,
            showDivider: true,
            isRequired: false,
            possibleValues: ['Email Address'],
            pricingPlanId: 30496,
            pricingPlanName: '25 Mbps',
            regularExpression: undefined,
            formValue: '',
            inventoryItemReservation: null,
            isRadio: false,
            isSelect: true,
            isDate: false,
            title: null,
            data: decisionGroup['1607109442365000204'].find((item) => item.Id === '30496-1-1000054-52')
          }]
        },
        '1607109442365000207': {
          '30501-1': [{
            id: '30501-1-1000048-54',
            instanceNumber: 1,
            name: 'Serial Number',
            dependentServiceAttributeId: '',
            description: 'Serial Number',
            dependentValues: undefined,
            isRequired: true,
            possibleValues: [],
            pricingPlanId: 30501,
            pricingPlanName: '1 GB Free; $10/GB',
            regularExpression: undefined,
            formValue: '6883565084',
            inventoryItemReservation: {
              inventoryTypeId: '1709757832649000700',
              options: [{
                SerialNumber: '6883565084'
              }]
            },
            showDivider: false,
            isRadio: true,
            isSelect: false,
            isDate: false,
            title: null,
            data: decisionGroup['1607109442365000207'].find((item) => item.Id === '30501-1-1000048-54')
          }, {
            id: '30501-1-1000025-54',
            instanceNumber: 1,
            name: 'Telephone Number Port',
            dependentServiceAttributeId: '',
            dependentValues: undefined,
            description: null,
            isRequired: true,
            possibleValues: ['True', 'False'],
            pricingPlanId: 30501,
            pricingPlanName: '1 GB Free; $10/GB',
            regularExpression: undefined,
            formValue: '',
            inventoryItemReservation: null,
            isRadio: false,
            showDivider: true,
            isSelect: true,
            isDate: false,
            title: null,
            data: decisionGroup['1607109442365000207'].find((item) => item.Id === '30501-1-1000025-54')
          }, {
            id: '30501-1-1000029-54',
            instanceNumber: 1,
            name: 'Call Waiting',
            dependentServiceAttributeId: '',
            dependentValues: undefined,
            description: null,
            isRequired: false,
            showDivider: true,
            possibleValues: ['True', 'False'],
            pricingPlanId: 30501,
            pricingPlanName: '1 GB Free; $10/GB',
            regularExpression: undefined,
            formValue: '',
            inventoryItemReservation: null,
            isRadio: false,
            isSelect: true,
            isDate: false,
            title: null,
            data: decisionGroup['1607109442365000207'].find((item) => item.Id === '30501-1-1000029-54')
          }, {
            id: '30501-1-1000028-54',
            instanceNumber: 1,
            name: 'Directory Listing',
            dependentServiceAttributeId: '',
            dependentValues: undefined,
            description: null,
            isRequired: false,
            showDivider: true,
            possibleValues: ['True', 'False'],
            pricingPlanId: 30501,
            pricingPlanName: '1 GB Free; $10/GB',
            regularExpression: undefined,
            formValue: '',
            inventoryItemReservation: null,
            isRadio: false,
            isSelect: true,
            isDate: false,
            title: null,
            data: decisionGroup['1607109442365000207'].find((item) => item.Id === '30501-1-1000028-54')
          }, {
            id: '30501-1-1000043-54',
            instanceNumber: 1,
            name: 'Spending Limit',
            dependentServiceAttributeId: '',
            description: 'Spending limit for overage per mobile service',
            dependentValues: undefined,
            isRequired: false,
            showDivider: true,
            possibleValues: ['5', '10', '15', '20', '50'],
            pricingPlanId: 30501,
            pricingPlanName: '1 GB Free; $10/GB',
            regularExpression: undefined,
            formValue: '',
            inventoryItemReservation: null,
            isRadio: false,
            isSelect: true,
            isDate: false,
            title: null,
            data: decisionGroup['1607109442365000207'].find((item) => item.Id === '30501-1-1000043-54')
          }]
        }
      }
    }
  };
  if (includePlaceholder) {
    JSONData.attributes[DECISION_TYPE.DECISION_GROUP]['1607109442365000204']['30496-1'][1].possibleValues.unshift(i18next.mockReturn);
    JSONData.attributes[DECISION_TYPE.DECISION_GROUP]['1607109442365000204']['30496-1'][1].formValue = i18next.mockReturn;
    JSONData.attributes[DECISION_TYPE.DECISION_GROUP]['1607109442365000207']['30501-1'][4].possibleValues.unshift(i18next.mockReturn);
    JSONData.attributes[DECISION_TYPE.DECISION_GROUP]['1607109442365000207']['30501-1'][4].formValue = i18next.mockReturn;
  }
  return JSONData;
};


export const ATTRIBUTE_OFFER_ID = '123-321-123';
export const ATTRIBUTE_COMPLETED_DECISIONS = [{
  DisplayOrder: 0,
  formValue: '6883565288',
  DecisionType: 3,
  Id: '30499-1-1000048-53',
  InventoryItemReservation: {
    InstanceId: '15005082',
    InventoryTypeId: '1709757832649000700',
    SerialNumber: '6883565288',
    Token: '15005082||6883565288||265202a7-895b-4ff6-a97d-bf2d265d80f7'
  },
  Name: 'Serial Number',
  OfferingId: ATTRIBUTE_OFFER_ID,
  PricingPlanId: 30499,
  SelectedValue: '6883565288',
  ServiceInstanceId: undefined
}, {
  DisplayOrder: 0,
  formValue: '6883565084',
  DecisionType: 3,
  Id: '30501-1-1000048-54',
  InventoryItemReservation: {
    InstanceId: '15004878',
    InventoryTypeId: '1709757832649000700',
    SerialNumber: '6883565084',
    Token: '15004878||6883565084||ce48e497-8f2c-4658-ad37-96aa15d5a3e8'
  },
  Name: 'Serial Number',
  OfferingId: ATTRIBUTE_OFFER_ID,
  PricingPlanId: 30501,
  SelectedValue: '6883565084',
  ServiceInstanceId: undefined
}];
