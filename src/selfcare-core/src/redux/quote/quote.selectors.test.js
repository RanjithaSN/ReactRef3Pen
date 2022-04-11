import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './quote.reducer';
import { IsQuotingOrder, QuoteCalculated, QuoteData, QuoteItems } from './quote.selectors';

const APP_STORE = Immutable({});

describe('Quote ', () => {
  describe('QuoteCalculated with initial state', () => {
    let response;

    beforeEach(() => {
      const appStore = APP_STORE
        .merge({
          ascendon: {
            subscriberApi: {
              ordering: {
                quote: INITIAL_STATE
              }
            }
          }
        }, {
          deep: true
        });

      response = QuoteCalculated(appStore);
    });

    it('should return false', () => {
      expect(response).toBe(false);
    });
  });

  describe('QuoteCalculated with calculate order quoted', () => {
    let response;

    beforeEach(() => {
      const appStore = APP_STORE
        .merge({
          ascendon: {
            subscriberApi: {
              ordering: {
                quote: {
                  quoteCalculated: true
                }
              }
            }
          }
        }, {
          deep: true
        });

      response = QuoteCalculated(appStore);
    });

    it('should return true', () => {
      expect(response).toBe(true);
    });
  });

  describe('IsQuotingOrder with initial state', () => {
    let response;

    beforeEach(() => {
      const appStore = APP_STORE
        .merge({
          ascendon: {
            subscriberApi: {
              ordering: {
                quote: INITIAL_STATE
              }
            }
          }
        }, {
          deep: true
        });

      response = IsQuotingOrder(appStore);
    });

    it('should return false', () => {
      expect(response).toBe(false);
    });
  });

  describe('IsQuotingOrder with calculate order quoting', () => {
    let response;

    beforeEach(() => {
      const appStore = APP_STORE
        .merge({
          ascendon: {
            subscriberApi: {
              ordering: {
                quote: {
                  isCalculatingQuote: true
                }
              }
            }
          }
        }, {
          deep: true
        });

      response = IsQuotingOrder(appStore);
    });

    it('should return true', () => {
      expect(response).toBe(true);
    });
  });

  describe('QuoteData with initial state', () => {
    let response;

    beforeEach(() => {
      const appStore = APP_STORE
        .merge({
          ascendon: {
            subscriberApi: {
              ordering: {
                quote: INITIAL_STATE
              }
            }
          }
        }, {
          deep: true
        });

      response = QuoteData(appStore);
    });

    it('should return null', () => {
      expect(response).toBe(null);
    });
  });

  describe('QuoteData with calculate order quote data', () => {
    let response;

    beforeEach(() => {
      const appStore = APP_STORE
        .merge({
          ascendon: {
            subscriberApi: {
              ordering: {
                quote: {
                  data: 'test data'
                }
              }
            }
          }
        }, {
          deep: true
        });

      response = QuoteData(appStore);
    });

    it('should return test data', () => {
      expect(response).toBe('test data');
    });
  });

  const quote = {
    Totals: {
      BillerQuoteTotal: {
        DueToday: 100,
        DueNextInvoice: 9000
      },
      DownPaymentAmount: 100,
      TaxAmount: 15,
      TotalAmount: 200
    },
    Items: [{
      Id: 1
    }]
  };

  describe('When the QuoteItems is used...', () => {
    test('It should return the items if available', () => {
      expect(QuoteItems.resultFunc(quote)).toEqual(quote.Items);
    });

    test('It should return an empty list if there is no items', () => {
      expect(QuoteItems.resultFunc({
        Id: 1
      })).toEqual([]);
    });
  });
});
