import { LandingPageTypes } from './landing.page.actions';
import { FaultTypes } from 'selfcare-core/src/redux/fault/fault.actions';
import Immutable from 'seamless-immutable';

export const INITIAL_STATE = new Immutable({
  landingPage: null,
  isLoading: false,
  isLoaded: false
});

const LANDING_PAGE_URI = '/landing-page';
const STUDENT_LANDING_PAGE_URI = '/student-landing-page';

const getPageByPostUri = (landingPages, uri) => {
  if (!Array.isArray(landingPages)) {
    throw new Error(`landing.page.reducer::getPageByPostUri: no landing page with uri '${uri}' found in cms payload.`);
  }
  const pages = landingPages.filter((p) => p.post_uri === uri);
  const page = pages[0];
  if (page === undefined) {
    throw new Error(`landing.page.reducer::getPageByPostUri: no landing page with uri '${uri}' found in cms payload.`);
  }
  return page;
};

export default function LandingPageReducer(state = INITIAL_STATE, { payload = [], type }) {
  switch (type) {
  case LandingPageTypes.FetchLandingPage.BEGIN:
    return state
      .set('isLoading', true)
      .set('isLoaded', true);
  case LandingPageTypes.FetchLandingPage.SUCCESS:
    // eslint-disable-next-line no-case-declarations
    const landingPage = getPageByPostUri(payload, LANDING_PAGE_URI);
    // eslint-disable-next-line no-case-declarations
    const studentLandingPage = getPageByPostUri(payload, STUDENT_LANDING_PAGE_URI);
    return state.set('landingPage', landingPage)
      .set('studentLandingPage', studentLandingPage)
      .set('isLoading', false)
      .set('isLoaded', true);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case LandingPageTypes.FetchLandingPage.BEGIN:
      return state
        .set('landingPage', null)
        .set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
