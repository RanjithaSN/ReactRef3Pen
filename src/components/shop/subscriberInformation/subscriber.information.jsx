import { checkoutAnalytic } from '@selfcare/core/analytics/checkout.analytics';
import classNames from 'classnames';
import subYears from 'date-fns/sub_years';
import { SUBMIT_ATTEMPTED } from '../../../helpers/validation.helpers';
import LocaleKeys from '../../../locales/keys';
import { getCheckoutNavItem } from '../../../navigation/sitemap.selectors';
import { SECTION_IDS } from '../../../redux/progressStepper/progress.stepper.constants';
import InvalidStudentSSNModal from '../../invalidStudentSSNModal/invalid.student.ssn.modal';
import PageContent, { Main } from '../../pageContent/page.content';
import SubscriberForm from '../subscriber/subscriber.form.contextual';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import isEmpty from 'ramda/src/isEmpty';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import { AppContext } from 'selfcare-ui/src/components/appContext/app.context';
import LinkButton from 'selfcare-ui/src/components/button/link.button';
import Heading from 'selfcare-ui/src/components/heading/heading';
import IconButton from 'selfcare-ui/src/components/iconButton/icon.button';
import Input from 'selfcare-ui/src/components/input/input';
import InputField from 'selfcare-ui/src/components/inputField/input.field';
import Link from 'selfcare-ui/src/components/link/link';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Modal, { ModalButtons } from 'selfcare-ui/src/components/modal/modal';
import Notice from 'selfcare-ui/src/components/notice/notice';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import IconArrowThinRight from 'selfcare-ui/src/icons/react-icons/arrow-thin-right';
import './subscriber.information.scss';

class SubscriberInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ssn: '',
      ssnFormatError: false,
      showConfirmModal: false,
      showSsnReenter: false,
      youngError: false,
      checkoutCalled: false,
      isStudentOfferInCart: false
    };
  }

  componentDidMount() {
    if (this.props.currentSectionId !== SECTION_IDS.DETAILS) {
      this.props.setSectionId(SECTION_IDS.DETAILS, this.props.history.push);
    }

    if (!this.props.savedCartIsLoaded) {
      this.props.retrieveSavedCart();
    }
  }

  componentDidUpdate() {
    if (!isEmpty(this.props.optionsViewDataInShoppingCart)) {
      if (!this.state.checkoutCalled) {
        checkoutAnalytic(this.props.optionsViewDataInShoppingCart, 1, false);
        this.setState({
          checkoutCalled: true
        });
      }
    }
  }


    nextPage = () => {
      if (this.props.isValid) {
        this.props.history.push(getCheckoutNavItem().url);
      }
    };

    toggleConfirmModal = () => {
      this.setState((prevProps) => ({
        showConfirmModal: !prevProps.showConfirmModal
      }));
    };

    ssnEntered = (event) => {
      const fieldSSN = event.target.value;
      const SSNRegex = /^\d{0,12}/g;
      const formattedSSN = (fieldSSN.match(SSNRegex) || []).join('');
      this.setState({
        ssn: formattedSSN,
        ssnFormatError: false,
        youngError: false
      });

      // check that user is old enough
      if (formattedSSN && formattedSSN.length > 7) {
        const bodRegex = /^((19|20)?\d{2})(0?[1-9]|1[012])(0?[1-9]|[12][0-9]|3[01])$/;
        const birthdayInfo = formattedSSN.substring(0, 8).match(bodRegex);
        if (birthdayInfo && subYears(new Date(), 18) <= new Date(`${birthdayInfo[1]}/${birthdayInfo[3]}/${birthdayInfo[4]}`)) {
          this.setState({
            youngError: true
          });
          return;
        }
      }

      if (formattedSSN && formattedSSN.length === 12) {
        this.checkSSN(formattedSSN);

        this.setState({
          showSsnReenter: false
        });
      }
    };

    validateSSNLength = () => {
      if (this.state.ssn.length !== 12) {
        this.setState({
          ssnFormatError: true
        });
      }
    };

    reenterSSN = () => {
      this.setState({
        showSsnReenter: true
      });
    };

    renderSSNLookup = () => {
      const { t, apiFault, isSavedCartLoaded, prospectUpdateError, ssnLookupHasError, ssnLookupIsLoading } = this.props;
      const youngError = this.state.youngError ? t(LocaleKeys.SUBSCRIBER.SSN_LOOKUP.YOUNG_ERROR) : undefined;
      const ssnFormatError = this.state.ssnFormatError ? t(LocaleKeys.SUBSCRIBER.SSN_LOOKUP.SSN_FORMAT_ERROR) : undefined;

      return (
        <div className="c-subscriber-information__ssn-lookup c-loading-indicator-containment">
          <LoadingIndicator isLoading={ssnLookupIsLoading && !isSavedCartLoaded} />
          <Heading category="brand" tone="normal">{this.shouldShowPostLookupForm() ? t(LocaleKeys.SUBSCRIBER.SSN_LOOKUP.HEADING_POST_LOOKUP) : t(LocaleKeys.SUBSCRIBER.SSN_LOOKUP.HEADING)}</Heading>
          <Paragraph className="c-subscriber-information__ssn-lookup-description" category="minor" tone="normal">{this.shouldShowPostLookupForm() ? t(LocaleKeys.SUBSCRIBER.SSN_LOOKUP.INFORMATION_POST_LOOKUP) : t(LocaleKeys.SUBSCRIBER.SSN_LOOKUP.INFORMATION)}</Paragraph>
          {(prospectUpdateError) && (
            <div className="c-payment-information__notification">
              <Notice
                type="error"
                heading={prospectUpdateError}
              />
            </div>
          )}
          {(apiFault) && (
            <div className="c-payment-information__notification">
              <Notice
                apiFault={apiFault}
                type="error"
                heading={apiFault.translatedMessage}
              />
            </div>
          )}
          <div className="c-subscriber-information__ssn-lookup-form">
            {(!this.shouldShowPostLookupForm()) && (
              <React.Fragment>
                <InputField
                  labelText={t(LocaleKeys.SUBSCRIBER.SSN_LOOKUP.ENTER_LABEL)}
                  info={t(LocaleKeys.SUBSCRIBER.SSN_LOOKUP.SSN_FORMAT)}
                  input={(
                    <Input
                      id="ssn"
                      inputMode="numeric"
                      value={this.state.ssn}
                      onChange={this.ssnEntered}
                      onBlur={this.validateSSNLength}
                    />
                  )}
                  error={ssnLookupHasError ? t(LocaleKeys.SUBSCRIBER.SSN_LOOKUP.LABEL_ERROR) : youngError || ssnFormatError}
                  required
                  size="medium"
                />
                <Heading className="c-subscriber-information__ssn-lookup-separator" category="minor" tone="quiet">{t(LocaleKeys.SUBSCRIBER.SSN_LOOKUP.SEPARATOR)}</Heading>
                <Link onClick={this.props.openLoginModal} className="c-subscriber-information__ssn-lookup-login">
                  {t(LocaleKeys.SUBSCRIBER.SSN_LOOKUP.ALTERNATE_ACTION)}
                </Link>
              </React.Fragment>
            )}
            {this.renderVerifyDetails()}
          </div>
        </div>
      );
    };

    renderVerifyDetails = () => {
      const { name, postalCode, t } = this.props;
      return (this.shouldShowPostLookupForm() && !this.state.showSsnReenter && (
        <div className="c-subscriber-information__verify-details">
          <Heading category="major" tone="normal">
            {name}
          </Heading>
          <Heading category="minor" tone="quiet">
            {postalCode}
          </Heading>
          <div className="c-subscriber-information__reenter-button">
            <LinkButton onClick={this.reenterSSN}>{t(LocaleKeys.SUBSCRIBER.SSN_LOOKUP.REENTER)}</LinkButton>
          </div>
        </div>
      ));
    };

    bindSubscriberForm = (form) => {
      this.subscriberForm = form;
    };

    renderAdditionalInformation = () => (
      <SubscriberForm
        className="c-subscriber-information__additional-info"
        bindForm={this.bindSubscriberForm}
      />
    );

    handleSubscriberFormSubmit = (e) => {
      if (this.subscriberForm) {
        this.subscriberForm.setStatus(SUBMIT_ATTEMPTED);
        this.subscriberForm.submitForm(e);
      }
    };

    handleNext = async () => {
      if (!this.state.isStudentOfferInCart) {
        this.state.isStudentOfferInCart = this.props.savedCartItems.filter((e) => this.checkStudentOffer(e)).length > 0;
      }

      if (this.isStudentOfferAndValid() || !this.state.isStudentOfferInCart) {
        this.gotoNextPage();
      } else {
        this.setState(() => ({
          notStudentSSN: true
        }));
      }
    };

    isStudentOfferAndValid = () => {
      return this.state.isStudentOfferInCart ? this.props.isStudentValid : true;
    };

    gotoNextPage = () => {
      if (this.props.isValid) {
        this.toggleConfirmModal();
      } else if (this.state.ssn === '') {
        this.setState({
          ssnFormatError: true
        });
      } else if (!this.props.isValid) {
        this.handleSubscriberFormSubmit();
      }
    };

    resetNotStudentSSN = () => {
      this.setState(() => ({
        notStudentSSN: false
      }));
    };

    shouldShowPostLookupForm = () => {
      return this.props.ssnLookupIsLoaded && !this.state.showSsnReenter && this.isStudentOfferAndValid();
    };

    checkStudentOffer = (e) => {
      return e.OfferingId === this.props.studentMobileOfferId ||
        e.OfferingId === this.props.studentBroadbandOfferId;
    };

    checkSSN = async (formattedSSN) => {
      await this.props.lookupSSNInformation(formattedSSN);      
      const hasStudentOffer = this.props.savedCartItems.filter((e) => this.checkStudentOffer(e)).length > 0;
      this.setState(() => ({
        isStudentOfferInCart: hasStudentOffer
      }));

      if (this.state.isStudentOfferInCart) {
        const response = await this.props.studentSSNcheck(formattedSSN);
        if (response.status !== 'VALID') {
          this.setState(() => ({
            notStudentSSN: true
          }));

          return false;
        }
      }
      return true;
    };

    updateOffers = async () => {
      this.props.history.push('/');
    };

    render() {
      const { t, className, createSubscriberFormValues } = this.props;
      return (
        <PageContent>
          <InvalidStudentSSNModal isOpen={this.state.notStudentSSN} closeModal={this.resetNotStudentSSN} updateOffers={this.updateOffers} />
          <Main isShop className={classNames('c-subscriber-information', className)}>
            {this.renderSSNLookup()}
            {this.shouldShowPostLookupForm() && this.renderAdditionalInformation()}
            <div className="c-subscriber-information__spacer" />
            <IconButton
              className="c-subscriber-information__nav-button"
              orientation="reversed"
              icon={<IconArrowThinRight />}
              onClick={this.handleNext}
            >
              {this.shouldShowPostLookupForm() ? t(LocaleKeys.SUBSCRIBER.SSN_LOOKUP.CONTINUE_BUTTON_TEXT_POST_LOOKUP) : t(LocaleKeys.SUBSCRIBER.SSN_LOOKUP.CONTINUE_BUTTON_TEXT)}
            </IconButton>
          </Main>
          {this.state.showConfirmModal && this.props && (
            <Modal
              className="c-subscriber-information__confirm-modal"
              appearance="seamless"
              size="small"
              heading={t(LocaleKeys.SUBSCRIBER.CONFIRM_EMAIL_ADDRESS)}
              onClose={this.toggleConfirmModal}
              buttons={(
                <ModalButtons
                  primaryAction={this.nextPage}
                  primaryText={t(LocaleKeys.SUBSCRIBER.CONFIRM_EMAIL_ADDRESS_BUTTON)}
                  secondaryAction={this.toggleConfirmModal}
                  secondaryText={t(LocaleKeys.PROMPT.CANCEL)}
                />
              )}
              content={(
                <React.Fragment>
                  <Heading category="minor" tone="normal">{t(LocaleKeys.SUBSCRIBER.CONFIRM_EMAIL)}</Heading>
                  <Heading className="c-subscriber-information__confirm-email" category="minor" tone="normal">{createSubscriberFormValues.Email}</Heading>
                </React.Fragment>
              )}
              footerVariant="auto"
            />
          )}
        </PageContent>
      );
    }
}

