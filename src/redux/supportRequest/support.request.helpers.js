import AppConfig from 'AppConfig';
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';

export const getActivationRequestForServiceIdentifier = (supportRequests, serviceIdentifier, status) => {
  const filteredSupportRequests = supportRequests.filter(({ Category, Status }) => Category === AppConfig.ACTIVATION && Status === status);

  // Only look for NEW status, ACTIVATION type cases, then see if there are any for this product identifier
  return filteredSupportRequests.find(({ AdditionalPropertyValues }) => {
    const caseServiceIdentifier = path(['Value'], AdditionalPropertyValues.find(({ Id }) => Id === AppConfig.SERVICE_IDENTIFIER || Id === AppConfig.MOBILE_SERVICE_IDENTIFIER));
    return caseServiceIdentifier === serviceIdentifier;
  });
};

export const getActivationRequest = (supportRequests, product, status) => {
  // Find the service identifier for this product
  const serviceIdentifiersForProduct = [];
  if (product) {
    pathOr([], ['options'], product).forEach(({ ServiceAttributeValues }) => {
      const serviceIdentifierAttributeValue = ServiceAttributeValues.find(({ IsServiceIdentifier }) => IsServiceIdentifier);
      if (serviceIdentifierAttributeValue) {
        serviceIdentifiersForProduct.push(serviceIdentifierAttributeValue.Value);
      }
    });
  }

  const filteredSupportRequests = supportRequests.filter(({ Category, Status }) => Category === AppConfig.ACTIVATION && Status === status);

  // Only look for ACTIVATION type cases of the given status, then see if there are any for this product identifier
  return filteredSupportRequests.find(({ AdditionalPropertyValues }) => {
    const caseServiceIdentifier = path(['Value'], AdditionalPropertyValues.find(({ Id }) => {
      if (product.isBroadband) {
        return Id === AppConfig.SERVICE_IDENTIFIER;
      }
      return Id === AppConfig.MOBILE_SERVICE_IDENTIFIER;
    }));
    return serviceIdentifiersForProduct.includes(caseServiceIdentifier);
  });
};

export const getActivationRequestId = (supportRequests, product, status) => {
  const activationRequest = getActivationRequest(supportRequests, product, status);
  return path(['Id', 'Value'], activationRequest);
};
