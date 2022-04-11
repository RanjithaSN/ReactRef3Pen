import i18next from 'i18next';
import React from 'react';
import IconAdded from 'selfcare-ui/src/icons/react-icons/added';
import IconRemoved from 'selfcare-ui/src/icons/react-icons/removed';
import IconCancelled from '../../icons/react-icons/cancelled';
import IconNew from '../../icons/react-icons/new';
import IconOpen from '../../icons/react-icons/open';
import IconStatusCompleteFilled from '../../icons/react-icons/status-complete-filled';
import LocaleKeys from '../../locales/keys';
import { STATUS_FILL_OPTIONS, STATUS_TYPES } from './status.indicator.constants';

const getOfferingTypeStatuses = (customLabel) => {
  return [{
    id: 1,
    label: customLabel || i18next.t(LocaleKeys.STATUSES.ACTIVE)
  }, {
    id: 3,
    label: customLabel || i18next.t(LocaleKeys.STATUSES.PENDING_ACTIVE)
  }, {
    id: 4,
    label: customLabel || i18next.t(LocaleKeys.STATUSES.PENDING_REMOVAL)
  }, {
    id: 2,
    label: customLabel || i18next.t(LocaleKeys.STATUSES.REMOVED)
  }, {
    id: 5,
    label: customLabel || i18next.t(LocaleKeys.STATUSES.EXPIRED)
  }, {
    id: 6,
    label: customLabel || i18next.t(LocaleKeys.STATUSES.SUSPENDED)
  }, {
    id: 44,
    label: customLabel || i18next.t(LocaleKeys.STATUSES.SUSPENDED)
  }, {
    id: 33,
    label: customLabel || i18next.t(LocaleKeys.STATUSES.PENDING_ACTIVE)
  }, {
    id: 35,
    label: customLabel || i18next.t(LocaleKeys.STATUSES.PENDING_PAUSE)
  }];
};

const getOrderTypeStatuses = () => {
  return [{
    id: 0,
    label: i18next.t(LocaleKeys.STATUSES.PENDING_ACTIVE),
    icon: <IconOpen />,
    fill: STATUS_FILL_OPTIONS.WARNING
  }, {
    id: 1,
    label: i18next.t(LocaleKeys.STATUSES.OPEN),
    icon: <IconOpen />,
    fill: STATUS_FILL_OPTIONS.WARNING
  }, {
    id: 2,
    label: i18next.t(LocaleKeys.STATUSES.COMPLETED),
    icon: <IconStatusCompleteFilled />,
    fill: STATUS_FILL_OPTIONS.SUCCESS
  }, {
    id: 3,
    label: i18next.t(LocaleKeys.STATUSES.CANCELLED),
    icon: <IconCancelled />,
    fill: STATUS_FILL_OPTIONS.ERROR
  }];
};

const getOrderItemTypeStatuses = () => {
  return [{
    id: 1,
    label: i18next.t(LocaleKeys.STATUSES.ADDED_TO_PLAN),
    icon: <IconAdded />,
    fill: STATUS_FILL_OPTIONS.SUCCESS
  }, {
    id: 2,
    label: i18next.t(LocaleKeys.STATUSES.REMOVED_FROM_PLAN),
    icon: <IconRemoved />,
    fill: STATUS_FILL_OPTIONS.ERROR
  }];
};

const getSupportRequestTypeStatuses = () => {
  return [{
    id: 1,
    label: i18next.t(LocaleKeys.STATUSES.NEW),
    icon: <IconNew />,
    fill: STATUS_FILL_OPTIONS.INFO
  }, {
    id: 2,
    label: i18next.t(LocaleKeys.STATUSES.OPEN),
    icon: <IconOpen />,
    fill: STATUS_FILL_OPTIONS.INFO
  }, {
    id: 3,
    label: i18next.t(LocaleKeys.STATUSES.RESOLVED),
    icon: <IconStatusCompleteFilled />,
    fill: STATUS_FILL_OPTIONS.SUCCESS
  }, {
    id: 4,
    label: i18next.t(LocaleKeys.STATUSES.CANCELLED),
    icon: <IconCancelled />,
    fill: STATUS_FILL_OPTIONS.ERROR
  }];
};

const getSubscriberDeviceStatuses = () => {
  return [{
    id: 1,
    label: i18next.t(LocaleKeys.STATUSES.ACTIVE),
    icon: <IconStatusCompleteFilled />,
    fill: STATUS_FILL_OPTIONS.SUCCESS
  }, {
    id: 2,
    label: i18next.t(LocaleKeys.STATUSES.REMOVED),
    icon: <IconCancelled />,
    fill: STATUS_FILL_OPTIONS.ERROR
  }, {
    id: 3,
    label: i18next.t(LocaleKeys.STATUSES.SUSPENDED),
    icon: <IconOpen />,
    fill: STATUS_FILL_OPTIONS.WARNING
  }, {
    id: 4,
    label: i18next.t(LocaleKeys.STATUSES.PENDING_ACTIVATION),
    icon: <IconOpen />,
    fill: STATUS_FILL_OPTIONS.WARNING
  }];
};

const getPaymentStatuses = () => {
  return [{
    id: 1,
    label: i18next.t(LocaleKeys.STATUSES.PAYMENT_COMPLETE),
    icon: <IconStatusCompleteFilled />,
    fill: STATUS_FILL_OPTIONS.SUCCESS
  }, {
    id: 2,
    label: i18next.t(LocaleKeys.STATUSES.PENDING),
    icon: <IconOpen />,
    fill: STATUS_FILL_OPTIONS.WARNING
  }, {
    id: 3,
    label: i18next.t(LocaleKeys.STATUSES.CANCELLED),
    icon: <IconCancelled />,
    fill: STATUS_FILL_OPTIONS.ERROR
  }];
};

export function getStatusIndicatorToDisplay(type, value, customLabel) {
  let statuses = [];
  switch (type) {
  case STATUS_TYPES.SUPPORT_REQUEST:
    statuses = getSupportRequestTypeStatuses();
    break;
  case STATUS_TYPES.OFFERING:
    statuses = getOfferingTypeStatuses(customLabel);
    break;
  case STATUS_TYPES.DEVICE_SUBSCRIBER_PRODUCT:
    statuses = getSubscriberDeviceStatuses();
    break;
  case STATUS_TYPES.ORDER:
    statuses = getOrderTypeStatuses();
    break;
  case STATUS_TYPES.ORDER_ITEM:
    statuses = getOrderItemTypeStatuses();
    break;
  case STATUS_TYPES.PAYMENT:
    statuses = getPaymentStatuses();
    break;
  default:
    break;
  }

  return statuses.length ? statuses.find(({ id }) => id === value) : null;
}
