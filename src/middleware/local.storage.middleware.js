import FaultCodes from '@selfcare/core/constants/api.fault.codes';
import * as LocalStorageHelper from '@selfcare/core/helpers/storage/local.storage';
import * as SessionStorageHelper from '@selfcare/core/helpers/storage/session.storage';
import { ACCOUNT_CHANGED } from '@selfcare/core/redux/account/account.action.constants';
import { ConfigurationActionTypes } from '@selfcare/core/redux/configuration/configuration.actions';
import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { FeasibilityTypes } from '@selfcare/core/redux/feasibility/feasibility.actions';
import { PaymentInstrumentTypes } from '@selfcare/core/redux/paymentInstrument/payment.instrument.actions';
import { PreferencesTypes } from '@selfcare/core/redux/preferences/preferences.actions';
import { SavedCartTypes } from '@selfcare/core/redux/savedCart/saved.cart.actions';
import { SearchInventoryTypes } from '@selfcare/core/redux/searchInventory/search.inventory.actions';
import { SearchOfferTypes } from '@selfcare/core/redux/searchOffers/search.offers.actions';
import { SessionActionTypes } from '@selfcare/core/redux/session/session.actions';
import { SettingsActionTypes } from '@selfcare/core/redux/settings/settings.actions';
import { SubscriberTypes } from '@selfcare/core/redux/subscriber/subscriber.actions';
import { CURRENT_ACCOUNT, DISPLAY_LANGUAGE, ELIGIBILITY_ADDRESS, ENVIRONMENT_HEADER, FEASIBILITY_ATTRIUTES_HEADER, MSISDN_NUMBERS, OFFER_CRUMBS, PORT_IN_FDA_HEADER, RIGHT_TO_RETURN_HEADER, SESSION_ID_HEADER, SHOULD_SHOW_COOKIE_INFO, SHOULD_SHOW_OTT_GUIDED_EXPERIENCE, SHOW_DEVICE_OFFERS, SUBSCRIBER_CURRENT_COUNTRY, SUBSCRIBER_EMAIL, SUBSCRIBER_FIRST_NAME, SUBSCRIBER_LAST_NAME, SYSTEM_ID_HEADER, THREE_DS_1_MD, THREE_DS_1_PARES, THREE_DS_1_PAYMENT_DATA, THREE_DS_1_PROCESSING, TROUBLE_SHOOTER_HISTORY } from '@selfcare/core/redux/utils/api.constants';
import path from 'ramda/src/path';
import { SiteTypes } from '../redux/site/site.actions';
import { ThreeDSTypes } from '../redux/threeDS/threeDS.actions';
import { TroubleshooterTypes } from '../redux/troubleshooter/troubleshooter.actions';

