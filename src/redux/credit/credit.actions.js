import { CreateAsyncFromString } from '@selfcare/core/redux/utils/action.creator';
import { apiThunkHelper } from '@selfcare/core/redux/utils/thunk.helpers';

export const CreditTypes = {
  UPDATE_CREDIT_CLASSIFICATION: CreateAsyncFromString('UPDATE_CREDIT_CLASSIFICATION')
};

export const UpdateCreditClassification = (customer) => (
  (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), CreditTypes.UPDATE_CREDIT_CLASSIFICATION, {
      method: 'post',
      url: 'Subscriber/UpdateCreditClassification',
      data: customer
    });
  }
);
