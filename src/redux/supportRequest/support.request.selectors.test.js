
import { PORT_FIELD_IDS, SUPPORT_REQUEST_STATUS } from '@selfcare/core/redux/supportRequest/support.request.constants';
import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './support.request.reducer';
import * as SupportRequest from './support.request.selectors';

const SUPPORT_REQUEST_ADDITIONAL_PROPERTY_MAP = {
  OFFER_INSTANCE_ID: '1931356255556000003',
  SERVICE_IDENTIFIER: '1933241639549000103'
};

const SUPPORT_REQUEST_TYPE = {
  ACTIVATION: '1933241639549000100',
  BILLING_DISPUTE: '3',
  COMPLAINT: '2',
  FAILED_PAYMENT: '1931356255556000000',
  INVOICE_DISPUTE: '4',
  MOBILE_NUMBER_PORT: '1927519074395000300',
  TROUBLE: '1'
};

const initializedStore = new Immutable({
  client: {
    supportRequest: INITIAL_STATE
  }
});

describe('When the RecentlyCreated is used...', () => {
  test('It should return the value of the recentlyCreated attribute if it exists.', () => {
    const CUSTOM_STATE = initializedStore.setIn(['client', 'supportRequest', 'recentlyCreated'], true);
    expect(SupportRequest.RecentlyCreatedRequest(CUSTOM_STATE)).toBe(true);
  });

  test('It should return false when support request does not exist.', () => {
    const CUSTOM_STATE = initializedStore.setIn(['client', 'supportRequest'], undefined);
    expect(SupportRequest.RecentlyCreatedRequest(CUSTOM_STATE)).toBe(false);
  });
});

describe('When the ActivationRequestIdForSelectedProduct is used...', () => {
  const SERVICE_ID = '234';
  const ID_VALUE = '1933241639549000103';
  const MY_CASE = '9999';
  test('It should filter out any requests that are not for activation or in NEW status and return the id for the product', () => {
    const response = SupportRequest.ActivationRequestIdForSelectedProduct.resultFunc([{
      Category: SUPPORT_REQUEST_STATUS.BILLING_DISPUTE,
      Status: SUPPORT_REQUEST_STATUS.CANCELLED
    }, {
      Id: {
        Value: MY_CASE
      },
      Category: SUPPORT_REQUEST_TYPE.ACTIVATION,
      Status: SUPPORT_REQUEST_STATUS.NEW,
      AdditionalPropertyValues: [{
        Id: ID_VALUE,
        Value: SERVICE_ID
      }]
    }, {
      Category: SUPPORT_REQUEST_TYPE.ACTIVATION,
      Status: SUPPORT_REQUEST_STATUS.OPEN,
      AdditionalPropertyValues: []
    }], {
      isBroadband: true,
      options: [{
        ServiceAttributeValues: [{
          Value: 'SERVICE_ID'
        }, {
          IsServiceIdentifier: true,
          Value: SERVICE_ID
        }, {
          Value: 'SERVICE_ID_1'
        }]
      }]
    });
    expect(response).toEqual(MY_CASE);
  });
  test('It should return an undefined when nothing matches', () => {
    expect(SupportRequest.ActivationRequestIdForSelectedProduct.resultFunc([{
      Category: SUPPORT_REQUEST_TYPE.BILLING_DISPUTE,
      Status: SUPPORT_REQUEST_STATUS.CANCELLED
    }, {
      Id: {
        Value: MY_CASE
      },
      Category: SUPPORT_REQUEST_TYPE.ACTIVATION,
      Status: SUPPORT_REQUEST_STATUS.OPEN,
      AdditionalPropertyValues: []
    }], {
      SUPPORT_REQUEST_TYPE: {
        ACTIVATION: SUPPORT_REQUEST_TYPE.ACTIVATION
      },
      SUPPORT_REQUEST_ADDITIONAL_PROPERTY_MAP: {
        SERVICE_IDENTIFIER: ID_VALUE
      }
    }, {
      options: [{
        ServiceAttributeValues: [{
          Value: 'SERVICE_ID'
        }, {
          IsServiceIdentifier: true,
          Value: SERVICE_ID
        }, {
          Value: 'SERVICE_ID_1'
        }]
      }]
    })).toEqual(undefined);
    expect(SupportRequest.ActivationRequestIdForSelectedProduct.resultFunc([], {
      SUPPORT_REQUEST_TYPE: {
        ACTIVATION: SUPPORT_REQUEST_TYPE.ACTIVATION
      },
      SUPPORT_REQUEST_ADDITIONAL_PROPERTY_MAP: {
        SERVICE_IDENTIFIER: ID_VALUE
      }
    }, {})).toEqual(undefined);
  });
});

