import { OFFERING_STATUS } from '../subscriberOfferings/subscriber.offering.constants';
import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';
import is from 'ramda/src/is';

export const SubmitOrderTypes = {
  CLEAR_ORDER_DATA: 'CLEAR_ORDER_DATA',
  CLEAR_RECENTLY_SUBMITTED_ORDER: 'CLEAR_RECENTLY_SUBMITTED_ORDER',
  PRODUCT_EXPIRATION_RENEW_OPT: CreateAsyncFromString('PRODUCT_EXPIRATION_RENEW_OPT'),
  SUBMIT_ORDER: CreateAsyncFromString('SUBMIT_ORDER'),
  SUBMIT_3DS1_ORDER: CreateAsyncFromString('SUBMIT_3DS1_ORDER'),
  SUBMIT_3DS1_ORDER_FINAL_REQUEST: CreateAsyncFromString('SUBMIT_3DS1_ORDER_FINAL_REQUEST'),
  SUBMIT_PRODUCT_ORDER: CreateAsyncFromString('SUBMIT_PRODUCT_ORDER')
};

export const SubmitOrder = (shoppingCart, paymentInfo) => {
  return (dispatch, getState) => {
    const paymentInfoArray = paymentInfo ? [{
      ...paymentInfo,
      Id: is(String, paymentInfo.Id) ? null : paymentInfo.Id
    }] : [];

    return apiThunkHelper(dispatch, getState(), SubmitOrderTypes.SUBMIT_ORDER, {
      method: 'post',
      url: 'Subscriber/SubmitOrder',
      data: {
        UseDefaults: true,
        ShoppingCart: shoppingCart,
        PaymentInstruments: paymentInfoArray
      }
    });
  };
};

export const SubmitProductOrder = ({ AddItems }, paymentInstrument) => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), SubmitOrderTypes.SUBMIT_PRODUCT_ORDER, {
      method: 'post',
      url: 'Subscriber/SubmitChangeOfServiceOrder',
      data: {
        AddItems,
        ChangeImmediately: true,
        PaymentInstrumentIds: [paymentInstrument.Id]
      }
    });
  };
};

const setLockerItemId = (options) => {
  return options.map((option) => ({
    ...option,
    LockerItemId: option.LockerItemId || option.SubscriberProductId
  }));
};

export const CancelSelectedProduct = (selectedProduct, removalReason) => {
  return (dispatch, getState) => {
    const newRemoveItems = setLockerItemId(selectedProduct.options.filter(({ Status }) => (Status === OFFERING_STATUS.ACTIVE || Status === OFFERING_STATUS.SUSPENDED)));
    return apiThunkHelper(dispatch, getState(), SubmitOrderTypes.SUBMIT_ORDER, {
      method: 'post',
      url: 'Subscriber/SubmitChangeOfServiceOrder',
      data: {
        RemoveItems: newRemoveItems,
        PaymentInstrumentIds: [],
        ChangeImmediately: true,
        OfferingId: selectedProduct.offeringId,
        OfferingInstanceId: selectedProduct.offeringInstanceId,
        ReasonCode: removalReason,
        TransitionOfferingId: selectedProduct.options ? selectedProduct.options.transitionOfferingId : null
      }
    });
  };
};

export const SubmitChangeOfServiceOrder = (offeringId, { AddItems, ModifyItems, RemoveItems }, paymentInfo, offeringInstanceId, options = {}) => {
  return (dispatch, getState) => {
    const newRemoveItems = setLockerItemId(RemoveItems);

    return apiThunkHelper(dispatch, getState(), SubmitOrderTypes.SUBMIT_ORDER, {
      method: 'post',
      url: 'Subscriber/SubmitChangeOfServiceOrder',
      data: {
        AddItems,
        ModifyItems,
        RemoveItems: newRemoveItems,
        PaymentInstrumentIds: paymentInfo ? [paymentInfo.Id] : [],
        ChangeImmediately: !options.executionDate,
        ExecutionDate: options.executionDate ? options.executionDate : null,
        OfferingId: offeringId,
        OfferingInstanceId: offeringInstanceId,
        TransitionOfferingId: options.transitionOfferingId
      }
    });
  };
};

export const ClearSubmittedOrderData = () => {
  return {
    type: SubmitOrderTypes.CLEAR_ORDER_DATA
  };
};
