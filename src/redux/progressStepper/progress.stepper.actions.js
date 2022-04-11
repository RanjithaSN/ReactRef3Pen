import { RetrieveSavedCart, RetrieveShoppingCartOfferings } from '@selfcare/core/redux/savedCart/saved.cart.actions';
import { SavedShoppingCart } from '@selfcare/core/redux/savedCart/saved.cart.selectors';
import { CurrentSession } from '@selfcare/core/redux/session/session.selectors';
import { getShopNavItem } from '../../navigation/sitemap.selectors';
import { QuoteHasPlay, SubmitOrderProductList } from '../checkout/checkout.selectors';
import { CreateSubscriberFormValues } from '../createSubscriber/create.subscriber.selectors';
import { ActiveOfferInstanceId } from '../orderFlow/order.flow.selectors';
import { ProspectIsAvailable } from '../orderFlow/subscriberInformation/subscriber.information.selectors';
import { Processing3DS } from '../threeDS/threeDS.selectors';
import { OrderFlowSteps } from './progress.stepper.selectors';

export const ProgressStepperTypes = {
  SET_SECTION_ID: 'SET_SECTION_ID'
};

export const SetAndValidateSection = (sectionId, push) => {
  return async (dispatch, getState) => {
    dispatch({
      type: ProgressStepperTypes.SET_SECTION_ID,
      payload: sectionId
    });

    const activeOfferId = ActiveOfferInstanceId(getState());
    const prospectIsAvailable = ProspectIsAvailable(getState());
    const subscriberFormFields = CreateSubscriberFormValues(getState());
    const checkSessionId = CurrentSession(getState());
    const orderProductList = SubmitOrderProductList(getState());
    const hasPlayOffer = QuoteHasPlay(getState());
    const currentStep = OrderFlowSteps(getState()).find((step) => (step.id === sectionId));
    const isProcessing3DS = Processing3DS(getState());

    if ((currentStep.checkActiveOffer && !(activeOfferId)) ||
            (currentStep.checkSessionId && !(checkSessionId)) ||
            (currentStep.checkProspect && prospectIsAvailable && !subscriberFormFields.Email) ||
            (currentStep.checkForOrder && !orderProductList.length && !hasPlayOffer)) {
      push(currentStep.recoverFromRefresh);
    }
    if ((currentStep.checkSessionId || currentStep.checkProspect) && !SavedShoppingCart(getState())) {
      await dispatch(RetrieveSavedCart());
      if (!SavedShoppingCart(getState()).Items && !isProcessing3DS) {
        await dispatch(RetrieveShoppingCartOfferings(getState()));
        if (!SavedShoppingCart(getState()).Items) {
          push(getShopNavItem().url);
        }
      }
    }
  };
};
