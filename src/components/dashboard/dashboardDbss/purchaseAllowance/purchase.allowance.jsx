import { FallbackCurrencyLocale } from '@selfcare/core/constants/transaction.constants';
import LocaleKeys from '../../../../locales/keys';
import { getAllowanceViewData } from '../../../shop/decision/decision.options.helper';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import CardSelection from 'selfcare-ui/src/components/cardSelection/card.selection';
import ExpandableSection from 'selfcare-ui/src/components/expandableSection/expandable.section';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Notice from 'selfcare-ui/src/components/notice/notice';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import { formatCurrency } from 'selfcare-ui/src/utilities/localization/currency';
import { withI18n } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './purchase.allowance.scss';
import Stack from 'ui/components/stack/stack';

const PurchaseAllowance = ({ allowanceProduct, allowanceCartUpdate, apiFault, clearOrderingData, decisionBeingModified, isDesktopSize, isSubmittingOrder, purchasableAllowanceProduct, submitOrder, refreshSubscriberOfferings, t, updatedQuotesForDecision }) => {
  const [formattedDecisionsForSelection, setFormattedDecisionsForSelection] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [validChange, setValidChange] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (purchasableAllowanceProduct) {
      setFormattedDecisionsForSelection(getAllowanceViewData(purchasableAllowanceProduct));
    }
  }, [purchasableAllowanceProduct]);

  useEffect(() => {
    return () => clearOrderingData();
  }, [clearOrderingData]);

  const submitAllowanceOrder = async (validationCode) => {
    if (validChange && validationCode !== null) {
      const offering = allowanceProduct.offeringInstanceId ? {
        OfferingId: allowanceProduct.offeringId,
        OfferingInstanceId: allowanceProduct.offeringInstanceId
      } : null;

      setSubmitted(true);
      await submitOrder();

      if (!apiFault) {
        setShowConfirmation(true);
        await refreshSubscriberOfferings(offering);
      }
      setSelectedOptionId(null);
      setValidChange(false);
    }
  };

  const updateDecisionForOffer = async (optionId, isDeselect) => {
    if (!optionId) {
      setValidChange(false);
      setSelectedOptionId(null);
      await clearOrderingData();
    } else if (optionId !== selectedOptionId) {
      setValidChange(!isDeselect);
      setShowConfirmation(false);
      setSelectedOptionId(optionId);

      if (isDeselect) {
        await clearOrderingData();
      }

      if (!isDeselect) {
        await allowanceCartUpdate(optionId);
      }
    }
  };

  const allowanceHeader = () => (
    <Heading
      category="minor"
      tone="normal"
      className={classNames('c-allowance__content', {
        'c-allowance__content__desktop': isDesktopSize
      })}
    >
      {`${t(LocaleKeys.DASHBOARD.BALANCE)} `}
      {<span className="c-allowance-amount">{formatCurrency(allowanceProduct.currentBalance || 0, FallbackCurrencyLocale)}</span>}
    </Heading>
  );

  const allowanceBody = () => (
    <Stack>
      <LoadingIndicator isLoading={decisionBeingModified || isSubmittingOrder} />
      <Paragraph className="c-allowance__description">{t(LocaleKeys.DASHBOARD.ALLOWANCE_DESCRIPTION)}</Paragraph>
      {!!Object.values(allowanceProduct).length && !allowanceProduct.canAddAllowance && <Paragraph className="c-allowance__content">{t(LocaleKeys.DASHBOARD.ALLOWANCE_RESTRICTED)}</Paragraph>}
      {(!Object.values(allowanceProduct).length || allowanceProduct.canAddAllowance) && !!formattedDecisionsForSelection.length && (
        <>
          {submitted && apiFault && (
            <Notice
              apiFault={apiFault}
              className="c-allowance__notice"
              type="error"
              heading={apiFault.translatedMessage}
            />
          )}
          {submitted && showConfirmation && <Notice className="c-allowance__notice" type="success" heading={t(LocaleKeys.DASHBOARD.ALLOWANCE_SUCCESS_DESCRIPTION)} />}
          <CardSelection
            simple
            grid
            twoStack
            deprecatedCards
            defaultSelectedId={showConfirmation ? null : selectedOptionId}
            cards={formattedDecisionsForSelection}
            onChange={(id, isDeselect) => updateDecisionForOffer(id, isDeselect)}
            maxCardsShown={formattedDecisionsForSelection.length}
            minCardsShown={formattedDecisionsForSelection.length}
          />
          {updatedQuotesForDecision && !showConfirmation && (
            <Paragraph className="c-allowance__quote-information">
              {t(LocaleKeys.DASHBOARD.ALLOWANCE_QUOTE_INFORMATION, {
                name: updatedQuotesForDecision.Name,
                paymentMethod: updatedQuotesForDecision.PaymentMethod
              })}
            </Paragraph>
          )}
          <FilledButton
            className="c-allowance__action"
            disabled={!validChange || !updatedQuotesForDecision}
            onClick={submitAllowanceOrder}
          >
            {t(LocaleKeys.PURCHASE)}
          </FilledButton>
        </>
      )}
    </Stack>
  );
  return (
    <>
      <Heading key="allowance_heading" className="c-allowance__heading" category="major">{t(LocaleKeys.BILLING.ALLOWANCE)}</Heading>
      <Heading key="allowance_intro" className="c-allowance__sub-heading" cateogy="minor" tone="normal">
        {t(LocaleKeys.DASHBOARD.ALLOWANCE_INTRO)}
      </Heading>
      {!isDesktopSize && (
        <ExpandableSection
          hideButton={false}
          key={t(LocaleKeys.DASHBOARD.BALANCE)}
          className="c-allowance c-loading-indicator-containment"
          heading={allowanceHeader()}
          body={allowanceBody()}
          highlightButton
        />
      )}
      {isDesktopSize && (
        <>
          {allowanceHeader()}
          {allowanceBody()}
        </>
      )}
    </>
  );
};

