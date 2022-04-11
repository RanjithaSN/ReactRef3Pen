import { FORMAT_INTERNATIONAL_SWEDISH_MOBILE_REGEX } from '@selfcare/core/constants/subscriber';
import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import { apiFaultPropTypes } from 'selfcare-core/src/constants/api.fault.prop.types';
import { GetLoginInformationList, GetSubscriberDetailsList } from './manage.helper';
import { SUBMIT_ATTEMPTED } from '../../helpers/validation.helpers';
import LocaleKeys from '../../locales/keys';
import { getTroubleshooterNavItem, getViewArticleNavItem } from '../../navigation/sitemap.selectors';
import { TROUBLESHOOTER } from '../../redux/troubleshooter/troubleshooter.constants';
import ConsentRadioCard from '../consentRadioCard/consent.radio.card';
import { ARTICLES } from '../getHelp/post.helper';
import ChatButton from '../getHelp/troubleshooter/directHelp/chat.button';
import LoginInfoForm from '../loginInfoModal/loginInfoForm/login.info.form.contextual';
import PageContent, { Main } from '../pageContent/page.content';
import MetaData from '../pageMetaData/meta.data.handler.contextual';
import UserInfoForm from '../userInfoModal/userInfoForm/user.info.form.contextual';
import { getContextPageObject } from '../../helpers/inaccount.help.helpers';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import LinkButton from 'selfcare-ui/src/components/button/link.button';
import OutlineButton from 'selfcare-ui/src/components/button/outline.button';
import Card, { CardBody } from 'selfcare-ui/src/components/card/card';
import Container from 'selfcare-ui/src/components/container/container';
import DefinitionList from 'selfcare-ui/src/components/definitionList/definition.list';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Radio from 'selfcare-ui/src/components/radio/radio';
import RadioGroup from 'selfcare-ui/src/components/radioGroup/radio.group';
import './manage.scss';

class Manage extends React.Component {
    state = {
      isLoginInfoFormOpen: false,
      isUserInfoFormOpen: false
    };

    componentDidMount() {
      this.props.fetchCodes(CODES.ConsentConfiguration);
      this.props.fetchCodes(CODES.ContactMapping);
      this.props.fetchCodes(CODES.ConsentType);
      this.props.fetchCodes(CODES.ContactMethod);
      this.props.fetchCodes(CODES.Language);
      this.props.fetchCodes(CODES.PasswordRequirements);
      this.props.fetchCodes(CODES.SubscriberRequirements);
      this.props.retrieveAddressesOnce();
    }

    get isLoading() {
      const {
        consentConfigurationCodeIsLoaded,
        consentTypeCodeIsLoaded,
        isSubscriberLoading,
        isUpdatingSubscriber,
        languageCodeIsLoaded,
        passwordRequirementCodeIsLoaded,
        subscriberRequirementsLoaded
      } = this.props;

      return !consentConfigurationCodeIsLoaded ||
        !consentTypeCodeIsLoaded ||
        isSubscriberLoading ||
        isUpdatingSubscriber ||
        !languageCodeIsLoaded ||
        !passwordRequirementCodeIsLoaded ||
        !subscriberRequirementsLoaded;
    }

    openUserInfoForm = () => {
      this.props.setContextPageData(getContextPageObject(2, 'contactInfo'));
      this.setState({
        isUserInfoFormOpen: true
      });
    };

    closeUserInfoForm = () => {
      this.props.resetPageData(2);
      this.props.clearApiFault();
      this.setState({
        isUserInfoFormOpen: false
      });
      this.props.resetUserInfoForm();
    };


    submitUserInfo = async (values) => {
      const { apiFault, retrieveSubscriber, subscriber, updateSubscriber } = this.props;
      await updateSubscriber({
        ...subscriber,
        ...values,
        Gender: values.Gender || null,
        MobilePhone: values.MobilePhone.replace(FORMAT_INTERNATIONAL_SWEDISH_MOBILE_REGEX.pattern, FORMAT_INTERNATIONAL_SWEDISH_MOBILE_REGEX.replace)
      });

      if (!apiFault) {
        this.closeUserInfoForm();
        retrieveSubscriber();
      }
    };

    handleUserInfoFormSubmit = (e) => {
      if (this.userInfoForm) {
        this.userInfoForm.setStatus(SUBMIT_ATTEMPTED);
        this.userInfoForm.submitForm(e);
      }
    };

    bindUserInfoForm = (form) => {
      this.userInfoForm = form;
    };

    openLoginInfoForm = () => {
      this.props.setContextPageData(getContextPageObject(2, 'changePassword'));
      this.setState({
        isLoginInfoFormOpen: true
      });
    };

