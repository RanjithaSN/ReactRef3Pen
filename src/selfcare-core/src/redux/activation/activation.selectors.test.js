import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './activation.reducer';
import * as Activation from './activation.selectors';

const initializedStore = new Immutable({
  ascendon: {
    subscriberApi: {
      activation: INITIAL_STATE
    }
  }
});

describe('Activation ', () => {
  describe('When the ActivationIsLoading is used...', () => {
    test('It should return the value of the isLoading attribute when one exists.', () => {
      expect(Activation.ActivationIsLoading(
        initializedStore.setIn(['ascendon', 'subscriberApi', 'activation', 'isLoading'], true)
      )).toBe(true);
      expect(Activation.ActivationIsLoading(
        initializedStore.setIn(['ascendon', 'subscriberApi', 'activation', 'isLoading'], false)
      )).toBe(false);
    });

    test('It should return false when no store is passed in.', () => {
      expect(Activation.ActivationIsLoading()).toBe(false);
    });

    test('It should return false when there is no isLoading attribute in the store.', () => {
      expect(Activation.ActivationIsLoading.resultFunc({})).toBe(false);
    });
  });
});
