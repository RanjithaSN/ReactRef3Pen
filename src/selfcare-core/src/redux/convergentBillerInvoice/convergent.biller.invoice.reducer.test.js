import reducer, { INITIAL_STATE } from './convergent.biller.invoice.reducer';
import { ConvergentBillerInvoiceTypes } from './convergent.biller.invoice.actions';
import { FaultTypes } from '../fault/fault.actions';

describe('ConvergentBillerIsInvoiceLoading Reducer', () => {
  describe('When ConvergentBillerInvoiceTypes.RetrieveConvergentBillerInvoice.BEGIN is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: ConvergentBillerInvoiceTypes.RetrieveConvergentBillerInvoice.BEGIN
      });
    });

    test('It should set the isLoading flag to true.', () => {
      expect(response.isLoading).toBe(true);
    });

    test('It should set the data attribute to null.', () => {
      expect(response.data).toBeNull();
    });
  });

  describe('When ConvergentBillerInvoiceTypes.RetrieveConvergentBillerInvoice.SUCCESS is dispatched...', () => {
    let response;
    const payload = {
      id: 1
    };

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: ConvergentBillerInvoiceTypes.RetrieveConvergentBillerInvoice.SUCCESS,
        payload
      });
    });

    test('It should set the isLoading flag to false.', () => {
      expect(response.isLoading).toBe(false);
    });

    test('It should set the data attribute to the payload of the action.', () => {
      expect(response.data).toEqual(payload);
    });
  });


  describe('When FaultTypes.API_FAULT is dispatched...', () => {
    test('It should set the isLoading attribute to false when the trigger is the ConvergentBillerInvoiceTypes.RetrieveConvergentBillerInvoice.BEGIN action.', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: ConvergentBillerInvoiceTypes.RetrieveConvergentBillerInvoice.BEGIN
        }
      });

      expect(response.isLoading).toBe(false);
    });

    test('It should return the state passed to the reducer for any other fault.', () => {
      const response = reducer(INITIAL_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: 'some other action'
        }
      });

      expect(response).toBe(INITIAL_STATE);
    });
  });

  describe('When any other action is dispatched...', () => {
    test('It should return the state passed to the reducer.', () => {
      const response = reducer(INITIAL_STATE, {
        type: 'some other type'
      });

      expect(response).toBe(INITIAL_STATE);
    });
  });

  describe('When no state is provided to the reducer', () => {
    test('It should return the initial reducer state.', () => {
      expect(reducer(undefined, {})).toBe(INITIAL_STATE);
    });
  });
});