export default () => (next) => (action) => {
  const { payload, requestObject, type } = action;

  switch (type) {
  case FaultTypes.API_FAULT: {
    if (payload.Code === FaultCodes.INVALID_SYSTEM_ID) {
      LocalStorageHelper.remove(SESSION_ID_HEADER);
      LocalStorageHelper.remove(ENVIRONMENT_HEADER);
      LocalStorageHelper.remove(SYSTEM_ID_HEADER);
    }

    if (payload.Code === FaultCodes.SESSION_EXPIRED) {
      LocalStorageHelper.remove(SESSION_ID_HEADER);
    }

    if (payload.trigger === PaymentInstrumentTypes.Create3DS1PaymentInstrument.BEGIN ||
                payload.trigger === PaymentInstrumentTypes.Submit3DS1FinalRequest.BEGIN) {
      LocalStorageHelper.remove(THREE_DS_1_MD);
      LocalStorageHelper.remove(THREE_DS_1_PAYMENT_DATA);
      LocalStorageHelper.remove(THREE_DS_1_PARES);
      LocalStorageHelper.remove(THREE_DS_1_PROCESSING);
    }

    break;
  }
  case ConfigurationActionTypes.RetrieveConfiguration.SUCCESS: {
    const { defaultEnvironment, defaultLocale, defaultSystemId } = payload;

    LocalStorageHelper.writeOnce(ENVIRONMENT_HEADER, defaultEnvironment);
    LocalStorageHelper.writeOnce(DISPLAY_LANGUAGE, defaultLocale);
    LocalStorageHelper.writeOnce(SYSTEM_ID_HEADER, defaultSystemId);

    break;
  }
  case FeasibilityTypes.RETRIEVE_SUBSCRIBER_OFFERS.SUCCESS: {
    LocalStorageHelper.write(FEASIBILITY_ATTRIUTES_HEADER, requestObject);
    break;
  }
  case SearchOfferTypes.UpdateAddress: {
    if (!payload.rememberLocation) {
      LocalStorageHelper.remove(ELIGIBILITY_ADDRESS);
    } else {
      LocalStorageHelper.write(ELIGIBILITY_ADDRESS, payload.address);
    }

    break;
  }
  case ThreeDSTypes.SET_THREE_DS_1_VALUES:
    if (path(['MD'], payload)) {
      LocalStorageHelper.write(THREE_DS_1_MD, path(['MD'], payload));
    }
    if (path(['PD'], payload)) {
      LocalStorageHelper.write(THREE_DS_1_PAYMENT_DATA, path(['PD'], payload));
    }
    if (path(['PaRes'], payload)) {
      LocalStorageHelper.write(THREE_DS_1_PARES, path(['PaRes'], payload));
    }

    break;
  case ThreeDSTypes.SET_PROCESSING_3DS:
    LocalStorageHelper.write(THREE_DS_1_PROCESSING, payload);

    break;
  case ThreeDSTypes.CLEAR_THREE_DS_1_VALUES:
    LocalStorageHelper.remove(THREE_DS_1_MD);
    LocalStorageHelper.remove(THREE_DS_1_PAYMENT_DATA);
    LocalStorageHelper.remove(THREE_DS_1_PARES);
    LocalStorageHelper.remove(THREE_DS_1_PROCESSING);

    break;
  case PreferencesTypes.UpdateDisplayLanguage:
    LocalStorageHelper.write(DISPLAY_LANGUAGE, payload);

    window.location.reload(); // FIXME We should be able to remove this ugly guy eventually

    break;
  case SettingsActionTypes.PERSIST_ENVIRONMENT:
    LocalStorageHelper.remove(SESSION_ID_HEADER);
    LocalStorageHelper.write(ENVIRONMENT_HEADER, payload.environment);
    LocalStorageHelper.write(RIGHT_TO_RETURN_HEADER, payload.rightToReturnDays);
    LocalStorageHelper.write(PORT_IN_FDA_HEADER, payload.portInFDADays);
    LocalStorageHelper.write(SYSTEM_ID_HEADER, payload.systemId);
    LocalStorageHelper.write(SHOW_DEVICE_OFFERS, payload.showDeviceOffers);

    break;
  case SessionActionTypes.CREATE_SUBSCRIBER_SESSION.SUCCESS:
  case SessionActionTypes.REFRESH_SESSION.SUCCESS:
  case SessionActionTypes.CREATE_PROSPECT_SESSION:
    LocalStorageHelper.write(SESSION_ID_HEADER, payload.SessionId);
    LocalStorageHelper.write(SUBSCRIBER_CURRENT_COUNTRY, payload.Country);

    break;
  case SubscriberTypes.RetrieveSubscriber.SUCCESS:
    LocalStorageHelper.write(SUBSCRIBER_EMAIL, payload.Subscriber.Email);
    LocalStorageHelper.write(SUBSCRIBER_FIRST_NAME, payload.Subscriber.FirstName);
    LocalStorageHelper.write(SUBSCRIBER_LAST_NAME, payload.Subscriber.LastName);
    break;
  case ACCOUNT_CHANGED:
    LocalStorageHelper.write(CURRENT_ACCOUNT, payload.id);

    break;
  case SessionActionTypes.CLOSE_SUBSCRIBER_SESSION.SUCCESS:
    LocalStorageHelper.remove(SESSION_ID_HEADER);
    LocalStorageHelper.remove(CURRENT_ACCOUNT);
    SessionStorageHelper.remove(TROUBLE_SHOOTER_HISTORY);
    SessionStorageHelper.remove(MSISDN_NUMBERS);
    LocalStorageHelper.remove(SUBSCRIBER_EMAIL);
    LocalStorageHelper.remove(SUBSCRIBER_FIRST_NAME);
    LocalStorageHelper.remove(SUBSCRIBER_LAST_NAME);
    break;
  case SearchInventoryTypes.SEARCH_MSISDN_INVENTORY.SUCCESS:
    SessionStorageHelper.write(MSISDN_NUMBERS, payload.InventoryItems);
    break;
  case SearchInventoryTypes.CLEAR_MSISDN_INVENTORY:
    SessionStorageHelper.remove(MSISDN_NUMBERS);
    break;
  case SavedCartTypes.CLEAR_SAVED_CART.SUCCESS:
    SessionStorageHelper.remove(OFFER_CRUMBS);
    break;
  case TroubleshooterTypes.PushToHistory:
    SessionStorageHelper.write(TROUBLE_SHOOTER_HISTORY, payload);
    break;
  case SiteTypes.UpdateShouldShowCookieInfo:
    LocalStorageHelper.write(SHOULD_SHOW_COOKIE_INFO, payload);
    break;
  case SiteTypes.UpdateShouldShowOTTGuidedExperience:
    LocalStorageHelper.write(SHOULD_SHOW_OTT_GUIDED_EXPERIENCE, payload);
    break;
  default:
    break;
  }

  return next(action);
};
