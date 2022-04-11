import i18next from 'i18next';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import sort from 'ramda/src/sort';
import AppConfig from 'AppConfig';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import LocaleKeys from '../../locales/keys';
import { SubscriberApi } from '../ascendon/ascendon.selectors';
import { CODES } from '../metadata/codes/codes.constants';
import { CodeItems } from '../metadata/codes/codes.selectors';
import { EMPTY_OBJECT } from '../paymentInstrument/payment.instrument.selectors';
import { Subscriber } from '../subscriber/subscriber.selectors';
import { SubscriberInventory } from '../subscriberInventory/subscriber.inventory.selectors';
import { OFFERING_OVERALL_STATUS } from '../subscriberOfferings/subscriber.offering.constants';
import { PORT_IN_DISPLAY_ORDERS, SUPPORT_REQUEST, SUPPORT_REQUEST_STATUS } from './support.request.constants';

const EMPTY_ARRAY = Immutable([]);

export const INPUT_FIELD_TYPES = new Immutable({
  SELECT: 'select',
  TEXT: 'text',
  TEXT_AREA: 'text-area',
  BOOLEAN: 'boolean',
  CURRENCY: 'currency'
});

export const INPUT_FIELD_TYPES_VALUE = new Immutable({
  TEXT: '1',
  SELECT: '2',
  BOOLEAN: '3'
});

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['supportRequest'], subscriberApi);
});

export const SupportTypesFromMetadata = createSelector([
  Base
], (base) => {
  return pathOr([], ['data', 'supportRequestTypes'], base);
});

export const RequestDetails = createSelector([
  Base
], (base) => {
  return pathOr(null, ['data', 'supportRequestDetails'], base);
});

const getSupportTypeToUse = (supportTypes, category) => {
  return supportTypes.find((type) => {
    return type.Id === category;
  });
};

const mapAdditionalPropertiesToRequestItem = (item, typeAdditionalProperties) => {
  const mappedProperties = item.AdditionalPropertyValues.map((property) => {
    const matchingProperty = typeAdditionalProperties.length &&
            typeAdditionalProperties.find((caseProperty) => {
              return caseProperty.Id === property.Id;
            });
    return {
      Id: matchingProperty.Id,
      Name: matchingProperty.Name,
      Value: property.Value
    };
  });

  return Immutable(item).set('customCaseDetails', mappedProperties);
};

export const RequestDetailsWithMappedProperties = createSelector([
  RequestDetails,
  SupportTypesFromMetadata
], (details, supportTypes) => {
  if (details && supportTypes.length) {
    const supportTypeToUse = getSupportTypeToUse(supportTypes, details.Category);

    if (details.AdditionalPropertyValues && details.AdditionalPropertyValues.length) {
      return mapAdditionalPropertiesToRequestItem(details, supportTypeToUse.CaseAdditionalProperties);
    }
    return details;
  }

  return null;
});

const invoiceTypeFieldSetup = () => {
  return [
    {
      name: i18next.t(LocaleKeys.SUPPORT_REQUEST.INVOICE_NUMBER),
      id: SUPPORT_REQUEST.INVOICE_NUMBER,
      validation: {
        isRequired: false
      },
      displayOrder: 1,
      displayType: INPUT_FIELD_TYPES.TEXT
    },
    {
      name: i18next.t(LocaleKeys.SUPPORT_REQUEST.DISPUTE_AMOUNT),
      id: SUPPORT_REQUEST.DISPUTE_AMOUNT,
      validation: {
        isRequired: true
      },
      displayOrder: 2,
      displayType: INPUT_FIELD_TYPES.CURRENCY
    }
  ];
};

const descriptionFieldSetup = () => {
  return [{
    name: i18next.t(LocaleKeys.SUPPORT_REQUEST.DESCRIPTION),
    id: SUPPORT_REQUEST.DESCRIPTION,
    validation: {
      isRequired: true
    },
    displayOrder: 999,
    displayType: INPUT_FIELD_TYPES.TEXT_AREA
  }];
};

const inventoryFieldSetup = (subscriberInventory) => {
  return [{
    name: i18next.t(LocaleKeys.SUPPORT_REQUEST.INVENTORY_ITEM),
    id: SUPPORT_REQUEST.INVENTORY_ITEM,
    validation: {
      isRequired: true
    },
    displayOrder: 901,
    displayType: INPUT_FIELD_TYPES.SELECT,
    options: subscriberInventory.map((item) => {
      return {
        label: `${item.InventoryType}-${item.SerialNumber}`,
        value: item.SubscriberProductId
      };
    })
  }];
};

