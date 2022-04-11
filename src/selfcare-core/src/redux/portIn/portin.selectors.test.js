import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './portin.reducer';
import * as selectors from './portin.selectors';

describe('Inventory Selectors', () => {
  describe('PortInBase', () => {
    test('It should return null when undefined', () => {
      expect(selectors.PortIn.resultFunc({}))
        .toBe(null);
    });

    test('It should return the base portIn object when defined', () => {
      const subscriberApi = {
        portIn: Immutable({})
      };
      expect(selectors.PortIn.resultFunc(subscriberApi))
        .toEqual(subscriberApi.portIn);
    });
  });

  describe('isLoading', () => {
    test('It should return isLoading if defined', () => {
      const state = INITIAL_STATE.set('isLoading', true);
      expect(selectors.PortInIsLoading.resultFunc(state))
        .toEqual(true);
    });
  });
});