describe('When the RecentlyNewOrOpenPortInRequest is used...', () => {
  const SERVICE_ID = 'test_test_bob';
  const CURRENT_MSISDN_ID = '2322223';
  const SELECTED_PRODUCT = {
    serviceIdentifier: SERVICE_ID
  };
  const MSISDN_CASE_FIELD = {
    id: CURRENT_MSISDN_ID
  };
  test('It should return the first new or open item when it is of case Port-In', () => {
    const NEW_OPEN_REQUESTS = [{
      Id: '1',
      Category: '1927519074395000300',
      AdditionalPropertyValues: [{
        Id: '2323',
        Value: 'Mustard'
      }, {
        Id: CURRENT_MSISDN_ID,
        Value: SERVICE_ID
      }, {
        Id: '55252252',
        Value: undefined
      }],
      Status: 1,
      customCaseDetails: [{
        Id: '2323',
        Name: 'Condiments',
        Value: 'Mustard'
      }, {
        Id: CURRENT_MSISDN_ID,
        Name: 'MSISDN',
        Value: SERVICE_ID
      }, {
        Id: '55252252',
        Name: PORT_FIELD_IDS.NAS_VALIDATION,
        Value: undefined
      }],
      categoryName: 'Drive Thru Complaint'
    }];
    expect(SupportRequest.RecentlyNewOrOpenPortInRequest.resultFunc(NEW_OPEN_REQUESTS, SELECTED_PRODUCT, MSISDN_CASE_FIELD)).toEqual({
      Id: '1',
      Category: '1927519074395000300',
      AdditionalPropertyValues: [{
        Id: '2323',
        Value: 'Mustard'
      }, {
        Id: CURRENT_MSISDN_ID,
        Value: SERVICE_ID
      }, {
        Id: '55252252',
        Value: undefined
      }],
      Status: 1,
      categoryName: 'Drive Thru Complaint',
      messageCode: null,
      customCaseDetails: [{
        Id: '2323',
        Name: 'Condiments',
        Value: 'Mustard'
      }, {
        Id: CURRENT_MSISDN_ID,
        Name: 'MSISDN',
        Value: SERVICE_ID
      }, {
        Id: '55252252',
        Name: PORT_FIELD_IDS.NAS_VALIDATION,
        Value: undefined
      }]
    });
  });
  test('It should return the first new or open item when it is of case Port-In include the nas data if available', () => {
    const NEW_OPEN_REQUESTS = [{
      Id: '1',
      Category: '1927519074395000300',
      AdditionalPropertyValues: [{
        Id: '2323',
        Value: 'Mustard'
      }, {
        Id: CURRENT_MSISDN_ID,
        Value: SERVICE_ID
      }, {
        Id: '55252252',
        Value: 'PENNY'
      }],
      Status: 1,
      customCaseDetails: [{
        Id: '2323',
        Name: 'Condiments',
        Value: 'Mustard'
      }, {
        Id: CURRENT_MSISDN_ID,
        Name: 'MSISDN',
        Value: SERVICE_ID
      }, {
        Id: '55252252',
        Name: PORT_FIELD_IDS.NAS_VALIDATION,
        Value: 'PENNY'
      }],
      categoryName: 'Drive Thru Complaint'
    }];
    expect(SupportRequest.RecentlyNewOrOpenPortInRequest.resultFunc(NEW_OPEN_REQUESTS, SELECTED_PRODUCT, MSISDN_CASE_FIELD)).toEqual({
      Id: '1',
      Category: '1927519074395000300',
      AdditionalPropertyValues: [{
        Id: '2323',
        Value: 'Mustard'
      }, {
        Id: CURRENT_MSISDN_ID,
        Value: SERVICE_ID
      }, {
        Id: '55252252',
        Value: 'PENNY'
      }],
      Status: 1,
      categoryName: 'Drive Thru Complaint',
      messageCode: 'PENNY',
      customCaseDetails: [{
        Id: '2323',
        Name: 'Condiments',
        Value: 'Mustard'
      }, {
        Id: CURRENT_MSISDN_ID,
        Name: 'MSISDN',
        Value: SERVICE_ID
      }, {
        Id: '55252252',
        Name: PORT_FIELD_IDS.NAS_VALIDATION,
        Value: 'PENNY'
      }]
    });
  });
  test('It should return an null when the support request list is empty', () => {
    const STATE_WITHOUT_LIST = initializedStore
      .setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestList'], []);
    expect(SupportRequest.RecentlyNewOrOpenPortInRequest(STATE_WITHOUT_LIST)).toBe(undefined);
  });
});

