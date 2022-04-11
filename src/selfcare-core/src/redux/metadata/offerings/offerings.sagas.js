import { call, all, takeEvery, select } from 'redux-saga/effects';
import { OfferActionTypes } from './offerings.actions';
import { retrieveCodes } from '../codes/codes.sagas';
import { searchOffers } from '../../searchOffers/search.offers.sagas';
import { CODES } from '../codes/codes.constants';
import { ExternalReferenceId } from '../codes/codes.selectors';
import { metadataSagaHelper } from '../../utils/cdn.sagas';

export function* retrieveExternalOfferingMetadata(offerType) {
  const externalReferenceId = yield select(ExternalReferenceId);
  yield call(metadataSagaHelper, OfferActionTypes.RETRIEVE_OFFER_EXTERNAL_ID, {
    url: `Offering/OfferingExternalReferenceType/${externalReferenceId}/OfferingExternalReference/${offerType}`
  }, {
    offerType
  });
}

export function* fetchOfferExternalMetaData({ externalIds, options }) {
  yield all([
    call(retrieveCodes, {
      codeConstant: CODES.ExternalReferenceId
    }),
    call(searchOffers, options)
  ]);
  yield all(Object.values(externalIds).map((value) => call(retrieveExternalOfferingMetadata, value)));
}

export default function* root() {
  yield all([
    takeEvery(OfferActionTypes.FETCH_OFFER_EXTERNAL_ID_METADATA, fetchOfferExternalMetaData)
  ]);
}
