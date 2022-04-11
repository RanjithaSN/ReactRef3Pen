import { OfferingContextIntent } from '../offeringContext/offering.context.constants';
import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';

export const TransitioningContextTypes = {
  RETRIEVE_TRANSITIONING_CONTEXT: CreateAsyncFromString('RETRIEVE_TRANSITIONING_CONTEXT')
};

export const RetrieveTransitioningContext = (
  offeringId,
  options,
  actions = TransitioningContextTypes.RETRIEVE_TRANSITIONING_CONTEXT
) => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), actions, {
      method: 'post',
      url: 'Subscriber/RetrieveTransitionContext',
      data: {
        ExistingOfferingId: options.existingOffer.offeringId,
        ExistingOfferingInstanceId: options.existingOffer.offeringInstanceId,
        Offerings: [{
          Action: options.intent,
          OfferingId: offeringId
        }]
      }
    });
  };
};

export const RetrieveTransitioningRequestContext = (
  offeringId,
  options
) => (
  (dispatch) => (
    dispatch(RetrieveTransitioningContext(offeringId, {
      intent: OfferingContextIntent.TRANSITION_REQUEST,
      existingOffer: options.existingOffer
    }))
  )
);
