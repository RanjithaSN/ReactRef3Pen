import Immutable from 'seamless-immutable';
import { ConvergentBillerIsInvoiceLoading } from './convergent.biller.invoice.selectors';
import { INITIAL_STATE } from './convergent.biller.invoice.reducer';


const initializedStore = new Immutable({
  ascendon: {
    subscriberApi: {
      convergentBiller: {
        invoice: INITIAL_STATE
      }
    }
  }
});

describe('ConvergentBillerInvoice ', () => {
  describe('When the ConvergentBillerIsInvoiceLoading is used...', () => {
    test('It should return false when not set', () => {
      expect(ConvergentBillerIsInvoiceLoading(initializedStore)).toBe(false);
    });
    test('It should return false when set to false', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'invoice', 'isLoading'], false);
      expect(ConvergentBillerIsInvoiceLoading(CUSTOM_STATE)).toBe(false);
    });

    test('It should return false when set to true', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'invoice', 'isLoading'], true);
      expect(ConvergentBillerIsInvoiceLoading(CUSTOM_STATE)).toBe(true);
    });
  });
});