describe('When the RecentlyClosedPortInRequest is used...', () => {
  const SERVICE_ID = '345345';
  const CURRENT_MSISDN_ID = '654654654';
  const SUPPORT_LIST = [{
    Id: '1',
    Category: '1927519074395000300',
    AdditionalPropertyValues: [{
      Id: '2323',
      Value: 'Mustard'
    }, {
      Id: '1927519074379000307',
      Value: 'Incorrect Number'
    }, {
      Id: '1927519074379000305',
      Value: 1000
    }],
    Status: 1,
    Modified: 2,
    customCaseDetails: [{
      Id: '2323',
      Name: 'Condiments',
      Value: 'Mustard'
    }, {
      Id: '1927519074379000307',
      Name: 'ResponseMSG',
      Value: 'Incorrect Number'
    }, {
      Id: '1927519074379000305',
      Name: 'Response Code',
      Value: 1000
    }],
    categoryName: 'Drive Thru Complaint'
  }, {
    Id: '1',
    Category: '1927519074395000300',
    AdditionalPropertyValues: [{
      Id: CURRENT_MSISDN_ID,
      Value: SERVICE_ID
    }, {
      Id: '2323',
      Value: 'Mustard'
    }],
    Status: 4,
    ResolutionDate: '123',
    Modified: 4,
    customCaseDetails: [{
      Id: '2323',
      Name: 'Condiments',
      Value: 'Mustard'
    }],
    categoryName: 'Drive Thru Complaint'
  }];
  const SELECTED_PRODUCT = {
    serviceIdentifier: SERVICE_ID
  };
  const MSISDN_CASE_FIELD = {
    id: CURRENT_MSISDN_ID
  };
  test('It should return the first closed item when it is of case Port-In', () => {
    expect(SupportRequest.RecentlyClosedPortInRequest.resultFunc(SUPPORT_LIST, null, SELECTED_PRODUCT, MSISDN_CASE_FIELD)).toEqual({
      Id: '1',
      Category: '1927519074395000300',
      AdditionalPropertyValues: [{
        Id: CURRENT_MSISDN_ID,
        Value: SERVICE_ID
      }, {
        Id: '2323',
        Value: 'Mustard'
      }],
      Status: 4,
      Modified: 4,
      ResolutionDate: '123',
      categoryName: 'Drive Thru Complaint',
      responseMessage: null,
      messageCode: null,
      successful: false,
      validatedDate: '123',
      customCaseDetails: [{
        Id: '2323',
        Name: 'Condiments',
        Value: 'Mustard'
      }]
    });
  });
  test('It should return the first closed item when it is of case Port-In, even with an open case available that is older than the closed case.', () => {
    const OPEN_CASE = {
      Id: '1',
      Category: '1927519074395000300',
      AdditionalPropertyValues: [{
        Id: '2323',
        Value: 'Mustard'
      }, {
        Id: CURRENT_MSISDN_ID,
        Value: SERVICE_ID
      }],
      Status: 1,
      Modified: 2,
      categoryName: 'Drive Thru Complaint',
      customCaseDetails: [{
        Id: '2323',
        Name: 'Condiments',
        Value: 'Mustard'
      }]
    };
    expect(SupportRequest.RecentlyClosedPortInRequest.resultFunc(SUPPORT_LIST, OPEN_CASE, SELECTED_PRODUCT, MSISDN_CASE_FIELD)).toEqual({
      Id: '1',
      Category: '1927519074395000300',
      AdditionalPropertyValues: [{
        Id: CURRENT_MSISDN_ID,
        Value: SERVICE_ID
      }, {
        Id: '2323',
        Value: 'Mustard'
      }],
      Status: 4,
      Modified: 4,
      ResolutionDate: '123',
      categoryName: 'Drive Thru Complaint',
      responseMessage: null,
      messageCode: null,
      successful: false,
      validatedDate: '123',
      customCaseDetails: [{
        Id: '2323',
        Name: 'Condiments',
        Value: 'Mustard'
      }]
    });
  });
  test('It should return null even if a closed case Port-In, when a newer open case is available.', () => {
    const OPEN_CASE = {
      Id: '1',
      Category: '1927519074395000300',
      AdditionalPropertyValues: [{
        Id: '2323',
        Value: 'Mustard'
      }, {
        Id: CURRENT_MSISDN_ID,
        Value: SERVICE_ID
      }],
      Status: 1,
      Modified: 9,
      categoryName: 'Drive Thru Complaint',
      customCaseDetails: [{
        Id: '2323',
        Name: 'Condiments',
        Value: 'Mustard'
      }]
    };
    expect(SupportRequest.RecentlyClosedPortInRequest.resultFunc(SUPPORT_LIST, OPEN_CASE, SELECTED_PRODUCT, MSISDN_CASE_FIELD)).toBeNull();
  });

  test('It should return an null when the support request list has a new or open with higher modified value', () => {
    const STATE_WITHOUT_LIST = initializedStore
      .setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestList', 0, 'Modified'], 7);
    expect(SupportRequest.RecentlyClosedPortInRequest(STATE_WITHOUT_LIST)).toBeNull();
  });

  test('It should return an null when the support request list is empty', () => {
    const STATE_WITHOUT_LIST = initializedStore
      .setIn(['ascendon', 'subscriberApi', 'supportRequest', 'data', 'supportRequestList'], []);
    expect(SupportRequest.RecentlyClosedPortInRequest(STATE_WITHOUT_LIST)).toBeNull();
  });
});

