import Immutable from 'seamless-immutable';
import * as SubmitOneTimePayment from './submit.one.time.payment.selectors';
import { INITIAL_STATE } from './submit.one.time.payment.reducer';

const initializedStore = new Immutable({
  ascendon: {
    subscriberApi: {
      oneTimePayment: INITIAL_STATE
    }
  }
});

describe('SubmitOneTimePayment ', () => {
  describe('When the SubmitOneTimePaymentIsLoading is used...', () => {
    test('It should return the value of the isLoading attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'oneTimePayment', 'isLoading'], true);
      expect(SubmitOneTimePayment.SubmitOneTimePaymentIsLoading(CUSTOM_STATE)).toBe(true);
    });

    test('It should return false when no store is passed in.', () => {
      expect(SubmitOneTimePayment.SubmitOneTimePaymentIsLoading()).toBe(false);
    });

    test('It should return false when there is no isLoading attribute in the store.', () => {
      expect(SubmitOneTimePayment.SubmitOneTimePaymentIsLoading.resultFunc({})).toBe(false);
    });
  });
});
