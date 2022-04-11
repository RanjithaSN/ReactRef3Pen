import Immutable from 'seamless-immutable';
import { OrderFlowTypes } from './order.flow.actions';
import { decisionsById } from './order.flow.reducers';
import { ActiveOfferInstanceId, BaseOrdering, CompletedDecisions, OfferStateByInstanceId, SavedCompletedDecisionsForActiveOffer, SelectedPaymentInstrument, SelectedPaymentInstrumentId, SubscriberHasCurrentOffer } from './order.flow.selectors';
import { bulkFormattedCompletedDecisions, bulkOfferingStore, completedDecisions, customOfferingContext } from './order.flow.test.data';

const reducerState = {
  decisionPages: [],
  decisionsById: {},
  decisionsByPage: {},
  availableDecisions: [],
  currentDecisionPageIndex: 1,
  selectedPaymentInstrumentId: 2,
  selectedOptionByDecisionId: {},
  offerStateByInstanceId: {}
};

describe('Order Flow ', () => {
  describe('Base', () => {
    test('returns the order flow top-level state', () => {
      expect(BaseOrdering({
        client: {
          orderFlow: {}
        }
      })).toEqual({});
    });
  });

  describe('Completed Decisions ', () => {
    test('returns a list of completed decisions', () => {
      const state = decisionsById(Immutable({}), {
        type: OrderFlowTypes.SET_ACTIVE_OFFER_CONTEXT,
        payload: customOfferingContext
      });

      expect(CompletedDecisions.resultFunc(state)).toEqual(completedDecisions);
    });
    test('returns bulk decisions in list of completed decisions', () => {
      expect(CompletedDecisions.resultFunc(bulkOfferingStore)).toEqual(bulkFormattedCompletedDecisions);
    });

    test('returns an empty list when no decisions exist', () => {
      expect(CompletedDecisions.resultFunc({})).toEqual([]);
    });
  });

  describe('Selected Payment Instrument Id', () => {
    test('returns a non-null ID when one exists', () => {
      expect(SelectedPaymentInstrumentId.resultFunc(reducerState)).toEqual(2);
    });
  });

  describe('Selected Payment Instrument', () => {
    test('returns an instrument when one exists', () => {
      expect(SelectedPaymentInstrument.resultFunc(1, {
        1: {}
      }, null)).toEqual({});
    });

    test('returns null when one does not exist', () => {
      expect(SelectedPaymentInstrument.resultFunc(1, null, null)).toEqual(null);
      expect(SelectedPaymentInstrument.resultFunc(null, {}, null)).toEqual(null);
      expect(SelectedPaymentInstrument.resultFunc(null, null, null)).toEqual(null);
    });

    test('returns a fallback when no ID has been selected', () => {
      const fallback = {
        Id: 'FB'
      };

      expect(SelectedPaymentInstrument.resultFunc(null, {}, fallback)).toEqual(fallback);
    });

    test('returns a fallback when no matching instrument could be found', () => {
      const fallback = {
        Id: 'FB'
      };

      expect(SelectedPaymentInstrument.resultFunc(1, {}, fallback)).toEqual(fallback);
    });
  });

  describe('Subscriber Has Current Offer', () => {
    test('returns true if ', () => {
      expect(SubscriberHasCurrentOffer.resultFunc(1, [{
        OfferingInstanceId: 1
      }])).toBe(true);
    });

    test('returns false if the current offer ID does not match any the subscriber claimed', () => {
      expect(SubscriberHasCurrentOffer.resultFunc(1, [{
        OfferingInstanceId: 2
      }])).toBe(false);
    });
  });

  describe('ActiveOfferInstanceId', () => {
    test('returns Offering Instance Id ', () => {
      const OFFER = {
        activeOfferInstanceId: '2'
      };
      expect(ActiveOfferInstanceId.resultFunc(OFFER)).toEqual(OFFER.activeOfferInstanceId);
    });

    test('returns undefined if the offer is not found', () => {
      expect(ActiveOfferInstanceId.resultFunc({})).toBe(null);
    });
  });

  describe('OfferStateByInstanceId', () => {
    test('returns Offering Instance Id ', () => {
      const OFFER = {
        offerStateByInstanceId: {
          2: 'Active'
        }
      };
      expect(OfferStateByInstanceId.resultFunc(OFFER)).toEqual(OFFER.offerStateByInstanceId);
    });

    test('returns an empty object if the offer state is not found', () => {
      expect(OfferStateByInstanceId.resultFunc(null)).toEqual({});
    });
  });

  describe('Saved Completed Decisions For Active Offer', () => {
    const OFFER_ID = 234;
    const SAVED_DATA = 'saved_data';
    test('returns the decisions for the current decision page', () => {
      expect(SavedCompletedDecisionsForActiveOffer.resultFunc({
        savedCompletedDecisions: {
          1: 'data',
          3: 'data',
          [OFFER_ID]: SAVED_DATA,
          4: 'data'
        }
      }, OFFER_ID)).toEqual(SAVED_DATA);
    });

    test('returns an null when no decisions save for current id', () => {
      expect(SavedCompletedDecisionsForActiveOffer.resultFunc({
        savedCompletedDecisions: {
          1: 'data',
          3: 'data',
          [OFFER_ID]: SAVED_DATA,
          4: 'data'
        }
      }, 666)).toEqual(null);
      expect(SavedCompletedDecisionsForActiveOffer.resultFunc({}, OFFER_ID)).toEqual(null);
    });
  });
});
