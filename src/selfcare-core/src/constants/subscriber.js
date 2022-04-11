export const ACCESSED_SUBSCRIBER_ID_HEADER = 'CD-AccessedSubscriberId';
export const ISO_CODE_FOR_SWEDEN = 'SWE';

export const FORMAT_INTERNATIONAL_SWEDISH_MOBILE_REGEX = {
  pattern: /^\+?0/,
  replace: '46'
};

export const FORMAT_LOCAL_SWEDISH_MOBILE_REGEX = {
  pattern: /^46/,
  replace: '0'
};
