import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { SupportRequestTypes } from '@selfcare/core/redux/supportRequest/support.request.actions';
import reducer, { INITIAL_STATE } from './support.request.reducer';

describe('SupportRequest Reducer', () => {
  test('When CREATE_SUPPORT_REQUEST.BEGIN is dispatched the recentlyCreated state should be updated to false', () => {
    const state = reducer(
      INITIAL_STATE,
      {
        type: SupportRequestTypes.CreateSupportRequest.BEGIN
      }
    );

    expect(state.recentlyCreated).toBe(false);
  });

  test('When CREATE_SUPPORT_REQUEST.SUCCESS is dispatched the recentlyCreated state should be updated to true', () => {
    const hasRecentlyCreated = INITIAL_STATE.set('recentlyCreated', undefined);
    const state = reducer(
      hasRecentlyCreated,
      {
        type: SupportRequestTypes.CreateSupportRequest.SUCCESS
      }
    );

    expect(state.recentlyCreated).toBe(true);
  });

  test('When FaultTypes.API_FAULT is dispatched the recentlyCreated state should be updated to false', () => {
    const hasRecentlyCreated = INITIAL_STATE.set('recentlyCreated', undefined);
    const state = reducer(
      hasRecentlyCreated,
      {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: SupportRequestTypes.CreateSupportRequest.BEGIN
        }
      }
    );

    expect(state.recentlyCreated).toBe(false);
  });

  test('When @@router/LOCATION_CHANGE is dispatched without the proper url, it should set recently created to false.', () => {
    const CUSTOM_STATE = INITIAL_STATE.set('recentlyCreated', true);
    const state = reducer(
      CUSTOM_STATE,
      {
        type: '@@router/LOCATION_CHANGE',
        payload: {
          pathname: '/account/test'
        }
      }
    );
    expect(state.recentlyCreated).toBe(false);
  });
});
