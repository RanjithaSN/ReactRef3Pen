import Immutable from 'seamless-immutable';
import { SiteTypes } from '../site/site.actions';

const STARTING_INDEX = 1;
const INCREMENT_ENTITLEMENTS_BY = 3;
export const INITIAL_STATE = new Immutable({
  data: {
    startIndex: STARTING_INDEX,
    endIndex: INCREMENT_ENTITLEMENTS_BY,
    selectedService: null
  }
});

export default function UsageReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case SiteTypes.UpdateCurrentAccount:
    return state
      .setIn(['data', 'selectedService'], payload.serviceId);
  default:
    return state;
  }
}
