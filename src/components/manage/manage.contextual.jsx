import { ClearApiFault } from '@selfcare/core/redux/fault/fault.actions';
import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { RetrieveCodes } from '@selfcare/core/redux/metadata/codes/codes.actions';
import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import { CodeItems, CodeLoaded } from '@selfcare/core/redux/metadata/codes/codes.selectors';
import { CurrentSession } from '@selfcare/core/redux/session/session.selectors';
import { UpdateCredentials, UpdateSubscriber } from '@selfcare/core/redux/subscriber/subscriber.actions';
import { Subscriber, SubscriberContactMethods, SubscriberDisplayMobilePhone, SubscriberIsLoading, SubscriberIsUpdating } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Manage from './manage';
import { RetrieveAddressesOnce } from '../../redux/address/address.actions';
import { RetrieveSubscriberOrProspect } from '../../redux/createSubscriber/create.subscriber.actions';
import { PromotionalConsentArray } from '../../redux/createSubscriber/create.subscriber.selectors';
import { ResetLoginInfoForm } from '../../redux/loginInfo/login.info.actions';
import { ResetUserInfoForm } from '../../redux/userInfo/user.info.actions';
import { SetContextPageData, ResetPageData } from '../../redux/inAccountHelp/in.accounthelp.actions';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  consentConfigurationCodeIsLoaded: CodeLoaded(CODES.ConsentConfiguration),
  consentTypeCodeIsLoaded: CodeLoaded(CODES.ConsentType),
  isSubscriberLoading: SubscriberIsLoading,
  isUpdatingSubscriber: SubscriberIsUpdating,
  languageCodeIsLoaded: CodeLoaded(CODES.Language),
  passwordRequirementCodeIsLoaded: CodeLoaded(CODES.PasswordRequirements),
  passwordRequirementCodeItems: CodeItems(CODES.PasswordRequirements),
  promoConsentArray: PromotionalConsentArray,
  sessionId: CurrentSession,
  subscriber: Subscriber,
  subscriberCommunicationPreferences: SubscriberContactMethods,
  subscriberMobilePhone: SubscriberDisplayMobilePhone,
  subscriberRequirementsLoaded: CodeLoaded(CODES.SubscriberRequirements)
});

const mapActionsToProps = {
  clearApiFault: ClearApiFault,
  fetchCodes: RetrieveCodes,
  resetUserInfoForm: ResetUserInfoForm,
  resetLoginInfoForm: ResetLoginInfoForm,
  retrieveAddressesOnce: RetrieveAddressesOnce,
  retrieveSubscriber: RetrieveSubscriberOrProspect,
  updateCredentials: UpdateCredentials,
  updateSubscriber: UpdateSubscriber,
  setContextPageData: SetContextPageData,
  resetPageData: ResetPageData
};

export default connect(mapStateToProps, mapActionsToProps)(Manage);
