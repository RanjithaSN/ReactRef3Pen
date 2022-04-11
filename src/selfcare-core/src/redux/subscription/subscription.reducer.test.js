import { FaultTypes } from '../fault/fault.actions';
import { SubscriptionTypes as types } from './subscription.actions';
import reducer, { INITIAL_STATE } from './subscription.reducer';

describe('Subscription Reducer', () => {
  const subscription = {
    Id: 123
  };

  describe('When RetrieveSubscription.BEGIN is dispatched', () => {
    test('It should set ID in loading map to true.', () => {
      const state = reducer(INITIAL_STATE, {
        type: types.RetrieveSubscription.BEGIN,
        requestObject: subscription
      });
      expect(state.loading[subscription.Id]).toBe(true);
    });

    test('It should set ID in loaded map to false.', () => {
      const state = reducer(INITIAL_STATE, {
        type: types.RetrieveSubscription.BEGIN,
        requestObject: subscription
      });
      expect(state.loaded[subscription.Id]).toBe(false);
    });
  });

  describe('When RetrieveSubscription.SUCCESS is dispatched', () => {
    let state;

    beforeEach(() => {
      state = reducer(INITIAL_STATE.setIn(['loading', subscription.Id], true), {
        type: types.RetrieveSubscription.SUCCESS,
        requestObject: subscription,
        payload: {
          Subscription: subscription
        }
      });
    });

    test('It should set ID in loading map to false.', () => {
      expect(state.loading[subscription.Id]).toBe(false);
    });

    test('It should set ID in loaded map to true.', () => {
      expect(state.loaded[subscription.Id]).toBe(true);
    });

    test('It should add details to subscriptions map.', () => {
      expect(state.subscriptions[subscription.Id]).toEqual(subscription);
    });
  });

  describe('When UpdateSubscription.BEGIN is dispatched', () => {
    test('It should set ID in updating map to true.', () => {
      const state = reducer(INITIAL_STATE, {
        type: types.UpdateSubscription.BEGIN,
        requestObject: subscription
      });
      expect(state.updating[subscription.Id]).toBe(true);
    });
  });

  describe('When UpdateSubscription.SUCCESS is dispatched', () => {
    let state;

    beforeEach(() => {
      const initState = INITIAL_STATE
        .setIn(['updating', subscription.Id], true)
        .setIn(['subscriptions', subscription.Id], {
          test: 'prop'
        });
      state = reducer(initState, {
        type: types.UpdateSubscription.SUCCESS,
        requestObject: subscription,
        payload: {
          Subscription: subscription
        }
      });
    });

    test('It should set ID in updating map to false.', () => {
      expect(state.updating[subscription.Id]).toBe(false);
    });

    test('It should update details in subscriptions map.', () => {
      expect(state.subscriptions[subscription.Id]).toEqual(subscription);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched.', () => {
    describe('When the trigger is RetrieveSubscription.BEGIN', () => {
      test('It should set ID in loading map to false.', () => {
        const state = reducer(INITIAL_STATE.setIn(['loading', subscription.Id], true), {
          type: FaultTypes.API_FAULT,
          requestObject: subscription,
          payload: {
            trigger: types.RetrieveSubscription.BEGIN
          }
        });
        expect(state.loading[subscription.Id]).toBe(false);
      });
    });

    describe('When the trigger is UpdateSubscription.BEGIN', () => {
      test('It should set ID in updating map to false.', () => {
        const state = reducer(INITIAL_STATE.setIn(['updating', subscription.Id], true), {
          type: FaultTypes.API_FAULT,
          requestObject: subscription,
          payload: {
            trigger: types.UpdateSubscription.BEGIN
          }
        });
        expect(state.updating[subscription.Id]).toBe(false);
      });
    });
  });

  describe('When ClearSubscriptions is dispatched', () => {
    test('It should reset to INITIAL_STATE', () => {
      const state = reducer(INITIAL_STATE.setIn(['subscriptions'], {
        Id: 1
      }), {
        type: types.ClearSubscriptions
      });
      expect(state.subscriptions).toEqual({});
    });
  });
});
