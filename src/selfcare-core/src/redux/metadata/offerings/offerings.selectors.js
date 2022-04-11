import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import LOADING_STATUS from '../../../constants/loading.status';
import { Metadata } from '../../ascendon/ascendon.selectors';

export const Base = createSelector(
  Metadata,
  (base) => pathOr(null, ['offerings'], base)
);

export const OfferingsById = createSelector(
  Base,
  (base) => base.byId
);

export const OfferingsStatusesById = createSelector(
  Base,
  (base) => base.statusesById
);

export const OfferingExternalReferenceData = createSelector(
  Base,
  (base) => pathOr({}, ['offerExternalReferenceData'], base)
);

export const OfferingsMetadata = createSelector(
  Base,
  (base) => {
    return pathOr({}, ['metadata'], base);
  }
);

export const OfferingId = (state, offeringId) => offeringId;

export const OfferingStatus = createSelector(
  OfferingsStatusesById,
  OfferingId,
  (byId, id) => pathOr(LOADING_STATUS.UNLOADED, [id], byId)
);

export const IsOfferingMetadataStatusLoading = createSelector(
  OfferingStatus,
  (byId) => {
    return Object.values(byId).some((status) => status === LOADING_STATUS.LOADING);
  }
);

export const IsOfferingExternalReferenceDataLoading = createSelector(
  OfferingExternalReferenceData,
  (dataByType) => {
    return Object.values(dataByType).some((type) => (type.isLoading));
  }
);

export const Offering = createSelector(
  OfferingsById,
  OfferingId,
  (byId, id) => pathOr(null, [id], byId)
);

export const OfferingDisplayName = (offering) => pathOr(null, ['DisplayName'], offering);
export const OfferingIsBulk = (offering) => pathOr(false, ['ContainsBulkPlans'], offering);
