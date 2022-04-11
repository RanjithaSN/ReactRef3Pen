import { OFFERING_OVERALL_STATUS } from '@selfcare/core/redux/subscriberOfferings/subscriber.offering.constants';
import i18next from 'i18next';
import LocaleKeys from '../../locales/keys';

export const getLocaleToUseForStatusIndicator = (product) => {
  if (product.status === OFFERING_OVERALL_STATUS.ORDER_PENDING) {
    return null;
  }

  const isPendingRemoval = OFFERING_OVERALL_STATUS.PENDING_PRIMARY_REMOVAL === product.status;
  const isPendingDowngrade = OFFERING_OVERALL_STATUS.PENDING_PRIMARY_DOWNGRADE === product.status;
  const isPendingPause = OFFERING_OVERALL_STATUS.PENDING_PRIMARY_PAUSE === product.status;
  const isPaused = OFFERING_OVERALL_STATUS.SUSPENDED === product.status || (product.isPennyPlay && product.canOptOutOnRenew);

  if (isPendingPause) {
    return i18next.t(LocaleKeys.PRODUCTS.STATUS.PENDING_PAUSE, {
      date : product.billing.nextChargeDate
    });
  }

  if (isPaused) {
    return i18next.t(LocaleKeys.PRODUCTS.STATUS.PAUSE);
  }

  if (product.isWireless) {
    if (isPendingRemoval) {
      return i18next.t(LocaleKeys.PRODUCTS.STATUS.DATA_UNTIL, {
        date: product.billing.nextChargeDate
      });
    }

    if (isPendingDowngrade) {
      return i18next.t(LocaleKeys.PRODUCTS.STATUS.DOWNGRADE_ON, {
        date: product.billing.nextChargeDate
      });
    }

    return i18next.t(LocaleKeys.PRODUCTS.STATUS.PENDING_REMOVAL);
  }

  if (product.isBroadband) {
    if (isPendingRemoval) {
      return i18next.t(LocaleKeys.PRODUCTS.STATUS.BROADBAND_UNTIL, {
        date: product.billing.nextChargeDate
      });
    }

    if (isPendingDowngrade) {
      return i18next.t(LocaleKeys.PRODUCTS.STATUS.CHANGE_ON, {
        date: product.billing.nextChargeDate
      });
    }
  }
};
