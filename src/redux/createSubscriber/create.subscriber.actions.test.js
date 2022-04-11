import { SubscriberTypes } from '@selfcare/core/redux/subscriber/subscriber.actions';
import axios from 'axios';
import { ClearProspect, SubscriberInformationActions } from '../orderFlow/subscriberInformation/subscriber.information.actions';
import { CreateSubscriberActionTypes, RetrieveSubscriberOrProspect } from './create.subscriber.actions';

jest.mock('axios');

describe('Create Subscriber Actions', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const getState = jest.fn(() => {});
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const subscriberWithExternalReference = {
    BirthDate: '1910-11-12T00:00:00.000Z',
    LastSuccessfulLogin: '2020-04-15T17:15:07.393Z',
    TermsAndConditionsAccepted: '2020-04-15T17:11:52.420Z',
    SubscriberConsents: [],
    StatusName: 'Active',
    AdditionalProperties: [],
    HomeCountry: 'SWE',
    ContactPreferences: [
      {
        Id: 34814,
        ContactEventType: 56,
        ContactMethod: 1,
        OptIn: true
      }
    ],
    InvoiceConfiguration: {
      HideZeroAmount: true,
      InvoiceDetailLevel: 1
    },
    SubscriberCurrency: 'SEK',
    EffectiveStartDate: '2020-04-15T17:11:52.417Z',
    StateName: 'Prospect',
    SubscriberIdentifications: [
      {
        Id: 10882,
        SubscriberIdentificationTypeCode: 10024,
        SubscriberIdentificationValue: '********9812'
      }
    ],
    Id: 358691,
    Created: '2020-04-15T17:11:52.427Z',
    FirstName: 'Martin',
    LastName: 'Olson',
    Email: 'ed0005@mailinator.com',
    MobilePhone: '46712345678',
    Language: 'sv-SE',
    ExternalReference: '191011129812',
    Status: 1,
    Login: 'ed0005@mailinator.com',
    HasActiveSubscriptions: false,
    ConvergentBillerId: '40001528',
    SubscriberTypeCode: 5,
    State: 0,
    StateChangeDate: '2020-04-15T17:15:06.653Z',
    Category: 0
  };

  const subscriberWithAdditionalProperty = {
    BirthDate: '1910-11-12T00:00:00.000Z',
    LastSuccessfulLogin: '2020-04-15T17:15:07.393Z',
    TermsAndConditionsAccepted: '2020-04-15T17:11:52.420Z',
    SubscriberConsents: [],
    StatusName: 'Active',
    AdditionalProperties: [
      {
        Id: 1185,
        ExternalReference: 'SSN',
        Name: 'personnummer',
        Values: [
          '191011129812'
        ]
      }
    ],
    HomeCountry: 'SWE',
    ContactPreferences: [
      {
        Id: 34814,
        ContactEventType: 56,
        ContactMethod: 1,
        OptIn: true
      }
    ],
    InvoiceConfiguration: {
      HideZeroAmount: true,
      InvoiceDetailLevel: 1
    },
    SubscriberCurrency: 'SEK',
    EffectiveStartDate: '2020-04-15T17:11:52.417Z',
    StateName: 'Prospect',
    SubscriberIdentifications: [
      {
        Id: 10882,
        SubscriberIdentificationTypeCode: 10024,
        SubscriberIdentificationValue: '********9812'
      }
    ],
    Id: 358691,
    Created: '2020-04-15T17:11:52.427Z',
    FirstName: 'Martin',
    LastName: 'Olson',
    Email: 'ed0005@mailinator.com',
    MobilePhone: '46712345678',
    Language: 'sv-SE',
    Status: 1,
    Login: 'ed0005@mailinator.com',
    HasActiveSubscriptions: false,
    ConvergentBillerId: '40001528',
    SubscriberTypeCode: 5,
    State: 0,
    StateChangeDate: '2020-04-15T17:15:06.653Z',
    Category: 0
  };

  const notASubscriber = {
    BirthDate: '1910-11-12T00:00:00.000Z',
    LastSuccessfulLogin: '2020-04-15T17:15:07.393Z',
    TermsAndConditionsAccepted: '2020-04-15T17:11:52.420Z',
    SubscriberConsents: [],
    StatusName: 'Active',
    AdditionalProperties: [],
    HomeCountry: 'SWE',
    ContactPreferences: [
      {
        Id: 34814,
        ContactEventType: 56,
        ContactMethod: 1,
        OptIn: true
      }
    ],
    InvoiceConfiguration: {
      HideZeroAmount: true,
      InvoiceDetailLevel: 1
    },
    SubscriberCurrency: 'SEK',
    EffectiveStartDate: '2020-04-15T17:11:52.417Z',
    StateName: 'Prospect',
    SubscriberIdentifications: [
      {
        Id: 10882,
        SubscriberIdentificationTypeCode: 10024,
        SubscriberIdentificationValue: '********9812'
      }
    ],
    Id: 358691,
    Created: '2020-04-15T17:11:52.427Z',
    FirstName: 'Martin',
    LastName: 'Olson',
    Email: 'ed0005@mailinator.com',
    MobilePhone: '46712345678',
    Language: 'sv-SE',
    Status: 1,
    Login: 'ed0005@mailinator.com',
    HasActiveSubscriptions: false,
    ConvergentBillerId: '40001528',
    SubscriberTypeCode: 5,
    State: 0,
    StateChangeDate: '2020-04-15T17:15:06.653Z',
    Category: 0
  };

  xdescribe('When RetrieveSubscriberOrProspect is called', () => {
    describe('And the current user is a subscriber with the SSN in the external reference property', () => {
      beforeEach(() => {
        axios.mockImplementation(async (config) => {
          if (config.method === 'post' && config.url === '/subscriber/RetrieveSubscriber') {
            return {
              data: {
                Subscriber: subscriberWithExternalReference
              }
            };
          }
          return {};
        });
      });

      test('It should set formValues to payload object given', async () => {
        await RetrieveSubscriberOrProspect()(dispatch, getState);

        expect(getState).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(ClearProspect());
        expect(dispatch).toHaveBeenCalledWith({
          requestObject: undefined,
          type: CreateSubscriberActionTypes.CHECK_FOR_ACTIVE_SUBSCRIBER.SUCCESS,
          payload: {
            Subscriber: subscriberWithExternalReference
          }
        });
        expect(dispatch).toHaveBeenCalledWith({
          type: SubscriberTypes.RetrieveSubscriber.SUCCESS,
          payload: {
            Subscriber: subscriberWithExternalReference
          }
        });
      });
    });

    describe('And the current user is a subscriber with the SSN in an Additional Property', () => {
      beforeEach(() => {
        axios.mockImplementation(async (config) => {
          if (config.method === 'post' && config.url === '/subscriber/RetrieveSubscriber') {
            return {
              data: {
                Subscriber: subscriberWithAdditionalProperty
              }
            };
          }
          return {};
        });
      });

      test('It should set formValues to payload object given', async () => {
        await RetrieveSubscriberOrProspect()(dispatch, getState);

        expect(getState).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(ClearProspect());
        expect(dispatch).toHaveBeenCalledWith({
          requestObject: undefined,
          type: CreateSubscriberActionTypes.CHECK_FOR_ACTIVE_SUBSCRIBER.SUCCESS,
          payload: {
            Subscriber: subscriberWithAdditionalProperty
          }
        });
        expect(dispatch).toHaveBeenCalledWith({
          type: SubscriberTypes.RetrieveSubscriber.SUCCESS,
          payload: {
            Subscriber: subscriberWithAdditionalProperty
          }
        });
      });
    });

    describe('And the current user is not a subscriber', () => {
      beforeEach(() => {
        axios.mockImplementation(async (config) => {
          if (config.method === 'post' && config.url === '/subscriber/RetrieveSubscriber') {
            return {
              data: {
                Subscriber: notASubscriber
              }
            };
          }
          return {};
        });
      });

      test('It should set formValues to payload object given', async () => {
        await RetrieveSubscriberOrProspect()(dispatch, getState);

        expect(getState).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(ClearProspect());
        expect(dispatch).toHaveBeenCalledWith({
          requestObject: undefined,
          type: CreateSubscriberActionTypes.CHECK_FOR_ACTIVE_SUBSCRIBER.SUCCESS,
          payload: {
            Subscriber: notASubscriber
          }
        });
        expect(dispatch).toHaveBeenCalledWith({
          type: SubscriberInformationActions.CREATE_PROSPECT.SUCCESS,
          payload: {
            Subscriber: notASubscriber
          }
        });
      });
    });
  });
});
