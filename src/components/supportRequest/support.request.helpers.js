import { FORMAT_INTERNATIONAL_SWEDISH_MOBILE_REGEX } from '@selfcare/core/constants/subscriber';
import { PORT_IN_DISPLAY_ORDERS } from '@selfcare/core/redux/supportRequest/support.request.constants';
import format from 'date-fns/format';
import i18next from 'i18next';
import React from 'react';
import Immutable from 'seamless-immutable';
import Currency from 'selfcare-ui/src/components/currency/currency';
import StatusIndicator from 'selfcare-ui/src/components/statusIndicator/status.indicator';
import { STATUS_TYPES } from 'selfcare-ui/src/components/statusIndicator/status.indicator.constants';
import { LOCAL_SWEDISH_MOBILE_REGEX } from '../../constants/validation.constants';
import LocaleKeys from '../../locales/keys';
import { getSupportRequestsDetails } from '../../navigation/sitemap.selectors';

function generateCategorySpecificList(request, requestTypes) {
  switch (request.Category) {
  case requestTypes.INVOICE_DISPUTE:
    return [{
      label: i18next.t(LocaleKeys.SUPPORT_REQUEST.INVOICE_NUMBER),
      value: request.Details.InvoiceDisputeDetails.InvoiceNumber
    }, {
      label: i18next.t(LocaleKeys.SUPPORT_REQUEST.DISPUTE_AMOUNT),
      value: request.Details.InvoiceDisputeDetails && <Currency value={request.Details.InvoiceDisputeDetails.DisputedAmount} />
    }];
  case requestTypes.TROUBLE:
    return [{
      label: i18next.t(LocaleKeys.SUPPORT_REQUEST.DEVICE_NAME),
      value: request.Details.TroubleCallDetails.FriendlyName
    }, {
      label: i18next.t(LocaleKeys.SUPPORT_REQUEST.DEVICE_NUMBER),
      value: request.Details.TroubleCallDetails.SerialNumber
    }];
  default:
    if (request.customCaseDetails) {
      return request.customCaseDetails.map((detail) => {
        return {
          label: detail.Name,
          value: detail.Value
        };
      });
    }
    return [];
  }
}

export function SetupApiDataFromForm(formValues, caseType, requestTypes) {
  if (!formValues) {
    return {};
  }
  const AdditionalPropertyValues = Object.keys(formValues).filter((key) => {
        return !isNaN(key); // eslint-disable-line
  }).reduce((list, key) => {
    list.push({
      Id: key,
      Value: formValues[key]
    });
    return list;
  }, []);
  const baseObject = {
    Category: caseType,
    Description: formValues.supportRequestDescription,
    Details: {
      BillingDisputeDetails: {},
      ComplaintDetails: {},
      InvoiceDisputeDetails: {
        DisputedAmount: formValues.supportRequestDisputeAmount,
        InvoiceNumber: formValues.supportRequestInvoiceNumber
      },
      TroubleCallDetails: {
        FriendlyName: formValues.supportRequestDeviceName,
        SerialNumber: formValues.supportRequestDeviceNumber
      }
    }
  };
  const withAdditionalProperties = AdditionalPropertyValues.length &&
        Immutable(baseObject).set('AdditionalPropertyValues', AdditionalPropertyValues);

  const withInventoryItem = caseType === requestTypes.MOBILE_NUMBER_PORT && Immutable(withAdditionalProperties).set('InventoryId', formValues.supportRequestInventoryItem);

  return {
    Case: withInventoryItem || withAdditionalProperties || baseObject
  };
}
/* ToDo: look into how to internalize formatting we use date-fns for. */
export function FormatFriendlyDate(date) {
  return i18next.t(LocaleKeys.SUPPORT_REQUEST.DATE_TIME, {
    date: format(date, 'MMMM DD, YYYY'),
    time: format(date, 'h:mm A')
  });
}
export function GenerateDefinitionList(request, type, requestTypes) {
  const status = type === getSupportRequestsDetails().id ? [{
    label: i18next.t(LocaleKeys.STATUS),
    value: Object.keys(request).length && type ? <StatusIndicator value={request.Status} type={STATUS_TYPES.SUPPORT_REQUEST} /> : null
  }] : [];
  const base = [{
    label: i18next.t(LocaleKeys.SUPPORT_REQUEST.OPENED_ON),
    value: FormatFriendlyDate(request.Added)
  }];
    /* TODO: Revert story ASC-988850 once description exists in 19.2.  */
  const description = {
    label: i18next.t(LocaleKeys.DESCRIPTION),
    value: request.Description
  };

  const listWithoutDescription = [].concat(status, base, generateCategorySpecificList(request, requestTypes));

  if (type === getSupportRequestsDetails().id) {
    return listWithoutDescription.concat(description);
  }

  return listWithoutDescription;
}

export function getConfigurationByRequestType(type, fieldConfigurations, portInRequest = false) {
  const configurationToUse = fieldConfigurations.find((config) => {
    return type === config.id;
  });
  const ceilingForVisibleFields = 900;

  if (configurationToUse) {
    const fields = configurationToUse.fields.filter((field) => {
      return field.displayOrder < ceilingForVisibleFields;
    });

    if (portInRequest) {
      return fields.map((field) => {
        if (field.displayOrder !== PORT_IN_DISPLAY_ORDERS.PORT_TO_MSISDN) {
          return field;
        }
        return {
          ...field,
          info: i18next.t(LocaleKeys.SUBSCRIBER.MOBILE_NUMBER_FORMAT),
          postTransform: (value) => (value || '').replace(FORMAT_INTERNATIONAL_SWEDISH_MOBILE_REGEX.pattern, FORMAT_INTERNATIONAL_SWEDISH_MOBILE_REGEX.replace),
          validation: {
            error: i18next.t(LocaleKeys.SUBSCRIBER.INVALID_PHONE_NUMBER),
            isRequired: true,
            pattern: LOCAL_SWEDISH_MOBILE_REGEX.pattern
          }
        };
      });
    }
    return fields;
  }
}

export function getSsnFieldFromConfiguration(type, fieldConfigurations) {
  const configurationToUse = fieldConfigurations.find((config) => {
    return type === config.id;
  });
  if (configurationToUse) {
    return configurationToUse.fields.find((field) => field.displayOrder === PORT_IN_DISPLAY_ORDERS.SSN);
  }
  return null;
}
