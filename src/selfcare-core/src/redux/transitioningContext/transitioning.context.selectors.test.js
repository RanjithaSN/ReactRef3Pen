import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './transitioning.context.reducer';
import * as TransitioningContext from './transitioning.context.selectors';

const initializedStore = new Immutable({
  ascendon: {
    subscriberApi: {
      transitioningContext: INITIAL_STATE
    }
  }
});

describe('TransitioningContext ', () => {
  describe('TransitioningContext', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      const DATA = {
        id: 1
      };
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'ordering', 'transitioningContext', 'data'], DATA);
      expect(TransitioningContext.TransitioningContext(CUSTOM_STATE)).toEqual(DATA);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(TransitioningContext.TransitioningContext()).toBeNull();
    });

    test('It should return null when there is no data attribute in the store.', () => {
      expect(TransitioningContext.TransitioningContext.resultFunc({})).toBeNull();
    });
  });

  describe('TransitioningOutcomes', () => {
    test('It should return the outcomes associated to a transition when it exists', () => {
      const TRANSITION = {
        TransitionContext: {
          Outcomes: {
            Id: 1
          }
        }
      };
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'ordering', 'transitioningContext', 'data'], TRANSITION);
      expect(TransitioningContext.TransitioningOutcomes(CUSTOM_STATE)).toEqual(TRANSITION.TransitionContext.Outcomes);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(TransitioningContext.TransitioningOutcomes()).toBeNull();
    });
  });
});
