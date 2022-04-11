import AppConfig from 'AppConfig';
import {
  FORMAT_INTERNATIONAL_SWEDISH_MOBILE_REGEX,
  FORMAT_LOCAL_SWEDISH_MOBILE_REGEX
} from '@selfcare/core/constants/subscriber';
import { addBusinessDays, subtractBusinessDays, today } from '@selfcare/core/helpers/date.helper';
import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import { OFFERING_STATUS } from '@selfcare/core/redux/subscriberOfferings/subscriber.offering.constants';
import { SUPPORT_REQUEST } from '@selfcare/core/redux/supportRequest/support.request.constants';
/* eslint-disable import/no-duplicates */
import format from 'date-fns/format';
import isBefore from 'date-fns/is_before';
import addDays from 'date-fns/add_days';
import differenceInDays from 'date-fns/difference_in_days';
/* eslint-enable import/no-duplicates */
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import isEmpty from 'ramda/src/isEmpty';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import React, { useEffect, useState } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import OutlineButton from 'selfcare-ui/src/components/button/outline.button';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Input from 'selfcare-ui/src/components/input/input';
import InputField from 'selfcare-ui/src/components/inputField/input.field';
import Link from 'selfcare-ui/src/components/link/link';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Notice from 'selfcare-ui/src/components/notice/notice';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import { DECISION_TYPE } from '../../../../constants/order.constants';
import LocaleKeys from '../../../../locales/keys';
import DatePicker from '../../../datePicker/date.picker';
import PageContent from '../../../pageContent/page.content';
import { SetupApiDataFromForm } from '../../../supportRequest/support.request.helpers';
import { getContextPageObject } from '../../../../helpers/inaccount.help.helpers';
import { navigateToProducts } from '../manage.product.helper';
import '../manage.product.scss';
import { PortInConstants, PORTIN_VALUES } from './port.in.constants';

