import { RetrieveOffering } from '@selfcare/core/redux/metadata/offerings/offerings.actions';
import { RetrieveSavedCart, RetrieveShoppingCartOfferings, SaveOfferingCart } from '@selfcare/core/redux/savedCart/saved.cart.actions';
import { IsFetchingSavedCart, IsSavedCartLoaded } from '@selfcare/core/redux/savedCart/saved.cart.selectors';
import { CurrentSession } from '@selfcare/core/redux/session/session.selectors';
import { SubscriberIsLoaded } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import { RetrieveConvergentBillerSummaryDbss } from '../convergentBiller/convergent.biller.actions';
import { OfferingContextShoppingCart } from '../orderFlow/offeringContext/offering.context.selectors';
import { ActiveOfferInstanceId } from '../orderFlow/order.flow.selectors';
import { RetrieveSubscriberOfferingsOnce } from '../subscriberOfferings/subscriber.offerings.actions';
import { CartHasAddOns, CartHasOffers, SavedShoppingCartWithDownPayments, UniqueCartOfferItems } from './cart.selectors';

export const RehydrateSavedOrder = (force = false) => {
  return async (dispatch, getState) => {
    const state = getState();

    if (SubscriberIsLoaded(state) &&
            CurrentSession(state) &&
            !IsFetchingSavedCart(state) &&
            (!IsSavedCartLoaded(state) || force)) {
      await dispatch(RetrieveSavedCart(state));
      await dispatch(RetrieveSubscriberOfferingsOnce());

      if (CartHasOffers(getState())) {
        await dispatch(RetrieveShoppingCartOfferings(getState()));

        await Promise.all(
          UniqueCartOfferItems(getState())
            .map(({ OfferingId }) => dispatch(RetrieveOffering(OfferingId)))
        );
      } else if (CartHasAddOns(getState())) {
        await dispatch(RetrieveConvergentBillerSummaryDbss());
      }
    }
  };
};

export const PersistOfferCart = () => (
  async (dispatch, getState) => {
    const cart = OfferingContextShoppingCart(getState());

    if (cart) {
      const instanceId = ActiveOfferInstanceId(getState());
      const savedCart = SavedShoppingCartWithDownPayments(getState());
      const isUpdatingOffer = Boolean(instanceId) && Boolean(savedCart);

      if (isUpdatingOffer) {
        // This is super gross and a limiting factor in the API responses.
        // We *have* to manually replace items in the existing saved cart,
        // then, ironically, set the AppendToCart property to false.
        // What a time to be alive.
        const updatedCart = savedCart.set('Items', savedCart.Items
          .filter(({ OfferingInstanceId }) => OfferingInstanceId !== instanceId)
          .concat(cart.Items));

        await dispatch(SaveOfferingCart(updatedCart, false));
      } else {
        await dispatch(SaveOfferingCart(cart, true));
      }
    }
  }
);
