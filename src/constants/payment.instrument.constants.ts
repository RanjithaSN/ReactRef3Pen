import AppConfig from 'AppConfig';

export const AUTOPAY_STATUS = {
  ENABLED: 'ENABLED',
  DISABLED: 'DISABLED',
  SUSPENDED: 'SUSPENDED'
};

export const ADYEN_DEVICE_TYPE = {
  IOS: 26,
  ANDROID: 16,
  WEB: 10044
};

export const ENVIRONMENT = AppConfig.ADYEN_ENV;
export const ADYEN_ORIGIN_KEY = AppConfig.ADYEN_ORIGIN_KEY;
