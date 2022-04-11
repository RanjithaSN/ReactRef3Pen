import LOADING_STATUS from '../../../constants/loading.status';
import { FaultTypes } from '../../fault/fault.actions';
import { CodeActions } from './codes.actions';
import reducer, { INITIAL_STATE } from './codes.reducer';

describe('Codes Reducer', () => {
  describe('When Retrieve Codes Begin is dispatched...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: CodeActions.BEGIN,
        payload: {},
        requestObject: {
          codeType: 'test'
        }
      });
    });

    test('It should add code key with loading status and empty items list.', () => {
      expect(response.test.status).toBe(LOADING_STATUS.LOADING);
      expect(response.test.items).toBeDefined();
      expect(response.test.items.length).toEqual(0);
    });
  });

  describe('When Retrieve Codes Success is dispatched...', () => {
    const payload = {
      Codes: [{
        Name: 'MMS',
        Value: '11'
      }]
    };

    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE.setIn(['test', 'status'], LOADING_STATUS.LOADING), {
        type: CodeActions.SUCCESS,
        payload,
        requestObject: {
          codeType: 'test'
        }
      });
    });

    test('It should set the status to loaded and put codes into items', () => {
      expect(response.test.status).toBe(LOADING_STATUS.LOADED);
      expect(response.test.items).toEqual(payload.Codes);
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

  describe('When API Fault is dispatched with codes begin trigger...', () => {
    test('It should set status to unloaded.', () => {
      const response = reducer(INITIAL_STATE.setIn(['test', 'status'], LOADING_STATUS.LOADING), {
        type: FaultTypes.API_FAULT,
        requestObject: {
          codeType: 'test'
        },
        payload: {
          trigger: CodeActions.BEGIN
        }
      });

      expect(response.test.status).toBe(LOADING_STATUS.UNLOADED);
    });
  });

  describe('When API Fault is dispatch with other trigger...', () => {
    test('It should return the state passed to the reducer.', () => {
      const response = reducer(INITIAL_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: 'other trigger'
        }
      });

      expect(response).toBe(INITIAL_STATE);
    });
  });
});