const PortIn = ({ cancelPortInRequest, createSupportRequest, searchSupportRequest, history, isHandlingProductAction, isPortInNumberInvalid,
  portInNumberAdditionalPropertyValueId, portInCurrentMSISDNField, portInDateField, portInIsLoading, portInNumber, portInPortToMSISDNField, portInSsn, productIdentifier,
  recentlyClosedPortInRequest, recentlyNewOrOpenPortInRequest, retrieveCodes, retrieveProductMetadata, selectedProduct,
  subscriberSSN, t, updateAttributeValue, updateCustomPortInNumber, updatePortInRequest,
  validatedPortInDateField, offeringContextsByInstanceId, activeOfferInstanceId, validatePortInDate, setContextPageData }) => {
  const [currentPortInFlow, setCurrentPortInFlow] = useState(null);
  const [portInNumberValue, setPortInNumberValue] = useState(portInNumber.value || '');
  const [portInNumberClosed, setPortInNumberValueClosed] = useState('');
  const [portInDateFromCase, setPortInDateFromCase] = useState(addBusinessDays(today(), PORTIN_VALUES.DEFAULT));
  const [portInDate, setPortInDate] = useState(addBusinessDays(today(), PORTIN_VALUES.DEFAULT));
  const [initialPortInUpdateDate, setInitialPortInUpdateDate] = useState(addBusinessDays(today(), PORTIN_VALUES.DEFAULT));
  const [portInWasUpdated, setPortInWasUpdated] = useState(false);
  const [isPortInDisabled, setIsPortInDisabled] = useState(false);

  const hasOpenPortInRequest = recentlyNewOrOpenPortInRequest && !recentlyClosedPortInRequest;
  const mobileNumberPortType = AppConfig.MOBILE_NUMBER_PORT;

  useEffect(() => {
    if (productIdentifier && !isEmpty(offeringContextsByInstanceId) && !isEmpty(offeringContextsByInstanceId[activeOfferInstanceId])) {
      retrieveProductMetadata(productIdentifier);
    }
  }, [productIdentifier, retrieveProductMetadata, offeringContextsByInstanceId, activeOfferInstanceId]);

  useEffect(() => {
    setContextPageData(getContextPageObject(3, 'portin'));
  }, [setContextPageData]);

  useEffect(() => {
    retrieveCodes(CODES.Regex);
    retrieveCodes(CODES.FormControlType);
  }, [retrieveCodes]);

  useEffect(() => {
    const isPortInWithinOneBusinessDay = !isBefore(addBusinessDays(today(), 1), portInDate);
    const portInDisabled = selectedProduct.status === OFFERING_STATUS.PENDING_ACTIVE || isPortInWithinOneBusinessDay;
    setIsPortInDisabled(portInDisabled);
  }, [portInDate, selectedProduct.status]);

  useEffect(() => {
    const foundValidatedPortInDateField = pathOr([], ['AdditionalPropertyValues'], recentlyNewOrOpenPortInRequest).filter((obj) => (
      obj.Id === validatedPortInDateField.id));
    const foundValidatedPortInDate = foundValidatedPortInDateField[0] ? foundValidatedPortInDateField[0].Value : '';

    const portInNumberFieldClosed = pathOr([], ['AdditionalPropertyValues'], recentlyClosedPortInRequest).filter((obj) => (
      obj.Id === portInNumberAdditionalPropertyValueId));
    const portInNumberClosed = portInNumberFieldClosed[0] ? portInNumberFieldClosed[0].Value : '';

    portInNumberClosed && setPortInNumberValue('');
    setPortInNumberValueClosed(portInNumberClosed);

    if (hasOpenPortInRequest && foundValidatedPortInDate === '12/30/9999') {
      setCurrentPortInFlow(PortInConstants.PORT_IN_CANCEL_PENDING);
    } else if (hasOpenPortInRequest) {
      setCurrentPortInFlow(PortInConstants.PORT_IN_RESPONSE);

      const foundPortInNumberField = recentlyNewOrOpenPortInRequest.AdditionalPropertyValues.filter((obj) => (
        obj.Id === portInPortToMSISDNField.id));
      const foundPortInDateField = recentlyNewOrOpenPortInRequest.AdditionalPropertyValues.filter((obj) => (
        obj.Id === portInDateField.id));
      const foundPortInDateFieldUpdate = recentlyNewOrOpenPortInRequest.AdditionalPropertyValues.filter((obj) => (
        obj.Id === AppConfig.PORT_IN_DATE_ATTRIBUTE_ID.toString()));

      const foundPortInNumberValue = foundPortInNumberField[0] ? foundPortInNumberField[0].Value : '';
      const foundPortInDateValue = foundPortInDateField[0] ? foundPortInDateField[0].Value : '';
      const foundPortInDateValueUpdate = foundPortInDateFieldUpdate[0] ? foundPortInDateFieldUpdate[0].Value : '';

      setPortInNumberValue(foundPortInNumberValue.replace(FORMAT_LOCAL_SWEDISH_MOBILE_REGEX.pattern, FORMAT_LOCAL_SWEDISH_MOBILE_REGEX.replace),);
      setPortInDateFromCase(foundPortInDateValue);

      const endDatepickerDate = addDays(new Date(today()), PORTIN_VALUES.MAX + PORTIN_VALUES.MIN);
      const daysToAdd = differenceInDays(endDatepickerDate, addBusinessDays(foundPortInDateValueUpdate, 1)) > 0 ? 1 : -1;

      setInitialPortInUpdateDate(addBusinessDays(foundPortInDateValueUpdate, daysToAdd));
      setPortInDate(foundPortInDateValue);
    } else {
      setCurrentPortInFlow(PortInConstants.ENTER_NUMBER);
    }
  }, [hasOpenPortInRequest, portInDateField.id, portInPortToMSISDNField.id, recentlyNewOrOpenPortInRequest, recentlyClosedPortInRequest, validatedPortInDateField.id, portInNumberAdditionalPropertyValueId]);

  const handleUpdatePortInNumber = (event) => {
    const { target: { value } } = event;

    portInNumberClosed ?
      setPortInNumberValueClosed(value):
      setPortInNumberValue(value);

    updateCustomPortInNumber(value);
  };

  const handleValidatePortInNumber = (event) => {
    updateCustomPortInNumber(event.target.value);
  };

  const submitPortIn = async () => {
    const portinNumberToSend = portInNumberClosed || portInNumberValue;
    updateAttributeValue(DECISION_TYPE.QUANTITY, portInNumber.optionId, portInNumber.id, portInNumberValue, true, portInNumber.displayOrder);
    const values = {
      [SUPPORT_REQUEST.DESCRIPTION]: selectedProduct.offeringInstanceId,
      [portInCurrentMSISDNField.id]: selectedProduct.serviceIdentifier,
      [portInPortToMSISDNField.id]: portinNumberToSend.replace(FORMAT_INTERNATIONAL_SWEDISH_MOBILE_REGEX.pattern, FORMAT_INTERNATIONAL_SWEDISH_MOBILE_REGEX.replace),
      [portInSsn.id]: subscriberSSN,
      [portInDateField.id]: format(portInDate, 'YYYY-MM-DD')
    };
    const productInventoryItem = path(['inventoryItem', 'Id'], selectedProduct);
    if (productInventoryItem) {
      values[SUPPORT_REQUEST.INVENTORY_ITEM] = productInventoryItem;
    }
    const portInRequestData = SetupApiDataFromForm(values, mobileNumberPortType, mobileNumberPortType);
    await createSupportRequest(portInRequestData);
    setCurrentPortInFlow(PortInConstants.PORT_IN_RESPONSE);
  };

  const cancelPortIn = async () => {
    await cancelPortInRequest(recentlyNewOrOpenPortInRequest.Id.Value, selectedProduct.offeringInstanceId);
    setCurrentPortInFlow(PortInConstants.PORT_IN_CANCEL_PENDING);
  };

  const updatePortIn = async () => {
    await updateAttributeValue(DECISION_TYPE.QUANTITY, portInNumber.optionId, portInNumber.id, portInNumberValue, true, portInNumber.displayOrder);
    await updatePortInRequest(recentlyNewOrOpenPortInRequest.Id.Value, selectedProduct.offeringInstanceId, portInDate);
    setPortInDateFromCase(format(portInDate, 'YYYY-MM-DD'));
    setPortInWasUpdated(true);
    setCurrentPortInFlow(PortInConstants.PORT_IN_RESPONSE);
  };

  useEffect(() => {
    searchSupportRequest();
  }, [searchSupportRequest]);

  const setupViewFromFlow = () => {
    switch (currentPortInFlow) {
    case PortInConstants.ENTER_NUMBER:
      return {
        heading: t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER),
        content: (
          <>
            {(recentlyClosedPortInRequest && !recentlyClosedPortInRequest.successful) && (
              <Notice
                className="c-manage-product__notice"
                type="error"
                heading={
                  t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER_RESPONSE_HEADER, {
                    portFrom: portInNumberClosed || portInNumberValue
                  })
                }
              >
                <Paragraph>
                  {t(`${LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER_RESPONSE_PREFIX}${recentlyClosedPortInRequest.messageCode}`)}
                </Paragraph>
              </Notice>
            )}
            {(recentlyClosedPortInRequest && recentlyClosedPortInRequest.successful && (recentlyClosedPortInRequest.responseMessage !== 'CANCELLED')) ? (
              <Notice
                className="c-manage-product__notice"
                type="success"
                heading={
                  t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER_RESPONSE_HEADER, {
                    portFrom: portInNumber.value
                  })
                }
              >
                <Paragraph>
                  {t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER_SUCCESS_BODY)}
                </Paragraph>
              </Notice>
            ) : (
              <Paragraph className="c-manage-product__description">
                {t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER_DESCRIPTION)}
              </Paragraph>
            )}
            <InputField
              error={isPortInNumberInvalid ? t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER_ERROR) : null}
              labelText={t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER_CHOOSE)}
              info={t(LocaleKeys.SHOP.ENTER_PORT_IN_HINT)}
              required
              input={(
                <Input
                  id="port-in"
                  type="tel"
                  onChange={handleUpdatePortInNumber}
                  onBlur={handleValidatePortInNumber}
                  size="full"
                  value={portInNumberClosed || portInNumberValue}
                />
              )}
            />
            <DatePicker
              id="portInDate"
              initialValue={new Date(portInDate)}
              labelText={t(LocaleKeys.PRODUCTS.SETTINGS.PORT_DATE_CHOOSE)}
              onDayChange={(day) => {
                setPortInDate(day);
              }}
              maxDays={PORTIN_VALUES.MAX}
              minDays={PORTIN_VALUES.MIN}
              size="large"
            />
            <div className="c-manage-product__button-actions">
              <OutlineButton
                className="c-manage-product__primary-action c-button-double"
                onClick={() => navigateToProducts(history)}
              >
                {t(LocaleKeys.CANCEL)}
              </OutlineButton>
              <FilledButton
                className="c-manage-product__primary-action c-button-double"
                disabled={isPortInNumberInvalid}
                onClick={submitPortIn}
              >
                {t(LocaleKeys.SUBMIT)}
              </FilledButton>
            </div>
          </>
        )
      };
    case PortInConstants.PORT_IN_UPDATE:
      return {
        heading: t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER),
        content: (
          <>
            <Paragraph className="c-manage-product__description">
              {t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER_UPDATE_PROMPT, {
                portInDate: portInDateFromCase
              })}
            </Paragraph>
            <div className="c-manage-product__section-data">
              <div>
                <Heading className="c-manage-product__section-header" category="minor" tone="normal">{t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER_PENDING_NUMBER_LABEL)}</Heading>
                <Heading category="minor" tone="normal">{portInNumberValue}</Heading>
              </div>
            </div>
            <div className="c-manage-product__date-input">
              <DatePicker
                id="portInDate"
                initialValue={new Date(initialPortInUpdateDate)}
                isPortInUpdateDate={subtractBusinessDays(initialPortInUpdateDate, 1)}
                labelText={t(LocaleKeys.PRODUCTS.SETTINGS.PORT_DATE_CHOOSE)}
                onDayChange={(day) => {
                  setPortInDate(day);
                }}
                maxDays={PORTIN_VALUES.MAX}
                minDays={PORTIN_VALUES.MIN}
                size="large"
              />
            </div>
            <div className="c-manage-product__button-actions">
              <OutlineButton
                className="c-manage-product__secondary-action c-button-double"
                onClick={() => setCurrentPortInFlow(PortInConstants.PORT_IN_RESPONSE)}
              >
                {t(LocaleKeys.CANCEL)}
              </OutlineButton>
              <FilledButton
                className="c-manage-product__primary-action c-button-double"
                disabled={isPortInNumberInvalid}
                onClick={updatePortIn}
              >
                {t(LocaleKeys.SUBMIT)}
              </FilledButton>
            </div>
            <div className="c-manage-product__update-return">
              <Link
                className="c-manage-product__secondary-action"
                onClick={() => setCurrentPortInFlow(PortInConstants.PORT_IN_CANCEL)}
              >
                {t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER_PENDING_CANCEL)}
              </Link>
            </div>
          </>
        )
      };
    case PortInConstants.PORT_IN_RESPONSE:
      return {
        heading: t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER),
        content: (
          <>
            {portInWasUpdated && (
              <Notice
                className="c-manage-product__port-in-disclaimer"
                type="success"
                heading={t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER_UPDATE_SUCCESS_NOTIFICATION)}
              />
            )}
            <Paragraph className="c-manage-product__pending-description">
              {t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER_PENDING)}
            </Paragraph>
            <div className="c-manage-product__section-data">
              <div className="c-manage-product__section-data-container">
                <Heading className="c-manage-product__section-header" category="minor" tone="normal">{t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER_PENDING_NUMBER_LABEL)}</Heading>
                <Heading category="minor" tone="normal">{portInNumberValue}</Heading>
              </div>
              <div className="c-manage-product__section-data-container">
                <Heading className="c-manage-product__section-header" category="minor" tone="normal">{t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER_PENDING_DATE_LABEL)}</Heading>
                <Heading category="minor" tone="normal">{format(portInDateFromCase, 'YYYY-MM-DD')}</Heading>
              </div>
            </div>

            {(!isPortInDisabled && validatePortInDate) && (
              <div className="c-manage-product__button-actions pending-port-in">
                <div className="action">
                  <FilledButton
                    className="c-manage-product__primary-action"
                    onClick={() => setCurrentPortInFlow(PortInConstants.PORT_IN_UPDATE)}
                  >
                    {t(LocaleKeys.PRODUCTS.SETTINGS.CHANGE)}
                  </FilledButton>
                </div>
                <div className="action">
                  <Link
                    onClick={() => setCurrentPortInFlow(PortInConstants.PORT_IN_CANCEL)}
                  >
                    {t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER_PENDING_CANCEL)}
                  </Link>
                </div>
              </div>
            )}
          </>
        )
      };
    case PortInConstants.PORT_IN_CANCEL:
      return {
        heading: t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER),
        content: (
          <>
            <Paragraph className="c-manage-product__pending-description">
              {t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER_CANCEL_HEADER)}
            </Paragraph>
            <div className="c-manage-product__button-actions">
              <OutlineButton
                className="c-manage-product__primary-action c-button-double"
                onClick={() => setCurrentPortInFlow(PortInConstants.PORT_IN_RESPONSE)}
              >
                {t(LocaleKeys.CANCEL)}
              </OutlineButton>
              <FilledButton
                className="c-manage-product__primary-action c-button-double"
                disabled={isPortInDisabled}
                onClick={cancelPortIn}
              >
                {t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER_CANCEL_CONFIRM_LABEL)}
              </FilledButton>
            </div>
          </>
        )
      };
    case PortInConstants.PORT_IN_CANCEL_PENDING:
      return {
        heading: t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER),
        content: (
          <>
            <Paragraph className="c-manage-product__pending-description">
              {t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER_CANCEL_PENDING)}
            </Paragraph>
            <div className="c-manage-product__button-actions">
              <FilledButton
                className="c-manage-product__primary-action c-button-double"
                onClick={() => navigateToProducts(history)}
              >
                {t(LocaleKeys.BACK)}
              </FilledButton>
            </div>
          </>
        )
      };
    default:
      return {
        heading: t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER),
        content: (
          <div>
            <LoadingIndicator isLoading />
          </div>
        )
      };
    }
  };

  const view = setupViewFromFlow();

  return (
    <PageContent>
      <div className="c-manage-product c-loading-indicator-containment">
        <LoadingIndicator isLoading={isHandlingProductAction || portInIsLoading} />
        <Heading category="brand" tone="normal">
          {view.heading}
        </Heading>
        {view.content}
      </div>
    </PageContent>
  );
};

