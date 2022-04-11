import i18next from 'i18next';
import pathOr from 'ramda/src/pathOr';
import ApiFaultCodes from '../../constants/api.fault.codes';
import LocaleKeys from '../../locales/keys';

const retrieveFaultTranslation = (faultCode) => {
  const translatedMessage = i18next.t(`${LocaleKeys.FAULT_PREFIX}${faultCode}`, {
    returnObjects: true
  });
  if (Object.keys(translatedMessage).length) {
    return translatedMessage;
  }
  return i18next.t(`${LocaleKeys.FAULT_PREFIX}${faultCode}`);
};

export const getFaultCode = (fault) => {
  if (fault.faultCode) {
    return fault.faultCode;
  }

  if (fault.errorCode) {
    return fault.errorCode;
  }

  if (fault.code) {
    return fault.code;
  }

  return `${fault.Code.toString()}${fault.Subcode ? `-${fault.Subcode}` : ''}`;
};

export const translateFaultCode = (faultCode, mainCode) => {
  let translatedMessage = retrieveFaultTranslation(faultCode);

  // fallback to main code if subcode translation isn't available
  if ((translatedMessage === `${LocaleKeys.FAULT_PREFIX}${faultCode}`) && mainCode) {
    translatedMessage = retrieveFaultTranslation(mainCode);
  }

  if ((translatedMessage === `${LocaleKeys.FAULT_PREFIX}${faultCode}`) || (translatedMessage === `${LocaleKeys.FAULT_PREFIX}${mainCode}`)) {
    translatedMessage = `${retrieveFaultTranslation(ApiFaultCodes.UNKNOWN)} - ${faultCode}`;
  }

  return translatedMessage;
};

export const translateFault = (fault) => {
  const faultCode = getFaultCode(fault);
  const mainCode = fault.Subcode ? fault.Code : null;
  const translatedMessage = translateFaultCode(faultCode, mainCode);
  const { ref, linkText } = translatedMessage;

  const newFaultParams = {
    translatedMessage,
    faultCode
  };

  if (linkText && ref) {
    const linkParams = {
      ref,
      linkText
    };

    Object.assign(fault, linkParams);
  }

  if (!fault.Code && faultCode) {
    newFaultParams.Code = Number.parseInt(faultCode, 10);
  }

  return Object.assign({}, fault, newFaultParams);
};

export const generateUnhandledFault = (response) => {
  const faultCode = pathOr(ApiFaultCodes.UNKNOWN, ['data', 'Fault', 'code'], response);
  return {
    Code: parseInt(faultCode, 10),
    Status: response ? response.status : null
  };
};
