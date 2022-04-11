import { OfferingContextIntent } from './offering.context.constants';
import { IsDbss } from '../configuration/configuration.selectors';
import { TransitioningOutcomes } from '../transitioningContext/transitioning.context.selectors';
import { call, select } from 'redux-saga/effects';
import { OrderingTypes } from './offering.context.actions';
import { apiSagaHelper } from '../utils/cdn.sagas';

function* retrieveOfferingContext({ offeringId,
  offeringInstanceId,
  options,
  actions = OrderingTypes.RETRIEVE_OFFERING_CONTEXT }) {
  const { intent, useSavedCart } = options;
  const isDbss = yield select(IsDbss);
  const transitionOutcomes = yield select(TransitioningOutcomes);

  yield call(apiSagaHelper, actions, {
    method: 'post',
    url: 'Subscriber/RetrieveOfferingContext',
    data: {
      AdditionalShoppingCartUpdate: !isDbss,
      Offerings: [{
        Action: intent,
        OfferingId: offeringId,
        OfferingInstanceId: offeringInstanceId
      }],
      TransitionOutcomes: transitionOutcomes,
      UseSavedShoppingCart: useSavedCart
    }
  }, {
    offeringInstanceId
  });
}

export function* retrieveNewOfferingContext({ offeringId,
  offeringInstanceId,
  options }) {
  yield call(retrieveOfferingContext, {
    offeringId,
    offeringInstanceId,
    options: {
      intent: OfferingContextIntent.ADD,
      ...options
    }
  });
}
