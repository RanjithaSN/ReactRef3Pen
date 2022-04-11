import LOADING_STATUS from '../../constants/loading.status';
import { FaultTypes } from '../fault/fault.actions';
import { TransitioningContextTypes } from './transitioning.context.actions';
import reducer, { INITIAL_STATE } from './transitioning.context.reducer';

describe('TransitioningContext Reducer', () => {
  test('When RETRIEVE_TRANSITIONING_CONTEXT.BEGIN is dispatched the transitioning status should be updated to loading', () => {
    const state = reducer(
      INITIAL_STATE,
      {
        type: TransitioningContextTypes.RETRIEVE_TRANSITIONING_CONTEXT.BEGIN
      }
    );

    expect(state.transitioningStatus).toEqual(LOADING_STATUS.LOADING);
  });

  test('When RETRIEVE_TRANSITIONING_CONTEXT.SUCCESS is dispatched the transitioning status should be updated to loaded and the response should be set', () => {
    const DATA = {
      Id: 1
    };
    const state = reducer(
      INITIAL_STATE,
      {
        type: TransitioningContextTypes.RETRIEVE_TRANSITIONING_CONTEXT.SUCCESS,
        payload: DATA
      }
    );

    expect(state.data).toEqual(DATA);
    expect(state.transitioningStatus).toEqual(LOADING_STATUS.LOADED);
  });

  test('When FaultTypes.API_FAULT is dispatched the transitioning status state should be updated to unloaded', () => {
    const state = reducer(
      INITIAL_STATE,
      {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: TransitioningContextTypes.RETRIEVE_TRANSITIONING_CONTEXT.BEGIN
        }
      }
    );

    expect(state.transitioningStatus).toBe(LOADING_STATUS.UNLOADED);
  });
});
