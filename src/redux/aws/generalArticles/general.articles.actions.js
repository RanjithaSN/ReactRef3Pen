import { CreateAsyncFromString } from '@selfcare/core/redux/utils/action.creator';
import { cdnSagaHelperAction } from '@selfcare/core/redux/utils/cdn.actions';
import { AWS_OBJECTS } from '../../../constants/aws.constants';

export const GeneralArticlesTypes = {
  RetrieveGeneralArticles: CreateAsyncFromString('RETRIEVE_GENERAL_ARTICLES')
};

export const RetrieveGeneralArticles = () => {
  return cdnSagaHelperAction(GeneralArticlesTypes.RetrieveGeneralArticles, {
    method: 'GET',
    url: AWS_OBJECTS.GENERAL_ARTICLES
  });
};
