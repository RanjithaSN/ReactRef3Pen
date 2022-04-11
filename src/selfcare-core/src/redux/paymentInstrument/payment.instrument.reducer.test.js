import { FaultTypes } from '../fault/fault.actions';
import { PaymentInstrumentTypes } from './payment.instrument.actions';
import reducer, { INITIAL_STATE } from './payment.instrument.reducer';

describe('PaymentInstrument Reducer', () => {
  describe('When PaymentInstrumentTypes.RetrievePaymentInstrument.BEGIN is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: PaymentInstrumentTypes.RetrievePaymentInstrument.BEGIN
      });
    });

    test('It should set the isLoading flag to true.', () => {
      expect(response.isLoading).toBe(true);
    });

    test('It should update the pendingRequests property to include the new request.', () => {
      expect(response.pendingRequests).toEqual(1);
    });
  });

  describe('When PaymentInstrumentTypes.RetrievePaymentInstrument.SUCCESS is dispatched and there is only one pending request...', () => {
    let response;
    const payload = {
      PaymentInstrument: {
        Id: 1
      }
    };
    const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true).set('pendingRequests', 1);

    beforeEach(() => {
      response = reducer(CUSTOM_STATE, {
        type: PaymentInstrumentTypes.RetrievePaymentInstrument.SUCCESS,
        payload
      });
    });

    test('It should set the isLoading flag to false.', () => {
      expect(response.isLoading).toBe(false);
    });

    test('It should update the pendingRequests property to be zero.', () => {
      expect(response.pendingRequests).toEqual(0);
    });

    test('It should set the PaymentInstrument of the payload within the data object, with a key equal to the Id of the PaymentInstrument.', () => {
      expect(response.data[1]).toEqual(payload.PaymentInstrument);
    });
  });

  describe('When PaymentInstrumentTypes.RetrievePaymentInstrument.SUCCESS is dispatched and there is more than one pending request...', () => {
    let response;
    const payload = {
      PaymentInstrument: {
        Id: 1
      }
    };
    const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true).set('pendingRequests', 2);

    beforeEach(() => {
      response = reducer(CUSTOM_STATE, {
        type: PaymentInstrumentTypes.RetrievePaymentInstrument.SUCCESS,
        payload
      });
    });

    test('It should not set the isLoading flag to false.', () => {
      expect(response.isLoading).toBe(true);
    });

    test('It should update the pendingRequests property to be one less than its previous value.', () => {
      expect(response.pendingRequests).toEqual(1);
    });

    test('It should set the PaymentInstrument of the payload within the data object, with a key equal to the Id of the PaymentInstrument.', () => {
      expect(response.data[1]).toEqual(payload.PaymentInstrument);
    });
  });

  describe('When PaymentInstrumentTypes.UpdatePaymentInstrument.BEGIN is dispatched...', () => {
    test('It should set the isUpdating flag to true.', () => {
      const response = reducer(INITIAL_STATE, {
        type: PaymentInstrumentTypes.UpdatePaymentInstrument.BEGIN,
        payload: {}
      });

      expect(response.isUpdating).toBe(true);
    });
  });

  describe('When PaymentInstrumentTypes.UpdatePaymentInstrument.SUCCESS is dispatched...', () => {
    let response;
    let payload;

    beforeEach(() => {
      const initState = INITIAL_STATE
        .set('isUpdating', true)
        .setIn(['data', 0], {
          Id: 0,
          Default: true
        });
      payload = {
        PaymentInstrument: {
          Id: 1,
          Default: false,
          ConvergentBillerPaymentInstrumentAccounts: []
        }
      };
      response = reducer(initState, {
        type: PaymentInstrumentTypes.UpdatePaymentInstrument.SUCCESS,
        payload
      });
    });

    test('It should set the isUpdating flag to false.', () => {
      expect(response.isUpdating).toBe(false);
    });

    test('It should leave existing Default instrument unchanged.', () => {
      expect(response.data[0].Default).toBe(true);
    });

    test('It should set the PaymentInstrument of the payload within the data object, with a key equal to the Id of the Payment Instrument.', () => {
      expect(response.data[1]).toEqual(payload.PaymentInstrument);
    });

    describe('When the updated instrument is set as Default', () => {
      beforeEach(() => {
        const initState = INITIAL_STATE.setIn(['data', 0], {
          Id: 0,
          Default: true
        });
        payload = {
          PaymentInstrument: {
            Id: 1,
            Default: true,
            ConvergentBillerPaymentInstrumentAccounts: []
          }
        };
        response = reducer(initState, {
          type: PaymentInstrumentTypes.UpdatePaymentInstrument.SUCCESS,
          payload
        });
      });

      test('It should update the previous Default instrument.', () => {
        expect(response.data[0].Default).toBe(false);
      });

      test('It should update the modified instrument.', () => {
        expect(response.data[1]).toEqual(payload.PaymentInstrument);
      });
    });

    describe('When the updated instrument has related accounts', () => {
      const accounts = [{
        AccountNumber: 1
      }, {
        AccountNumber: 2
      }];

      beforeEach(() => {
        const initState = INITIAL_STATE.setIn(['data', 0], {
          Id: 0,
          ConvergentBiller: true,
          ConvergentBillerPaymentInstrumentAccounts: accounts
        });
        payload = {
          PaymentInstrument: {
            Id: 1,
            Default: false,
            ConvergentBillerPaymentInstrumentAccounts: [accounts[0]]
          }
        };
        response = reducer(initState, {
          type: PaymentInstrumentTypes.UpdatePaymentInstrument.SUCCESS,
          payload
        });
      });

      test('It should remove previous related accounts.', () => {
        expect(response.data[0].ConvergentBillerPaymentInstrumentAccounts).toEqual([accounts[1]]);
      });

      test('It should updated the modified payment instrument with related accounts.', () => {
        expect(response.data[1]).toEqual(payload.PaymentInstrument);
      });
    });
  });

  describe('When PaymentInstrumentTypes.RemovePaymentInstrument.BEGIN is dispatched', () => {
    test('It should add id to the removing map.', () => {
      const initState = INITIAL_STATE.setIn(['data', 1], {
        Id: 1
      });
      const response = reducer(initState, {
        type: PaymentInstrumentTypes.RemovePaymentInstrument.BEGIN,
        requestObject: {
          Id: 1
        }
      });
      expect(response.removing[1]).toBe(true);
    });
  });

  describe('When PaymentInstrumentTypes.RemovePaymentInstrument.SUCCESS is dispatched', () => {
    let response;

    beforeEach(() => {
      const initState = INITIAL_STATE
        .set('removing', {
          1: true
        })
        .setIn(['data', 1], {
          Id: 1
        });
      response = reducer(initState, {
        type: PaymentInstrumentTypes.RemovePaymentInstrument.SUCCESS,
        requestObject: {
          Id: 1
        }
      });
    });

    test('It should set value in removing map to false.', () => {
      expect(response.removing[1]).toBe(false);
    });

    test('It should remove the payment instrument from data.', () => {
      expect(response.data[1]).toBeUndefined();
    });
  });

  describe('PaymentInstrumentTypes.ValidatePaymentInstrument.BEGIN is dispatched', () => {
    it('Should set isValidating', () => {
      const response = reducer(INITIAL_STATE, {
        type: PaymentInstrumentTypes.ValidatePaymentInstrument.BEGIN,
        payload: {
          Id: '1'
        }
      });
      expect(response.isValidating).toBe(true);
    });
  });

  describe('PaymentInstrumentTypes.ValidatePaymentInstrument.SUCCESS is dispatched', () => {
    it('Should set isValidating', () => {
      const updatedState = INITIAL_STATE.set('isValidating', undefined);
      const response = reducer(updatedState, {
        type: PaymentInstrumentTypes.ValidatePaymentInstrument.SUCCESS,
        payload: {}
      });
      expect(response.isValidating).toBe(false);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched and there is only one pending request...', () => {
    let response;
    const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true).set('pendingRequests', 1);

    beforeEach(() => {
      response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: PaymentInstrumentTypes.RetrievePaymentInstrument.BEGIN
        }
      });
    });

    test('It should set the isLoading attribute to false when the trigger is the PaymentInstrumentTypes.RetrievePaymentInstrument.BEGIN action.', () => {
      expect(response.isLoading).toBe(false);
    });

    test('It should update the pendingRequests property to be zero.', () => {
      expect(response.pendingRequests).toEqual(0);
    });
  });

  describe('When PaymentInstrumentTypes.CreatePaymentInstrument.BEGIN is dispatched...', () => {
    test('It should set the isCreating flag to true.', () => {
      const response = reducer(INITIAL_STATE, {
        type: PaymentInstrumentTypes.CreatePaymentInstrument.BEGIN,
        payload: {}
      });

      expect(response.isCreating).toBe(true);
    });
  });

  describe('When PaymentInstrumentTypes.CreatePaymentInstrument.SUCCESS is dispatched...', () => {
    let response;
    let payload;

    beforeEach(() => {
      const initState = INITIAL_STATE
        .set('isCreating', true)
        .setIn(['data', 0], {
          Id: 0,
          Default: true
        });
      payload = {
        PaymentInstrument: {
          Id: 1,
          Default: false,
          ConvergentBillerPaymentInstrumentAccounts: []
        }
      };
      response = reducer(initState, {
        type: PaymentInstrumentTypes.CreatePaymentInstrument.SUCCESS,
        payload
      });
    });

    test('It should set the isCreating flag to false.', () => {
      expect(response.isCreating).toBe(false);
    });

    test('It should leave existing Default instrument unchanged.', () => {
      expect(response.data[0].Default).toBe(true);
    });

    test('It should set the PaymentInstrument of the payload within the data object, with a key equal to the Id of the Payment Instrument.', () => {
      expect(response.data[1]).toEqual(payload.PaymentInstrument);
    });

    describe('When the new instrument is set as Default', () => {
      beforeEach(() => {
        const initState = INITIAL_STATE.setIn(['data', 0], {
          Id: 0,
          Default: true
        });
        payload = {
          PaymentInstrument: {
            Id: 1,
            Default: true,
            ConvergentBillerPaymentInstrumentAccounts: []
          }
        };
        response = reducer(initState, {
          type: PaymentInstrumentTypes.CreatePaymentInstrument.SUCCESS,
          payload
        });
      });

      test('It should update the previous Default instrument.', () => {
        expect(response.data[0].Default).toBe(false);
      });

      test('It should add the new Default instrument.', () => {
        expect(response.data[1]).toEqual(payload.PaymentInstrument);
      });
    });

    describe('When the new instrument has related accounts', () => {
      const accounts = [{
        AccountNumber: 1
      }, {
        AccountNumber: 2
      }];

      beforeEach(() => {
        const initState = INITIAL_STATE.setIn(['data', 0], {
          Id: 0,
          ConvergentBiller: true,
          ConvergentBillerPaymentInstrumentAccounts: accounts
        });
        payload = {
          PaymentInstrument: {
            Id: 1,
            Default: false,
            ConvergentBillerPaymentInstrumentAccounts: [accounts[0]]
          }
        };
        response = reducer(initState, {
          type: PaymentInstrumentTypes.CreatePaymentInstrument.SUCCESS,
          payload
        });
      });

      test('It should remove previous related accounts.', () => {
        expect(response.data[0].ConvergentBillerPaymentInstrumentAccounts).toEqual([accounts[1]]);
      });

      test('It should add the new payment instrument with related accounts.', () => {
        expect(response.data[1]).toEqual(payload.PaymentInstrument);
      });
    });
  });


  describe('When FaultTypes.API_FAULT is dispatched and there is more than one pending request...', () => {
    let response;
    const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true).set('pendingRequests', 2);

    beforeEach(() => {
      response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: PaymentInstrumentTypes.RetrievePaymentInstrument.BEGIN
        }
      });
    });

    test('It should set not the isLoading attribute to false when the trigger is the PaymentInstrumentTypes.RetrievePaymentInstrument.BEGIN action.', () => {
      expect(response.isLoading).toBe(true);
    });

    test('It should update the pendingRequests property to be one less than its previous value.', () => {
      expect(response.pendingRequests).toEqual(1);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched with trigger CreatePaymentInstrument.BEGIN', () => {
    test('It should set isCreating to false', () => {
      const initState = INITIAL_STATE.set('isCreating', true);
      const response = reducer(initState, {
        type: FaultTypes.API_FAULT,
        requestObject: {},
        payload: {
          trigger: PaymentInstrumentTypes.CreatePaymentInstrument.BEGIN
        }
      });
      expect(response.isCreating).toBe(false);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched with trigger Create3DS1PaymentInstrument.BEGIN', () => {
    test('It should set isCreating to false', () => {
      const initState = INITIAL_STATE.set('isCreating', true);
      const response = reducer(initState, {
        type: FaultTypes.API_FAULT,
        requestObject: {},
        payload: {
          trigger: PaymentInstrumentTypes.Create3DS1PaymentInstrument.BEGIN
        }
      });
      expect(response.isCreating).toBe(false);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched with trigger Submit3DS1FinalRequest.BEGIN', () => {
    test('It should set isCreating to false', () => {
      const initState = INITIAL_STATE.set('isCreating', true);
      const response = reducer(initState, {
        type: FaultTypes.API_FAULT,
        requestObject: {},
        payload: {
          trigger: PaymentInstrumentTypes.Submit3DS1FinalRequest.BEGIN
        }
      });
      expect(response.isCreating).toBe(false);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched with trigger RemovePaymentInstrument.BEGIN', () => {
    test('It should set value in removing map to false.', () => {
      const initState = INITIAL_STATE.setIn(['removing', 1], true);
      const response = reducer(initState, {
        type: FaultTypes.API_FAULT,
        requestObject: {
          Id: 1
        },
        payload: {
          trigger: PaymentInstrumentTypes.RemovePaymentInstrument.BEGIN
        }
      });
      expect(response.removing[1]).toBe(false);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched with trigger ValidatePaymentInstrument.BEGIN', () => {
    test('It should set isValidating', () => {
      const initState = INITIAL_STATE.setIn(['removing', 1], true);
      const response = reducer(initState, {
        type: FaultTypes.API_FAULT,
        requestObject: {},
        payload: {
          trigger: PaymentInstrumentTypes.ValidatePaymentInstrument.BEGIN
        }
      });
      expect(response.isValidating).toBe(false);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched for any action the reducer is not concerned with...', () => {
    test('It should return the state passed to the reducer.', () => {
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
});
