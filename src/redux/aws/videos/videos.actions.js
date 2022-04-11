import { CreateAsyncFromString } from '@selfcare/core/redux/utils/action.creator';
import { cdnSagaHelperAction } from '@selfcare/core/redux/utils/cdn.actions';
import { AWS_OBJECTS } from '../../../constants/aws.constants';

export const VideosTypes = {
  RetrieveVideos: CreateAsyncFromString('RETRIEVE_VIDEOS')
};

export const RetrieveVideos = () => {
  return cdnSagaHelperAction(VideosTypes.RetrieveVideos, {
    method: 'GET',
    url: AWS_OBJECTS.VIDEOS
  });
};
