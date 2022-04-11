import { paymentDetailsThunkHelper } from '../utils/thunk.helpers';
import { CreateAsyncFromString } from '../utils/action.creator';
import { OFFERING_INSTANCE_ID_HEADER } from '../utils/api.constants';
import { IsOfferingDataLoaded } from '../../../../redux/paymentFailure/payment.failure.selectors';

export const PaymentFailureTypes = {
  GetOfferingInstanceData: CreateAsyncFromString('GET_OFFERING_INSTANCE_DATA')
};

export const GetOfferingInstanceData = (InstanceId) => {
  if (!IsOfferingDataLoaded()) {
    return (dispatch, getState) => {
      const header = {};
      header[OFFERING_INSTANCE_ID_HEADER] = InstanceId;

      return paymentDetailsThunkHelper(dispatch, getState(), PaymentFailureTypes.GetOfferingInstanceData, {
        auth: true,
        method: 'post',
        url: 'getOfferingInstanceData',
        header: header
      }, {});
    };
  }
};

