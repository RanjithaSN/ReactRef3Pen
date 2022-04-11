import LoadingStatus from '../../../constants/loading.status';
import { SearchOffers } from '../../searchOffers/search.offers.actions';
import { SearchOffersIsLoaded } from '../../searchOffers/search.offers.selectors';
import { CreateAsyncFromString } from '../../utils/action.creator';
import { metadataThunkHelper } from '../../utils/thunk.helpers';
import { RetrieveCodes } from '../codes/codes.actions';
import { CODES } from '../codes/codes.constants';
import { ExternalReferenceId } from '../codes/codes.selectors';
import { Offering, OfferingStatus } from './offerings.selectors';

export const OfferActionTypes = {
  RETRIEVE_OFFERING: CreateAsyncFromString('RETRIEVE_OFFERING'),
  RETRIEVE_OFFER_EXTERNAL_ID: CreateAsyncFromString('RETRIEVE_OFFER_EXTERNAL_ID'),
  FETCH_OFFER_EXTERNAL_ID_METADATA: 'FETCH_OFFER_EXTERNAL_ID_METADATA'
};

export const RetrieveOffering = (id) => {
  return async (dispatch, getState) => {
    if (OfferingStatus(getState(), id) === LoadingStatus.UNLOADED) {
      return metadataThunkHelper(dispatch, getState(), OfferActionTypes.RETRIEVE_OFFERING, {
        url: `Offering/Id/${id}`
      }, {
        id
      });
    }

    return Offering(getState(), id);
  };
};

export const RetrieveExternalOfferingMetadata = (offerType) => {
  return async (dispatch, getState) => {
    const externalReferenceId = ExternalReferenceId(getState());
    if(externalReferenceId !== null) {
      return metadataThunkHelper(dispatch, getState(), OfferActionTypes.RETRIEVE_OFFER_EXTERNAL_ID, {
        url: `Offering/OfferingExternalReferenceType/${externalReferenceId}/OfferingExternalReference/${offerType}`
      }, {
        offerType
      });
    }    
  };
};
/**
 * Action to call RetrieveCodes, SearchOffers, and RetrieveExternalOfferingMetadata
 * @param {*ExternalIDs used to filter data}
 * @param {*options used to fetch offers}
 */
export const FetchOfferExternalIdMetaData = (ExternalIDs, options) => {
  return async (dispatch, getState) => {

    if (!SearchOffersIsLoaded(getState()) || !ExternalReferenceId(getState())) {
      await dispatch(RetrieveCodes(CODES.ExternalReferenceId)).then(() => {
        return dispatch(SearchOffers(options));
      });
    }

    await Promise.all(Object.values(ExternalIDs).map((value) => {
      return dispatch(RetrieveExternalOfferingMetadata(value));
    }));
  };
};

export const FetchOfferExternalIdMetaDataSagaAction = (externalIds, options) => {
  return {
    type: OfferActionTypes.FETCH_OFFER_EXTERNAL_ID_METADATA,
    externalIds,
    options
  };
};
