import LOADING_STATUS from '../../../constants/loading.status';
import { FaultTypes } from '../../fault/fault.actions';
import { OfferActionTypes } from './offerings.actions';
import reducer, { INITIAL_STATE } from './offerings.reducer';

describe('Offerings Reducer', () => {
  const ExternalRefTypes = {
    Mobil: 'Mobil',
    BroadBand: 'Broadband'
  };

  describe('When RETRIEVE_OFFER_EXTERNAL_ID.BEGIN is dispatched...', () => {
    const response = reducer(INITIAL_STATE, {
      type: OfferActionTypes.RETRIEVE_OFFER_EXTERNAL_ID.BEGIN,
      payload: {},
      requestObject: {
        offerType: 'Mobil'
      }
    });
    test('It should set the type and the is loading status.', () => {
      expect(response.offerExternalReferenceData.Mobil.isLoading).toBe(LOADING_STATUS.LOADING);
      expect(response.offerExternalReferenceData.Mobil.offerId).toBeUndefined();
      expect(response.offerExternalReferenceData.Mobil.type).toEqual(ExternalRefTypes.Mobil);
    });
  });

  describe('When RETRIEVE_OFFER_EXTERNAL_ID.SUCCESS is dispatched...', () => {
    const response = reducer(INITIAL_STATE, {
      type: OfferActionTypes.RETRIEVE_OFFER_EXTERNAL_ID.BEGIN,
      payload: {
        Offering: {
          Id: '123456'
        }
      },
      requestObject: {
        offerType: 'Mobil'
      }
    });
    test('It should set the type, the loading status to loaded, and the payload', () => {
      expect(response.offerExternalReferenceData.Mobil.isLoading).toBe(LOADING_STATUS.LOADED);
      expect(response.offerExternalReferenceData.Mobil.offerId).toBe('123456');
      expect(response.offerExternalReferenceData.Mobil.type).toEqual(ExternalRefTypes.Mobil);
    });
  });
  describe('When API Fault is dispatched with RETRIEVE_OFFER_EXTERNAL_ID begin trigger...', () => {
    test('It should set status to unloaded.', () => {
      const response = reducer(INITIAL_STATE.setIn(['test', 'status'], LOADING_STATUS.LOADING), {
        type: FaultTypes.API_FAULT,
        requestObject: {
          offerType: 'Mobil'
        },
        payload: {
          trigger: OfferActionTypes.RETRIEVE_OFFER_EXTERNAL_ID.BEGIN
        }
      });

      expect(response.offerExternalReferenceData.Mobil.isLoading).toBe(LOADING_STATUS.UNLOADED);
    });
  });
});