SubscriberInformation.displayName = 'SubscriberInformation';
SubscriberInformation.propTypes = {
  /** An error message response kicked back from an API call */
  apiFault: PropTypes.shape({
    translatedMessage: PropTypes.string
  }),
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Form values to use in confirm email modal before proceeding */
  createSubscriberFormValues: PropTypes.shape({
    /** Email address submitted in the form */
    Email: PropTypes.string
  }),
  /** Current Section Id */
  currentSectionId: PropTypes.number.isRequired,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Bool flag if the form fields are valid */
  isValid: PropTypes.bool,
  /** Method used to update the ssn in the store */
  lookupSSNInformation: PropTypes.func.isRequired,
  /** Return true if saved cart is loaded, otherwise false */
  savedCartIsLoaded: PropTypes.bool,
  /** Returns the saved cart items */
  savedCartItems: PropTypes.arrayOf(PropTypes.shape({})),
  /** Method to check if a ssn is student */
  studentSSNcheck: PropTypes.func.isRequired,
  /* Bool if the student check is valid */
  isStudentValid: PropTypes.bool.isRequired,
  /* Get Student mobile offer id */
  studentMobileOfferId: PropTypes.string,
  /* Get Student coax offer id */
  studentBroadbandOfferId: PropTypes.string,
  /** Method to get the saved cart */
  retrieveSavedCart: PropTypes.func.isRequired,
  /** The name returned from ssn information */
  name: PropTypes.string,
  /** Action to open the login modal */
  openLoginModal: PropTypes.func.isRequired,
  /** The postal code returned from ssn information */
  postalCode: PropTypes.string,
  /** Error returned from the prospect update */
  prospectUpdateError: PropTypes.string,
  /** Saved Shopping Cart Items */
  optionsViewDataInShoppingCart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string
    })
  ),
  /** Method used to update the current section id */
  setSectionId: PropTypes.func.isRequired,
  /** Whether the api call for ssn data had an error occur */
  ssnLookupHasError: PropTypes.bool.isRequired,
  /** Whether the api call has loaded in the ssn data */
  ssnLookupIsLoaded: PropTypes.bool.isRequired,
  /** Lookup student SSN */
  /** Whether the api call is loading the ssn data */
  ssnLookupIsLoading: PropTypes.bool.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default compose(
  withI18n(),
  withRouter
)(SubscriberInformation);
SubscriberInformation.contextType = AppContext;
