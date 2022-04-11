import { CreateAsyncFromString } from '@selfcare/core/redux/utils/action.creator';
import { cdnSagaHelperAction } from '@selfcare/core/redux/utils/cdn.actions';
import { AWS_OBJECTS } from '../../../constants/aws.constants';

export const GuidesTypes = {
  RetrieveGuides: CreateAsyncFromString('RETRIEVE_GUIDES')
};

export const RetrieveGuides = () => {
  return cdnSagaHelperAction(GuidesTypes.RetrieveGuides, {
    method: 'GET',
    url: AWS_OBJECTS.GUIDES
  });
};
