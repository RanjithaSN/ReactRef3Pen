const getEnv = <T>(variableName: string, fallback: T = null, parse?: boolean): T => {
  try {
    const value = process.env[variableName];
    return (parse ? JSON.parse(value) || value : value || fallback) as T;
  } catch (e) {
    return fallback;
  }
};
// Config details
const AppConfig = {
  ACTIVATION: getEnv<string>('ACTIVATION', '1933241639549000100'),
  ADYEN_ENV: getEnv<string>('ADYEN_ENV', 'test'),
  ADYEN_ORIGIN_KEY: getEnv<string>('ADYEN_ORIGIN_KEY', 'test'),
  ADYEN_PAYMENT_INSTRUMENT_BILL_TYPE: getEnv<string>('ADYEN_PAYMENT_INSTRUMENT_BILL_TYPE', '10108'),
  APP_URL: getEnv<string>('APP_URL', 'http://localhost:8001'),
  APP_VERSION: getEnv<number>('BUILD_ID', 1),
  BENIFY_DISTRIBUTION_CHANNEL_ID: getEnv<string>('BENIFY_DISTRIBUTION_CHANNEL_ID', '581eef0f-c261-4b3c-a760-e7a7a54a486f'),
  BILLING_DISPUTE: getEnv<string>('BILLING_DISPUTE', '3'),
  BONUS_DATA_PRODUCT_VALUE: getEnv<number>('BONUS_DATA_PRODUCT_VALUE', 719434),
  BUSINESS_UNIT: getEnv<string>('BUSINESS_UNIT', '40ae44f2-3185-486e-9c62-b2629728afd0'),
  CDN_API_URL: getEnv<number>('CDN_API_URL', null),
  CLOUD_SEARCH_ORIGIN_KEY: getEnv<number>('CLOUD_SEARCH_ORIGIN_KEY', null),
  COMPLAINT: getEnv<string>('COMPLAINT', '2'),
  DEFAULT_LOCALE: getEnv<string>('DEFAULT_LOCALE', 'en-US'),
  DISMISS_NOTIFICATIONS_ENDPOINT: getEnv<string>('DISMISS_NOTIFICATIONS_ENDPOINT', null),
  DISTRIBUTION_CHANNEL_ID: getEnv<string>('DISTRIBUTION_CHANNEL_ID', '99B5F519-F6DD-405B-B66D-7457BD1944CC'),
  ENABLE_DISCOUNTS: getEnv<string>('ENABLE_DISCOUNTS', 'true'),
  ENVIRONMENT_NAME: getEnv<string>('ENVIRONMENT_NAME', 'tst1'),
  FAILED_PAYMENT: getEnv<string>('FAILED_PAYMENT', '1931356255556000000'),
  FUTURE_ACTIVATION_DATE_ID: getEnv<string>('FUTURE_ACTIVATION_DATE_ID', '2020936572110000009'),
  FUTURE_ACTIVATION_DATE_SERVICE_ATTRIBUTE_ID: getEnv<number>('FUTURE_ACTIVATION_DATE_SERVICE_ATTRIBUTE_ID', 1000280, true),
  GOOGLE_API_PUBLIC_SITE_KEY: getEnv<string>('GOOGLE_API_PUBLIC_SITE_KEY', '6LfMNPkUAAAAAJz385xSk7qizdOyNaGKgoH-BuFE', true),
  INVOICE_DISPUTE: getEnv<string>('INVOICE_DISPUTE', '4'),
  IN_APP_NOTIFICATIONS_ENDPOINT: getEnv<string>('IN_APP_NOTIFICATIONS_ENDPOINT', null),
  KITEWHEEL_LISTENER_ID: getEnv<string>('KITEWHEEL_LISTENER_ID', 'a11160799c8ff37feed1c1d8b9f554a0'),
  MAXIMUM_REQUEST_PAGE_SIZE: getEnv<number>('MAXIMUM_REQUEST_PAGE_SIZE', 3000),
  MECENAT_URL: getEnv<string>('MECENAT_URL', null),
  METADATA_URL: getEnv<string>('METADATA_URL', null),
  MOBILE_NUMBER_PORT: getEnv<string>('MOBILE_NUMBER_PORT', '1927519074395000300'),
  MOBILE_SERVICE_IDENTIFIER: getEnv<string>('MOBILE_SERVICE_IDENTIFIER', '1933241639549000101'),
  OFFER_INSTANCE_ID: getEnv<string>('OFFER_INSTANCE_ID', '1931356255556000003'),
  PAYMENT_DETAILS_URL: getEnv<string>('PAYMENT_DETAILS_URL', null),
  PAYMENT_RETRY_STATUS: getEnv<string>('PAYMENT_RETRY_STATUS', '2026120007625000801'),
  PAYMENT_RETRY_SUCCESS_ID: getEnv<number>('PAYMENT_RETRY_SUCCESS_ID', null, true),
  PAYMENT_RETRY_SUCCESS_ID_OLD_LOGIC: getEnv<number>('PAYMENT_RETRY_SUCCESS_ID', null, true),
  PORT_IN_DATE_ATTRIBUTE_ID: getEnv<number>('PORT_IN_DATE_ATTRIBUTE_ID', 1928471569708000003),
  PORT_IN_INTENT: getEnv<number>('PORT_IN_INTENT', 1000144, true),
  PORT_IN_NUMBER: getEnv<number>('PORT_IN_NUMBER', 1000269),
  PORT_IN_NUMBER_CLOSED_ATTRIBUTE_ID: getEnv<string>('PORT_IN_NUMBER_CLOSED_ATTRIBUTE_ID', null),
  PORT_IN_SERVICE_ATTRIBUTE_ID: getEnv<number>('PORT_IN_SERVICE_ATTRIBUTE_ID', 1003838),
  RAYGUN_API_KEY: getEnv<string>('RAYGUN_API_KEY', 'tJ5Keu02U8ss83hCK5x36g'),
  RELEASE_VERSION: getEnv<number>('RELEASE_ID', 1),
  RIGHT_TO_RETURN_DAYS: getEnv<number>('RIGHT_TO_RETURN_DAYS', 14, true),
  SERVICE_ATTRIBUTE_ID: getEnv<number>('SERVICE_ATTRIBUTE_ID', 1000278),
  SERVICE_IDENTIFIER: getEnv<string>('SERVICE_IDENTIFIER', '1933241639549000103'),
  SERVICE_URL: getEnv<string>('SERVICE_URL', null),
  STUB_URL: getEnv<string>('STUB_URL', null),
  SYSTEM_ID: getEnv<string>('SYSTEM_ID', '40ae44f2-3185-486e-9c62-b2629728afd0'),
  TELE2_AUTH_URL: getEnv<string>('TELE2_AUTH_URL', null),
  TELE2_URL: getEnv<string>('TELE2_URL', null),
  TROUBLE: getEnv<string>('TROUBLE', '1'),
  TROUBLESHOOTER_ENDPOINT: getEnv<string>('TROUBLESHOOTER_ENDPOINT', null),
  UNPAUSE_REASON_CODE: getEnv<number>('UNPAUSE_REASON_CODE', 10315, true),
  USE_RECAPTCHA: getEnv<boolean>('USE_RECAPTCHA', true, true),
  ZEN_DESK_KEY: getEnv<string>('ZEN_DESK_KEY', '894b3c82-08d4-467f-b923-5adc9c7cbeee')
};

export default AppConfig;