PurchaseAllowance.displayName = 'PurchaseAllowance';
PurchaseAllowance.propTypes = {
  /** Action used to get the cart update when adding a balance. */
  allowanceCartUpdate: PropTypes.func.isRequired,
  /** Allowance Product Details on the account. */
  allowanceProduct: PropTypes.shape({
    /** Flag telling us if the user can add allowance or not. */
    canAddAllowance: PropTypes.bool,
    /** Current balance of allowance */
    currentBalance: PropTypes.number,
    /** Offering Id of allowance */
    offeringId: PropTypes.string,
    /** Offering Instance Id of allowance */
    offeringInstanceId: PropTypes.string
  }),
  /** Application fault */
  apiFault: PropTypes.shape({
    translatedMessage: PropTypes.string
  }),
  /** Function used to clear ordering data  */
  clearOrderingData: PropTypes.func.isRequired,
  /** Flag to tell us if allowance quote data is being fetched. */
  decisionBeingModified: PropTypes.bool,
  /** True if desktop sized. */
  isDesktopSize: PropTypes.bool,
  /** Flag to tell us if the order is submitting or not. */
  isSubmittingOrder: PropTypes.bool,
  /** Allowance product that can be purchased. */
  purchasableAllowanceProduct: PropTypes.object,
  /** Action to refresh subscriber offerings. */
  refreshSubscriberOfferings: PropTypes.func.isRequired,
  /** Function used to submit an order to purchase more allowance */
  submitOrder: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Updated quotes for allowance purchase */
  updatedQuotesForDecision: PropTypes.shape({
    /** Name of decision that is selected */
    Name: PropTypes.string,
    /** Payment method on the account */
    PaymentMethod: PropTypes.string,
    /** Currency for decision */
    Currency: PropTypes.string,
    ExternalBillerInfo: PropTypes.object
  })
};

export default withI18n()(PurchaseAllowance);
