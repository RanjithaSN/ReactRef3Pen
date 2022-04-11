import is from 'ramda/src/is';
import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';

export const QuoteTypes = {
  CALCULATE_ORDER_QUOTE: CreateAsyncFromString('CALCULATE_ORDER_QUOTE'),
  CALCULATE_CHANGE_OF_SERVICE_ORDER_QUOTE: CreateAsyncFromString('CALCULATE_CHANGE_OF_SERVICE_ORDER_QUOTE'),
  CALCULATE_PRODUCT_ORDER_QUOTE: CreateAsyncFromString('CALCULATE_PRODUCT_ORDER_QUOTE'),
  CLEAR_ORDER_QUOTE: 'CLEAR_ORDER_QUOTE'
};

export const CalculateOrderQuote = (address, shoppingCart, paymentInstrument, options = {
  recordPaymentInformation: false
}) => (
  (dispatch, getState) => {
    const paymentInstruments = paymentInstrument ? [{
      ...paymentInstrument,
      Id: is(String, paymentInstrument.Id) ? null : paymentInstrument.Id
    }] : [];
    return apiThunkHelper(dispatch, getState(), QuoteTypes.CALCULATE_ORDER_QUOTE, {
      method: 'post',
      url: 'Subscriber/CalculateOrderQuote',
      data: {
        CalculateTaxes: true,
        CalculateShipping: true,
        ConvergentBillerAddress: {
          Name: address.addressLine1, // TODO: Provide a better address name
          City: address.city,
          Country: address.country,
          DefaultBilling: true,
          DefaultHome: true,
          DefaultPostal: true,
          DefaultService: true,
          LineOne: address.addressLine1,
          LineTwo: address.addressLine2,
          PostalCode: address.postalCode,
          State: address.region
        },
        ShoppingCart: shoppingCart,
        PaymentInstruments: paymentInstruments,
        RecordPaymentInformation: options.recordPaymentInformation || false
      }
    });
  }
);

export const CalculateChangeOfServiceOrderQuote = (offeringContext, offerId, offeringInstanceId, options = {}) => (
  (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), QuoteTypes.CALCULATE_CHANGE_OF_SERVICE_ORDER_QUOTE, {
      method: 'post',
      url: 'Subscriber/CalculateChangeOfServiceOrderQuote',
      data: {
        OfferingId: offerId,
        OfferingInstanceId: offeringInstanceId,
        ChangeImmediately: false,
        ReturnSubscriptionPreviews: true,
        AddItems: offeringContext.AddItems,
        ModifyItems: offeringContext.ModifyItems,
        RemoveItems: offeringContext.RemoveItems,
        TransitionOfferingId: options.transitionOfferingId
      }
    });
  }
);

export const CalculateProductOrderQuote = ({ AddItems, RemoveItems }) => (
  (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), QuoteTypes.CALCULATE_PRODUCT_ORDER_QUOTE, {
      method: 'post',
      url: 'Subscriber/CalculateChangeOfServiceOrderQuote',
      data: {
        ChangeImmediately: true,
        ReturnSubscriptionPreviews: true,
        AddItems,
        RemoveItems
      }
    });
  }
);

export const ClearCalculateOrderQuote = () => ({
  type: QuoteTypes.CLEAR_ORDER_QUOTE
});