const troubleTypeFieldSetup = () => {
  return [
    {
      name: i18next.t(LocaleKeys.SUPPORT_REQUEST.DEVICE_NAME),
      id: SUPPORT_REQUEST.DEVICE_NAME,
      validation: {
        isRequired: true
      },
      displayOrder: 1,
      displayType: INPUT_FIELD_TYPES.TEXT
    },
    {
      name: i18next.t(LocaleKeys.SUPPORT_REQUEST.DEVICE_NUMBER),
      id: SUPPORT_REQUEST.DEVICE_NUMBER,
      validation: {
        isRequired: false
      },
      displayOrder: 2,
      displayType: INPUT_FIELD_TYPES.TEXT
    }
  ];
};

const formControlString = (value) => {
  switch (value) {
  case INPUT_FIELD_TYPES_VALUE.BOOLEAN:
    return INPUT_FIELD_TYPES.BOOLEAN;
  case INPUT_FIELD_TYPES_VALUE.SELECT:
    return INPUT_FIELD_TYPES.SELECT;
  case INPUT_FIELD_TYPES_VALUE.TEXT:
    return INPUT_FIELD_TYPES.TEXT;
  default:
    return null;
  }
};

const setupFieldsBasedOnAdditionalProperties = (type, regex, formControls) => {
  return type.CaseAdditionalProperties ? type.CaseAdditionalProperties.map((property) => {
    const regexToUse = regex.find((item) => {
      return item.Value === String(property.RegExCode);
    });
    const nullOption = [{
      label: i18next.t(LocaleKeys.SELECT_PLACEHOLDER),
      value: null
    }];

    const controlToUse = formControls.find((control) => {
      return String(property.AdditionalPropertyValueType) === control.Value;
    });

    return {
      name: property.Name,
      id: String(property.Id),
      validation: {
        name: regexToUse && regexToUse.Name,
        pattern: regexToUse && regexToUse.AdditionalProperties && regexToUse.AdditionalProperties.regex,
        error: regexToUse && regexToUse.Description,
        isRequired: property.IsRequired
      },
      displayOrder: property.DisplayOrder,
      options: nullOption.concat(property.PossibleValues),
      displayType: controlToUse ? formControlString(controlToUse.Value) : null
    };
  }) : [];
};

export const SupportTypesWithFieldConfiguration = createSelector([
  SupportTypesFromMetadata,
  CodeItems(CODES.Regex),
  CodeItems(CODES.FormControlType),
  SubscriberInventory
], (supportRequestTypes, regex, formControls, subscriberInventory) => {
  if (supportRequestTypes.length && regex.length) {
    return supportRequestTypes.map((type) => {
      let fieldsConfiguration = [];
      switch (String(type.Id)) {
      case AppConfig.INVOICE_DISPUTE:
        fieldsConfiguration = invoiceTypeFieldSetup();
        break;
      case AppConfig.TROUBLE:
        fieldsConfiguration = troubleTypeFieldSetup();
        break;
      default:
        fieldsConfiguration = setupFieldsBasedOnAdditionalProperties(type, regex, formControls);
      }

      if (type.InventoryTypeIds && type.InventoryTypeIds.length) {
        fieldsConfiguration = fieldsConfiguration.concat(inventoryFieldSetup(subscriberInventory));
      }

      fieldsConfiguration = fieldsConfiguration.concat(descriptionFieldSetup());
      return {
        label: type.Name,
        id: String(type.Id),
        fields: fieldsConfiguration && sort((a, b) => a.displayOrder - b.displayOrder, fieldsConfiguration)
      };
    });
  }
  return EMPTY_ARRAY;
});

export const RequestsList = createSelector([
  Base
], (base) => {
  return pathOr([], ['data', 'supportRequestList'], base);
});

const addSingleRequestDetailsIfNecessary = (supportRequests, singleRequestDetails) => {
  if (singleRequestDetails) {
    const matchingDetails = supportRequests.find((request) => {
      return request.Id.Value === singleRequestDetails.Id.Value;
    });

    if (!matchingDetails) {
      return [singleRequestDetails].concat(supportRequests);
    }
  }

  return supportRequests;
};

export const RequestListWithMappedProperties = createSelector([
  RequestsList,
  RequestDetailsWithMappedProperties,
  SupportTypesFromMetadata
], (supportList, singleRequestDetails, supportTypes) => {
  if (supportTypes.length) {
    const list = addSingleRequestDetailsIfNecessary(supportList, singleRequestDetails);

    return list.map((listItem) => {
      let item;
      const supportTypeToUse = getSupportTypeToUse(supportTypes, listItem.Category);
      if (listItem.AdditionalPropertyValues && listItem.AdditionalPropertyValues.length && supportTypeToUse) {
        item = mapAdditionalPropertiesToRequestItem(listItem, supportTypeToUse.CaseAdditionalProperties);
      } else {
        item = listItem;
      }

      return supportTypeToUse ? item.set('categoryName', supportTypeToUse.Name) : item;
    });
  }
  return EMPTY_ARRAY;
});

