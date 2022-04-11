import { CreateAsyncFromString } from '@selfcare/core/redux/utils/action.creator';
import { cdnSagaHelperAction } from '@selfcare/core/redux/utils/cdn.actions';
import { AWS_OBJECTS } from '../../../constants/aws.constants';

export const VersionTypes = {
  RetrieveVersionInformation: CreateAsyncFromString('RetrieveVersionInformation')
};

export const RetrieveVersionInformation = () => {
  return cdnSagaHelperAction(VersionTypes.RetrieveVersionInformation, {
    method: 'GET',
    url: AWS_OBJECTS.VERSION
  });
};
