import i18next from 'i18next';
import React from 'react';
import Currency from 'selfcare-ui/src/components/currency/currency';
import StatusIndicator from 'selfcare-ui/src/components/statusIndicator/status.indicator';
import LocaleKeys from '../../locales/keys';
import { getSupportRequestsDetails } from '../../navigation/sitemap.selectors';
import { FormatFriendlyDate, GenerateDefinitionList, getConfigurationByRequestType, SetupApiDataFromForm } from './support.request.helpers';

const SUPPORT_REQUEST_TYPE = {
  ACTIVATION: '1933241639549000100',
  BILLING_DISPUTE: '3',
  COMPLAINT: '2',
  FAILED_PAYMENT: '1931356255556000000',
  INVOICE_DISPUTE: '4',
  MOBILE_NUMBER_PORT: '1927519074395000300',
  TROUBLE: '1'
};

describe('When the SetupApiDataFromForm function is used...', () => {
  test('It should return the formatted object when from a global case type for the api.', () => {
    const CASE_TYPE = 1;
    const FORM_VALUES = {
      supportRequestDescription: 'This is a description',
      supportRequestDeviceName: 'Iphone',
      supportRequestDeviceNumber: '12341234',
      supportRequestDisputeAmount: '123.34',
      supportRequestInvoiceNumber: '1234'
    };
    const EXPECTED = {
      Case: {
        Category: 1,
        Description: 'This is a description',
        Details: {
          BillingDisputeDetails: {},
          ComplaintDetails: {},
          InvoiceDisputeDetails: {
            DisputedAmount: '123.34',
            InvoiceNumber: '1234'
          },
          TroubleCallDetails: {
            FriendlyName: 'Iphone',
            SerialNumber: '12341234'
          }
        }
      }
    };
    const dataForApi = SetupApiDataFromForm(FORM_VALUES, CASE_TYPE, SUPPORT_REQUEST_TYPE);
    expect(dataForApi).toEqual(EXPECTED);
  });

  test('It should return the formatted object when from custom case type for the api.', () => {
    const CASE_TYPE = 12312323123123;
    const FORM_VALUES = {
      1111: 'Mustard',
      2222: 'High',
      3333: 'Angry',
      supportRequestDescription: 'this is a description'
    };
    const EXPECTED = {
      Case: {
        Category: 12312323123123,
        Description: 'this is a description',
        Details: {
          BillingDisputeDetails: {},
          ComplaintDetails: {},
          InvoiceDisputeDetails: {
            DisputedAmount: undefined,
            InvoiceNumber: undefined
          },
          TroubleCallDetails: {
            FriendlyName: undefined,
            SerialNumber: undefined
          }
        },
        AdditionalPropertyValues: [{
          Id: '1111',
          Value: 'Mustard'
        }, {
          Id: '2222',
          Value: 'High'
        }, {
          Id: '3333',
          Value: 'Angry'
        }]
      }
    };
    const dataForApi = SetupApiDataFromForm(FORM_VALUES, CASE_TYPE, SUPPORT_REQUEST_TYPE);
    expect(dataForApi).toEqual(EXPECTED);
  });

  test('It should return an empty object when the values dont exist.', () => {
    const FORM_VALUES = null;
    const EXPECTED = {};
    const dataForApi = SetupApiDataFromForm(FORM_VALUES, SUPPORT_REQUEST_TYPE);
    expect(dataForApi).toEqual(EXPECTED);
  });
});

describe('When the FormatFriendlyDate function is used...', () => {
  test('It should return the string with the formatted date', () => {
    const DATE = '2018-08-27T20:34:01.837Z';
    FormatFriendlyDate(DATE);
    expect(i18next.t.mock.calls[0]).toMatchObject([
      LocaleKeys.SUPPORT_REQUEST.DATE_TIME,
      {
        date: expect.stringMatching(/^August/),
        time: expect.any(String)
      }
    ]);
  });
});

