import AppConfig from 'AppConfig';
import { Subscriber } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import { PORT_FIELD_IDS, PORT_RESPONSE_CODE, RETRY_PAYMENT_STATE, SUPPORT_REQUEST_STATUS } from '@selfcare/core/redux/supportRequest/support.request.constants';
import { RecentlyNewOrOpenPaymentFailureRequests, RecentNewOrOpenSupportRequests, RequestListWithMappedProperties } from '@selfcare/core/redux/supportRequest/support.request.selectors';
import curry from 'ramda/src/curry';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import sort from 'ramda/src/sort';
import { createSelector } from 'reselect';
import { Client } from '../client.selectors';
import { SelectedProduct } from '../products/products.selectors';
import { getActivationRequest, getActivationRequestId } from './support.request.helpers';

const Base = createSelector([
  Client
], (client) => {
  return pathOr(null, ['supportRequest'], client);
});

export const IsSearchSupportLoaded = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isSearchLoaded'], base);
});

export const RecentlyCreatedRequest = createSelector([
  Base
], (base) => {
  return Boolean(base && base.recentlyCreated);
});

export const GetActivationRequestIdForProduct = createSelector([
  RequestListWithMappedProperties
], (requests) => curry(getActivationRequestId)(requests));

export const GetActivationRequestForProduct = createSelector([
  RequestListWithMappedProperties
], (requests) => curry(getActivationRequest)(requests));

export const ActivationRequestIdForOpenSelectedProduct = createSelector([
  RequestListWithMappedProperties,
  SelectedProduct
], (requests, selectedProduct) => {
  return getActivationRequestId(requests, selectedProduct, SUPPORT_REQUEST_STATUS.OPEN);
});

export const ActivationRequestIdForSelectedProduct = createSelector([
  RequestListWithMappedProperties,
  SelectedProduct
], (requests, selectedProduct) => {
  return getActivationRequestId(requests, selectedProduct, SUPPORT_REQUEST_STATUS.NEW);
});

export const ActivationRequestForSelectedProduct = createSelector([
  RequestListWithMappedProperties,
  SelectedProduct
], (requests, selectedProduct) => {
  return curry(getActivationRequest)(requests, selectedProduct);
});

const getPortItems = (requests, mobilePortId, serviceIdentifier) => {
  const sortedPortCases = sort((a, b) => a - b, requests.filter((item) => {
    return item.Category === mobilePortId;
  }));
  return sortedPortCases.filter((caseData) => caseData.AdditionalPropertyValues.find(({ Value }) => Value === serviceIdentifier));
};

export const RecentlyNewOrOpenPortInRequest = createSelector(
  RecentNewOrOpenSupportRequests,
  SelectedProduct,
  (recentNewOrOpenRequests, selectedProduct) => {
    const recentNewOrOpenPort = getPortItems(recentNewOrOpenRequests, AppConfig.MOBILE_NUMBER_PORT, selectedProduct.serviceIdentifier)[0];

    if (recentNewOrOpenPort) {
      return {
        ...recentNewOrOpenPort,
        messageCode: pathOr(null, ['Value'], recentNewOrOpenPort.customCaseDetails.find((detail) => {
          return PORT_FIELD_IDS.NAS_VALIDATION === detail.Name;
        }))
      };
    }
    return undefined;
  }
);

