import { Client } from '../client.selectors';
import { ActiveOfferId } from '../orderFlow/order.flow.selectors';
import { OfferingExternalReferenceData } from 'selfcare-core/src/redux/metadata/offerings/offerings.selectors';
import { AllExternalDisplayNames } from 'selfcare-core/src/redux/offeringContext/offering.context.constants';
import { ssnLookupStudent } from 'selfcare-core/src/redux/subscriberInformation/subscriber.information.selectors';
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import { createSelector } from 'reselect';

const Base = createSelector([
  Client
], (client) => {
  return pathOr(null, ['studentOffer'], client);
});

export const SsnCheckIsLoading = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoading'], base);
});

export const CurrentOfferIsStudent = createSelector(
  ActiveOfferId,
  OfferingExternalReferenceData,
  (offerId, externalIds) => {
    const studentMobileOfferId = path([AllExternalDisplayNames.STUDENT_MOBILE, 'offerId'], externalIds);
    const studentBoradbandOfferId = path([AllExternalDisplayNames.STUDENT_BROADBAND, 'offerId'], externalIds);

    return studentMobileOfferId === offerId || studentBoradbandOfferId === offerId;
  }
);

export const IsStudentValid = createSelector(
  ssnLookupStudent,
  (studentValidation) => {
    return studentValidation.status === 'VALID';
  }
);

export const GetStudentMobileOfferId = createSelector(
  OfferingExternalReferenceData,
  (externalIds) => {
    return path([AllExternalDisplayNames.STUDENT_MOBILE, 'offerId'], externalIds);
  }
);

export const GetStudentBroadbandOfferId = createSelector(
  OfferingExternalReferenceData,
  (externalIds) => {
    return path([AllExternalDisplayNames.STUDENT_BROADBAND, 'offerId'], externalIds);
  }
);
