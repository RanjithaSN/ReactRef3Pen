import i18next from 'i18next';
import LocaleKeys from '../../locales/keys';

export const SUPPORT_REQUEST = {
  DESCRIPTION: 'supportRequestDescription',
  DEVICE_NAME: 'supportRequestDeviceName',
  DEVICE_NUMBER: 'supportRequestDeviceNumber',
  DISPUTE_AMOUNT: 'supportRequestDisputeAmount',
  INVOICE_NUMBER: 'supportRequestInvoiceNumber',
  INVENTORY_ITEM: 'supportRequestInventoryItem',
  TYPE: 'supportRequestType'
};

export const SUPPORT_REQUEST_ICON = {
  NEW: 'new',
  OPEN: 'open',
  COMPLETE: 'complete',
  CANCELLED: 'cancelled'
};

export const SUPPORT_REQUEST_STATUS = {
  NEW: 1,
  OPEN: 2,
  RESOLVED: 3,
  CANCELLED: 4
};

export const supportRequestStatusConfig = () => {
  return [
    {
      id: SUPPORT_REQUEST_STATUS.NEW,
      label: i18next.t(LocaleKeys.SUPPORT_REQUEST.STATUSES.NEW),
      icon: SUPPORT_REQUEST_ICON.NEW
    }, {
      id: SUPPORT_REQUEST_STATUS.OPEN,
      label: i18next.t(LocaleKeys.SUPPORT_REQUEST.STATUSES.OPEN),
      icon: SUPPORT_REQUEST_ICON.OPEN
    }, {
      id: SUPPORT_REQUEST_STATUS.RESOLVED,
      label: i18next.t(LocaleKeys.SUPPORT_REQUEST.STATUSES.RESOLVED),
      icon: SUPPORT_REQUEST_ICON.COMPLETE
    }, {
      id: SUPPORT_REQUEST_STATUS.CANCELLED,
      label: i18next.t(LocaleKeys.SUPPORT_REQUEST.STATUSES.CANCELLED),
      icon: SUPPORT_REQUEST_ICON.CANCELLED
    }
  ];
};

export const PORT_RESPONSE_CODE = {
  SUCCESS: '0',
  OTHER_SUCCESS: '200'
};
export const PORT_FIELD_IDS = {
  NAS_VALIDATION: 'NasValidation',
  RESPONSE_CODE: 'Response Code',
  RESPONSE_MESSAGE: 'ResponseMSG',
  VALIDATED_DATE: 'Validated Date'
};

export const PORT_IN_DISPLAY_ORDERS = {
  CURRENT_MSISDN: 902,
  PORT_TO_MSISDN: 10,
  SSN: 901,
  DATE: 905,
  VALIDATED_DATE: 910
};

export const FAILED_PAYMENT_ATTRIBUTE = {
  NAMES: {
    GracePeriodIndicator: 'gracePeriodIndicator'
  },
  VALUES: {
    Yes: 'Yes'
  }
};

export const RETRY_PAYMENT_STATE = {
  AUTORETRY_IN_PROGRESS: 'AUTORETRY_IN_PROGRESS',
  RETRY_IN_PROGRESS: 'RETRY_IN_PROGRESS',
  RETRY_NOT_IN_PROGRESS: 'RETRY_NOT_IN_PROGRESS'
};