PortIn.displayName = 'PortIn';
PortIn.propTypes = {
  /** Action to cancel the port-in request. */
  cancelPortInRequest: PropTypes.func.isRequired,
  /** Function to be called on submission of the support request form to create the request */
  createSupportRequest: PropTypes.func,
  /** The action to trigger when populating the list for support requests */
  searchSupportRequest: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Flag for when a product action is being utilized and the loading indicator should be triggered. */
  isHandlingProductAction: PropTypes.bool.isRequired,
  /** Whether the port in number is invalid or not. */
  isPortInNumberInvalid: PropTypes.bool,
  /** Current MSISDN Field information for creation of new port in case. */
  portInCurrentMSISDNField: PropTypes.shape({
    id: PropTypes.string
  }),
  /** Port in Date Field */
  portInDateField: PropTypes.object,
  /** Port in values after an port in support request is closed */
  portInNumberAdditionalPropertyValueId: PropTypes.string,
  /** Port in number */
  portInNumber: PropTypes.object,
  /** Whether the port in actions are loading or not. */
  portInIsLoading: PropTypes.bool.isRequired,
  /** New MSISDN Field information for creation of new port in case. */
  portInPortToMSISDNField: PropTypes.object,
  /** Port in SSN */
  portInSsn: PropTypes.object,
  /** Product Identifier */
  productIdentifier: PropTypes.number,
  /** Recent Closed Port In Request */
  recentlyClosedPortInRequest: PropTypes.shape({
    /** Response message for closed port in request */
    responseMessage: PropTypes.string,
    /** Message code for closed port in request */
    messageCode: PropTypes.string,
    /** successful flag for closed port in request */
    successful: PropTypes.bool
  }),
  /** Recent Port in Request */
  recentlyNewOrOpenPortInRequest: PropTypes.shape({
    Id: PropTypes.object,
    AdditionalPropertyValues: PropTypes.arrayOf(PropTypes.object)
  }),
  /** Action to fetch metadata */
  retrieveCodes: PropTypes.func.isRequired,
  /** Retrieve Product Metadata */
  retrieveProductMetadata: PropTypes.func.isRequired,
  /** Selected product to perform actions against. */
  selectedProduct: PropTypes.shape({
    /** Offering Id */
    offeringId: PropTypes.string,
    /** Offering Instance Id */
    offeringInstanceId: PropTypes.string,
    /** Display Name */
    displayName: PropTypes.string,
    /** Flag to determine if a use can opt out of the renewal at the end of the billing cycle. */
    canOptOutOnRenew: PropTypes.bool,
    /** Currency Code */
    currencyCode: PropTypes.string,
    /** Billing object on the offer */
    billing: PropTypes.shape({
      /** Next charge date for the offer */
      nextChargeDate: PropTypes.string
    }),
    /** Bool for product having first usage */
    hasFirstUsage: PropTypes.bool,
    /** The selected option Id on the primary decision. */
    hasPrimaryOption: PropTypes.string,
    /** Bool for product being broadband */
    isBroadband: PropTypes.bool,
    /** Bool for product being penny play */
    isPennyPlay: PropTypes.bool,
    /** Flag to tell us if the product is wireless */
    isWireless: PropTypes.bool,
    /** Marketing Template object to be used to render upgrade /downgrade */
    marketingTemplate: PropTypes.shape({}),
    /** Options */
    options: PropTypes.array,
    /** Right to Return */
    rightToReturn: PropTypes.bool,
    /** Service Identifier for the product. Also called the phone number. */
    serviceIdentifier: PropTypes.string,
    /** Status of the product */
    status: PropTypes.number,
    intentToPort: PropTypes.bool
  }),
  /** SSN of subscriber */
  subscriberSSN: PropTypes.string.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Function to update the attribute value */
  updateAttributeValue: PropTypes.func.isRequired,
  /** Function to update the custom port in number */
  updateCustomPortInNumber: PropTypes.func.isRequired,
  /** Function to update the  port in request. */
  updatePortInRequest: PropTypes.func.isRequired,
  /** Field information for validated port in date. */
  validatedPortInDateField: PropTypes.object,
  /** Validate port in date attribute present inside open support requests */
  validatePortInDate: PropTypes.bool,
  offeringContextsByInstanceId: PropTypes.object,
  activeOfferInstanceId: PropTypes.string,
  /** Action to change ui context page data */
  setContextPageData: PropTypes.func.isRequired
};

export default compose(
  withI18n(),
  withRouter
)(PortIn);
