
export const ENTITLEMENT_NAMES = {
  MOBILE_DATA: 'Penny Data',
  DATA_ADD_ON: 'Data Add-On',
  MOBIL_DATA: 'Mobil Data',
  PROMO_DATA: 'Penny Data Promo',
  CAMPAIGN_DATA: 'Penny Data Campaign',
  SUMMER_PROMO_DATA: 'Penny Summer Data Promo'
};

export const ENTITLEMENT_ADDITIONAL_DATA = [ ENTITLEMENT_NAMES.DATA_ADD_ON, ENTITLEMENT_NAMES.PROMO_DATA, ENTITLEMENT_NAMES.CAMPAIGN_DATA, ENTITLEMENT_NAMES.SUMMER_PROMO_DATA ];

export const ENTITLEMENT_UNIT_TYPE = {
  MOBILE_DATA: '7',
  VOICE_DATA: '1',
  SMS_DATA: '10'
}

export const DECOMMISSIONED_MOBIL_PRODUCTS = [
  'BlackFriday Mobil'
];

export const DECOMMISSIONED_COAX_PRODUCTS = [
  'BlackFriday Coax'
];

export const validEntitlementName = (name) => Object.values(ENTITLEMENT_NAMES).includes(name);

export const ROLLOVER_VALIDITY_IN_MONTHS = 6;

export const ORDER_TYPE_CODE_CHANGE_OF_SERVICE = '8';

export const ORDER_CHANGE_TYPE_CODE_PAUSE = '8';
export const ORDER_CHANGE_TYPE_CODE_RIGHT_TO_RETURN = '6';

export const PRODUCT_METADATA = {
  defaultActivationDate: 'DEFAULT_ACTIVATION_DAYS',
  minActivationDate: 'MIN_ACTIVATION_DAYS',
  maxActivationDate: 'MAX_ACTIVATION_DAYS'
};