    closeLoginInfoForm = () => {
      this.props.resetPageData(2);
      this.props.clearApiFault();
      this.setState({
        isLoginInfoFormOpen: false
      });
      this.props.resetLoginInfoForm();
    };

    submitLoginInfo = async (values) => {
      const { retrieveSubscriber, updateCredentials, sessionId } = this.props;

      await updateCredentials(values, sessionId);

      if (!this.props.apiFault) {
        this.closeLoginInfoForm();
        retrieveSubscriber();
      }
    };

    handleLoginInfoFormSubmit = (e) => {
      if (this.loginInfoForm) {
        this.loginInfoForm.setStatus(SUBMIT_ATTEMPTED);
        this.loginInfoForm.submitForm(e);
      }
    };

    bindLoginInfoForm = (form) => {
      this.loginInfoForm = form;
    };

    handleConsentRadioClick = async (consent, value) => {
      const { subscriber, retrieveSubscriber, t, updateSubscriber } = this.props;
      const valueAsBoolean = value === t(LocaleKeys.YES);

      const subscriberConsentObj = {
        ConfigConsentId: consent.id,
        ConsentAccepted: valueAsBoolean
      };

      // if SubscriberConsents contains the current consent, remove it
      const tempSubscriberConsents = subscriber.SubscriberConsents.filter((subscriberConsent) => {
        return subscriberConsent.ConfigConsentId !== subscriberConsentObj.ConfigConsentId;
      });

      // add new consent back in
      const newSubscriberConsents = [...tempSubscriberConsents, subscriberConsentObj];

      await updateSubscriber({
        ...subscriber,
        SubscriberConsents: newSubscriberConsents
      });
      retrieveSubscriber();
    };

    handleContactPreferenceChange = async (event) => {
      const selection = event.target.value;
      const { retrieveSubscriber, subscriber, subscriberCommunicationPreferences, updateSubscriber } = this.props;
      const ContactPreferences = subscriberCommunicationPreferences.map((preference) => {
        return {
          ContactEventType: preference.eventTypeCode,
          ContactMethod: preference.Value,
          OptIn: preference.Value === selection
        };
      });

      await updateSubscriber({
        ...subscriber,
        ContactPreferences: ContactPreferences.filter((preference) => {
          return preference.OptIn;
        })
      });
      retrieveSubscriber();
    };

    renderUserInformationForm = () => {
      const { t } = this.props;
      return (
        <React.Fragment>
          <UserInfoForm
            bindForm={this.bindUserInfoForm}
            onSubmit={this.submitUserInfo}
            submitButtonText={t(LocaleKeys.SUBMIT)}
          />
          <div className="c-manage__form-button-wrapper">
            <OutlineButton
              className="c-manage__user-information-form__button c-button-double"
              onClick={this.closeUserInfoForm}
            >
              {t(LocaleKeys.CANCEL)}
            </OutlineButton>
            <FilledButton
              className="c-manage__user-information-form__button c-button-double"
              onClick={this.handleUserInfoFormSubmit}
            >
              {t(LocaleKeys.SUBMIT)}
            </FilledButton>
          </div>
        </React.Fragment>
      );
    };

    renderUserInformation = () => {
      const { subscriber, subscriberMobilePhone, t } = this.props;
      const { isUserInfoFormOpen, isLoginInfoFormOpen } = this.state;
      return (
        <Card appearance="seamless">
          <CardBody className="c-manage__card-body">
            <Container className="c-manage__card-container">
              <Heading category="major" tone="normal" className="c-manage__card-header">{t(LocaleKeys.MANAGE.USER_INFORMATION)}</Heading>
              {!isUserInfoFormOpen && <DefinitionList stacked flush list={GetSubscriberDetailsList(subscriber, subscriberMobilePhone)} />}
              {isUserInfoFormOpen && this.renderUserInformationForm()}
              {!(isUserInfoFormOpen || isLoginInfoFormOpen) && <FilledButton className="c-manage__edit-button" tone="minor" onClick={this.openUserInfoForm}>{t(LocaleKeys.EDIT)}</FilledButton>}
            </Container>
          </CardBody>
        </Card>
      );
    };

