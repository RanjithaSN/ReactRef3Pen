import pathOr from 'ramda/src/pathOr';
import Immutable from 'seamless-immutable';
import LOADING_STATUS from '../../../constants/loading.status';
import { FaultTypes } from '../../fault/fault.actions';
import { OfferActionTypes } from './offerings.actions';

export const INITIAL_STATE = new Immutable({
  byId: {},
  statusesById: {},
  offerExternalReferenceData: {},
  metadata: {}
});

const SetExternalOfferIdData = (state, payload, requestObject) => {
  let isLoading = LOADING_STATUS.LOADING;
  let id;
  const offerId = pathOr(undefined, ['Offering', 'Id'], payload);
  const offer = pathOr(undefined, ['Offering'], payload);
  if (offerId) {
    isLoading = LOADING_STATUS.LOADED;
    id = offerId;
  }
  return state
    .setIn(['metadata', offerId], offer)
    .setIn(['offerExternalReferenceData', requestObject.offerType, 'isLoading'], isLoading)
    .setIn(['offerExternalReferenceData', requestObject.offerType, 'type'], requestObject.offerType)
    .setIn(['offerExternalReferenceData', requestObject.offerType, 'offerId'], id);
};

export default function(state = INITIAL_STATE, { type, payload, requestObject }) {
  switch (type) {
  case OfferActionTypes.RETRIEVE_OFFERING.BEGIN:
    return state
      .setIn(['byId', requestObject.id], null)
      .setIn(['statusesById', requestObject.id], LOADING_STATUS.LOADING);
  case OfferActionTypes.RETRIEVE_OFFERING.SUCCESS:
    return state
      .setIn(['byId', requestObject.id], payload.Offering)
      .setIn(['statusesById', requestObject.id], LOADING_STATUS.LOADED);
  case OfferActionTypes.RETRIEVE_OFFER_EXTERNAL_ID.BEGIN:
    return SetExternalOfferIdData(state, payload, requestObject);
  case OfferActionTypes.RETRIEVE_OFFER_EXTERNAL_ID.SUCCESS:
    return SetExternalOfferIdData(state, payload, requestObject);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case OfferActionTypes.RETRIEVE_OFFERING.BEGIN:
      return state.setIn(['statusesById', requestObject.id], LOADING_STATUS.UNLOADED);
    case OfferActionTypes.RETRIEVE_OFFER_EXTERNAL_ID.BEGIN:
      return state.setIn(['offerExternalReferenceData', requestObject.offerType, 'isLoading'], LOADING_STATUS.UNLOADED);
    default:
      return state;
    }
  default:
    return state;
  }
}
