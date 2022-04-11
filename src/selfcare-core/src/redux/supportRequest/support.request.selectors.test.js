import i18next from 'i18next';
import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './support.request.reducer';
import * as SupportRequest from './support.request.selectors';

const initializedStore = new Immutable({
  client: {
    supportRequest: INITIAL_STATE
  }
});

const FIELDS_CONFIGURATION = [{
  label: 'GDPR',
  id: '1925533179544000100'
}, {
  label: 'Charge Dispute',
  id: '1925533179022000300'
}, {
  label: 'Change Customer State',
  id: '1926237654319000200'
}, {
  label: 'Kafka Response',
  id: '2001557071797000000'
}, {
  label: 'Regret Purchase',
  id: '2010658230172000100'
}, {
  label: 'Deactivate Unused Service',
  id: '1936439225884000200'
}, {
  label: 'Pending Provisioning',
  id: '2014649116826000200'
}, {
  label: 'Payment Failure',
  id: '1931550184805000100'
}, {
  label: 'Activate Service',
  id: '1933053706501000100'
}, {
  label: 'Mobile Number Port',
  id: '1927519074395000300',
  fields: [{
    name: 'PortInMSISDN',
    id: '1931550184281000001',
    displayOrder: 10
  },
  {
    name: 'Validated Date',
    id: '1931550184281000017',
    displayOrder: 900
  },
  {
    name: 'SSN Number',
    id: '1931550184281000003',
    displayOrder: 901
  },
  {
    name: 'Inventory Item',
    id: 'supportRequestInventoryItem',
    displayOrder: 901
  },
  {
    name: 'MSISDN',
    id: '2010654216384000103',
    displayOrder: 902
  },
  {
    name: 'NasValidation',
    id: '2010654216384000101',
    displayOrder: 903
  },
  {
    name: 'Port In Date',
    id: '1931550184281000005',
    displayOrder: 905
  },
  {
    name: 'Validate Port In Date',
    id: '1931550184281000007',
    displayOrder: 910
  },
  {
    name: 'NAS Lookup',
    id: '1931550184281000009',
    displayOrder: 915
  },
  {
    name: 'Response Code',
    id: '1931550184281000013',
    displayOrder: 915
  },
  {
    name: 'ResponseMSG',
    id: '1931550184281000011',
    displayOrder: 920
  },
  {
    name: 'PortingID',
    id: '1931550184281000015',
    displayOrder: 940
  },
  {
    name: 'Description',
    id: 'supportRequestDescription',
    displayOrder: 999,
    displayType: 'text-area'
  }
  ]
}, {
  label: 'Complaint',
  id: '2'
}, {
  label: 'Billing Dispute',
  id: '3'
},
{
  label: 'Trouble Call',
  id: '1'
}
];

