import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import Heading from 'selfcare-ui/src/components/heading/heading';
import { formatNumber } from 'selfcare-ui/src/utilities/localization/number';
import LocaleKeys from '../../../locales/keys';
import './product.info.box.scss';

const ProductInfoBox = ({ inSweden, selectedLocale, selectedProductEntitlements, t }) => {
  return (
    <div className="c-product-info-box">
      {!inSweden && (
        <div className="c-product-info-box__data">
          <Heading category="major" tone="quiet">{t(LocaleKeys.USAGE.ROAMING)}</Heading>
          <Heading category="brand" tone="quiet">
            {t(LocaleKeys.USAGE.AMOUNT_LABEL, {
              total: formatNumber(
                selectedProductEntitlements.totalRoamingDataRemaining,
                selectedLocale
              ),
              unitOfMeasure: selectedProductEntitlements.roamingDataUnitOfMeasure
            })}
          </Heading>
        </div>
      )}
      <div className="c-product-info-box__data">
        <Heading category="major" tone="quiet">{t(LocaleKeys.USAGE.MONTHLY_DATA)}</Heading>
        <Heading category="brand" tone="quiet">
          {t(LocaleKeys.USAGE.AMOUNT_LABEL, {
            total: formatNumber(
              selectedProductEntitlements.totalMonthlyDataRemaining,
              selectedLocale
            ),
            unitOfMeasure: selectedProductEntitlements.monthlyDataUnitOfMeasure
          })}
        </Heading>
      </div>
      <div className="c-product-info-box__data">
        <Heading category="major" tone="quiet">{t(LocaleKeys.USAGE.ROLLOVER_DATA)}</Heading>
        <Heading category="brand" tone="quiet">
          {t(LocaleKeys.USAGE.AMOUNT_LABEL, {
            total: formatNumber(selectedProductEntitlements.totalRolloverData, selectedLocale),
            unitOfMeasure: selectedProductEntitlements.rolloverUnitOfMeasure
          })}
        </Heading>
      </div>
    </div>
  );
};

ProductInfoBox.propTypes = {
  /** True if user's current location is Sweden. */
  inSweden: PropTypes.bool,
  /** The selected locale */
  selectedLocale: PropTypes.string.isRequired,
  /** Rolled-up usage data for selected product */
  selectedProductEntitlements: PropTypes.shape({
    /** Value of total monthly data the customer can use */
    totalMonthlyDataRemaining: PropTypes.number,
    /** Unit of measure for total monthly data */
    monthlyDataUnitOfMeasure: PropTypes.string,
    /** Value of rollover data */
    totalRolloverData: PropTypes.number,
    /** Unit of measure for rollover data */
    rolloverUnitOfMeasure: PropTypes.string,
    /** Amount of current roaming remaining data */
    totalRoamingDataRemaining: PropTypes.number,
    /** Unit of measure for roaming data */
    roamingDataUnitOfMeasure: PropTypes.string,
    /** Amount of promo data remaining */
    promoData: PropTypes.number,
    /** Unit of measure for promo data */
    promoUnitOfMeasure: PropTypes.string
  }).isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default withI18n()(ProductInfoBox);
