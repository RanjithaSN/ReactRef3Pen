import { CreateAsyncFromString } from '@selfcare/core/redux/utils/action.creator';
import { cdnSagaHelperAction } from '@selfcare/core/redux/utils/cdn.actions';
import { AWS_OBJECTS } from '../../../constants/aws.constants';

export const CategoriesTypes = {
  RetrieveCategories: CreateAsyncFromString('RETRIEVE_CATEGORIES')
};

export const RetrieveCategories = () => {
  return cdnSagaHelperAction(CategoriesTypes.RetrieveCategories, {
    method: 'GET',
    url: AWS_OBJECTS.CATEGORIES
  });
};
