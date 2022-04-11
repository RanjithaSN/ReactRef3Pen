import { addToCartAnalytic } from '@selfcare/core/analytics/add.to.cart.analytics';
import { productDetailAnalytic } from '@selfcare/core/analytics/product.detail.analytics';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import isEmpty from 'ramda/src/isEmpty';
import path from 'ramda/src/path';
import React, { useEffect, useState } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import { apiFaultPropTypes } from 'selfcare-core/src/constants/api.fault.prop.types';
import IconButton from 'selfcare-ui/src/components/iconButton/icon.button';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Notice from 'selfcare-ui/src/components/notice/notice';
import IconArrowThinRight from 'selfcare-ui/src/icons/react-icons/arrow-thin-right';
import { DECISION_TYPE } from '../../../../constants/order.constants';
import LocaleKeys from '../../../../locales/keys';
import { DISPLAY_ORDER_FOR_ACTIVATION_DATE, DISPLAY_ORDER_FOR_PORT_IN_DATE, DISPLAY_ORDER_FOR_PORT_IN_INTENT, DISPLAY_ORDER_FOR_TELEPHONE_NUMBER } from '../../../../redux/orderFlow/attributes/attributes.order.flow.constants';
import { SECTION_IDS } from '../../../../redux/progressStepper/progress.stepper.constants';
import PageContent, { Main } from '../../../pageContent/page.content';
import AttributesDisplay from '../../attribute/attributes.display.withFormik';
import './customize.offer.scss';

const CustomizeOffer = ({ activeOfferInstanceId, apiFault, attributesForCurrentDecision, broadbandAttributes, className, clearMSISDNInventory, createProspect, hasMoreConfig, haveUser, history, isInBundleOrderFlow, isMobileAttributesLoading, productIdentifier,
  isMobileOffer, isBroadbandOffer, isProspect, nextPage, setBroadbandAttributes, setSectionId, t, updateAttributeValue, optionsViewDataInShoppingCart, portInNumberInvalid, updateBroadbandActivationDate, productDefaults, retrieveProductMetadata }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBroadband, setIsLoadingBroadband] = useState(false);
  const [productDetailCalled, setProductDetailCalled] = useState({});
  const [addToCartCalled, setAddToCartCalled] = useState(false);
  const [lastActiveInstanceId, setLastActiveInstanceId] = useState(null);

  useEffect(() => {
    setSectionId(SECTION_IDS.CONFIGURE, history.push);
  }, [history, setSectionId]);

  useEffect(() => {
    if (productIdentifier) {
      retrieveProductMetadata(productIdentifier);
    }
  }, [productIdentifier, retrieveProductMetadata]);

  useEffect(() => {
    if (activeOfferInstanceId && (activeOfferInstanceId !== lastActiveInstanceId) && haveUser) {
      setLastActiveInstanceId(activeOfferInstanceId);
      productDetailAnalytic(optionsViewDataInShoppingCart, !isProspect);

      const newProductDetailCalled = {
        ...productDetailCalled
      };
      newProductDetailCalled[activeOfferInstanceId] = optionsViewDataInShoppingCart;
      setProductDetailCalled(newProductDetailCalled);
    }
  }, [activeOfferInstanceId, haveUser, isProspect, lastActiveInstanceId, optionsViewDataInShoppingCart, productDetailCalled]);

  useEffect(() => {
    if (isInBundleOrderFlow && Object.keys(productDetailCalled).length > 1 && !addToCartCalled) {
      // TODO fix this the last and current activeOfferInstanceId are becoming equivalent by this point.
      const fields = Object.keys(productDetailCalled);
      const optionsViewDataMerged = productDetailCalled[fields[0]].concat(productDetailCalled[fields[1]]);
      addToCartAnalytic(optionsViewDataMerged, !isProspect);
      setAddToCartCalled(true);
    } else if (!isInBundleOrderFlow && Object.keys(productDetailCalled).length === 1 && !addToCartCalled) {
      addToCartAnalytic(optionsViewDataInShoppingCart, !isProspect);
      setAddToCartCalled(true);
    }
  }, [addToCartCalled, haveUser, isInBundleOrderFlow, isProspect, optionsViewDataInShoppingCart, productDetailCalled]);

  useEffect(() => {
    const setAttributes = async () => {
      await setBroadbandAttributes();
      setIsLoadingBroadband(false);
    };
    if (!isMobileOffer && !isEmpty(broadbandAttributes)) {
      setIsLoadingBroadband(true);
      setAttributes();
    }
  }, [broadbandAttributes, isMobileOffer, setBroadbandAttributes]);

  useEffect(() => {
    return () => {
      clearMSISDNInventory();
    };
  }, [clearMSISDNInventory]);

  useEffect(() => {
    setIsLoading(false);
    // isMobileOffer and apiFault are included here to stop the page load on switch of attribute pages.
  }, [apiFault, isMobileOffer]);

  const keys = Object.keys(attributesForCurrentDecision);
  const selectedPortIn = keys && keys.find((key) => attributesForCurrentDecision[key].find((attr) => {
    // attr.data.SelectedValue is the default value. Not porting in is assumed to be the default.
    return attr.data.DisplayOrder === DISPLAY_ORDER_FOR_PORT_IN_INTENT && attr.formValue !== attr.data.SelectedValue;
  }));

  const navigateToNextPage = async () => {
    setIsLoading(true);
    if (!haveUser) {
      await createProspect();
    }
    if (!selectedPortIn && isMobileOffer) {
      const attrKeys = keys || [];
      const decisionAttributes = attrKeys
        .map((key) => attributesForCurrentDecision[key])
        .reduce((attributes, nextAttrs) => attributes.concat(nextAttrs), []);
      const portInDateAttr = decisionAttributes
        .find((attr) => {
          return attr.data.DisplayOrder === DISPLAY_ORDER_FOR_PORT_IN_DATE;
        });
      const attributeId = portInDateAttr.id;
      const optionId = path(['data', 'OfferingOptionPriceId'], decisionAttributes.find(({ id }) => id === attributeId));

      updateAttributeValue(DECISION_TYPE.QUANTITY, optionId, attributeId, '01/01/0000', false, DISPLAY_ORDER_FOR_PORT_IN_DATE);
    }
    await nextPage(history);
  };

  const attrs = {
    ...attributesForCurrentDecision
  };
  if (selectedPortIn) {
    keys.forEach((key) => {
      attrs[key] = attributesForCurrentDecision[key].filter((attr) => {
        return attr.data.DisplayOrder !== DISPLAY_ORDER_FOR_TELEPHONE_NUMBER && attr.data.DisplayOrder !== DISPLAY_ORDER_FOR_ACTIVATION_DATE;
      });
    });
  } else {
    keys.forEach((key) => {
      attrs[key] = attributesForCurrentDecision[key].filter((attr) => {
        return attr.data.DisplayOrder !== DISPLAY_ORDER_FOR_PORT_IN_DATE;
      });
    });
  }
  return (
    <div className={classNames('c-customize', className)}>
      <PageContent>
        <Main isShop className="c-customize__main c-loading-indicator-containment">
          <div className="c-customize__page">
            {apiFault && (
              <Notice
                apiFault={apiFault}
                type="error"
                heading={apiFault.translatedMessage}
              />
            )}
            <LoadingIndicator isLoading={isLoading || isMobileAttributesLoading || isLoadingBroadband} />
            {activeOfferInstanceId && (
              <AttributesDisplay
                decisionAttributes={attrs}
                updateAttributeValue={updateAttributeValue}
                updateBroadbandActivationDate={updateBroadbandActivationDate}
                isMobileOffer={isMobileOffer}
                title={isMobileOffer ? t(LocaleKeys.SHOP.MOBILE) : t(LocaleKeys.SHOP.BROADBAND)}
                defaultDays={productDefaults.defaultDays}
                isBroadbandOffer={isBroadbandOffer}
                maxDays={productDefaults.maxDays}
                minDays={productDefaults.minDays}
              />
            )}
            <div className="c-customize__spacer" />
            <div>
              <IconButton
                className="c-customize__button"
                orientation="reversed"
                icon={<IconArrowThinRight />}
                onClick={() => navigateToNextPage()}
                disabled={selectedPortIn && portInNumberInvalid}
              >
                {hasMoreConfig ? t(LocaleKeys.SHOP.CONTINUE_CONFIGURATION) : t(LocaleKeys.SHOP.ENTER_DETAILS)}
              </IconButton>
            </div>
          </div>
        </Main>
      </PageContent>
    </div>
  );
};

