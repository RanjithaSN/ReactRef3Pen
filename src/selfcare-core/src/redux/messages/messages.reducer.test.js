import { FaultTypes } from '../fault/fault.actions';
import { MessagesTypes } from './messages.actions';
import reducer, { INITIAL_STATE } from './messages.reducer';

describe('MessagesReducer', () => {
  describe('When FETCH_MESSAGES.BEGIN is dispatched', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: MessagesTypes.FETCH_MESSAGES.BEGIN
      });
    });

    test('data should be set to null.', () => {
      expect(response.data.messages).toBe(null);
    });

    test('isLoading should be true', () => {
      expect(response.isLoading).toEqual(true);
    });

    test('isLoaded should be false.', () => {
      expect(response.isLoaded).toEqual(false);
    });
  });

  describe('When FETCH_MESSAGES.SUCCESS is dispatched', () => {
    let response;
    const payload = {
      Messages: [{
        id: '123',
        priority: 1,
        header: 'Critical Message 1',
        description: 'This is a critical message 1, you need to do some things to satisfy this.',
        link: 'Go To Manage',
        url: '/account/manage'
      }, {
        id: '343',
        priority: 1,
        header: 'Critical Message 2',
        description: 'This is a critical message 2, you need to do some things to satisfy this.',
        link: 'Go To Products',
        url: '/account/products'
      }, {
        id: '234234',
        priority: 54,
        header: 'Other Message 1',
        description: 'This is an other message, we will only ever display one of these.',
        link: 'Go To Payments',
        url: '/account/payments'
      }]
    };

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: MessagesTypes.FETCH_MESSAGES.SUCCESS,
        payload
      });
    });

    test('It should set the messages data to the payload.', () => {
      expect(response.data.messages).toEqual(payload.Notifications);
    });

    test('isLoading should be false.', () => {
      expect(response.isLoading).toEqual(false);
    });

    test('isLoaded should be false.', () => {
      expect(response.isLoaded).toEqual(true);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched...', () => {
    test('It should set the isLoading attribute to false when the trigger is the FETCH_MESSAGES.BEGIN action.', () => {
      const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: MessagesTypes.FETCH_MESSAGES.BEGIN
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
});
