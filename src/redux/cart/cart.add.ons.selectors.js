import { SavedShoppingCartItems } from '@selfcare/core/redux/savedCart/saved.cart.selectors';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { ExistingPlanQuantitiesByServiceId } from '../addOns/add.ons.selectors';
import { CartHasOffers } from './cart.selectors';

const EMPTY_ARRAY = Immutable([]);

export const NonZeroAddOnCartItems = createSelector(
  SavedShoppingCartItems,
  CartHasOffers,
  ExistingPlanQuantitiesByServiceId,
  (items, cartHasOffers, existingPlanLookup) => (
    cartHasOffers ?
      EMPTY_ARRAY :
      items.filter((item) => {
        const { Details: { Product, PricingPlan }, Quantity, ServiceFeatureProductAssociation: { ServiceIdentifierValue } } = item;
        const { Services: [service] } = Product;
        const existingQuantity = pathOr(0, [service.Id, ServiceIdentifierValue, Product.Id, PricingPlan.Id], existingPlanLookup);
        const actualQuantity = Quantity - existingQuantity;

        return actualQuantity !== 0;
      })
  )
);
