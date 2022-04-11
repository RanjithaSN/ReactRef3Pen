import { CreateSubscriberActionTypes } from './create.subscriber.actions';
import reducer, { INITIAL_STATE } from './create.subscriber.reducer';

describe('Create Subscriber Reducer', () => {
  describe('When CreateSubscriberActionTypes.UPDATE_SUBSCRIBER_FORM_VALUES is dispatched...', () => {
    const PAYLOAD_ONE = {
      value: 'abc',
      another_value: 'abc',
      third_value: 'abc'
    };

    test('It should set formValues to payload object given', () => {
      const result = reducer(INITIAL_STATE, {
        type: CreateSubscriberActionTypes.UPDATE_SUBSCRIBER_FORM_VALUES,
        payload: {
          values: PAYLOAD_ONE
        }
      });
      expect(result.formValues).toEqual(PAYLOAD_ONE);
    });

    const PAYLOAD_TWO = {
      value: 'ee',
      fourth_value: 'ee'
    };

    test('It should merge existing formValues to payload object given', () => {
      const result = reducer(INITIAL_STATE.set('formValues', PAYLOAD_ONE), {
        type: CreateSubscriberActionTypes.UPDATE_SUBSCRIBER_FORM_VALUES,
        payload: {
          values: PAYLOAD_TWO
        }
      });
      expect(result.formValues).toEqual({
        ...PAYLOAD_ONE,
        ...PAYLOAD_TWO
      });
    });
  });
});
