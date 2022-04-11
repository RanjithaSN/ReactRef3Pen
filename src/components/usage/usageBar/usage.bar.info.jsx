import classNames from 'classnames';
import PropTypes from 'prop-types';
import path from 'ramda/src/path';
import React from 'react';
import { withI18n } from 'react-i18next';
import Number from 'selfcare-ui/src/components/number/number';
import UsageBar from 'selfcare-ui/src/components/usageBar/usage.bar';
import { formatDate } from 'selfcare-ui/src/utilities/localization/datetime';
import { formatNumber } from 'selfcare-ui/src/utilities/localization/number';
import LocaleKeys from '../../../locales/keys';
import { ENTITLEMENT_ADDITIONAL_DATA, ENTITLEMENT_UNIT_TYPE, ROLLOVER_VALIDITY_IN_MONTHS, validEntitlementName } from '../../../redux/products/products.constants';
import './usage.bar.info.scss';

const checkDisplayStatus = (entitlement, roamingData) => {
  const entitlements = path(['entitlements'], roamingData);
  return (
    validEntitlementName(entitlement.EntitlementName) || (entitlements && entitlements.some((roamEntitlement) => {
      return path(['EntitlementIdentifier', 'EntitlementId'], roamEntitlement) === path(['EntitlementIdentifier', 'EntitlementId'], entitlement);
    }))
  );
};

const renderEntitlementHeader = (bonusData, entitlement, rolloverData, t) => {
  if (entitlement.BalanceUnitCode === ENTITLEMENT_UNIT_TYPE.MOBILE_DATA && !ENTITLEMENT_ADDITIONAL_DATA.includes(entitlement.EntitlementName)) {
    if (bonusData && path(['EntitlementIdentifier', 'SubscriberProductId'], entitlement) === path(['EntitlementIdentifier', 'SubscriberProductId'], bonusData)) {
      return t(LocaleKeys.USAGE.BONUS);
    }
    if (rolloverData) {
      const entitlementDate = new Date(entitlement.ExpirationDate);
      entitlementDate.setMonth(entitlementDate.getMonth() - ROLLOVER_VALIDITY_IN_MONTHS);
      return t(LocaleKeys.USAGE.ROLLOVER_MONTH, {
        month: t(LocaleKeys.DATE.MONTHS[entitlementDate.getMonth() + 1])
      });
    }
    return t(LocaleKeys.USAGE.MONTHLY_DATA);
  } else if (ENTITLEMENT_ADDITIONAL_DATA.includes(entitlement.EntitlementName)) {
    return t(LocaleKeys.USAGE.ADDON_DATA);
  } else {
    return t(LocaleKeys.USAGE.ROAMING);
  }
};

const UsageBarInfo = ({ bonusData, className, entitlement, locale, roamingData, rolloverData, t }) => {
  return checkDisplayStatus(entitlement, roamingData) ? (
    <div className={classNames('c-usage-bar-info', className)}>
      <div className="c-usage-bar-info__cell">
        <div className="c-usage-bar-info__title">
          {renderEntitlementHeader(bonusData, entitlement, rolloverData, t)}
        </div>
        <UsageBar
          className="c-usage-bar-info__bar"
          total={entitlement.InitialBalance}
          used={entitlement.BalanceConsumed || 0}
          unlimited={entitlement.Unlimited}
        />
        <div className="c-usage-bar-info__usage">
          <div className="c-usage-bar-info__usage-label">
            <span className="c-usage-bar-info__usage-label--consumed">
              <Number value={entitlement.BalanceConsumed || 0} locale={locale} />
            </span>
            <span className="c-usage-bar-info__usage-label--available">
              {t(LocaleKeys.USAGE.USAGE_TOTAL, {
                total: formatNumber(entitlement.InitialBalance, locale),
                unit: entitlement.unitOfMeasure
              })}
            </span>
          </div>
          <div className="c-usage-bar-info__expiration-date">
            {Boolean(entitlement.ExpirationDate) && t(LocaleKeys.USAGE.EXPIRES, {
              date: formatDate(new Date(entitlement.ExpirationDate), locale)
            })}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

UsageBarInfo.displayName = 'UsageBarInfo';
UsageBarInfo.propTypes = {
  /** The bonus data for the selected product */
  bonusData: PropTypes.object,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** The array of entitlements to be displayed. These are a property of the selected service object, typically */
  entitlement: PropTypes.shape({
    /** the amount consumed in the current billing cycle, maybe undefined if none has been used. */
    BalanceConsumed: PropTypes.number,
    /** name of the entitilement */
    EntitlementName: PropTypes.string,
    /** end date of the current billing cycle */
    ExpirationDate: PropTypes.string,
    /** initial amount available to the customer */
    InitialBalance: PropTypes.number,
    /** true if unlimited */
    Unlimited: PropTypes.bool,
    /** unit of measure for InitialBalance and BalancedConsumed */
    unitOfMeasure: PropTypes.string
  }).isRequired,
  /** The locale with which to render the date. */
  locale: PropTypes.string.isRequired,
  /** roaming status for current product */
  roamingData: PropTypes.shape({
    entitlements: PropTypes.array
  }),
  /** Whether this is the main data entitlement to render the usage */
  rolloverData: PropTypes.bool,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default withI18n()(UsageBarInfo);
