import { SearchOffersActionTypes } from './search.offers.actions';
import reducer, { INITIAL_STATE } from './search.offers.reducer';

describe('When SearchOffersActionTypes.UPDATE_SELECTED_FACETS is dispatched...', () => {
  let response;
  const payload = ['123', '222'];
  const expected = {
    facets: payload
  };
  beforeEach(() => {
    response = reducer(INITIAL_STATE, {
      type: SearchOffersActionTypes.UPDATE_SELECTED_FACETS,
      payload
    });
  });

  test('It should update ', () => {
    expect(response).toMatchObject(expected);
  });
});

describe('When SearchOffersActionTypes.CLEAR_MARKETING_TEMPLATE_FILTERS is dispatched...', () => {
  let response;

  beforeEach(() => {
    response = reducer(INITIAL_STATE, {
      type: SearchOffersActionTypes.CLEAR_MARKETING_TEMPLATE_FILTERS
    });
  });

  test('It should set to INITIAL_STATE', () => {
    expect(response).toEqual(INITIAL_STATE);
  });
});

describe('When SearchOffersActionTypes.DISMISS_ELIGIBILITY_MODAL is dispatched...', () => {
  let response;
  test('It should set to INITIAL_STATE', () => {
    response = reducer(INITIAL_STATE, {
      type: SearchOffersActionTypes.DISMISS_ELIGIBILITY_MODAL
    });

    expect(response.eligibilityModalDismissed).toBe(true);
  });
});
