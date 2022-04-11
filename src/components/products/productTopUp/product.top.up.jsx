import LocaleKeys from '../../../locales/keys';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import CardSelection from 'selfcare-ui/src/components/cardSelection/card.selection';
import { CONFIGURATION } from 'selfcare-core/src/constants/configuration.constants';
import Notice from 'selfcare-ui/src/components/notice/notice';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import { formatCurrency } from 'selfcare-ui/src/utilities/localization/currency';
import { withI18n } from 'react-i18next';
import React, { useState } from 'react';
import pathOr from 'ramda/src/pathOr';
import PropTypes from 'prop-types';
import './product.top.up.scss';

const ProductTopUp = ({ apiFault, defaultPaymentInstrument, selectedProduct, showConfirmationExternally, submitOrder, t, topUps, topUpId, updateAddOn }) => {
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const updateDecisionForTopUp = (id, isDeselect) => {
    const foundDecision = topUps.find((pc) => pc.id.toString() === id);
    setSelectedDecision(isDeselect ? null : foundDecision);
    setShowConfirmation(false);
  };

  const updateCartAndSubmit = async () => {
    const productServiceIdentifier = pathOr(null, ['serviceIdentifier'], selectedProduct);
    await updateAddOn(productServiceIdentifier, CONFIGURATION.ATTRIBUTE_INFO_FOR_CONNECTED_OPTION, topUpId, [{
      id: selectedDecision.id,
      quantity: 1
    }]);
    await submitOrder();
    setSelectedDecision(null);
    setShowConfirmation(true);
    if (showConfirmationExternally) {
      showConfirmationExternally(t(LocaleKeys.PRODUCTS.BUY_MORE_DATA.SUCCESS_DESCRIPTION));
    }
  };

  return (
    <React.Fragment>
      <Paragraph className="c-product-top-up__heading">{t(LocaleKeys.PRODUCTS.BUY_MORE_DATA.INTRO)}</Paragraph>
      {apiFault && (
        <Notice
          apiFault={apiFault}
          type="error"
          heading={apiFault.translatedMessage}
        />
      )}
      {!apiFault && showConfirmation && !showConfirmationExternally && (
        <Notice
          type="success"
          heading={t(LocaleKeys.PRODUCTS.BUY_MORE_DATA.SUCCESS_DESCRIPTION)}
        />
      )}
      <CardSelection
        simple
        deprecatedCards
        twoStack
        grid
        cards={topUps}
        onChange={(id, isDeselect) => updateDecisionForTopUp(id, isDeselect)}
        maxCardsShown={topUps.length}
        minCardsShown={topUps.length}
      />
      {selectedDecision ? (
        <Paragraph className="c-product-top-up__default-method">
          {t(LocaleKeys.PRODUCTS.BUY_MORE_DATA.DEFAULT_PAYMENT_METHOD_WITH_DECISION, {
            productName: selectedDecision.name,
            formattedCost: formatCurrency(selectedDecision.cost, selectedDecision.currencyCode, selectedDecision.currencyLocale),
            defaultPaymentMethodName: pathOr('', ['Name'], defaultPaymentInstrument)
          })}
        </Paragraph>
      ) : (
        <Paragraph className="c-product-top-up__default-method">
          {t(LocaleKeys.PRODUCTS.BUY_MORE_DATA.DEFAULT_PAYMENT_METHOD, {
            defaultPaymentMethodName: pathOr('', ['Name'], defaultPaymentInstrument)
          })}
        </Paragraph>
      )}

      <FilledButton
        className="c-product-top-up__purchase-button"
        onClick={updateCartAndSubmit}
        disabled={!selectedDecision}
      >
        {t(LocaleKeys.PURCHASE)}
      </FilledButton>
    </React.Fragment>
  );
};

ProductTopUp.propTypes = {
  /** An error message response kicked back from an API call */
  apiFault: PropTypes.shape({
    translatedMessage: PropTypes.string.isRequired,
    Code: PropTypes.number.isRequired
  }),
  /** Returns the current default payment instrument */
  defaultPaymentInstrument: PropTypes.object,
  /** Selected product as defined by the identifier value in the list of products */
  selectedProduct: PropTypes.shape({
    /** Offering instance id associated to the product */
    id: PropTypes.string,
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
    /** Flag to determine if a use can opt out of the renewal at the end of the billing cycle. */
    canOptOutOnRenew: PropTypes.bool,
    /** The currency code for the product */
    currencyCode: PropTypes.string,
    /** The display name for the product, will be related to the decision option. */
    displayName: PropTypes.string,
    /** The selected option Id on the primary decision. */
    hasPrimaryOption: PropTypes.string,
    /** Flag to tell us if it is broadband */
    isBroadband: PropTypes.bool,
    /** Flag to tell us if it is wireless */
    isWireless: PropTypes.bool,
    /** Plan name to use for the product. */
    planName: PropTypes.string,
    /** The name for the product */
    productName: PropTypes.string,
    /** The offering instance id of the product */
    offeringInstanceId: PropTypes.string,
    /** Service Identifier for the product. Also called the phone number. */
    serviceIdentifier: PropTypes.string,
    /** Status of the offering. */
    status: PropTypes.number,
    /** Thumbnail url associated to the offer */
    thumbnailUrl: PropTypes.string
  }),
  /** A callback function which takes, as an argument, the confirmation message string to be displayed elsewhere */
  showConfirmationExternally: PropTypes.func,
  /** Action to submit a change of order. */
  submitOrder: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Id for the top up service feature */
  topUpId: PropTypes.number,
  /** List of top ups available to the customer */
  topUps: PropTypes.arrayOf(PropTypes.shape({
    /** Id of the top up add on */
    id: PropTypes.string,
    /** Card header for option */
    cardHeader: PropTypes.string,
    /** Cost of the option */
    cost: PropTypes.number,
    /** Currency code for the option */
    currencyCode: PropTypes.string,
    /** Currency locale for the option */
    currencyLocale: PropTypes.string
  })),
  /** Updates the pricing plan quantities for an add-on */
  updateAddOn: PropTypes.func.isRequired
};

export default withI18n()(ProductTopUp);
