import AppConfig from 'AppConfig';
import { RetrievePurchasedOfferingAttributes } from '@selfcare/core/redux/offeringContext/offering.context.actions';
import { OfferingContext } from '@selfcare/core/redux/offeringContext/offering.context.selectors';
import { SubmitOrderTypes } from '@selfcare/core/redux/submitOrder/submit.order.actions';
import { OFFERING_STATUS } from '@selfcare/core/redux/subscriberOfferings/subscriber.offering.constants';
import { SupportRequestTypes } from '@selfcare/core/redux/supportRequest/support.request.actions';
import { CreateAsyncFromString } from '@selfcare/core/redux/utils/action.creator';
import {
  apiThunkHelper,
  productMetadataThunkHelper,
  tele2ThunkHelper
} from '@selfcare/core/redux/utils/thunk.helpers';
import path from 'ramda/src/path';
import { SetActiveOfferIds } from '../orderFlow/order.flow.actions';
import { SelectedPaymentInstrument } from '../orderFlow/order.flow.selectors';

export const ProductTypes = {
  UpdateSelectedProduct: 'UPDATE_SELECTED_PRODUCT',
  UpdateCustomPortInNumber: 'UPDATE_CUSTOM_PORT_IN_NUMBER',
  PauseWithPaymentFailure: CreateAsyncFromString('Pause_With_Payment_Failure'),
  ModifyScheduledDate: CreateAsyncFromString('MODIFY_SCHEDULED_DATE'),
  RetrieveProductMetadata: CreateAsyncFromString('RETRIEVE_PRODUCT_METADATA'),
  UpdateBroadbandActivationDate: 'UPDATE_BROADBAND_ACTIVATION_DATE'
};

export const UpdateSelectedProduct = (id) => {
  return {
    type: ProductTypes.UpdateSelectedProduct,
    payload: {
      id
    }
  };
};

export const UpdateCustomPortInNumber = (portInNumber) => {
  return {
    type: ProductTypes.UpdateCustomPortInNumber,
    payload: {
      customPortInNumber: portInNumber
    }
  };
};

export const SetCurrentOfferAndRetrieveAttributes = (offeringId, offeringInstanceId) => {
  return async (dispatch) => {
    dispatch(SetActiveOfferIds(offeringId, offeringInstanceId));
    await dispatch(
      RetrievePurchasedOfferingAttributes(
        offeringId,
        offeringInstanceId,
        [], // Removed Completed Decisions for Subsequent calls on Products
        false
      )
    );
  };
};

export const PauseProductAtRenewal = (selectedProduct) => {
  return (dispatch, getState) => {
    const removeItem = selectedProduct.options.find(({ OfferingOptionPriceId,
      Status }) => (
      Status === OFFERING_STATUS.ACTIVE && (OfferingOptionPriceId === selectedProduct.hasPrimaryOption || selectedProduct.isPennyPlay)
    ));

    return apiThunkHelper(dispatch, getState(), SubmitOrderTypes.SUBMIT_ORDER, {
      method: 'post',
      url: 'Subscriber/SubscriberProductExpirationRenewOptOut',
      data: {
        SubscriberProductIds: [path(['SubscriberProductId'], removeItem)]
      }
    });
  };
};

export const RetrieveProductMetadata = (productIdentifier) => {
  return (dispatch, getState) => {
    return productMetadataThunkHelper(dispatch, getState(), ProductTypes.RetrieveProductMetadata, {
      url: `Id/${productIdentifier}`
    });
  };
};


export const UnpauseProductBeforeRenewal = (selectedProduct) => {
  return (dispatch, getState) => {
    const removeItem = selectedProduct.options.find(({ OfferingOptionPriceId,
      Status }) => (
      Status === OFFERING_STATUS.ACTIVE && (OfferingOptionPriceId === selectedProduct.hasPrimaryOption || selectedProduct.isPennyPlay)
    ));

    return apiThunkHelper(dispatch, getState(), SubmitOrderTypes.PRODUCT_EXPIRATION_RENEW_OPT, {
      method: 'post',
      url: 'Subscriber/SubscriberProductExpirationRenewOptIn',
      data: {
        SubscriberProductIds: [path(['SubscriberProductId'], removeItem)]
      }
    });
  };
};

export const UnpauseProductAfterRenewal = (offering, includeModifyItems = true) => {
  return (dispatch, getState) => {
    const instrument = SelectedPaymentInstrument(getState());
    const { AddItems, ModifyItems } = OfferingContext(getState(), offering.OfferingInstanceId);
    const reasonCode = AppConfig.UNPAUSE_REASON_CODE;

    const payload = {
      AddItems,
      ReasonCode: reasonCode,
      PaymentInstrumentIds: [instrument.Id],
      ChangeImmediately: true,
      OfferingId: offering.OfferingId,
      OfferingInstanceId: offering.OfferingInstanceId
    };

    if (includeModifyItems) {
      payload.ModifyItems = ModifyItems;
    }

    return apiThunkHelper(dispatch, getState(), SubmitOrderTypes.SUBMIT_ORDER, {
      method: 'post',
      url: 'Subscriber/SubmitChangeOfServiceOrder',
      data: payload
    });
  };
};
export const PauseProductAfterPaymentFailure = (caseId) => {
  return (dispatch, getState) => {
    return tele2ThunkHelper(dispatch, getState(), ProductTypes.PauseWithPaymentFailure, {
      auth: true,
      method: 'post',
      url: 'submitGPPause'
    }, {
      CaseId: caseId
    });
  };
};
export const ModifyScheduledDate = (action, caseId, offeringInstanceId, newDate) => {
  return (dispatch, getState) => {
    return tele2ThunkHelper(dispatch, getState(), ProductTypes.ModifyScheduledDate, {
      auth: true,
      method: 'post',
      url: 'modifyScheduledDate'
    }, {
      Action: action,
      CaseId: caseId,
      OfferingInstanceId: offeringInstanceId,
      NewDate: newDate
    });
  };
};

const updateFutureActivationDate = (state, newDate, futureActivationDateId) => {
  const requestsList = state.ascendon.subscriberApi.supportRequest.data.supportRequestList;
  return requestsList.map((request) => {
    const additionalPropertyValues = request.AdditionalPropertyValues.map((item) => {
      if (item.Id === futureActivationDateId) {
        return {
          Id: item.Id,
          Value: newDate
        };
      }

      return item;
    });
    return {
      ...request,
      AdditionalPropertyValues: additionalPropertyValues
    };
  });
};

export const updateFutureActivationDateInStore = (newDate) => {
  return (dispatch, getState) => {
    const list = updateFutureActivationDate(getState(), newDate, AppConfig.FUTURE_ACTIVATION_DATE_ID);

    dispatch({
      type: SupportRequestTypes.FutureActivationDate,
      payload: {
        list
      }
    });
  };
};

export const UpdateBroadbandActivationDate = (newDate) => {
  return {
    type: ProductTypes.UpdateBroadbandActivationDate,
    payload: newDate
  };
};
