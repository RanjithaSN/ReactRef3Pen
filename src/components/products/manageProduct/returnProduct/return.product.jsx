import LocaleKeys from '../../../../locales/keys';
import ChatButton from '../../../getHelp/troubleshooter/directHelp/chat.button';
import {
  buildHistoryNodeFromKeyValue,
  initializeDirectHelp
} from '../../../getHelp/troubleshooter/directHelp/direct.help.helpers';
import PageContent from '../../../pageContent/page.content';
import { navigateToProducts } from '../manage.product.helper';
import { apiFaultPropTypes } from 'selfcare-core/src/constants/api.fault.prop.types';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import OutlineButton from 'selfcare-ui/src/components/button/outline.button';
import Heading from 'selfcare-ui/src/components/heading/heading';
import InputField from 'selfcare-ui/src/components/inputField/input.field';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Notice from 'selfcare-ui/src/components/notice/notice';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import Select from 'selfcare-ui/src/components/select/select';
import { withRouter } from 'react-router';
import { withI18n } from 'react-i18next';
import React, { useEffect, useState, useMemo } from 'react';
import uniq from 'ramda/src/uniq';
import pluck from 'ramda/src/pluck';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
import '../manage.product.scss';

const ReturnProduct = ({ apiFault,
  cancelOffer,
  cancelPortInRequest,
  history,
  isHandlingProductAction,
  recentlyNewOrOpenPortInRequest,
  recentlyClosedPortInRequest,
  refreshOffers,
  removalReasonOptions,
  selectedProduct,
  t }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReturnSuccess, setShowReturnSuccess] = useState(false);
  const [dropdownData, setDropdownData] = useState(true);
  const [loadingState, setloadingState] = useState(false);
  const [removalReason, setRemovalReason] = useState('');
  const [parsedRemovalReasons, setParsedRemovalReasons] = useState([]);
  const [
    selectedLevelOneRemovalOption,
    setSelectedLevelOneRemovalOption
  ] = useState('');
  const [hasCancelledOrder, setHasCancelledOrder] = useState(false);
  const [error, setError] = useState({
    level1Reason: null,
    level2Reason: null
  });



  const parseRegretReasons = (initialRegretReasons, productType) => {
    if (!initialRegretReasons) {
      return [];
    }
    const reasons = initialRegretReasons.map((regretReason) => {
      const label = regretReason.label || regretReason.Name;
      const value = regretReason.value || regretReason.Value;

      if (!label || !value) {
        return null;
      }

      const tempReason = label.split('|');
      if (
        tempReason.length === 3 &&
        tempReason[0].toLowerCase() === productType.toLowerCase()
      ) {
        return {
          type: tempReason[0],
          level1Text: tempReason[1],
          level2Text: tempReason[2],
          label: tempReason[2],
          value
        };
      }
      return null;
    });
    return reasons.filter((reason) => reason && reason.type);
  };

  const updateRemovalReason = (reason) => {
    setRemovalReason(reason);
    setError({
      level1Reason: null,
      level2Reason: null
    });
  };

  const updateSelectedLevelOneRemovalOption = (event) => {
    setSelectedLevelOneRemovalOption(event.currentTarget.value);

    if (selectedProduct.isPennyPlay) {
      const level1Reason = parsedRemovalReasons.find((reason) => reason.level1Text === event.currentTarget.value);

      if (level1Reason) {
        updateRemovalReason(level1Reason.value);
      }
    } else {
      updateRemovalReason('');
    }
  };

  useEffect(() => {
    if (removalReasonOptions && dropdownData) {
      let reasons;
      let found = true;
      if (selectedProduct.isWireless || selectedProduct.isBenify) {
        reasons = parseRegretReasons(removalReasonOptions, 'mobile');
      } else if (selectedProduct.isBroadband) {
        reasons = parseRegretReasons(removalReasonOptions, 'broadband');
      } else if (selectedProduct.isPennyPlay) {
        reasons = parseRegretReasons(removalReasonOptions, 'play');
      } else {
        found = false;
      }

      if (found) {
        setDropdownData(false);
        setParsedRemovalReasons(reasons);
      }
    }
  }, [
    removalReasonOptions,
    dropdownData,
    selectedProduct.isWireless,
    selectedProduct.isBroadband,
    selectedProduct.isPennyPlay,
    selectedProduct.isBenify
  ]);

  useEffect(() => {
    window.__initZenDesk();
  }, []);

  useEffect(() => {
    return () => {
      if (hasCancelledOrder) {
        refreshOffers(selectedProduct);
      }
    };
  }, [refreshOffers, hasCancelledOrder, selectedProduct]);

  const hasOpenPortInRequest =
    recentlyNewOrOpenPortInRequest && !recentlyClosedPortInRequest;

  const navigateBackAfterReturn = () => {
    refreshOffers(selectedProduct);
    navigateToProducts(history);
  };

  const handleCancelOrder = async () => {
    if(loadingState) {
      return;
    }
    setloadingState(true);
    if (!selectedLevelOneRemovalOption) {
      setError({
        level1Reason: t(LocaleKeys.VALIDATION.REQUIRED_FIELD_TEMPLATE, {
          field: t(
            LocaleKeys.PRODUCTS.SETTINGS.RETURN_PRODUCT_REASON_LEVEL_1_LABEL
          )
        })
      });
    } else if (removalReason) {
      if (hasOpenPortInRequest) {
        await cancelPortInRequest(recentlyNewOrOpenPortInRequest.Id.Value, selectedProduct.offeringInstanceId);
      }
      await cancelOffer(selectedProduct, removalReason);

      setShowReturnSuccess(!apiFault);
      setShowConfirmation(true);
      setHasCancelledOrder(true);
    } else {
      setError({
        level2Reason: t(LocaleKeys.VALIDATION.REQUIRED_FIELD_TEMPLATE, {
          field: t(
            LocaleKeys.PRODUCTS.SETTINGS.RETURN_PRODUCT_REASON_LEVEL_2_LABEL
          )
        })
      });
    }
    setloadingState(false);
  };
  const level2Reasons = useMemo(
    () => (parsedRemovalReasons ?
      parsedRemovalReasons.filter(
        (reason) => reason.level1Text === selectedLevelOneRemovalOption && reason.level2Text
      ) :
      []),
    [parsedRemovalReasons, selectedLevelOneRemovalOption]
  );

  let view;
  view = {
    heading: t(LocaleKeys.PRODUCTS.SETTINGS.RETURN_PRODUCT),
    content: (
      <Paragraph className="c-manage-product__description">
        {t(LocaleKeys.PRODUCTS.SETTINGS.RETURN_PRODUCT_PORT_IN_PROGRESS)}
      </Paragraph>
    )
  };
  if (showConfirmation) {
    view = {
      heading: t(LocaleKeys.PRODUCTS.SETTINGS.RETURN_PRODUCT),
      content: showReturnSuccess ? (
        <>
          <Paragraph className="c-manage-product__description">
            {t(LocaleKeys.PRODUCTS.SETTINGS.RETURN_PRODUCT_CONFIRMATION)}
          </Paragraph>
          {!selectedProduct.isPennyPlay && (
            <Paragraph className="c-manage-product__description">
              {t(
                LocaleKeys.PRODUCTS.SETTINGS.RETURN_PRODUCT_CONFIRMATION_HARDWARE
              )}
            </Paragraph>
          )}
          <Heading
            className="c-manage-product__sub-heading"
            category="major"
            tone="normal"
          >
            {t(LocaleKeys.PRODUCTS.SETTINGS.TO_RETURN_YOUR_PRODUCT, {
              name: selectedProduct.displayName
            })}
          </Heading>
          <FilledButton
            className="c-manage-product__primary-action"
            onClick={navigateBackAfterReturn}
          >
            {t(LocaleKeys.BACK)}
          </FilledButton>
        </>
      ) : (
        <>
          <Paragraph className="c-manage-product__description">
            {t(LocaleKeys.PRODUCTS.SETTINGS.RETURN_PRODUCT_PROBLEM)}
          </Paragraph>
          <FilledButton
            className="c-manage-product__primary-action"
            onClick={() => {
              initializeDirectHelp([
                buildHistoryNodeFromKeyValue('Action', 'Return Product'),
                buildHistoryNodeFromKeyValue(
                  'Service Identifier',
                  selectedProduct.serviceIdentifier
                )
              ]);
            }}
          >
            {t(LocaleKeys.PRODUCTS.SETTINGS.GET_MY_PRODUCT_RETURNED)}
          </FilledButton>
          <ChatButton />
        </>
      )
    };
  } else {
    view = {
      heading: t(LocaleKeys.PRODUCTS.SETTINGS.RETURN_PRODUCT),
      content: (
        <>
          <div>
            <Paragraph className="c-manage-product__description">
              {t(LocaleKeys.PRODUCTS.SETTINGS.RETURN_PRODUCT_DESCRIPTION)}
            </Paragraph>
            {apiFault && (
              <Notice
                apiFault={apiFault}
                type="error"
                heading={apiFault.translatedMessage}
              />
            )}
            {parsedRemovalReasons && parsedRemovalReasons.length > 0 && (
              <InputField
                required
                error={error.level1Reason}
                className="c-manage-product__return-reason"
                size="medium"
                labelText={t(
                  LocaleKeys.PRODUCTS.SETTINGS
                    .RETURN_PRODUCT_REASON_LEVEL_1_LABEL
                )}
                input={(
                  <Select
                    required
                    id="select-return-reason-level-1"
                    placeholder={t(
                      LocaleKeys.PRODUCTS.SETTINGS
                        .RETURN_PRODUCT_REASON_LEVEL_1_PLACEHOLDER
                    )}
                    options={uniq(pluck('level1Text', parsedRemovalReasons))}
                    selected={selectedLevelOneRemovalOption}
                    onChange={updateSelectedLevelOneRemovalOption}
                  />
                )}
              />
            )}
            {level2Reasons.length > 0 && (
              <InputField
                required
                error={error.level2Reason}
                className="c-manage-product__return-reason"
                size="medium"
                labelText={t(
                  LocaleKeys.PRODUCTS.SETTINGS
                    .RETURN_PRODUCT_REASON_LEVEL_2_LABEL
                )}
                input={(
                  <Select
                    required
                    id="select-return-reason-level-2"
                    placeholder={t(
                      LocaleKeys.PRODUCTS.SETTINGS
                        .RETURN_PRODUCT_REASON_LEVEL_2_PLACEHOLDER
                    )}
                    selected={removalReason}
                    options={level2Reasons}
                    onChange={(event) => updateRemovalReason(event.currentTarget.value)
                    }
                  />
                )}
              />
            )}
            <Paragraph className="c-manage-product__description">
              {t(LocaleKeys.PRODUCTS.SETTINGS.RETURN_PRODUCT_ARE_YOU_SURE, {
                name: selectedProduct.displayName
              })}
            </Paragraph>
          </div>
          <div className="c-manage-product__actions">
            <div className="c-manage-product__button-actions">
              <OutlineButton
                className="c-manage-product__primary-action"
                onClick={() => navigateToProducts(history)}
              >
                {t(LocaleKeys.CANCEL)}
              </OutlineButton>
              <FilledButton
                className="c-manage-product__primary-action"
                onClick={handleCancelOrder}
              >
                {t(LocaleKeys.SUBMIT)}
              </FilledButton>
            </div>
          </div>
        </>
      )
    };
  }

  return (
    <PageContent>
      <div className="c-manage-product c-loading-indicator-containment">
        <LoadingIndicator isLoading={loadingState} />
        <Heading category="brand" tone="normal">
          {view.heading}
        </Heading>
        {view.content}
      </div>
    </PageContent>
  );
};

ReturnProduct.displayName = 'ReturnProduct';
ReturnProduct.propTypes = {
  /** Application fault */
  apiFault: apiFaultPropTypes,
  /** Action to cancel order */
  cancelOffer: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Flag for when a product action is being utilized and the loading indicator should be triggered. */
  loadingState: PropTypes.bool.isRequired,
  /** Recent Port in Request */
  recentlyNewOrOpenPortInRequest: PropTypes.shape({}),
  /** Recent Closed Port In Request */
  recentlyClosedPortInRequest: PropTypes.shape({
    /** Response message for closed port in request */
    responseMessage: PropTypes.string,
    /** successful flag for closed port in request */
    successfull: PropTypes.bool
  }),
  /** Refresh Subscriber Offers */
  refreshOffers: PropTypes.func.isRequired,
  /** Removal reason options formatted as select options */
  removalReasonOptions: PropTypes.arrayOf(
    PropTypes.shape({
      /** Select option label */
      label: PropTypes.string.isRequired,
      /** Select option value */
      value: PropTypes.string.isRequired
    })
  ).isRequired,
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
    isBenify: PropTypes.bool,
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
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default compose(withI18n(), withRouter)(ReturnProduct);
