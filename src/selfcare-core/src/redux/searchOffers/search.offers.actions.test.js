/* eslint-disable import/namespace */
import * as SearchOffersActions from './search.offers.actions';
import * as SearchOffersSelectors from './search.offers.selectors';

jest.mock('./search.offers.selectors.js');

describe('Search Offers Actions', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const getState = jest.fn(() => {});

  xdescribe('RetrieveSearchOffer', () => {
    describe('And search offering is loaded', () => {
      beforeEach(() => {
        SearchOffersSelectors.SearchOffersIsLoading.mockReturnValue(false);
        SearchOffersSelectors.HasSearchOffer.mockReturnValue(() => {
          return true;
        });
      });

      it('Should not call SearchOffers', async () => {
        const dispatch = jest.fn();
        await SearchOffersActions.RetrieveSearchOffer(1)(dispatch, getState);

        expect(getState).toHaveBeenCalled();
        expect(SearchOffersSelectors.SearchOffersIsLoading).toHaveBeenCalled();
        expect(SearchOffersSelectors.HasSearchOffer).toHaveBeenCalledWith(1);
        expect(dispatch).not.toHaveBeenCalled();
      });
    });

    describe('And search offering is not loaded', () => {
      beforeEach(() => {
        SearchOffersSelectors.SearchOffersIsLoading.mockReturnValue(false);
        SearchOffersSelectors.HasSearchOffer.mockReturnValue(() => {
          return false;
        });
      });

      it('Should call SearchOffers', async () => {
        const dispatch = jest.fn();
        await SearchOffersActions.RetrieveSearchOffer(1)(dispatch, getState);

        expect(getState).toHaveBeenCalled();
        expect(SearchOffersSelectors.SearchOffersIsLoading).toHaveBeenCalled();
        expect(SearchOffersSelectors.HasSearchOffer).toHaveBeenCalledWith(1);
        expect(dispatch).toHaveBeenCalled();
      });
    });
  });
});