describe('SupportRequest ', () => {
  describe('When the RequestDetails is used...', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      const DATA = {
        id: 1
      };
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestDetails'], DATA);
      expect(SupportRequest.RequestDetails(CUSTOM_STATE)).toEqual(DATA);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(SupportRequest.RequestDetails()).toBeNull();
    });

    test('It should return null when there is no data attribute in the store.', () => {
      expect(SupportRequest.RequestDetails.resultFunc({})).toBeNull();
    });
  });

  describe('When the SupportTypesWithFieldConfiguration is used...', () => {
    const TRANSLATED_STRING = 'translated string';
    beforeEach(() => {
      i18next.t = jest.fn(() => 'translated string');
    });

    const CUSTOM_STATE_WITH_METADATA = initializedStore
      .setIn(['ascendon', 'metadata', 'codes', 180], {
        isLoaded: true,
        items: [{
          Value: '123',
          Name: 'Regex Name',
          AdditionalProperties: {
            regex: 'regex pattern'
          },
          Description: 'Regex Description'
        }]
      })
      .setIn(['ascendon', 'metadata', 'codes', 5], {
        isLoaded: true,
        items: [{
          Value: '1',
          Name: 'DropdownList'
        }, {
          Value: '2',
          Name: 'Text'
        }, {
          Value: '3',
          Name: 'Boolean'
        }]
      });

    test('It should return the formatted config when the support request type is an Invoice Dispute', () => {
      const SUPPORT_TYPES = [{
        Name: 'Invoice',
        Id: '4'
      }];
      const STATE_WITH_INVOICE = CUSTOM_STATE_WITH_METADATA.setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestTypes'], SUPPORT_TYPES);
      const EXPECTED = [{
        id: '4',
        label: 'Invoice',
        fields: [{
          name: TRANSLATED_STRING,
          id: 'supportRequestInvoiceNumber',
          validation: {
            isRequired: false
          },
          displayOrder: 1,
          displayType: 'text'
        }, {
          name: TRANSLATED_STRING,
          id: 'supportRequestDisputeAmount',
          validation: {
            isRequired: true
          },
          displayOrder: 2,
          displayType: 'currency'
        }, {
          name: TRANSLATED_STRING,
          id: 'supportRequestDescription',
          validation: {
            isRequired: true
          },
          displayOrder: 999,
          displayType: 'text-area'
        }]
      }];
      expect(SupportRequest.SupportTypesWithFieldConfiguration(STATE_WITH_INVOICE)).toEqual(EXPECTED);
    });

    test('It should return the formatted config when the support request type is an Trouble Call Dispute', () => {
      const SUPPORT_TYPES = [{
        Name: 'Trouble Call',
        Id: '1'
      }];
      const STATE_WITH_TROUBLE = CUSTOM_STATE_WITH_METADATA.setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestTypes'], SUPPORT_TYPES);
      const EXPECTED = [{
        id: '1',
        label: 'Trouble Call',
        fields: [{
          name: TRANSLATED_STRING,
          id: 'supportRequestDeviceName',
          validation: {
            isRequired: true
          },
          displayOrder: 1,
          displayType: 'text'
        }, {
          name: TRANSLATED_STRING,
          id: 'supportRequestDeviceNumber',
          validation: {
            isRequired: false
          },
          displayOrder: 2,
          displayType: 'text'
        }, {
          name: TRANSLATED_STRING,
          id: 'supportRequestDescription',
          validation: {
            isRequired: true
          },
          displayOrder: 999,
          displayType: 'text-area'
        }]
      }];
      expect(SupportRequest.SupportTypesWithFieldConfiguration(STATE_WITH_TROUBLE)).toEqual(EXPECTED);
    });

    test('It should return the formatted config when the support request type is custom dispute with additional properties', () => {
      const SUPPORT_TYPES = [{
        Name: 'Support Type',
        Id: '34343434343434',
        CaseAdditionalProperties: [{
          Name: 'Additional Property',
          AdditionalPropertyValueType: 3,
          Id: '22222222',
          IsRequired: true,
          RegExCode: 123,
          DisplayOrder: 2,
          PossibleValues: ['yes', 'no', 'maybe']
        }]
      }];
      const STATE_WITH_ADDITIONAL_PROPERTIES = CUSTOM_STATE_WITH_METADATA.setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestTypes'], SUPPORT_TYPES);
      const EXPECTED = [{
        id: '34343434343434',
        label: 'Support Type',
        fields: [{
          name: 'Additional Property',
          id: '22222222',
          displayOrder: 2,
          options: [{
            value: null,
            label: TRANSLATED_STRING
          }, 'yes', 'no', 'maybe'],
          displayType: 'boolean',
          validation: {
            error: 'Regex Description',
            isRequired: true,
            name: 'Regex Name',
            pattern: 'regex pattern'
          }
        }, {
          name: TRANSLATED_STRING,
          id: 'supportRequestDescription',
          validation: {
            isRequired: true
          },
          displayOrder: 999,
          displayType: 'text-area'
        }]
      }];
      expect(SupportRequest.SupportTypesWithFieldConfiguration(STATE_WITH_ADDITIONAL_PROPERTIES)).toEqual(EXPECTED);
    });

    describe('It should return an empty array when the support types are not loaded', () => {
      const DATA = null;
      const CUSTOM_STATE_WITH_TYPES = initializedStore.setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestTypes'], DATA);

      expect(SupportRequest.SupportTypesWithFieldConfiguration(CUSTOM_STATE_WITH_TYPES)).toEqual([]);
    });

    describe('It should return an empty array when the regexs are not loaded', () => {
      const DATA = null;
      const CUSTOM_STATE_WITH_TYPES = initializedStore.setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestTypes'], DATA);

      expect(SupportRequest.SupportTypesWithFieldConfiguration(CUSTOM_STATE_WITH_TYPES)).toEqual([]);
    });
  });

  describe('When the RequestsList is used...', () => {
    test('It should return the value of data when one exists.', () => {
      const DATA = [{
        id: 1
      }];
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestList'], DATA);
      expect(SupportRequest.RequestsList(CUSTOM_STATE)).toEqual(DATA);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(SupportRequest.RequestsList()).toEqual([]);
    });
  });

  describe('When the RequestListWithMappedProperties is used...', () => {
    const STATE_WITH_LIST = initializedStore
      .setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestList'], [{
        Id: '1',
        Category: '2',
        AdditionalPropertyValues: [{
          Id: '2323',
          Value: 'Mustard'
        }]
      }]);
    const STATE_WITH_TYPES = initializedStore
      .setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestTypes'], [{
        Id: '2',
        Name: 'Drive Thru Complaint',
        CaseAdditionalProperties: [{
          Id: '2323',
          Name: 'Condiments'
        }]
      }]);
    const STATE_WITH_LIST_AND_TYPES = STATE_WITH_LIST
      .setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestTypes'], [{
        Id: '2',
        Name: 'Drive Thru Complaint',
        CaseAdditionalProperties: [{
          Id: '2323',
          Name: 'Condiments'
        }]
      }]);

    test('It should return the item with the mapped properties when additional properties exist.', () => {
      const response = SupportRequest.RequestListWithMappedProperties(STATE_WITH_LIST_AND_TYPES);
      expect(response[0]).toEqual({
        Id: '1',
        Category: '2',
        AdditionalPropertyValues: [{
          Id: '2323',
          Value: 'Mustard'
        }],
        categoryName: 'Drive Thru Complaint',
        customCaseDetails: [{
          Id: '2323',
          Name: 'Condiments',
          Value: 'Mustard'
        }]
      });
    });

    test('It should return an empty array when supportTypes does not exist.', () => {
      expect(SupportRequest.RequestListWithMappedProperties(STATE_WITH_LIST)).toEqual([]);
    });

    test('It should return an empty array when supportList does not exist.', () => {
      expect(SupportRequest.RequestListWithMappedProperties(STATE_WITH_TYPES)).toEqual([]);
    });

    test('It should add the support request details when the id does not match any in the list.', () => {
      const STATE_WITH_LIST_AND_DETAILS = STATE_WITH_LIST_AND_TYPES
        .setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestDetails'], {
          Id: {
            Value: '232323'
          },
          Category: '2',
          AdditionalPropertyValues: [{
            Id: '2323',
            Value: 'Mustard'
          }]
        });
      const response = SupportRequest.RequestListWithMappedProperties(STATE_WITH_LIST_AND_DETAILS);
      expect(response).toEqual([{
        Id: {
          Value: '232323'
        },
        categoryName: 'Drive Thru Complaint',
        Category: '2',
        AdditionalPropertyValues: [{
          Id: '2323',
          Value: 'Mustard'
        }],
        customCaseDetails: [{
          Id: '2323',
          Name: 'Condiments',
          Value: 'Mustard'
        }]
      }, {
        Id: '1',
        Category: '2',
        AdditionalPropertyValues: [{
          Id: '2323',
          Value: 'Mustard'
        }],
        categoryName: 'Drive Thru Complaint',
        customCaseDetails: [{
          Id: '2323',
          Name: 'Condiments',
          Value: 'Mustard'
        }]
      }]);
    });
  });

  describe('When the RequestDetailsWithMappedProperties is used...', () => {
    const STATE_WITH_DETAIL = initializedStore
      .setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestDetails'], {
        Id: '1',
        Category: '2',
        AdditionalPropertyValues: [{
          Id: '2323',
          Value: 'Mustard'
        }]
      });
    const STATE_WITH_TYPES = initializedStore
      .setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestTypes'], [{
        Id: '2',
        Value: 'Drive Thru Complaint',
        CaseAdditionalProperties: [{
          Id: '2323',
          Name: 'Condiments'
        }]
      }]);
    const STATE_WITH_DETAIL_AND_TYPES = STATE_WITH_DETAIL
      .setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestTypes'], [{
        Id: '2',
        Value: 'Drive Thru Complaint',
        CaseAdditionalProperties: [{
          Id: '2323',
          Name: 'Condiments'
        }]
      }]);
    test('It should return the item with the mapped properties when additional properties exist.', () => {
      const response = SupportRequest.RequestDetailsWithMappedProperties(STATE_WITH_DETAIL_AND_TYPES);
      expect(response.customCaseDetails).toEqual([{
        Id: '2323',
        Name: 'Condiments',
        Value: 'Mustard'
      }]);
    });

    test('It should return null when supportTypes does not exist.', () => {
      expect(SupportRequest.RequestDetailsWithMappedProperties(STATE_WITH_DETAIL)).toEqual(null);
    });

    test('It should return null when supportDetails does not exist.', () => {
      expect(SupportRequest.RequestDetailsWithMappedProperties(STATE_WITH_TYPES)).toEqual(null);
    });
  });

  describe('When the RecentNewOrOpenSupportRequests is used...', () => {
    const STATE_WITH_LIST = initializedStore
      .setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestList'], [{
        Id: '1',
        Category: '2',
        AdditionalPropertyValues: [{
          Id: '2323',
          Value: 'Mustard'
        }],
        Status: 1
      }]);
    const STATE_WITH_LIST_AND_TYPES = STATE_WITH_LIST
      .setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestTypes'], [{
        Id: '2',
        Name: 'Drive Thru Complaint',
        CaseAdditionalProperties: [{
          Id: '2323',
          Name: 'Condiments'
        }]
      }]);
    test('It should return an empty array when the support request list doesnt have a matching status', () => {
      const STATE_WITHOUT_PROPER_STATUS = STATE_WITH_LIST_AND_TYPES
        .setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestList', 0, 'Status'], 4);
      expect(SupportRequest.RecentNewOrOpenSupportRequests(STATE_WITHOUT_PROPER_STATUS)).toEqual([]);
    });
    test('It should return an empty array when the support request list is empty', () => {
      const STATE_WITHOUT_LIST = initializedStore
        .setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestList'], []);
      expect(SupportRequest.RecentNewOrOpenSupportRequests(STATE_WITHOUT_LIST)).toEqual([]);
    });
  });

  describe('When the RecentlyNewOrOpenPaymentFailureRequests is used...', () => {
    test('It should return the first new or open item when it is of case Payment Failure', () => {
      const CUSTOM_STATE = initializedStore
        .setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestList'], [{
          Id: '1',
          Category: '1931356255556000000',
          CaseNumber: '123456789',
          Status: 1,
          AdditionalPropertyValues: [{
            Id: '1931356255556000003',
            Value: '1930355229384000300'
          }]
        }]).setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestTypes'], [{
          Id: '1931356255556000000',
          Name: 'Payment Failure',
          CaseAdditionalProperties: [{
            Id: '1931356255556000003',
            Name: 'offerInstanceId'
          }]
        }]);
      expect(SupportRequest.RecentlyNewOrOpenPaymentFailureRequests(CUSTOM_STATE)).toEqual([{
        CaseNumber: '123456789',
        Category: '1931356255556000000',
        Id: '1',
        Status: 1,
        categoryName: 'Payment Failure',
        customCaseDetails: [{
          Id: '1931356255556000003',
          Name: 'offerInstanceId',
          Value: '1930355229384000300'
        }],
        AdditionalPropertyValues: [{
          Id: '1931356255556000003',
          Value: '1930355229384000300'
        }]
      }]);
    });
    test('It should return an empty array when the support request list is empty', () => {
      const CUSTOM_STATE = initializedStore
        .setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestList'], []);
      expect(SupportRequest.RecentlyNewOrOpenPaymentFailureRequests(CUSTOM_STATE)).toEqual([]);
    });
  });

  describe('When the PaymentFailureRequestForOfferingInstanceId is used...', () => {
    const PAY_FAIL_REQUESTS = [{
      CaseNumber: '123456789',
      Category: '1931356255556000000',
      Id: '1',
      Status: 1,
      categoryName: 'Payment Failure',
      customCaseDetails: [{
        Id: '1931356255556000003',
        Name: 'offerInstanceId',
        Value: '1930355229384000300'
      }],
      AdditionalPropertyValues: [{
        Id: '1931356255556000003',
        Value: '1930355229384000300'
      }]
    }];
    const SELECTED_PRODUCT = {
      offeringInstanceId: '1930355229384000300'
    };
    const SUBSCRIBER = {
      Id: 1234567
    };

    test('It should return a formatted response if the offering has a payment failure case', () => {
      const result = SupportRequest.PaymentFailureRequestForOfferingInstanceId.resultFunc(PAY_FAIL_REQUESTS, SELECTED_PRODUCT, SUBSCRIBER);
      expect(result).toEqual({
        caseId: '123456789',
        subscriberId: 1234567
      });
    });

    test('It should return null if the offering does not have a payment failure case', () => {
      const result = SupportRequest.PaymentFailureRequestForOfferingInstanceId.resultFunc([], SELECTED_PRODUCT, SUBSCRIBER);
      expect(result).toBeNull();
    });
  });

  describe('When the PortInDate is used...', () => {
    test('It returns the displayOrder, name, and id', () => {
      const result = SupportRequest.PortInDateField.resultFunc(FIELDS_CONFIGURATION);
      expect(result).toEqual({
        id: '1931550184281000005',
        name: 'Port In Date',
        displayOrder: 905
      });
    });
  });

  describe('When the PortInSsn is used...', () => {
    test('It returns the displayOrder, name, and id', () => {
      const result = SupportRequest.PortInSsnField.resultFunc(FIELDS_CONFIGURATION);
      expect(result).toEqual({
        id: '1931550184281000003',
        name: 'SSN Number',
        displayOrder: 901
      });
    });
  });
});
