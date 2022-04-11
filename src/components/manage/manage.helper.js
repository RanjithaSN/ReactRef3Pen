import i18next from 'i18next';
import React from 'react';
import IconBoxOpen from 'selfcare-ui/src/icons/react-icons/box-open';
import IconPaymentMethods from 'selfcare-ui/src/icons/react-icons/payment-methods';
import IconRefresh from 'selfcare-ui/src/icons/react-icons/refresh';
import IconSpeech from 'selfcare-ui/src/icons/react-icons/speech';
import LocaleKeys from '../../locales/keys';
import { getAccountNavItem, getBillingNavItem, getSupportRequestsCreate } from '../../navigation/sitemap.selectors';

export const GetSubscriberDetailsList = (subscriber, displayMobilePhone) => {
  return subscriber ? [{
    label: i18next.t(LocaleKeys.SUBSCRIBER.NAME),
    value: `${subscriber.FirstName} ${subscriber.LastName}`
  }, {
    label: i18next.t(LocaleKeys.SUBSCRIBER.CONTACT_PHONE_NUMNER),
    value: displayMobilePhone
  }
  ] : [];
};

export const GetLoginInformationList = (subscriber) => {
  return subscriber ? [{
    label: i18next.t(LocaleKeys.SUBSCRIBER.LOGIN),
    value: subscriber.Login
  }, {
    label: i18next.t(LocaleKeys.SUBSCRIBER.PASSWORD),
    value: '********'
  }] : [];
};

export const generateQuickActions = (showAutoPay) => {
  const quickActions = [{
    id: 'payMyBill',
    to: getBillingNavItem().url,
    icon: <IconPaymentMethods />,
    name: i18next.t(LocaleKeys.BALANCE.PAY_MY_BILL)
  },
  {
    id: 'returns',
    to: getAccountNavItem().url,
    icon: <IconBoxOpen />,
    name: i18next.t(LocaleKeys.QUICK_ACTIONS.RETURNS)
  },
  {
    id: 'contactSupport',
    to: getSupportRequestsCreate().url,
    icon: <IconSpeech />,
    name: i18next.t(LocaleKeys.QUICK_ACTIONS.CONTACT_SUPPORT)
  }];

  if (showAutoPay) {
    quickActions.splice(0, 0, {
      id: 'setupAutopay',
      to: getBillingNavItem().url,
      icon: <IconRefresh />,
      name: i18next.t(LocaleKeys.EDIT_AUTOPAY.SETUP_AUTOPAY)
    });
  }

  return quickActions;
};
