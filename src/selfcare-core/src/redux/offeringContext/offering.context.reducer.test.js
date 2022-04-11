import LOADING_STATUS from '../../constants/loading.status';
import { FaultTypes } from '../fault/fault.actions';
import { OrderingTypes } from './offering.context.actions';
import reducer, { INITIAL_STATE } from './offering.context.reducer';

describe('Offering Context Reducer', () => {
  describe('When OrderingTypes.RETRIEVE_ATTRIBUTES is dispatched', () => {
    it('Should set statusesByInstanceId to LOADING_STATUS.LOADING if trigger is RETRIEVE_ATTRIBUTES.BEGIN', () => {
      const response = reducer(INITIAL_STATE, {
        type: OrderingTypes.RETRIEVE_ATTRIBUTES.BEGIN,
        requestObject: {
          offeringInstanceId: 1
        }
      });

      expect(response.statusesByInstanceId[1]).toBe(LOADING_STATUS.LOADING);
    });
    it('Should set statusesByInstanceId to LOADING_STATUS.LOADED if trigger is RETRIEVE_ATTRIBUTES.SUCCESS', () => {
      const payload = {
        data: 'my fake data'
      };
      const response = reducer(INITIAL_STATE, {
        type: OrderingTypes.RETRIEVE_ATTRIBUTES.SUCCESS,
        payload,
        requestObject: {
          offeringInstanceId: 1
        }
      });

      expect(response.statusesByInstanceId[1]).toBe(LOADING_STATUS.LOADED);
    });
    it('Should set attributesById to LOADING_STATUS.LOADED if trigger is RETRIEVE_ATTRIBUTES.SUCCESS', () => {
      const payload = {
        data: 'my fake data'
      };
      const response = reducer(INITIAL_STATE, {
        type: OrderingTypes.RETRIEVE_ATTRIBUTES.SUCCESS,
        payload,
        requestObject: {
          offeringInstanceId: 1
        }
      });

      expect(response.attributesById[1]).toEqual(payload);
    });
  });
  describe('When FaultTypes.API_FAULT is dispatched', () => {
    it('Should set statusesByInstanceId to LOADING_STATUS.UNLOADED if trigger is RETRIEVE_ATTRIBUTES', () => {
      const CUSTOM_STATE = INITIAL_STATE.setIn(['statusesByInstanceId', 1], LOADING_STATUS.LOADING);
      const response = reducer(CUSTOM_STATE, {
        type: FaultTypes.API_FAULT,
        payload: {
          trigger: OrderingTypes.RETRIEVE_ATTRIBUTES.BEGIN
        },
        requestObject: {
          offeringInstanceId: 1
        }
      });

      expect(response.statusesByInstanceId[1]).toBe(LOADING_STATUS.UNLOADED);
    });
  });
});
