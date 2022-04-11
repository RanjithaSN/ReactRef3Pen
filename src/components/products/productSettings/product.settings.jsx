import { OfferingContextIntent } from '@selfcare/core/redux/offeringContext/offering.context.constants';
import { OFFERING_OVERALL_STATUS } from '@selfcare/core/redux/subscriberOfferings/subscriber.offering.constants';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import React, { useEffect, useState } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import DefinitionList from 'selfcare-ui/src/components/definitionList/definition.list';
import Notice from 'selfcare-ui/src/components/notice/notice';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import LocaleKeys from '../../../locales/keys';
import { getProductsNavItem } from '../../../navigation/sitemap.selectors';
import AttributesDisplay from '../../shop/attribute/attributes.display.withFormik';
import './product.settings.scss';

const ProductSettings = ({ apiFault, className, device, hasPaymentFailure, history, filteredDecisions, offerIsActive, product, productIdentifier,
  retrieveOfferingContextWithDecisions, searchServices, submitOrder, t, toggleDecisionCartUpdate, updateAttributeValue,
  updateBroadbandActivationDate, updateCart, retrieveProductMetadata, productDefaults }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (product.isWireless || product.isBenify) {
      searchServices(product.serviceIdentifier);
    }
    setFormSubmitted(false);
  }, [product, searchServices]);

  useEffect(() => {
    if (productIdentifier) {
      retrieveProductMetadata(productIdentifier);
    }
  }, [productIdentifier, retrieveProductMetadata]);

  const updateDecisionForOffer = async () => {
    if (product && product.offeringInstanceId && product.offeringId) {
      await retrieveOfferingContextWithDecisions(product.offeringId, product.offeringInstanceId);

      if (filteredDecisions) {
        const options = {
          action: OfferingContextIntent.MODIFY,
          decisionId: filteredDecisions.Id,
          optionId: product.offeringId,
          optionName: product.displayName, // Name is present on current option
          offeringId: product.offeringId,
          offeringInstanceId: product.offeringInstanceId,
          offerName: product.displayName
        };
        await toggleDecisionCartUpdate(options);
      }
    }
  };

  const updateAttribute = async (decisionType, optionId, attributeId, value, isRequired) => {
    setFormSubmitted(true);
    await updateAttributeValue(decisionType, optionId, attributeId, value, isRequired);
    await updateDecisionForOffer();
    await updateCart();
    const offering = {
      OfferingId: product.offeringId,
      OfferingInstanceId: product.offeringInstanceId
    };
    await submitOrder(offering);
  };

  const definitionListToRender = () => {
    if (!product) {
      return [];
    }
    const instanceId = path(['offeringInstanceId'], product);
    const id = path(['offeringId'], product);
    const urlPath = `${getProductsNavItem().url}/${id}-${instanceId}/${t(LocaleKeys.ROUTES.MANAGE)}`;

    const baseDefinitionListItems = [{
      key: t(LocaleKeys.PRODUCTS.SETTINGS.PRODUCT),
      label: t(LocaleKeys.PRODUCTS.SETTINGS.PRODUCT),
      value: (
        <div className="c-product-settings__definition-value">
          <div>{product.isPennyPlay ? t(LocaleKeys.PLANS_AND_SERVICES.PLAN.PENNY_PLAY.CATEGORY) : product.displayName}</div>
          <FilledButton
            className="c-product-settings__change-button"
            onClick={() => {
              let mode = t(LocaleKeys.ROUTES.MANAGE_PAGE.CHANGE);
              if (hasPaymentFailure) {
                mode = t(LocaleKeys.ROUTES.MANAGE_PAGE.FAILED_PAYMENT);
              } else if (product.isPennyPlay && product.canOptOutOnRenew) {
                mode = t(LocaleKeys.ROUTES.MANAGE_PAGE.RETURN);
              } else if (!product.canOptOutOnRenew && product.status !== OFFERING_OVERALL_STATUS.ORDER_PENDING && product.hasFirstUsage) {
                mode = t(LocaleKeys.ROUTES.MANAGE_PAGE.RESTORE);
              }
              history.push(`${urlPath}/${mode}`);
            }}>
            {t(LocaleKeys.PRODUCTS.SETTINGS.CHANGE)}
          </FilledButton>
        </div>
      )
    }];
    const wirelessDefinitionListItems = [{
      key: t(LocaleKeys.PRODUCTS.SETTINGS.MSISDN),
      label: t(LocaleKeys.PRODUCTS.SETTINGS.MSISDN),
      value: (
        <div className="c-product-settings__definition-value">
          <div>{device.msisdn}</div>
          <FilledButton
            className="c-product-settings__port-number"
            onClick={() => {
              history.push(`${urlPath}/${t(LocaleKeys.ROUTES.MANAGE_PAGE.PORT_NUMBER)}`);
            }}
          >
            {t(LocaleKeys.PRODUCTS.SETTINGS.PORT_NUMBER)}
          </FilledButton>
        </div>
      )
    }];
    if (device.sim) {
      wirelessDefinitionListItems.push({
        key: t(LocaleKeys.PRODUCTS.SETTINGS.SIM),
        label: t(LocaleKeys.PRODUCTS.SETTINGS.SIM),
        value: (
          <div className="c-product-settings__definition-value">
            <div>{device.sim}</div>
            {offerIsActive && (
              <FilledButton
                className="c-product-settings__replace-sim"
                onClick={() => {
                  history.push(`${urlPath}/${t(LocaleKeys.ROUTES.MANAGE_PAGE.REPLACE_SIM)}`);
                }}
              >
                {t(LocaleKeys.PRODUCTS.SETTINGS.REPLACE)}
              </FilledButton>
            )}
          </div>
        )
      });
    }
    if (device.pukCode) {
      wirelessDefinitionListItems.push({
        key: t(LocaleKeys.PRODUCTS.SETTINGS.PUK_CODE),
        label: t(LocaleKeys.PRODUCTS.SETTINGS.PUK_CODE),
        value: (
          <>
            <div>{device.pukCode[0]}</div>
            <div>{device.pukCode[1]}</div>
          </>
        )
      });
    }

    return (product.isWireless || product.isBenify) ? baseDefinitionListItems.concat(wirelessDefinitionListItems) : baseDefinitionListItems;
  };

  return (
    <div>
      {formSubmitted && apiFault && <Notice apiFault={apiFault} type="error" heading={apiFault.translatedMessage} />}
      <Paragraph className="c-product-settings__intro">{t(LocaleKeys.PRODUCTS.SETTINGS.INTRO_COPY)}</Paragraph>
      <DefinitionList
        className={classNames('c-product-settings', className)}
        flush
        stacked
        list={definitionListToRender()}
      />
      {product.hasFirstUsage && product.status !== OFFERING_OVERALL_STATUS.ORDER_PENDING && (
        <AttributesDisplay
          decisionAttributes={device.attributes}
          updateAttributeValue={updateAttribute}
          updateBroadbandActivationDate={updateBroadbandActivationDate}
          isMobileOffer={product.isWireless || product.isBenify}
          isBroadbandOffer={product.isBroadbandOffer}
          inlineView
          defaultDays={productDefaults.defaultDays}
          maxDays={productDefaults.maxDays}
          minDays={productDefaults.minDays}
        />
      )}
    </div>
  );
};

