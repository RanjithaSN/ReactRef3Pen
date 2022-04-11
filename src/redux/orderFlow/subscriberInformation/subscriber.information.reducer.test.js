import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { SubscriberInformationActions } from './subscriber.information.actions';
import reducer, { INITIAL_STATE } from './subscriber.information.reducer';

describe('SubscriberInformationReducer', () => {
  describe('When SubscriberInformationActions.CREATE_PROSPECT is dispatched', () => {
    test('Initial state isCreating should be false.', () => {
      expect(INITIAL_STATE.isCreating).toEqual(false);
    });
    test('On Begin it should set the isCreating to true.', () => {
      const state = reducer(INITIAL_STATE, {
        type: SubscriberInformationActions.CREATE_PROSPECT.BEGIN
      });
      expect(state.isCreating).toEqual(true);
      expect(state.updateError).toEqual(null);
    });
    test('On Success it should set the isCreating to false and store data.', () => {
      const payload = {
        Subscriber: {
          some: 'data'
        }
      };
      const state = reducer(INITIAL_STATE, {
        type: SubscriberInformationActions.CREATE_PROSPECT.SUCCESS,
        payload
      });
      expect(state.isCreating).toEqual(false);
      expect(state.prospect).toEqual(payload);
      expect(state.updateError).toEqual(null);
    });

    describe('When SubscriberInformationActions.CLEAR_PROSPECT is dispatched', () => {
      test('The state should reset when user logs in with a subscriber', () => {
        const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true).set('data', 'bob');
        const response = reducer(CUSTOM_STATE, {
          type: SubscriberInformationActions.CLEAR_PROSPECT
        });

        expect(response).toBe(INITIAL_STATE);
      });
    });

    describe('When SubscriberInformationActions.UPDATE_PROSPECT_ERROR is dispatched', () => {
      test('The state should update on propsect update order.', () => {
        const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true).set('data', 'bob');
        const ERROR = 'holy heck error hoy';
        const state = reducer(CUSTOM_STATE, {
          type: SubscriberInformationActions.UPDATE_PROSPECT_ERROR,
          payload: ERROR
        });

        expect(state.updateError).toEqual(ERROR);
      });
    });

    describe('When FaultTypes.API_FAULT is dispatched...', () => {
      test('It should set the isCreating attribute to false when the trigger is the SubscriberInformationActions.CREATE_PROSPECT.BEGIN action.', () => {
        const CUSTOM_STATE = INITIAL_STATE.set('isLoading', true);
        const response = reducer(CUSTOM_STATE, {
          type: FaultTypes.API_FAULT,
          payload: {
            trigger: SubscriberInformationActions.CREATE_PROSPECT.BEGIN
          }
        });

        expect(response.isCreating).toBe(false);
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
  });
});
