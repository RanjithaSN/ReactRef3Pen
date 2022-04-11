import LOADING_STATUS from '@selfcare/core/constants/loading.status';
import subMonths from 'date-fns/sub_months';
import { ACCESSED_SUBSCRIBER_ID_HEADER } from '../../constants/subscriber';
import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';
import { AllProductsUsageLoading, ConvergentBillerAccountUsageLoading } from './convergent.biller.account.usage.details.selectors';
import AppConfig from '../../../../AppConfig';

export const ConvergentBillerAccountUsageDetailsTypes = {
  RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS: CreateAsyncFromString('RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS'),
  RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS_ALL_PRODUCTS: CreateAsyncFromString('RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS_ALL_PRODUCTS')
};

export const RetrieveConvergentBillerAccountUsageDetails = (subscriberId, serviceId, startDate, endDate, forceUpdate = false) => {
  return (dispatch, getState) => {
    const loadingObject = ConvergentBillerAccountUsageLoading(getState());
    if (forceUpdate || (loadingObject[serviceId.Value] !== LOADING_STATUS.LOADING && loadingObject[serviceId.Value] !== LOADING_STATUS.LOADED)) {
      const headers = {};
      if (subscriberId) {
        headers[ACCESSED_SUBSCRIBER_ID_HEADER] = subscriberId;
      }
      return apiThunkHelper(dispatch, getState(), ConvergentBillerAccountUsageDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS, {
        method: 'post',
        url: 'subscriber/RetrieveConvergentBillerAccountUsageDetails',
        headers
      }, {
        EndDate: endDate,
        ServiceIdentifier: serviceId,
        StartDate: startDate,
        PageSize: AppConfig.MAXIMUM_REQUEST_PAGE_SIZE
      });
    }
  };
};


const MONTHS_OF_USAGE = 4;
const DEFAULT_END_DATE = new Date();
const DEFAULT_START_DATE = subMonths(DEFAULT_END_DATE, MONTHS_OF_USAGE);
export const RetrieveConvergentBillerAccountUsageDetailsForWirelessProducts = (activeWirelessProducts, subscriberId = undefined, startDate = DEFAULT_START_DATE, endDate = DEFAULT_END_DATE) => {
  return async (dispatch, getState) => {
    if (!AllProductsUsageLoading(getState())) {
      const promises = [];
      activeWirelessProducts.forEach((product) => {
        const serviceIdentifier = {
          ServiceIdentifierName: null,
          Value: product.serviceIdentifier
        };
        promises.push(dispatch(RetrieveConvergentBillerAccountUsageDetails(subscriberId, serviceIdentifier, startDate, endDate, true)));
      });

      dispatch({
        type: ConvergentBillerAccountUsageDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS_ALL_PRODUCTS.BEGIN
      });
      await Promise.all(promises).finally(() => {
        return dispatch({
          type: ConvergentBillerAccountUsageDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_USAGE_DETAILS_ALL_PRODUCTS.SUCCESS
        });
      });
    }
  };
};
