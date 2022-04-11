import LocaleKeys from '../../../locales/keys';
import { CONFIGURATION } from 'selfcare-core/src/constants/configuration.constants';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import Card from 'selfcare-ui/src/components/card/card';
import CardSelection from 'selfcare-ui/src/components/cardSelection/card.selection';
import Notice from 'selfcare-ui/src/components/notice/notice';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import { formatCurrency } from 'selfcare-ui/src/utilities/localization/currency';
import { withI18n } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import replace from 'ramda/src/replace';
import PropTypes from 'prop-types';
import { COUNTRY_GROUP_REGEX } from  '../../roamingDetails/roaming.constants';
import './purchase.roaming.scss';

const PurchaseRoaming = ({
  apiFault,
  availableRoamLikeHome,
  availableInternationalRoaming,
  defaultPaymentInstrument,
  roamingByServiceId,
  internatinalRoamingId,
  roamLikeHomeId,
  selectedProduct,
  showConfirmationExternally,
  submitOrder,
  t,
  updateAddOn,
  countryGroup
}) => {
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [useRoamLikeHome, setRoamLikeHome] = useState(false);
  const [availableOptions, setAvailableOptions] = useState([]);

  useEffect(() => {
    const serviceIdentifier = path(['serviceIdentifier'], selectedProduct);
    const currentRoamingData = pathOr({}, [serviceIdentifier], roamingByServiceId);
    if (availableRoamLikeHome.length && !currentRoamingData.hasRoamLikeHome) {
      setAvailableOptions(availableRoamLikeHome);
      setRoamLikeHome(true);
    } else if (availableInternationalRoaming.length && !currentRoamingData.hasRoamForHere) {
      if (countryGroup) {
        const filteredAvailableOptions =
          availableInternationalRoaming.filter((item) => {
            let itemGroup = item.cardHeader.match(COUNTRY_GROUP_REGEX);

            if (itemGroup && itemGroup.length > 1) {
              itemGroup = itemGroup[1]; // index 1 has the 1st (and only) "capturing group" of the regex
              itemGroup = replace(/,/, '.', itemGroup); // country group has . instead of , - hence the replace

              return itemGroup === countryGroup;
            }

            return false;
          });

        setAvailableOptions(filteredAvailableOptions);
      } else {
        setAvailableOptions([]);
      }

      setRoamLikeHome(false);
    } else {
      setAvailableOptions([]);
    }
    setShowConfirmation(false);
  }, [availableRoamLikeHome, availableInternationalRoaming, roamingByServiceId, selectedProduct, countryGroup]);

  const selectRoaming = (id, isDeselect) => {
    const foundDecision = availableOptions.find((option) => option.id.toString() === id);
    setSelectedDecision(isDeselect ? null : foundDecision);
  };

  const getRoaming = async () => {
    const productServiceIdentifier = pathOr(null, ['serviceIdentifier'], selectedProduct);
    await updateAddOn(productServiceIdentifier, CONFIGURATION.ATTRIBUTE_INFO_FOR_CONNECTED_OPTION, useRoamLikeHome ? roamLikeHomeId : internatinalRoamingId, [{
      id: selectedDecision.id,
      quantity: 1
    }]);
    await submitOrder();
    setSelectedDecision(null);
    setShowConfirmation(true);
    if (showConfirmationExternally) {
      showConfirmationExternally(t(LocaleKeys.PRODUCTS.ROAMING.SUCCESS_DESCRIPTION));
    }
  };

  return (
    <>
      {!apiFault && showConfirmation && !showConfirmationExternally && (
        <Notice
          className="c-purchase-roaming"
          type="success"
          heading={t(LocaleKeys.PRODUCTS.ROAMING.SUCCESS_DESCRIPTION)}
        />
      )}
      {!showConfirmation && Boolean(availableOptions.length) && (
        <Card className="c-purchase-roaming">
          <Paragraph>{t(LocaleKeys.PRODUCTS.ROAMING.DESCRIPTION)}</Paragraph>
          {apiFault && (
            <Notice
              apiFault={apiFault}
              type="error"
              heading={apiFault.translatedMessage}
            />
          )}
          <CardSelection
            deprecatedCards
            simple
            grid
            cards={availableOptions}
            onChange={(id, isDeselect) => selectRoaming(id, isDeselect)}
            maxCardsShown={availableOptions.length}
            minCardsShown={availableOptions.length}
          />
          {selectedDecision ? (
            <Paragraph>
              {t(LocaleKeys.PRODUCTS.ROAMING.DEFAULT_PAYMENT_METHOD_WITH_DECISION, {
                productName: selectedDecision.name,
                formattedCost: formatCurrency(selectedDecision.cost, selectedDecision.currencyCode, selectedDecision.currencyLocale),
                defaultPaymentMethodName: pathOr('', ['Name'], defaultPaymentInstrument)
              })}
            </Paragraph>
          ) : (
            <Paragraph>
              {t(LocaleKeys.PRODUCTS.ROAMING.DEFAULT_PAYMENT_METHOD, {
                defaultPaymentMethodName: pathOr('', ['Name'], defaultPaymentInstrument)
              })}
            </Paragraph>
          )}

          <FilledButton className="c-purchase-roaming__button" onClick={getRoaming} disabled={!selectedDecision}>
            {t(LocaleKeys.PURCHASE)}
          </FilledButton>
        </Card>
      )}
    </>
  );
};

PurchaseRoaming.propTypes = {
  /** An error message response kicked back from an API call */
  apiFault: PropTypes.shape({
    translatedMessage: PropTypes.string.isRequired,
    Code: PropTypes.number.isRequired
  }),
  /** The selected locale */
  availableRoamLikeHome: PropTypes.arrayOf(PropTypes.shape({
    /** Id of the roam like home add on */
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
  /** Function to retrieve the selected products usage details */
  availableInternationalRoaming: PropTypes.arrayOf(PropTypes.shape({
    /** Id of the international roaming add on */
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
  /** Returns the current default payment instrument */
  defaultPaymentInstrument: PropTypes.object,
  /** Returns object referenced by phone number to determine if current service has roaming data. */
  roamingByServiceId: PropTypes.object,
  /** Id for the international roaming service feature */
  internatinalRoamingId: PropTypes.number,
  /** Id for the roam like home service feature */
  roamLikeHomeId: PropTypes.number,
  /** Selected product as defined by the identifier value in the list of products */
  selectedProduct: PropTypes.shape({
    /** The service identifier to get usage data */
    serviceIdentifier: PropTypes.string
  }),
  /** A callback function which takes, as an argument, the confirmation message string to be displayed elsewhere */
  showConfirmationExternally: PropTypes.func,
  /** Action to submit a change of order. */
  submitOrder: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Updates the pricing plan quantities for an add-on */
  updateAddOn: PropTypes.func.isRequired,
  /** Country group for filtering international offers */
  countryGroup: PropTypes.string.isRequired
};



export default withI18n()(PurchaseRoaming);
