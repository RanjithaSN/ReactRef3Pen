import { FORMAT_INTERNATIONAL_SWEDISH_MOBILE_REGEX } from '@selfcare/core/constants/subscriber';
import LocaleKeys from '@selfcare/core/locales/keys';
import { RemoveAddress, RetrieveAddresses } from '@selfcare/core/redux/address/address.actions';
import { SubscriberAddresses } from '@selfcare/core/redux/address/address.selectors';
import { GeneratePassword } from '@selfcare/core/redux/passwordManagement/password.management.actions';
import { SaveOfferingCart } from '@selfcare/core/redux/savedCart/saved.cart.actions';
import { SavedShoppingCart } from '@selfcare/core/redux/savedCart/saved.cart.selectors';
import { UpdateProspectSession } from '@selfcare/core/redux/session/session.actions';
import { UpdateSelectedDistributionChannel } from '@selfcare/core/redux/settings/settings.actions';
import { SelectedDistributionChannel } from '@selfcare/core/redux/settings/settings.selectors';
import { RetrieveSubscriber } from '@selfcare/core/redux/subscriber/subscriber.actions';
import { buildCustomerRequestObject } from '@selfcare/core/redux/subscriber/subscriber.helper';
import { ShouldCaptureEmailAsLogin } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import { UpdateSubscriberWithSSNDetails } from '@selfcare/core/redux/subscriberInformation/subscriber.information.actions';
import { SsnLookup } from '@selfcare/core/redux/subscriberInformation/subscriber.information.selectors';
import { CreateAsyncFromString } from '@selfcare/core/redux/utils/action.creator';
import { apiThunkHelper } from '@selfcare/core/redux/utils/thunk.helpers';
import pathOr from 'ramda/src/pathOr';
import uuidv4 from 'uuid/v4';
import i18next from 'i18next';
import { RetrieveAddressesOnce } from '../../address/address.actions';
import { CreateSubscriberFormValues } from '../../createSubscriber/create.subscriber.selectors';
import { UpdateCreditClassification } from '../../credit/credit.actions';
import { CREDIT_CHECK_METHOD } from '../../credit/credit.constants';
import { ProspectData } from './subscriber.information.selectors';

export const SubscriberInformationActions = {
  CLEAR_PROSPECT: 'CLEAR_PROSPECT',
  CREATE_PROSPECT: CreateAsyncFromString('CREATE_PROSPECT'),
  UPDATE_PROSPECT_ERROR: 'UPDATE_PROSPECT_ERROR'
};

const PENNY_EMAIL = '@PENNY.TEST';
const PENNY_ADDRESS = {
  Name: 'Tele2 Sverige AV',
  LineOne: 'Tele2 Sverige AV',
  City: 'Stockholm',
  State: 'SE-AB',
  PostalCode: '10666',
  Country: 'SWE'
};

const CreateProspectCustomer = () => {
  return async (dispatch, getState) => {
    const store = getState();
    const prospectCustomer = uuidv4().toString();

    return apiThunkHelper(dispatch, store, SubscriberInformationActions.CREATE_PROSPECT, {
      method: 'post',
      url: 'Subscriber/CreateSubscriber',
      data: buildCustomerRequestObject({
        Email: `${prospectCustomer}${PENNY_EMAIL}`,
        Login: `${prospectCustomer}${PENNY_EMAIL}`,
        FirstName: prospectCustomer,
        LastName: prospectCustomer,
        AdditionalProperties: [{
          Values: [prospectCustomer]
        }],
        ...PENNY_ADDRESS
      }, ShouldCaptureEmailAsLogin(store))
    });
  };
};

export const CreateProspect = () => {
  return async (dispatch) => {
    const data = await dispatch(CreateProspectCustomer());

    return dispatch(UpdateProspectSession(data.SessionId));
  };
};

export const ClearProspect = () => ({
  type: SubscriberInformationActions.CLEAR_PROSPECT
});

const DEFAULT_SUBSCRIBER_ERROR_CODE = '4';
export const UpdateProspectSubscriber = () => {
  return async (dispatch, getState) => {
    const currentDistributionChannelId = SelectedDistributionChannel(getState());
    const prospect = ProspectData(getState());
    const subscriberFormFields = CreateSubscriberFormValues(getState());
    const person = SsnLookup(getState());
    const login = ShouldCaptureEmailAsLogin(getState()) ? subscriberFormFields.Email : subscriberFormFields.Login;
    const consents = subscriberFormFields.SubscriberConsents.map((consent) => ({
      ...consent,
      ConfigConsentId: parseInt(consent.ConfigConsentId, 10)
    }));
    const subscriberUpdate = await dispatch(UpdateSubscriberWithSSNDetails({
      pnr: person.pnr,
      email: subscriberFormFields.Email,
      login,
      MobilePhone: subscriberFormFields.MobilePhone.replace(FORMAT_INTERNATIONAL_SWEDISH_MOBILE_REGEX.pattern, FORMAT_INTERNATIONAL_SWEDISH_MOBILE_REGEX.replace),
      SubscriberConsents: consents
    }, prospect.Subscriber.Id));

    if (subscriberUpdate.errorMessage || !subscriberUpdate.CustomerId) {
      let errorObj = {};
      try {
        errorObj = JSON.parse(subscriberUpdate.errorMessage);
        // eslint-disable-next-line no-empty
      } catch (e) {
      }
      const errorCode = pathOr(DEFAULT_SUBSCRIBER_ERROR_CODE, ['ErrorType', 'Code'], errorObj);

      await dispatch({
        type: SubscriberInformationActions.UPDATE_PROSPECT_ERROR,
        payload: i18next.t(`${LocaleKeys.FAULT_PREFIX}${errorCode}`)
      });
      return true;
    }

    let address = pathOr([], ['Addresses'], prospect).find(({ Name }) => Name === PENNY_ADDRESS.Name);
    if (!address) {
      await dispatch(RetrieveAddressesOnce());
      address = SubscriberAddresses(getState()).find(({ Name }) => Name === PENNY_ADDRESS.Name);
    }
    if (address) {
      await dispatch(RemoveAddress(address.Id));
      await dispatch(RetrieveAddresses());
    }
    await dispatch(RetrieveSubscriber());

    dispatch(UpdateCreditClassification({
      CreditCheckMethod: CREDIT_CHECK_METHOD.RUN_CREDIT_CHECK,
      UpdateSubscriber: false
    }));
    await dispatch(ClearProspect());
    await dispatch(UpdateSelectedDistributionChannel(currentDistributionChannelId));

    return false;
  };
};

export const SwitchToSubscriberCart = () => {
  return async (dispatch, getState) => {
    const newCart = SavedShoppingCart(getState()).asMutable({
      deep: true
    });
    delete newCart.Id;
    newCart.Items.map((item) => {
      const updateItem = item;
      delete updateItem.Id;
      return updateItem;
    });
    await dispatch(SaveOfferingCart(newCart));
  };
};
