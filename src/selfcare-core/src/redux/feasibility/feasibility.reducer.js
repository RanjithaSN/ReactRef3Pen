import Immutable from 'seamless-immutable';
import * as LocalStorageHelper from '../../helpers/storage/local.storage';
import { FaultTypes } from '../fault/fault.actions';
import { FEASIBILITY_ATTRIUTES_HEADER } from '../utils/api.constants';
import { FeasibilityTypes } from './feasibility.actions';

export const INITIAL_STATE = new Immutable({
  data: {
    addresses: null,
    attributes: LocalStorageHelper.read(FEASIBILITY_ATTRIUTES_HEADER),
    feasibilityAddress: null,
    offers: []
  },
  isLoading: false
});

export default function FeasibilityReducer(state = INITIAL_STATE, { payload = {}, requestObject = {}, type }) {
  switch (type) {
  case FeasibilityTypes.CLEAR_ADDRESSES:
    return state
      .setIn(['data', 'addresses'], null)
      .setIn(['data', 'attributes'], null);
  case FeasibilityTypes.FETCH_ADDRESS.BEGIN:
    return state
      .set('isLoading', true)
      .setIn(['data', 'feasibilityAddress'], null);
  case FeasibilityTypes.FETCH_ADDRESS.SUCCESS:
    return state
      .setIn(['data', 'feasibilityAddress'], payload)
      .set('isLoading', false);
  case FeasibilityTypes.FETCH_ADDRESSES.BEGIN:
    return state
      .set('isLoading', true)
      .setIn(['data', 'addresses'], null);
  case FeasibilityTypes.FETCH_ADDRESSES.SUCCESS:
    return state
      .setIn(['data', 'addresses'], payload)
      .set('isLoading', false);
  case FeasibilityTypes.RETRIEVE_SUBSCRIBER_OFFERS.BEGIN:
    return state
      .set('isLoading', true)
      .setIn(['data', 'offers'], [])
      .setIn(['data', 'attributes'], null);
  case FeasibilityTypes.RETRIEVE_SUBSCRIBER_OFFERS.SUCCESS:
    return state
      .setIn(['data', 'offers'], payload)
      .set('isLoading', false)
      .setIn(['data', 'attributes'], requestObject);
  case FeasibilityTypes.SET_FEASIBILITY_SERVICE_ID:
    return state
      .setIn(['data', 'attributes', 'serviceId'], payload);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case FeasibilityTypes.FETCH_ADDRESS.BEGIN:
      return state
        .setIn(['data', 'feasibilityAddress'], null)
        .set('isLoading', false);
    case FeasibilityTypes.FETCH_ADDRESSES.BEGIN:
      return state
        .setIn(['data', 'addresses'], null)
        .set('isLoading', false);
    case FeasibilityTypes.RETRIEVE_SUBSCRIBER_OFFERS.BEGIN:
      return state
        .set('isLoading', false)
        .setIn(['data', 'offers'], [])
        .setIn(['data', 'attributes'], null);
    default:
      return state;
    }
  default:
    return state;
  }
}
