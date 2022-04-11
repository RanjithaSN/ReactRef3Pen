import * as SubscriberActions from './subscriber.actions';

describe('Subscriber Actions', () => {
  describe('Update Subscriber', () => {
    let subscriber;

    beforeEach(() => {
      subscriber = {
        Email: 'test@email.com',
        Login: 'test@email.com',
        MobilePhone: '46711111111',
        ContactPreferences: [{
          ContactEventType: '60',
          ContactMethod: '1',
          Optin: true
        }],
        SubscriberConsents: [{
          AcceptedBy: 'test@email.com',
          ConfigConsentId: 3,
          ConsentAccepted: true,
          ConsentDateTime: '2020-05-26T19:37:19.507Z',
          ConsentTypeCode: 1
        }]
      };
    });
    describe('Should send a subscriber with a number pnr field', () => {
      it('when provided with a pnr as a number', () => {
        const numberPnr = 1234567890;
        const apiReturnForm = {
          email: 'test@email.com',
          login: 'test@email.com',
          pnr: 1234567890,
          MobilePhone: '46711111111',
          ContactPreferences: [{
            ContactEventType: '60',
            ContactMethod: '1',
            Optin: true
          }],
          SubscriberConsents: [{
            AcceptedBy: 'test@email.com',
            ConfigConsentId: 3,
            ConsentAccepted: true,
            ConsentDateTime: '2020-05-26T19:37:19.507Z',
            ConsentTypeCode: 1
          }]
        };
        const builtSubscriberPayload = SubscriberActions.buildUpdateSubscriberPayload(subscriber, numberPnr);
        expect(builtSubscriberPayload).toStrictEqual(apiReturnForm);
      });

      it('when provided with a pnr as a string', () => {
        const stringPnr = '5689741230';
        const apiReturnForm = {
          email: 'test@email.com',
          login: 'test@email.com',
          pnr: 5689741230,
          MobilePhone: '46711111111',
          ContactPreferences: [{
            ContactEventType: '60',
            ContactMethod: '1',
            Optin: true
          }],
          SubscriberConsents: [{
            AcceptedBy: 'test@email.com',
            ConfigConsentId: 3,
            ConsentAccepted: true,
            ConsentDateTime: '2020-05-26T19:37:19.507Z',
            ConsentTypeCode: 1
          }]
        };

        const builtSubscriberPayload = SubscriberActions.buildUpdateSubscriberPayload(subscriber, stringPnr);
        expect(builtSubscriberPayload).toStrictEqual(apiReturnForm);
      });
    });
  });
});