export const RecentNewOrOpenSupportRequests = createSelector([
  RequestListWithMappedProperties
], (supportList) => {
  if (supportList.length) {
    return supportList.filter((item) => {
      return item.Status === SUPPORT_REQUEST_STATUS.NEW || item.Status === SUPPORT_REQUEST_STATUS.OPEN;
    });
  }
  return EMPTY_ARRAY;
});

// TODO Refactor this logic for all PortIn Fields to be one function
export const PortInCurrentMSISDNField = createSelector(
  SupportTypesWithFieldConfiguration,
  (fieldConfigurations) => {
    const type = AppConfig.MOBILE_NUMBER_PORT;
    const configurationToUse = fieldConfigurations.find((config) => {
      return type === config.id;
    });
    if (configurationToUse) {
      return configurationToUse.fields.find((field) => field.displayOrder === PORT_IN_DISPLAY_ORDERS.CURRENT_MSISDN);
    }
    return EMPTY_OBJECT;
  }
);

export const PortInPortToMSISDNField = createSelector(
  SupportTypesWithFieldConfiguration,
  (fieldConfigurations) => {
    const type = AppConfig.MOBILE_NUMBER_PORT;
    const configurationToUse = fieldConfigurations.find((config) => {
      return type === config.id;
    });
    if (configurationToUse) {
      return configurationToUse.fields.find((field) => field.displayOrder === PORT_IN_DISPLAY_ORDERS.PORT_TO_MSISDN);
    }
    return EMPTY_OBJECT;
  }
);

export const PortInSsnField = createSelector(
  SupportTypesWithFieldConfiguration,
  (fieldConfigurations) => {
    const type = AppConfig.MOBILE_NUMBER_PORT;
    const configurationToUse = fieldConfigurations.find((config) => {
      return type === config.id;
    });
    if (configurationToUse) {
      return configurationToUse.fields.find((field) => field.displayOrder === PORT_IN_DISPLAY_ORDERS.SSN);
    }
    return EMPTY_OBJECT;
  }
);

export const PortInDateField = createSelector(
  SupportTypesWithFieldConfiguration,
  (fieldConfigurations) => {
    const type = AppConfig.MOBILE_NUMBER_PORT;
    const configurationToUse = fieldConfigurations.find((config) => {
      return type === config.id;
    });
    if (configurationToUse) {
      return configurationToUse.fields.find((field) => field.displayOrder === PORT_IN_DISPLAY_ORDERS.DATE);
    }
    return EMPTY_OBJECT;
  }
);

export const ValidatedPortInDateField = createSelector(
  SupportTypesWithFieldConfiguration,
  (fieldConfigurations) => {
    const type = AppConfig.MOBILE_NUMBER_PORT;
    const configurationToUse = fieldConfigurations.find((config) => {
      return type === config.id;
    });
    if (configurationToUse) {
      return configurationToUse.fields.find((field) => field.displayOrder === PORT_IN_DISPLAY_ORDERS.VALIDATED_DATE);
    }
    return EMPTY_OBJECT;
  }
);

const getCasesByCategoryId = (requests, categoryId) => {
  return sort((a, b) => a - b, requests.filter((item) => {
    return item.Category === categoryId;
  }));
};

export const RecentlyNewOrOpenPaymentFailureRequests = createSelector([
  RecentNewOrOpenSupportRequests
], (recentNewOrOpenRequests) => {
  return getCasesByCategoryId(recentNewOrOpenRequests, AppConfig.FAILED_PAYMENT);
});

export const ServiceProp = (state, offering) => offering;
export const PaymentFailureRequestForOfferingInstanceId = createSelector([
  RecentlyNewOrOpenPaymentFailureRequests,
  ServiceProp,
  Subscriber
], (recentNewOrOpenPayFailRequests, offering, subscriber) => {
  const pendingOrderOrDowngrade =
              path(['status'], offering) === OFFERING_OVERALL_STATUS.ORDER_PENDING ||
              path(['status'], offering) === OFFERING_OVERALL_STATUS.PENDING_PRIMARY_DOWNGRADE;
  if (!pendingOrderOrDowngrade && recentNewOrOpenPayFailRequests && recentNewOrOpenPayFailRequests.length) {
    const foundRequest = recentNewOrOpenPayFailRequests.find((request) => {
      const instanceIdPropertyValue = request.AdditionalPropertyValues.filter((obj) => (
        obj.Id === AppConfig.OFFER_INSTANCE_ID));
      return path([0, 'Value'], instanceIdPropertyValue) === path(['offeringInstanceId'], offering);
    });
    if (foundRequest) {
      return {
        caseId: path(['CaseNumber'], foundRequest),
        subscriberId: path(['Id'], subscriber)
      };
    }
  }
  return null;
});
