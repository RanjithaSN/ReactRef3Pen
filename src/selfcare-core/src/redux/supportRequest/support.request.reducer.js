import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { SupportRequestTypes } from './support.request.actions';

export const INITIAL_STATE = new Immutable({
  data: {
    supportRequestDetails: null,
    supportRequestList: [],
    supportRequestTypes: []
  },
  filterData: {
    pageNumber: 1,
    pageSize: 100
  },
  isCreating: false,
  isSearchLoaded: false,
  isLoading: false,
  recentlyCreated: false
});

export default function SupportRequestReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case SupportRequestTypes.FutureActivationDate:
    return state.setIn(['data', 'supportRequestList'], payload.list);
  case SupportRequestTypes.CreateSupportRequest.BEGIN:
    return state.set('isCreating', true);
  case SupportRequestTypes.CreateSupportRequest.SUCCESS:
    return state
      .setIn(['data', 'supportRequestDetails'], payload.Case)
      .set('isCreating', false);
  case SupportRequestTypes.RetrieveSupportRequest.BEGIN:
    return state.set('isLoading', true);
  case SupportRequestTypes.RetrieveSupportRequest.SUCCESS:
    return state
      .setIn(['data', 'supportRequestDetails'], payload.Case)
      .set('isLoading', false);
  case SupportRequestTypes.SearchSupportRequest.BEGIN:
    return state
      .set('isLoading', true)
      .set('isSearchLoaded', false);
  case SupportRequestTypes.SearchSupportRequest.SUCCESS:
    return state
      .setIn(['data', 'supportRequestList'], payload.Cases)
      .set('isLoading', false)
      .set('isSearchLoaded', true);;
  case SupportRequestTypes.RetrieveSupportRequestTypes.BEGIN:
    return state.set('isLoading', true);
  case SupportRequestTypes.RetrieveSupportRequestTypes.SUCCESS:
    return state
      .setIn(['data', 'supportRequestTypes'], payload.CaseTypes)
      .set('isLoading', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case SupportRequestTypes.CreateSupportRequest.BEGIN:
      return state.set('isCreating', false);
    case SupportRequestTypes.SearchSupportRequest.BEGIN:
    case SupportRequestTypes.RetrieveSupportRequest.BEGIN:
    case SupportRequestTypes.RetrieveSupportRequestTypes.BEGIN:
      return state
        .set('isLoading', false)
        .set('isSearchLoaded', false);;
    default:
      return state;
    }
  default:
    return state;
  }
}