describe('When the Payment failure case selectors are used...', () => {
  const PAY_FAIL_REQUESTS = [{
    CaseNumber: '123456789',
    Category: '1931356255556000000',
    Id: {
      Value: '1'
    },
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

  describe('When the PaymentFailureRequestsForSelectedProduct is used...', () => {
    test('It should return a formatted response if the selected product has a payment failure case', () => {
      const result = SupportRequest.PaymentFailureRequestsForSelectedProduct.resultFunc(PAY_FAIL_REQUESTS, SELECTED_PRODUCT, SUBSCRIBER,
        {
          SUPPORT_REQUEST_ADDITIONAL_PROPERTY_MAP,
          SUPPORT_REQUEST_TYPE
        });
      expect(result).toEqual({
        caseId: '1',
        subscriberId: 1234567
      });
    });

    test('It should return null if the selected product does not have a payment failure case', () => {
      const result = SupportRequest.PaymentFailureRequestsForSelectedProduct.resultFunc([], SELECTED_PRODUCT, SUBSCRIBER,
        {
          SUPPORT_REQUEST_ADDITIONAL_PROPERTY_MAP,
          SUPPORT_REQUEST_TYPE
        });
      expect(result).toBeNull();
    });
  });

  describe('When the HasPaymentFailureRequestsForSelectedProduct is used...', () => {
    test('It should return true response if the selected product has a payment failure case', () => {
      expect(SupportRequest.HasPaymentFailureRequestsForSelectedProduct.resultFunc({
        caseId: '1',
        subscriberId: 1234567
      })).toBeTruthy();
    });

    test('It should return false if the selected product does not have a payment failure case', () => {
      expect(SupportRequest.HasPaymentFailureRequestsForSelectedProduct.resultFunc(null)).toBe(false);
    });
  });
});
