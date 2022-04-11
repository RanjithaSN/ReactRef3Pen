import { CreateAsyncFromString } from '@selfcare/core/redux/utils/action.creator';
import { cdnSagaHelperAction } from '@selfcare/core/redux/utils/cdn.actions';
import { AWS_OBJECTS } from '../../../constants/aws.constants';

export const FaqTypes = {
  FetchFaqs: CreateAsyncFromString('FETCH_FAQS')
};

export const RetrieveFaqs = () => {
  return cdnSagaHelperAction(FaqTypes.FetchFaqs, {
    method: 'GET',
    url: AWS_OBJECTS.FAQ
  });
};
