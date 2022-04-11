import { DefaultBillingAddress } from '@selfcare/core/redux/address/address.selectors';
import { ClearApiFault } from '@selfcare/core/redux/fault/fault.actions';
import { OfferingContext } from '@selfcare/core/redux/offeringContext/offering.context.selectors';
import { CalculateChangeOfServiceOrderQuote, CalculateOrderQuote, CalculateProductOrderQuote } from '@selfcare/core/redux/quote/quote.actions';
import { SavedShoppingCartItems } from '@selfcare/core/redux/savedCart/saved.cart.selectors';
import { SubmitChangeOfServiceOrder, SubmitOrder as CoreSubmitOrder, SubmitProductOrder } from '@selfcare/core/redux/submitOrder/submit.order.actions';
import { RetrieveAddressesOnce } from '../address/address.actions';
import { CartHasAddOns, CartHasOffers, CartHasSubscriberOffers, SavedShoppingCartWithDownPayments } from '../cart/cart.selectors';
import { SelectedPaymentInstrument } from '../orderFlow/order.flow.selectors';
import { AddOnOrderItems } from './checkout.selectors';

export const CalculateQuoteOnCheckout = () => (
  async (dispatch, getState) => {
    const store = getState();
    await dispatch(
      CalculateOrderQuote(
        DefaultBillingAddress(store),
        SavedShoppingCartWithDownPayments(store),
        SelectedPaymentInstrument(store)
      )
    );
  }
);

export const CalculateChangeOfServiceOrderQuoteOnCheckout = (offer) => (
  async (dispatch, getState) => {
    const store = getState();
    const [item] = SavedShoppingCartItems(store);
    const { OfferingId, OfferingInstanceId } = item || offer;

    await dispatch(
      CalculateChangeOfServiceOrderQuote(
        OfferingContext(store, OfferingInstanceId),
        OfferingId,
        OfferingInstanceId
      )
    );
  }
);

export const CalculateQuote = (offer) => (
  async (dispatch, getState) => {
    const state = getState();

    if (CartHasOffers(state)) {
      await dispatch(RetrieveAddressesOnce());

      if (CartHasSubscriberOffers(state)) {
        await dispatch(CalculateChangeOfServiceOrderQuoteOnCheckout(offer));
      } else {
        await dispatch(CalculateQuoteOnCheckout());
      }
    } else if (CartHasAddOns(state)) {
      await dispatch(CalculateProductOrderQuote(AddOnOrderItems(state)));
    }
  }
);

export const AllowanceSubmitOrder = () => (
  (dispatch, getState) => {
    const instrument = SelectedPaymentInstrument(getState());
    dispatch(ClearApiFault());
    return dispatch(CoreSubmitOrder(SavedShoppingCartWithDownPayments(getState()), {
      Id: instrument.Id
    }));
  }
);

export const SubmitOrder = (offer, options) => (
  async (dispatch, getState) => {
    let order;

    const state = getState();

    if (!CartHasAddOns(state)) {
      const instrument = SelectedPaymentInstrument(state);

      if (CartHasSubscriberOffers(state) || offer) {
        const [item] = SavedShoppingCartItems(state);
        const { OfferingId, OfferingInstanceId } = item || offer;

        order = await dispatch(
          SubmitChangeOfServiceOrder(
            OfferingId,
            OfferingContext(state, OfferingInstanceId),
            instrument,
            OfferingInstanceId,
            options
          )
        );
      } else {
        order = await dispatch(CoreSubmitOrder(SavedShoppingCartWithDownPayments(state), {
          Id: instrument.Id || options.paymentInstrumentId
        }));
      }
    } else {
      order = await dispatch(SubmitProductOrder(AddOnOrderItems(state), SelectedPaymentInstrument(state)));
    }

    return order;
  }
);