export const RecentlyClosedPortInRequest = createSelector(
  RequestListWithMappedProperties,
  RecentlyNewOrOpenPortInRequest,
  SelectedProduct,
  (supportList, recentNewOrOpenPort, selectedProduct) => {
    if (supportList.length) {
      const recentResolvedRequest = getPortItems(supportList, AppConfig.MOBILE_NUMBER_PORT, selectedProduct.serviceIdentifier).find((item) => {
        return item.ResolutionDate;
      });

      if ((recentResolvedRequest && !recentNewOrOpenPort) || (recentResolvedRequest && recentNewOrOpenPort && recentNewOrOpenPort.Modified < recentResolvedRequest.Modified)) {
        const responseCode = pathOr(null, ['Value'], recentResolvedRequest.customCaseDetails.find((detail) => {
          return PORT_FIELD_IDS.RESPONSE_CODE === detail.Name;
        }));
        const nasResponse = pathOr(null, ['Value'], recentResolvedRequest.customCaseDetails.find((detail) => {
          return PORT_FIELD_IDS.NAS_VALIDATION === detail.Name;
        }));
        const success = (responseCode === PORT_RESPONSE_CODE.SUCCESS) || (responseCode === PORT_RESPONSE_CODE.OTHER_SUCCESS);

        return {
          ...recentResolvedRequest,
          responseMessage: pathOr(null, ['Value'], recentResolvedRequest.customCaseDetails.find((detail) => {
            return PORT_FIELD_IDS.RESPONSE_MESSAGE === detail.Name;
          })),
          validatedDate: pathOr(recentResolvedRequest.ResolutionDate, ['Value'], recentResolvedRequest.customCaseDetails.find((detail) => {
            return PORT_FIELD_IDS.VALIDATED_DATE === detail.Name;
          })),
          messageCode: success ? nasResponse : responseCode,
          successful: success
        };
      }

      return null;
    }
    return null;
  }
);

export const PaymentFailureRequestsForSelectedProduct = createSelector([
  RecentlyNewOrOpenPaymentFailureRequests,
  SelectedProduct,
  Subscriber
], (recentNewOrOpenPayFailRequests, selectedProduct, subscriber) => {
  if (recentNewOrOpenPayFailRequests && recentNewOrOpenPayFailRequests.length) {
    const foundRequest = recentNewOrOpenPayFailRequests.find((request) => {
      const instanceIdPropertyValue = request.AdditionalPropertyValues ? request.AdditionalPropertyValues.filter((obj) => (
        obj.Id === AppConfig.OFFER_INSTANCE_ID)) : [];
      return path([0, 'Value'], instanceIdPropertyValue) === path(['offeringInstanceId'], selectedProduct);
    });
    if (foundRequest) {
      return {
        caseId: path(['Id', 'Value'], foundRequest),
        subscriberId: path(['Id'], subscriber)
      };
    }
  }
  return null;
});

export const HasPaymentFailureRequestsForSelectedProduct = createSelector(
  PaymentFailureRequestsForSelectedProduct, (paymentFailure) => Boolean(paymentFailure)
);

export const PaymentRetryRequestForSelectedProduct = createSelector([
  RequestListWithMappedProperties
], (supportList) => {
  if (supportList.length) {
    return supportList.find((request) => {
      return request.AdditionalPropertyValues ? request.AdditionalPropertyValues.filter((obj) => (
        obj.Id === AppConfig.PAYMENT_RETRY_STATUS)) : [];
    });
  }
  return null;
});

export const ProductIsInGracePeriod = createSelector([
  PaymentRetryRequestForSelectedProduct
], (paymentRetryRequest) => {
  if (paymentRetryRequest) {
    let gracePeriodAttribute;

    if (paymentRetryRequest && paymentRetryRequest.customCaseDetails && paymentRetryRequest.customCaseDetails.length) {
      gracePeriodAttribute = pathOr(null, ['Value'], paymentRetryRequest.customCaseDetails.find((detail) => {
        return FAILED_PAYMENT_ATTRIBUTE.NAMES.GracePeriodIndicator === detail.Name;
      }));
    }
    return gracePeriodAttribute === FAILED_PAYMENT_ATTRIBUTE.VALUES.Yes;
  }
});

export const PaymentRetryStatusForSelectedProduct = createSelector([
  PaymentRetryRequestForSelectedProduct
], (paymentRetryRequest) => {
  if (paymentRetryRequest) {
    const paymentRetryStatus = paymentRetryRequest.AdditionalPropertyValues ? paymentRetryRequest.AdditionalPropertyValues.filter((obj) => (
      obj.Id === AppConfig.PAYMENT_RETRY_STATUS)) : [];

    if (paymentRetryStatus && paymentRetryStatus.length) {
      return pathOr(null, [0, ['Value']], paymentRetryStatus);
    }
  }
  return '';
});

export const IsAbleToRetryPaymentForSelectedProduct = createSelector([
  PaymentRetryStatusForSelectedProduct
], (paymentRetryStatus) => {
  return (!paymentRetryStatus || (paymentRetryStatus && paymentRetryStatus === RETRY_PAYMENT_STATE.RETRY_NOT_IN_PROGRESS));
});
