import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import LOADING_STATUS from '../../constants/loading.status';
import { Ordering } from '../ordering/ordering.selectors';

const Base = createSelector(
  Ordering,
  (ordering) => pathOr(null, ['offeringContexts'], ordering)
);

export const getPennyPlayOffering = createSelector(
  (state) => state.ascendon.subscriberApi.offering.data ? state.ascendon.subscriberApi.offering.data.Offerings : null,
  (offerings) =>  offerings ? offerings.find((offering) => offering.Name === 'Penny Play') : null
);

export const getPennyPlayOfferingCart = createSelector(
  (state) => state.ascendon.subscriberApi.ordering.offeringContexts.dataByInstanceId ? state.ascendon.subscriberApi.ordering.offeringContexts.dataByInstanceId : null,
  (state, id) => id,
  (offeringContextsById, id) => {
    if (!offeringContextsById) {
      return null;
    }
    return offeringContextsById[id].ShoppingCart;
  }

);


export const OfferingContextsByInstanceId = createSelector(
  Base,
  (base) => pathOr(null, ['dataByInstanceId'], base)
);

export const OfferingContextAttributesByInstanceId = createSelector(
  Base,
  (base) => pathOr(null, ['attributesById'], base)
);

export const OfferingContextStatusesByInstanceId = createSelector(
  Base,
  (base) => pathOr(null, ['statusesByInstanceId'], base)
);

export const OfferingInstanceId = (state, id) => id;

export const OfferingContext = createSelector(
  OfferingContextsByInstanceId,
  OfferingInstanceId,
  (byId, id) => pathOr(null, [id], byId)
);

export const IsOfferingContextStatusLoading = createSelector(
  OfferingContextStatusesByInstanceId,
  (byId) => {
    return Object.values(byId).some((status) => status === LOADING_STATUS.LOADING || status === LOADING_STATUS.UPDATING);
  }
);

export const IsOfferingContextStatusUnloadedOrUncommitted = createSelector(
  OfferingContextStatusesByInstanceId,
  (byId) => {
    return Object.values(byId).some((status) => status === LOADING_STATUS.UNLOADED || status === LOADING_STATUS.UNCOMMITTED);
  }
);
