import pathOr from 'ramda/src/pathOr';
import toPairs from 'ramda/src/toPairs';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { ActiveOfferContext, BaseOrdering } from '../order.flow.selectors';

const EMPTY_ARRAY = Immutable([]);

const Base = createSelector(
  BaseOrdering,
  (orderFlow) => pathOr(null, ['physicalInventory'], orderFlow)
);

export const PhysicalInventoryDecisions = createSelector(
  ActiveOfferContext,
  (offeringContext) => pathOr(
    EMPTY_ARRAY,
    ['Context', 'PhysicalInventoryDecisions'],
    offeringContext
  )
);

export const CompletedPhysicalInventoryDecisions = createSelector(
  Base,
  (base) => (
    toPairs(base).map(([decisionId, decision]) => ({
      Id: decisionId,
      DecisionType: 4,
      PhysicalInventoryCompletedDecision: {
        Quantity: 1,
        MakeId: decision.makeId,
        ModelId: decision.modelId,
        StoreId: decision.storeId,
        InventoryTypeId: decision.inventoryTypeId,
        InventoryAttributes: toPairs(decision.attributes).map(([attributeId, attributeValue]) => ({
          AttributeId: attributeId,
          AttributeValue: attributeValue
        }))
      }
    }))
  )
);
