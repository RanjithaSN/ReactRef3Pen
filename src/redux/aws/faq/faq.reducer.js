import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import Immutable from 'seamless-immutable';
import { FaqTypes } from './faq.actions';

export const INITIAL_STATE = new Immutable({
  data: [],
  isLoading: false,
  isLoaded: false
});

export default function FaqReducer(state = INITIAL_STATE, { payload = [], type }) {
  switch (type) {
  case FaqTypes.FetchFaqs.BEGIN:
    return state
      .set('isLoading', true)
      .set('isLoaded', false);
  case FaqTypes.FetchFaqs.SUCCESS:
    return state
      .set('data', payload)
      .set('isLoading', false)
      .set('isLoaded', true);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case FaqTypes.FetchFaqs.BEGIN:
      return state
        .set('data', [])
        .set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
