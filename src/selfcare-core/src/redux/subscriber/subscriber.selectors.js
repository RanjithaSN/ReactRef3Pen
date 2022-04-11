import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { FORMAT_LOCAL_SWEDISH_MOBILE_REGEX } from '../../constants/subscriber';
import { FallbackCurrencyLocale } from '../../constants/transaction.constants';
import { SubscriberApi } from '../ascendon/ascendon.selectors';
import { CODES } from '../metadata/codes/codes.constants';
import { CodeItems, CodeLoaded, SpecificOrGlobalCode } from '../metadata/codes/codes.selectors';
import { SSN_EXTERNAL_REFERENCE } from './subscriber.constants';

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['subscriber'], subscriberApi);
});

export const SubscriberData = createSelector([
  Base
], (base) => {
  return pathOr(null, ['data'], base);
});

export const Subscriber = createSelector([
  SubscriberData
], (subscriberData) => {
  return pathOr(null, ['Subscriber'], subscriberData);
});

export const SubscriberDisplayMobilePhone = createSelector([
  Subscriber
], (subscriber) => {
  return pathOr('', ['MobilePhone'], subscriber).replace(FORMAT_LOCAL_SWEDISH_MOBILE_REGEX.pattern, FORMAT_LOCAL_SWEDISH_MOBILE_REGEX.replace);
});

export const SubscriberFirstName = createSelector([
  Subscriber
], (data) => {
  return pathOr('', ['FirstName'], data);
});

export const SubscriberLastName = createSelector([
  Subscriber
], (data) => {
  return pathOr('', ['LastName'], data);
});

export const SubscriberFullName = createSelector([
  SubscriberFirstName,
  SubscriberLastName
], (firstname, lastname) => {
  return `${firstname} ${lastname}`.trim();
});

export const SubscriberSSN = createSelector([
  Subscriber
], (subscriber) => {
  const externalReferenceInAdditionalProperties = pathOr([], ['AdditionalProperties'], subscriber).find(({ ExternalReference }) => SSN_EXTERNAL_REFERENCE === ExternalReference);
  const externalReferenceInSubscriber = path(['ExternalReference'], subscriber);

  return externalReferenceInSubscriber || path(['Values', 0], externalReferenceInAdditionalProperties);
});

export const SubscriberIsLoading = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isLoading'], base);
});

export const SubscriberIsLoaded = createSelector([
  Base
], (base) => pathOr(false, ['isLoaded'], base));

export const SubscriberIsUpdating = createSelector([
  Base
], (base) => pathOr(false, ['isUpdating'], base));

export const SubscriberCurrency = createSelector([
  Subscriber
], (subscriber) => {
  return pathOr(FallbackCurrencyLocale, ['SubscriberCurrency'], subscriber);
});

export const ShouldCaptureEmailAsLogin = createSelector([
  CodeLoaded(CODES.SubscriberRequirements),
  SpecificOrGlobalCode(CODES.SubscriberRequirements)
], (subscriberRequirementsLoaded, subscriberRequirements) => {
  return subscriberRequirementsLoaded ?
    subscriberRequirements.AdditionalProperties.capture_email_as_login === 'True' :
    false;
});

/**
 * Returns all Contact Methods that will be rendered as checkboxes
 */
export const ValidContactMethods = createSelector([
  CodeItems(CODES.ContactMethod)
], (methodsList) => {
  const methods = {};
  methodsList.forEach((method) => {
    methods[method.Value] = {
      Value: method.Value,
      Name: method.Name
    };
  });
  return methods;
});

/**
 * Returns all Contact Methods with the event type code added
 */
export const ContactMethodsWithEventTypeCode = createSelector([
  ValidContactMethods,
  CodeItems(CODES.ContactMapping)
], (methods, mappings) => {
  const formattedMethods = {};
  mappings.forEach((map) => {
    if (methods[map.AdditionalProperties.contact_method_code]) {
      formattedMethods[map.AdditionalProperties.contact_method_code] = {
        ...methods[map.AdditionalProperties.contact_method_code],
        eventTypeCode: map.AdditionalProperties.contact_event_type_code
      };
    }
  });
  return formattedMethods;
});

/**
 * Adds if the subscriber is opted in to a contact method
 */
export const SubscriberContactMethods = createSelector([
  Subscriber,
  ContactMethodsWithEventTypeCode
], (subscriber, contactMethods) => {
  const contactPreferences = [];
  const contactMethodValues = Object.keys(contactMethods);
  if (subscriber !== null && contactMethodValues.length !== 0) {
    const subscriberPreferences = pathOr(undefined, ['ContactPreferences', '0'], subscriber);
    contactMethodValues.forEach((value) => {
      // pushes contact method to an array and determines if it is opted in or not
      contactPreferences.push({
        ...contactMethods[value],
        optIn: subscriberPreferences && subscriberPreferences.ContactMethod.toString() === value
      });
    });
  }
  return contactPreferences;
});