ProductSettings.displayName = 'ProductSettings';
ProductSettings.propTypes = {
  /** API Fault message */
  apiFault: PropTypes.shape({
    translatedMessage: PropTypes.string
  }),
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Device related information */
  device: PropTypes.shape({
    /** Identifier for MSISDN */
    msisdn: PropTypes.string,
    /** Indentifier for sim card */
    sim: PropTypes.string,
    /** The configuratble attributes for the product */
    attributes: PropTypes.object,
    /** Identifier for PUK Code */
    pukCode: PropTypes.arrayOf(PropTypes.string)
  }),
  /** Filtered decisions used  to select options */
  filteredDecisions: PropTypes.shape({
    /** Id of decision  */
    Id: PropTypes.string.isRequired,
    /** Options to select from */
    Options: PropTypes.arrayOf(PropTypes.shape({
      /** Amounts related to the option */
      BillerRuleInstanceAmounts: PropTypes.array,
      /** Id of the option */
      Id: PropTypes.string,
      /** Name of the option */
      Name: PropTypes.string,
      /** Current quantity of the option */
      Quantity: PropTypes.number
    }))
  }),
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** True if subscriber has payment failures for this product */
  hasPaymentFailure: PropTypes.bool,
  /** True if Offering is active */
  offerIsActive: PropTypes.bool,
  /** Product information to be used for the display of information */
  product: PropTypes.shape({
    /** Flag to determine if the product can be opted out or not. */
    canOptOutOnRenew: PropTypes.bool,
    /** Offering Id */
    offeringId: PropTypes.string,
    /** Offering Instance Id */
    offeringInstanceId: PropTypes.string,
    /** Allowance information */
    allowance: PropTypes.shape({
      /** Balance remaining for allowance */
      balanceRemaining: PropTypes.number
    }),
    /** Billing information related to the selected product. */
    billing: PropTypes.shape({
      /** Total amount due on next date */
      totalAmount: PropTypes.number.isRequired,
      /** Next date that the total amount is due */
      nextChargeDate: PropTypes.string
    }),
    /** The display name for the product, will be related to the decision option. */
    displayName: PropTypes.string,
    /** Currency Code */
    currencyCode: PropTypes.string,
    /** Boolean for the product having first usage */
    hasFirstUsage: PropTypes.bool,
    /** The selected option Id on the primary decision. */
    hasPrimaryOption: PropTypes.string,
    /** The id of the product */
    id: PropTypes.string,
    /** Is a benify product */
    isBenify: PropTypes.bool,
    /** The name for the product */
    productName: PropTypes.string,
    /** Service Identifier for the product. Also called the phone number. */
    serviceIdentifier: PropTypes.string,
    /** Status of product */
    status: PropTypes.number,
    /** Flag to determine if it is penny play product. */
    isPennyPlay: PropTypes.bool,
    /** Flag to determine if it is wireless product. */
    isWireless: PropTypes.bool,
    /** Flag to determine if it is a broadband product. */
    isBroadbandOffer: PropTypes.bool,
    /** Flag to determine if it's right to return. */
    rightToReturn: PropTypes.bool
  }),
  productDefaults: PropTypes.shape({
    /** The number of days in the future to set the default date value */
    defaultDays: PropTypes.number,
    /** The number of days in the future to set the max date value */
    maxDays: PropTypes.number,
    /** The number of days in the future to set the min date value */
    minDays: PropTypes.number
  }),
  /** ProductI dentifier */
  productIdentifier: PropTypes.number,
  /** Retrieve Product Metadata */
  retrieveProductMetadata: PropTypes.func.isRequired,
  /** Action used to fetch information about the product. */
  retrieveOfferingContextWithDecisions: PropTypes.func.isRequired,
  /** Action to return service attributes for current service. */
  searchServices: PropTypes.func.isRequired,
  /** Action to submit a change of order. */
  submitOrder: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Action used to get new shopping cart totals based on the new selection. */
  toggleDecisionCartUpdate: PropTypes.func.isRequired,
  /** Function to update an attribute value */
  updateAttributeValue: PropTypes.func.isRequired,
  /** Function to update an attribute value */
  updateBroadbandActivationDate: PropTypes.func.isRequired,
  /** Function to update the cart in order to submit an order. */
  updateCart: PropTypes.func.isRequired
};

export default compose(
  withI18n(),
  withRouter
)(ProductSettings);