CustomizeOffer.displayName = 'CustomizeOffer';
CustomizeOffer.propTypes = {
  activeOfferInstanceId: PropTypes.string,
  /** An error message response kicked back from an API call */
  apiFault: apiFaultPropTypes,
  /** List of attributes for the currently selected decision */
  attributesForCurrentDecision: PropTypes.object,
  /** Object containing the attributes needed for broadband ordering. */
  broadbandAttributes: PropTypes.object,
  /** Classname to be added to the element */
  className: PropTypes.string,
  /** Clear stored inventory list  */
  clearMSISDNInventory: PropTypes.func,
  /** Action to create temporary user is needed */
  createProspect: PropTypes.func.isRequired,
  /** Bool flag if there is another offer to configure */
  hasMoreConfig: PropTypes.bool,
  /** Bool flag if user has been created / logged in */
  haveUser: PropTypes.bool,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Bool flag if bundle is selected */
  isInBundleOrderFlow: PropTypes.bool,
  /** Bool flag if mobile attributes are loading */
  isMobileAttributesLoading: PropTypes.bool,
  /** Bool flag if current offer is mobile */
  isMobileOffer: PropTypes.bool,
  /** Bool flag if current offer is broadband */
  isBroadbandOffer: PropTypes.bool,
  productDefaults: PropTypes.shape({
    /** The number of days in the future to set the default date value */
    defaultDays: PropTypes.number,
    /** The number of days in the future to set the max date value */
    maxDays: PropTypes.number,
    /** The number of days in the future to set the min date value */
    minDays: PropTypes.number
  }),
  isProspect: PropTypes.bool,
  /** Action to navigate to the SSN or PI page */
  nextPage: PropTypes.func.isRequired,
  /** Saved Shopping Cart Items */
  optionsViewDataInShoppingCart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string
    })
  ),
  /** Product Identifier */
  productIdentifier: PropTypes.number,
  /** Bool flag if port-in number is not entered or invalid */
  portInNumberInvalid: PropTypes.bool,
  /** Retrieve Product Metadata */
  retrieveProductMetadata: PropTypes.func.isRequired,
  /** Method that handles setting broadband order attributes */
  setBroadbandAttributes: PropTypes.func.isRequired,
  /** Method used to update the current section id */
  setSectionId: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Function to update an attribute value */
  updateAttributeValue: PropTypes.func.isRequired,
  updateBroadbandActivationDate: PropTypes.func.isRequired
};

export default compose(
  withI18n(),
  withRouter
)(CustomizeOffer);
