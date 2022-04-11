import { SearchCatalog } from '@selfcare/core/redux/catalog/catalog.actions';
import { RetrieveSubscriberOfferingsOnce } from '../subscriberOfferings/subscriber.offerings.actions';
import { ServiceId } from '../subscriberOfferings/subscriber.offerings.selectors';
import { FetchAddOns } from './add.ons.actions';
import { AddOnCode } from './add.ons.selectors';

jest.mock('@selfcare/core/redux/catalog/catalog.actions');
jest.mock('./add.ons.selectors');
jest.mock('../subscriberOfferings/subscriber.offerings.actions');
jest.mock('../subscriberOfferings/subscriber.offerings.selectors');

const PRODUCT_SORT_BY = 'RELEVANCE';
const SERVICE_ID = 85;
const SERVICE_IDENTIFIER_VALUE = '55555555';
const SERVICE_FEATURE_CODE = 2;

describe('AddOns Actions', () => {
  const mockState = {};
  const dispatch = jest.fn().mockResolvedValue();
  const getState = jest.fn(() => mockState);

  beforeEach(() => {
    jest.clearAllMocks();
    AddOnCode.mockReturnValue(SERVICE_FEATURE_CODE);
    ServiceId.mockReturnValue(SERVICE_ID);
    RetrieveSubscriberOfferingsOnce.mockReturnValue('RetrieveSubscriberOfferingsOnce');
  });

  describe('Given the biller summary and offer details are available', () => {
    describe('When FetchAddOns is called with serviceId: 85 and sortby: RELEVANCE', () => {
      beforeEach(() => {
        FetchAddOns(SERVICE_IDENTIFIER_VALUE, PRODUCT_SORT_BY)(dispatch, getState);
      });

      test('It should dispatch SearchCatalog with the provided serviceId and sortby', () => {
        expect(SearchCatalog).toHaveBeenCalledWith({
          serviceId: SERVICE_ID,
          sortBy: PRODUCT_SORT_BY,
          productClassification: SERVICE_FEATURE_CODE
        }, undefined);
      });
    });
  });

  describe('Given the biller summary and offer details are not available', () => {
    describe('When FetchAddOns is called with serviceId: 85 and sortby: RELEVANCE', () => {
      beforeEach(() => {
        FetchAddOns(SERVICE_IDENTIFIER_VALUE, PRODUCT_SORT_BY)(dispatch, getState);
      });

      test('It should dispatch SearchCatalog with the provided serviceId and sortby', () => {
        expect(SearchCatalog).toHaveBeenCalledWith({
          serviceId: SERVICE_ID,
          sortBy: PRODUCT_SORT_BY,
          productClassification: SERVICE_FEATURE_CODE
        }, undefined);
      });
    });
  });
});
