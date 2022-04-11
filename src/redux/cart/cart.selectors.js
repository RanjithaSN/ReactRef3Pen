import { OfferingExternalReferenceData } from '@selfcare/core/redux/metadata/offerings/offerings.selectors';
import { AllExternalDisplayNames } from '@selfcare/core/redux/offeringContext/offering.context.constants';
import { IsSavedCartLoaded, SavedShoppingCart, SavedShoppingCartItems } from '@selfcare/core/redux/savedCart/saved.cart.selectors';
import { SubmitOrderData } from '@selfcare/core/redux/submitOrder/submit.order.selectors';
import groupBy from 'ramda/src/groupBy';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import prop from 'ramda/src/prop';
import uniqBy from 'ramda/src/uniqBy';
import { createSelector } from 'reselect';
import { getServiceIdentifierValue } from '../products/products.selectors';
import { FormattedSubscriberOfferings } from '../subscriberOfferings/subscriber.offerings.selectors';

export const SavedShoppingCartItemsWithDownPayments = createSelector(
  SavedShoppingCartItems,
  (savedCartItems) => (
    savedCartItems.map((item) => (
      item.update(
        'DownPaymentAmount',
        (amount) => amount
      )
    ))
  )
);

export const SavedShoppingCartWithDownPayments = createSelector(
  SavedShoppingCart,
  SavedShoppingCartItemsWithDownPayments,
  (savedCart, savedCartItems) => (
    savedCart ? savedCart.set('Items', savedCartItems) : null
  )
);

export const SavedShoppingCartItemsByInstanceId = createSelector(
  SavedShoppingCartItemsWithDownPayments,
  (items) => groupBy(prop('OfferingInstanceId'))(items)
);

export const UniqueCartOfferItems = createSelector(
  SavedShoppingCartItems,
  (items) => uniqBy(prop('OfferingInstanceId'), items)
);

export const CartHasOffers = createSelector(
  SavedShoppingCartItems,
  (items) => items.some(({ OfferingId }) => Boolean(OfferingId))
);

export const CartHasSubscriberOffers = createSelector(
  SavedShoppingCartItems,
  FormattedSubscriberOfferings,
  (items, offers) => items.some(
    ({ OfferingInstanceId }) => (
      Boolean(offers.find((offer) => OfferingInstanceId === offer.OfferingInstanceId))
    )
  )
);

export const CartHasAddOns = createSelector(
  IsSavedCartLoaded,
  SavedShoppingCartItems,
  CartHasOffers,
  (loaded, items, cartHasOffers) => loaded && Boolean(items.length) && !cartHasOffers
);

export const CartItemCount = createSelector(
  CartHasOffers,
  CartHasAddOns,
  UniqueCartOfferItems,
  SubmitOrderData,
  (cartHasOffers, cartHasAddOns, items, order) => {
    if (!order) {
      if (cartHasOffers) {
        return items.length;
      }

      if (cartHasAddOns) {
        return items.reduce((result, { Quantity }) => result + Quantity, 0);
      }
    }
    return 0;
  }
);

export const CartHasPlay = createSelector(
  SavedShoppingCartItems,
  OfferingExternalReferenceData,
  (items, externalRefIds) => {
    const playOfferId = path([AllExternalDisplayNames.PLAY, 'offerId'], externalRefIds);
    return Boolean(items.find((item) => path(['OfferingId'], item) === playOfferId));
  }
);

export const CartIsMobile = createSelector(
  SavedShoppingCartItems,
  OfferingExternalReferenceData,
  (items, externalRefIds) => {
    const mobileOfferId = path([AllExternalDisplayNames.MOBILE, 'offerId'], externalRefIds);
    const campaignOfferId = path([AllExternalDisplayNames.CAMPAIGN_MOBILE, 'offerId'], externalRefIds);
    return Boolean(items.find((item) => path(['OfferingId'], item) === mobileOfferId || path(['OfferingId'], item) === campaignOfferId));
  }
);

export const ServiceIdentifierFromCart = createSelector(
  SavedShoppingCartItems,
  OfferingExternalReferenceData,
  (items, externalRefIds) => {
    const mobileOfferId = path([AllExternalDisplayNames.MOBILE, 'offerId'], externalRefIds);
    const benifyOfferId = path([AllExternalDisplayNames.BENIFY, 'offerId'], externalRefIds);
    const campaignOfferId = path([AllExternalDisplayNames.CAMPAIGN_MOBILE, 'offerId'], externalRefIds);
    const studentOfferId = path([AllExternalDisplayNames.STUDENT_MOBILE, 'offerId'], externalRefIds);
    const serviceIdentifiers = items
      .filter((item) => {
        const offeringId = path(['OfferingId'], item);
        return offeringId === mobileOfferId || offeringId === benifyOfferId || offeringId === campaignOfferId || offeringId === studentOfferId;
      })
      .map((item) => {
        const serviceAttributes = pathOr([], ['ServiceAttributes'], item);
        return getServiceIdentifierValue(serviceAttributes);
      });

    return serviceIdentifiers[0];
  }
);
