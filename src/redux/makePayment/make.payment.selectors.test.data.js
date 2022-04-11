import Immutable from 'seamless-immutable';

export const PROMISE_STATUS = {
  OPEN: 0,
  COMPLETED: 1,
  BROKEN: 2
};

export const POPULATED_STORE = new Immutable({
  ascendon: {
    preferences: {
      data: {
        selectedLocale: 'en-US'
      }
    },
    subscriberApi: {
      paymentInstrument: {
        data: {
          1: {
            Id: 1,
            CreditCard: {
              ExpirationMonth: '12',
              ExpirationYear: '2020',
              Type: 1
            },
            BillingAddress: {
              LineOne: '123 Main',
              City: 'Bellevue',
              State: 'NE'
            },
            Default: false,
            Name: 'Primary Credit Card',
            Type: 0
          },
          2: {
            Id: 2,
            CreditCard: {
              ExpirationMonth: '11',
              ExpirationYear: '2021',
              Type: 0
            },
            BillingAddress: {
              LineOne: '123 Main',
              City: 'Bellevue',
              State: 'NE'
            },
            Default: false,
            Name: 'Secondary Credit Card',
            Type: 0
          },
          3: {
            Id: 3,
            Default: true,
            BillingAddress: {
              LineOne: '123 Main',
              City: 'Bellevue',
              State: 'NE'
            },
            Name: 'Bill To Invoice',
            Type: 15
          }
        }
      },
      wallet: {
        data: {
          PaymentInstruments: [
            {
              Id: 1,
              Type: 0,
              TypeName: 'Credit Card',
              Name: 'Primary Credit Card',
              Default: false,
              CreditCard: {
                Type: 1
              }
            },
            {
              Id: 2,
              Type: 0,
              TypeName: 'Credit Card',
              Name: 'Secondary Credit Card',
              Default: false,
              CreditCard: {
                Type: 0
              }
            },
            {
              Id: 3,
              Type: 15,
              TypeName: 'ConvergentBillerInvoice',
              Name: 'Bill To Invoice',
              Default: true
            }
          ]
        }
      },
      convergentBiller: {
        accountInfo: {
          summary: {
            data: {
              AccountSummaries: [{
                AccountNumber: '1',
                PostpaidDetails: {
                  Balance: 14.00,
                  CurrencyCode: 'USD',
                  DelinquencyAmount: 0,
                  DelinquencyDays: 0,
                  DueDate: '2018-05-22',
                  PastDue: 13.00,
                  Total: 27.00,
                  TotalDepositAmount: 0,
                  LastPaymentAmount: 12.00,
                  LastPaymentDate: '2018-04-22'
                }
              }]
            }
          }
        },
        treatmentDetails: {
          data: {
            SubscriberTreatmentDetails: {
              PromiseToPayDetails: [{
                InstallmentDueDate: '2069-01-01',
                InstallmentTotal: 3.50,
                PromiseStatus: PROMISE_STATUS.OPEN
              }]
            }
          }
        }
      }
    }
  },
  client: {
    account: {
      currentAccount: '1'
    }
  }
});

const BASE_PATH = ['ascendon', 'subscriberApi'];
const DEFAULT_PI_PATH = BASE_PATH.concat(['paymentInstrument', 'data', '2', 'Default']);

export const POPULATED_STORE_WITH_DEFAULT_PI = POPULATED_STORE.setIn(DEFAULT_PI_PATH, true);
export const POPULATED_STORE_WITHOUT_DEFAULT_PI = POPULATED_STORE;