    renderLoginInformationForm = () => {
      const { t, passwordRequirementCodeItems } = this.props;
      let passwordRequirements = passwordRequirementCodeItems.map((item) => item.Description);

      // Remove this line and make passwordRequirements a const once we get real data
      passwordRequirements = undefined;
      return (
        <React.Fragment>
          <LoginInfoForm
            bindForm={this.bindLoginInfoForm}
            onSubmit={this.submitLoginInfo}
            submitButtonText={t(LocaleKeys.SUBMIT)}
            passwordRequirements={passwordRequirements}
          />

          <div className="c-manage__form-button-wrapper">
            <OutlineButton
              className="c-manage__login-information-form__button c-button-double"
              onClick={this.closeLoginInfoForm}
            >
              {t(LocaleKeys.CANCEL)}
            </OutlineButton>
            <FilledButton
              className="c-manage__login-information-form__button c-button-double"
              onClick={this.handleLoginInfoFormSubmit}
            >
              {t(LocaleKeys.SUBMIT)}
            </FilledButton>
          </div>
        </React.Fragment>
      );
    };

    renderLoginInformation = () => {
      const { subscriber, t } = this.props;
      const { isLoginInfoFormOpen, isUserInfoFormOpen } = this.state;
      return (
        <Card appearance="seamless">
          <CardBody className="c-manage__card-body">
            <Container className="c-manage__card-container">
              <Heading category="major" tone="normal" className="c-manage__card-header">{t(LocaleKeys.MANAGE.LOGIN_INFORMATION)}</Heading>
              {!isLoginInfoFormOpen && <DefinitionList stacked flush list={GetLoginInformationList(subscriber)} />}
              {isLoginInfoFormOpen && this.renderLoginInformationForm()}
              {!(isLoginInfoFormOpen || isUserInfoFormOpen) && <FilledButton className="c-manage__edit-button" tone="normal" onClick={this.openLoginInfoForm}>{t(LocaleKeys.EDIT)}</FilledButton>}
            </Container>
          </CardBody>
        </Card>
      );
    };

    renderConsentInformation = () => {
      const { history, promoConsentArray, t } = this.props;
      return (
        <Card appearance="seamless">
          <CardBody className="c-manage__card-body">
            <Container className="c-manage__card-container c-manage__consent-heading">
              <Heading className="c-manage__consent-heading-main" category="major" tone="normal">{t(LocaleKeys.MANAGE.PRIVACY_SETTINGS)}</Heading>
              <Heading category="minor" tone="normal">{t(LocaleKeys.MANAGE.PRIVACY_SETTINGS_DESCRIPTION)}</Heading>
              <LinkButton
                className="c-manage__consent-heading-link"
                onClick={() => history.push(`${getViewArticleNavItem().url}/${ARTICLES.PRIVACY_POLICY}`)}
              >
                {t(LocaleKeys.MANAGE.PRIVACY_SETTINGS_MORE_INFO)}
              </LinkButton>
              <LinkButton
                className="c-manage__request-data-link"
                onClick={() => history.push(`${getTroubleshooterNavItem().url}/${TROUBLESHOOTER.REQUEST_MY_DATA}`)}
              >
                {t(LocaleKeys.MANAGE.REQUEST_MY_DATA)}
              </LinkButton>
            </Container>
            {Boolean(promoConsentArray.length) && promoConsentArray.map((consent) => {
              return (
                <ConsentRadioCard key={consent.type} consent={consent} onClick={this.handleConsentRadioClick} />
              );
            })}
          </CardBody>
        </Card>
      );
    };

    renderCommunicationPreference = () => {
      const { subscriberCommunicationPreferences, t } = this.props;
      return (
        <Card appearance="seamless">
          <CardBody className="c-manage__card-body">
            <Container className="c-manage__card-container c-manage__contact-preferences">
              <Heading className="c-manage__contact-preferences-main" category="major" tone="normal">{t(LocaleKeys.MANAGE.COMMUNICATION_SETTINGS)}</Heading>
              <Heading className="c-manage__contact-preferences-sub" category="major" tone="quiet">{t(LocaleKeys.MANAGE.PREFERRED_CONTACT_METHOD)}</Heading>
              <RadioGroup
                className="c-manage__contact-preferences-radio-group"
                name="grouped"
                onChange={this.handleContactPreferenceChange}
              >
                {subscriberCommunicationPreferences.map((preference) => {
                  return (
                    <Radio
                      className="c-manage__contact-preferences-radio-group-radio"
                      key={preference.Value}
                      id={preference.Name}
                      value={preference.Value}
                      checked={preference.optIn}
                    >
                      {preference.Name}
                    </Radio>
                  );
                })}
              </RadioGroup>
            </Container>
          </CardBody>
        </Card>
      );
    };

    renderRemoveAccountButton = () => {
      const { history, t } = this.props;
      return (
        <div className="c-manage__remove-account">
          <FilledButton className="c-manage__remove-account-button" onClick={() => history.push(`${getTroubleshooterNavItem().url}/${TROUBLESHOOTER.RIGHT_TO_BE_FORGOTTEN}`)}>{t(LocaleKeys.MANAGE.REMOVE_ACCOUNT)}</FilledButton>
          <ChatButton />
        </div>
      );
    };

