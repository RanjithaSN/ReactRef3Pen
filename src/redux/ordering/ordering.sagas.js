import { fetchOfferExternalMetaData } from '@selfcare/core/redux/metadata/offerings/offerings.sagas';
import { OfferingExternalReferenceData } from '@selfcare/core/redux/metadata/offerings/offerings.selectors';
import { retrieveNewOfferingContext } from '@selfcare/core/redux/offeringContext/offering.context.sagas';
import path from 'ramda/src/path';
import { all, call, select, takeEvery } from 'redux-saga/effects';
import { OrderingTypes } from './ordering.actions';

export function* retrieveDecisionsForOffers({ offersToFetch, fetchOfferOptions }) {
  yield call(fetchOfferExternalMetaData, {
    externalIds: offersToFetch,
    options: fetchOfferOptions
  });
  const externalRef = yield select(OfferingExternalReferenceData);

  yield all(Object.values(offersToFetch).map((name) => {
    const offerId = path([name, 'offerId'], externalRef);
    return call(retrieveNewOfferingContext, {
      offeringId: offerId,
      offeringInstanceId: offerId
    });
  }));
}

export default function* rootSaga() {
  yield all([
    takeEvery(OrderingTypes.RETRIEVE_DECISIONS_FOR_OFFER_SAGA, retrieveDecisionsForOffers)
  ]);
}
