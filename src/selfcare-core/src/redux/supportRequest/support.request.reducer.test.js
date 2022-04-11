import reducer, { INITIAL_STATE } from './support.request.reducer';
import { FaultTypes } from '../fault/fault.actions';
import { SupportRequestTypes } from './support.request.actions';

describe('SupportRequest Reducer', () => {
  test('When CREATE_SUPPORT_REQUEST.BEGIN is dispatched the isCreating state should be updated to true', () => {
    const state = reducer(
      INITIAL_STATE,
      {
        type: SupportRequestTypes.CreateSupportRequest.BEGIN
      }
    );

    expect(state.isCreating).toBe(true);
  });

  test('When CREATE_SUPPORT_REQUEST.SUCCESS is dispatched the state should be updated with the latest details', () => {
    const CASE = {
      category: 1,
      description: 'This is a case'
    };

    const state = reducer(
      INITIAL_STATE,
      {
        payload: {
          Case: CASE
        },
        type: SupportRequestTypes.CreateSupportRequest.SUCCESS
      }
    );

    expect(state.data.supportRequestDetails).toEqual(CASE);
  });

  test('When CREATE_SUPPORT_REQUEST.SUCCESS is dispatched the isCreating state should be updated to false', () => {
    const hasIsCreating = INITIAL_STATE.set('isCreating', undefined);
    const state = reducer(
      hasIsCreating,
      {
        type: SupportRequestTypes.CreateSupportRequest.SUCCESS
      }
    );

    expect(state.isCreating).toBe(false);
  });

  test('When RETRIEVE_SUPPORT_REQUEST.BEGIN is dispatched the isLoading state should be updated to true', () => {
    const state = reducer(
      INITIAL_STATE,
      {
        type: SupportRequestTypes.RetrieveSupportRequest.BEGIN
      }
    );

    expect(state.isLoading).toBe(true);
  });

  test('When RETRIEVE_SUPPORT_REQUEST.SUCCESS is dispatched the state should be updated with request details', () => {
    const CASE = {
      Category: 1,
      Description: 'This is a case'
    };

    const state = reducer(
      INITIAL_STATE,
      {
        payload: {
          Case: CASE
        },
        type: SupportRequestTypes.RetrieveSupportRequest.SUCCESS
      }
    );

    expect(state.data.supportRequestDetails).toEqual(CASE);
  });

  test('When RETRIEVE_SUPPORT_REQUEST.SUCCESS is dispatched the isLoading state should be updated to false', () => {
    const hasIsLoading = INITIAL_STATE.set('isLoading', undefined);
    const state = reducer(
      hasIsLoading,
      {
        type: SupportRequestTypes.RetrieveSupportRequest.SUCCESS
      }
    );

    expect(state.isLoading).toBe(false);
  });

  test('When SEARCH_SUPPORT_REQUEST.BEGIN is dispatched the isLoading state should be updated to true', () => {
    const state = reducer(
      INITIAL_STATE,
      {
        type: SupportRequestTypes.SearchSupportRequest.BEGIN
      }
    );

    expect(state.isLoading).toBe(true);
  });

  test('When SEARCH_SUPPORT_REQUEST.SUCCESS is dispatched the state should be updated with the list', () => {
    const CASES = [{
      category: 1,
      description: 'This is a case'
    }];

    const state = reducer(
      INITIAL_STATE,
      {
        payload: {
          Cases: CASES
        },
        type: SupportRequestTypes.SearchSupportRequest.SUCCESS
      }
    );

    expect(state.data.supportRequestList).toEqual(CASES);
  });

  test('When SEARCH_SUPPORT_REQUEST.SUCCESS is dispatched the isLoading state should be updated to false', () => {
    const hasIsLoading = INITIAL_STATE.set('isLoading', undefined);
    const state = reducer(
      hasIsLoading,
      {
        type: SupportRequestTypes.SearchSupportRequest.SUCCESS
      }
    );

    expect(state.isLoading).toBe(false);
  });

  test('When RETRIEVE_SUPPORT_REQUEST_TYPES.BEGIN is dispatched the isLoading state should be updated to true', () => {
    const state = reducer(
      INITIAL_STATE,
      {
        type: SupportRequestTypes.RetrieveSupportRequestTypes.BEGIN
      }
    );

    expect(state.isLoading).toBe(true);
  });

  test('When RETRIEVE_SUPPORT_REQUEST_TYPES.SUCCESS is dispatched the state should be updated with types from the metadata service.', () => {
    const CASE_TYPES = [{
      Id: 1,
      Name: 'Drive-Thru Complaint'
    }];

    const state = reducer(
      INITIAL_STATE,
      {
        payload: {
          CaseTypes: CASE_TYPES
        },
        type: SupportRequestTypes.RetrieveSupportRequestTypes.SUCCESS
      }
    );

    expect(state.data.supportRequestTypes).toEqual(CASE_TYPES);
  });

  test('When RETRIEVE_SUPPORT_REQUEST_TYPES.SUCCESS is dispatched the isLoading state should be updated to false', () => {
    const hasIsLoading = INITIAL_STATE.set('isLoading', undefined);
    const state = reducer(
      hasIsLoading,
      {
        type: SupportRequestTypes.RetrieveSupportRequestTypes.SUCCESS
      }
    );

    expect(state.isLoading).toBe(false);
  });

  test('When FaultTypes.API_FAULT is dispatched the isCreating state should be updated to false', () => {
    const hasIsCreating = INITIAL_STATE.set('isCreating', undefined);
    const state = reducer(
      hasIsCreating,
      {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: SupportRequestTypes.CreateSupportRequest.BEGIN
        }
      }
    );

    expect(state.isCreating).toBe(false);
  });

  test('When FaultTypes.API_FAULT is dispatched by SearchSupportRequest, the isLoading state should be updated to false', () => {
    const hasIsLoading = INITIAL_STATE.set('isLoading', undefined);
    const state = reducer(
      hasIsLoading,
      {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: SupportRequestTypes.SearchSupportRequest.BEGIN
        }
      }
    );

    expect(state.isLoading).toBe(false);
  });

  test('When FaultTypes.API_FAULT is dispatched by CreateSupportRequest, the isCreating state should be updated to false', () => {
    const hasIsCreating = INITIAL_STATE.set('isCreating', undefined);
    const state = reducer(
      hasIsCreating,
      {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: SupportRequestTypes.CreateSupportRequest.BEGIN
        }
      }
    );

    expect(state.isCreating).toBe(false);
  });
});