    render() {
      const { className, t } = this.props;

      return (
        <PageContent className={classNames('c-manage', className)}>
          <MetaData title={t(LocaleKeys.META_DATA.MANAGE.TITLE)} description={t(LocaleKeys.META_DATA.MANAGE.DESCRIPTION)} />
          <Main>
            <LoadingIndicator isLoading={this.isLoading} />
            <Heading category="brand" tone="normal">{t(LocaleKeys.META_DATA.MANAGE.TITLE)}</Heading>
            {this.renderUserInformation()}
            {this.renderLoginInformation()}
            {this.renderConsentInformation()}
            {this.renderCommunicationPreference()}
            {this.renderRemoveAccountButton()}
          </Main>
        </PageContent>
      );
    }
}

Manage.displayName = 'Manage';
Manage.propTypes = {
  /** An error message response kicked back from an API call */
  apiFault: apiFaultPropTypes,
  /** Verifies Consent Configuration code data is loaded */
  consentConfigurationCodeIsLoaded: PropTypes.bool.isRequired,
  /** Verifies Consent Type code data is loaded */
  consentTypeCodeIsLoaded: PropTypes.bool.isRequired,
  /** Used to pass a custom class name to the component */
  className: PropTypes.string,
  /** Allows clearing of Api fault used in modal forms */
  clearApiFault: PropTypes.func.isRequired,
  /** Allows the component to retrieve codes */
  fetchCodes: PropTypes.func.isRequired,
  /** Indicates if the subscriber is currently updating */
  isUpdatingSubscriber: PropTypes.bool.isRequired,
  /** Indicates if the subscriber is currently loading */
  isSubscriberLoading: PropTypes.bool.isRequired,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Verifies Language code data is loaded */
  languageCodeIsLoaded: PropTypes.bool,
  /** Verifies Password Requirement code data is loaded */
  passwordRequirementCodeIsLoaded: PropTypes.bool,
  /** The array of password requirements */
  passwordRequirementCodeItems: PropTypes.arrayOf(PropTypes.object),
  /** Array of consent items to display */
  promoConsentArray: PropTypes.arrayOf(PropTypes.shape({
    /** Consent id from SubscriberConsents */
    configConsentId: PropTypes.number,
    /** Whether the user has accepted the consent */
    consentAccepted: PropTypes.bool,
    /** Description to display for the consent */
    description: PropTypes.string,
    /** Label to display for the consent */
    label: PropTypes.string,
    /** The type of consent config */
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })),
  /** Resets the userInfo formValues */
  resetUserInfoForm: PropTypes.func.isRequired,
  /** Resets the loginInfo formValues */
  resetLoginInfoForm: PropTypes.func.isRequired,
  /** Allows the component to retrieve subscriber addresses */
  retrieveAddressesOnce: PropTypes.func.isRequired,
  /** Allows the component to fetch the subscriber */
  retrieveSubscriber: PropTypes.func.isRequired,
  /** The current session ID */
  sessionId: PropTypes.string,
  /** Contains the subscribers available user information */
  subscriber: PropTypes.shape({
    FirstName: PropTypes.string,
    LastName: PropTypes.string,
    BirthDate: PropTypes.string,
    Gender: PropTypes.number,
    SubscriberConsents: PropTypes.arrayOf(PropTypes.object)
  }),
  /** List of the subscribers communication preferences */
  subscriberCommunicationPreferences: PropTypes.arrayOf(PropTypes.shape({
    /** Communication Type Name */
    Name: PropTypes.string,
    /** Users Opt in status */
    OptIn: PropTypes.bool,
    /** Contact Method Value */
    Value: PropTypes.string,
    /** Contact Event Type code */
    eventTypeCode: PropTypes.string
  })),
  /** Display local swedish format for mobile phone */
  subscriberMobilePhone: PropTypes.string,
  /** Indicates if subscriber requirements are loaded into code table */
  subscriberRequirementsLoaded: PropTypes.bool,
  /** Action to update the login information in login.info.form */
  updateCredentials: PropTypes.func.isRequired,
  /** Action to update the subscriber information in user.info.form */
  updateSubscriber: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by-i18next */
  t: PropTypes.func.isRequired,
  /** Action to change context ui page data for in account help */
  setContextPageData: PropTypes.func.isRequired,
  /** Action to reset given page number data in in account help */
  resetPageData: PropTypes.func.isRequired
};
Manage.defaultProps = {};

export default compose(
  withI18n(),
  withRouter
)(Manage);