describe('When the getConfigurationByRequestType function is used...', () => {
  test('It should return the field configuration based on type if it exists', () => {
    const TYPE = '33';
    const FIELD_CONFIGURATIONS = [{
      id: '33',
      label: 'expected',
      fields: [{
        id: 1,
        displayOrder: 2
      }]
    }, {
      id: '22',
      label: 'not expected'
    }];

    const response = getConfigurationByRequestType(TYPE, FIELD_CONFIGURATIONS);
    expect(response).toEqual(FIELD_CONFIGURATIONS[0].fields);
  });
});

describe('When the GenerateDefinitionList function is used...', () => {
  test('It should return the opened on, description when it is a complaint', () => {
    const request = {
      Id: {
        Value: '1'
      },
      Category: '2',
      Status: 1,
      Added: '2018-08-27T20:34:01.837Z',
      Description: 'This is a description'
    };
    const EXPECTED = [{
      label: i18next.mockReturn,
      value: <StatusIndicator
        type="supportRequest"
        value={1}
      />
    }, {
      label: i18next.mockReturn,
      value: i18next.mockReturn
    }, {
      label: i18next.mockReturn,
      value: 'This is a description'
    }];
    expect(GenerateDefinitionList(request, getSupportRequestsDetails().id, SUPPORT_REQUEST_TYPE)).toEqual(EXPECTED);
  });

  test('It should return the opened on, description and invoice related values when it is a invoice dispute', () => {
    const request = {
      Id: {
        Value: '2'
      },
      Category: '4',
      Status: 1,
      Added: '2018-08-27T20:34:01.837Z',
      Description: 'This is a description',
      Details: {
        InvoiceDisputeDetails: {
          DisputeAmount: '123.33',
          InvoiceNumber: '1234'
        }
      }
    };
    const EXPECTED = [{
      label: i18next.mockReturn,
      value: <StatusIndicator
        type="supportRequest"
        value={1}
      />
    }, {
      label: i18next.mockReturn,
      value: i18next.mockReturn
    }, {
      label: i18next.mockReturn,
      value: '1234'
    }, {
      label: i18next.mockReturn,
      value: <Currency code="SEK" value={0} />
    }, {
      label: i18next.mockReturn,
      value: 'This is a description'
    }];
    expect(GenerateDefinitionList(request, getSupportRequestsDetails().id, SUPPORT_REQUEST_TYPE)).toEqual(EXPECTED);
  });

  test('It should return the opened on, description and custom request related values when it has customCaseDetails', () => {
    const request = {
      Id: {
        Value: '2'
      },
      Category: '3434343434',
      Status: 1,
      Added: '2018-08-27T20:34:01.837Z',
      Description: 'This is a description',
      Details: {
        InvoiceDisputeDetails: {
          DisputeAmount: '123.33',
          InvoiceNumber: '1234'
        }
      },
      customCaseDetails: [{
        Id: '123',
        Value: 'Mustard',
        Name: 'Condiments'
      }]
    };
    const EXPECTED = [{
      label: i18next.mockReturn,
      value: <StatusIndicator
        type="supportRequest"
        value={1}
      />
    }, {
      label: i18next.mockReturn,
      value: i18next.mockReturn
    }, {
      label: 'Condiments',
      value: 'Mustard'
    }, {
      label: i18next.mockReturn,
      value: 'This is a description'
    }];
    expect(GenerateDefinitionList(request, getSupportRequestsDetails().id, SUPPORT_REQUEST_TYPE)).toEqual(EXPECTED);
  });

  test('It should return an opened on, description when it does not match the category and does not have customCaseDetails', () => {
    const request = {
      Id: {
        Value: '2'
      },
      Category: '3434343434',
      Status: 1,
      Added: '2018-08-27T20:34:01.837Z',
      Description: 'This is a description',
      Details: {
        InvoiceDisputeDetails: {
          DisputeAmount: '123.33',
          InvoiceNumber: '1234'
        }
      }
    };
    const EXPECTED = [{
      label: i18next.mockReturn,
      value: <StatusIndicator
        type="supportRequest"
        value={1}
      />
    },
    {
      label: i18next.mockReturn,
      value: i18next.mockReturn
    }, {
      label: i18next.mockReturn,
      value: 'This is a description'
    }];
    expect(GenerateDefinitionList(request, getSupportRequestsDetails().id, SUPPORT_REQUEST_TYPE)).toEqual(EXPECTED);
  });
});
