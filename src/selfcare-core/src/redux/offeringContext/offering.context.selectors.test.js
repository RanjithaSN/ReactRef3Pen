import LOADING_STATUS from '../../constants/loading.status';
import { IsOfferingContextStatusLoading, IsOfferingContextStatusUnloadedOrUncommitted, OfferingContext, OfferingContextAttributesByInstanceId, OfferingContextsByInstanceId, OfferingContextStatusesByInstanceId, OfferingInstanceId } from './offering.context.selectors';

describe('Offering Context Selectors', () => {
  const offeringContexts = {
    dataByInstanceId: {
      0: {
        Context: {
          Decisions: 'some decisions for 0'
        }
      },
      1: {
        Context: {
          Decisions: 'some decisions for 1'
        }
      },
      2: {
        Context: {
          Decisions: 'some decisions for 2'
        }
      }
    },
    statusesByInstanceId: {
      1: 'success status for 1',
      2: 'failure status for 2'
    },
    attributesById: {
      0: {
        Context: {
          ValueDecisions: 'some decisions for 0'
        }
      },
      1: {
        Context: {
          ValueDecisions: 'some decisions for 1'
        }
      },
      2: {
        Context: {
          ValueDecisions: 'some decisions for 2'
        }
      }
    }
  };

  describe('OfferingContextsByInstanceId', () => {
    test('it should return null if there are no offeringContexts', () => {
      expect(OfferingContextsByInstanceId.resultFunc([])).toEqual(null);
    });
    test('it should return the dataByInstanceId sub-object', () => {
      expect(OfferingContextsByInstanceId.resultFunc(offeringContexts)).toEqual(offeringContexts.dataByInstanceId);
    });
  });

  describe('OfferingContextAttributesByInstanceId', () => {
    test('it should return null if there are no offeringContexts', () => {
      expect(OfferingContextAttributesByInstanceId.resultFunc([])).toEqual(null);
    });
    test('it should return the dataByInstanceId sub-object', () => {
      expect(OfferingContextAttributesByInstanceId.resultFunc(offeringContexts)).toEqual(offeringContexts.attributesById);
    });
  });
  describe('OfferingContextStatusesByInstanceId', () => {
    test('it should return null if there are no offeringContexts', () => {
      expect(OfferingContextStatusesByInstanceId.resultFunc([])).toEqual(null);
    });
    test('it should return the statusesByInstanceId sub-object', () => {
      expect(OfferingContextStatusesByInstanceId.resultFunc(offeringContexts)).toEqual(offeringContexts.statusesByInstanceId);
    });
  });

  describe('OfferingInstanceId', () => {
    test('it should return the id portion of what is passed into it with state', () => {
      expect(OfferingInstanceId('state', 'someId')).toEqual('someId');
    });
  });

  describe('OfferingContext', () => {
    test('it should return null if the offering context does not exist', () => {
      expect(OfferingContext.resultFunc(offeringContexts.dataByInstanceId, 3)).toEqual(null);
    });
    test('it should return the data when a matching id is provided', () => {
      expect(OfferingContext.resultFunc(offeringContexts.dataByInstanceId, 1)).toEqual(offeringContexts.dataByInstanceId[1]);
    });
  });

  describe('IsOfferingContextStatusLoading', () => {
    test('it should return false if none of the statuses are updating', () => {
      expect(IsOfferingContextStatusLoading.resultFunc(offeringContexts.statusesByInstanceId)).toEqual(false);
    });
    test('it should return true if one of the statuses are updating', () => {
      const newStatuses = offeringContexts.statusesByInstanceId;
      newStatuses[3] = LOADING_STATUS.UPDATING;
      expect(IsOfferingContextStatusLoading.resultFunc(newStatuses)).toEqual(true);
    });
  });

  describe('IsOfferingContextStatusUnloadedOrUncommitted', () => {
    test('it should return false if none of the statuses are unloaded or uncommitted', () => {
      expect(IsOfferingContextStatusUnloadedOrUncommitted.resultFunc(offeringContexts.statusesByInstanceId)).toEqual(false);
    });
    test('it should return true if one of the statuses are unloaded', () => {
      const newStatuses = offeringContexts.statusesByInstanceId;
      newStatuses[3] = LOADING_STATUS.UNLOADED;
      expect(IsOfferingContextStatusUnloadedOrUncommitted.resultFunc(newStatuses)).toEqual(true);
    });
    test('it should return true if one of the statuses are uncommitted', () => {
      const newStatuses = offeringContexts.statusesByInstanceId;
      newStatuses[3] = LOADING_STATUS.UNCOMMITTED;
      expect(IsOfferingContextStatusUnloadedOrUncommitted.resultFunc(newStatuses)).toEqual(true);
    });
  });
});
