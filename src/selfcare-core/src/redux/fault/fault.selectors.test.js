import Immutable from 'seamless-immutable';
import * as Fault from './fault.selectors';
import { INITIAL_STATE } from './fault.reducer';

const initializedStore = new Immutable({
  ascendon: {
    subscriberApi: {
      fault: INITIAL_STATE
    }
  }
});

describe('Fault ', () => {
  describe('When the Fault is used...', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      const DATA = {
        id: 1
      };
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'fault', 'data'], DATA);
      expect(Fault.Fault(CUSTOM_STATE)).toEqual(DATA);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(Fault.Fault()).toBeNull();
    });

    test('It should return null when there is no data attribute in the store.', () => {
      expect(Fault.Fault.resultFunc({})).toBeNull();
    });
  });
});
