import { removeEmptyStrings } from '../../helpers/api.helper';
import { parseToISOString } from '../../helpers/date.helper';

const CUSTOMER_CATEGORY = {
  COMMERCIAL: 1,
  RESIDENTIAL: 0
};

const buildAddressesRequestObject = (customer) => {
  return [{
    City: customer.City,
    Country: customer.Country,
    DefaultBilling: true,
    DefaultHome: true,
    DefaultPostal: true,
    DefaultService: true,
    LineOne: customer.LineOne,
    LineTwo: customer.LineTwo,
    Name: customer.LineOne, // Name is required by the API and needs to be unique.
    PostalCode: customer.PostalCode,
    State: customer.State
  }];
};

export const buildCustomerRequestObject = (customer, shouldCaptureEmailAsLogin, shouldIncludeAddress = true) => {
  return removeEmptyStrings({
    Addresses: shouldIncludeAddress ? buildAddressesRequestObject(customer) : '',
    AutoLogin: true,
    Credentials: {
      Login: shouldCaptureEmailAsLogin ? customer.Email : customer.Login,
      Password: customer.Password,
      PasswordChallenge: customer.PasswordChallenge,
      PasswordChallengeResponse: customer.PasswordChallengeResponse
    },
    Subscriber: {
      AdditionalProperties: customer.AdditionalProperties,
      BirthDate: parseToISOString(customer.BirthDate, true),
      BusinessPhone: customer.BusinessPhone,
      Category: CUSTOMER_CATEGORY.RESIDENTIAL,
      CompanyName: customer.CompanyName,
      DriversLicenseNumber: customer.DriversLicenseNumber,
      DriversLicenseState: customer.DriversLicenseState,
      Email: customer.Email,
      FirstName: customer.FirstName,
      Gender: customer.Gender,
      HomePhone: customer.HomePhone,
      IncomeLevelType: customer.IncomeLevelType,
      Language: customer.Language,
      LastName: customer.LastName,
      LeadSourceType: customer.LeadSourceType,
      Login: customer.Login,
      MobilePhone: customer.MobilePhone,
      Race: customer.Race,
      SubscriberConsents: customer.SubscriberConsents,
      SubscriberCurrency: customer.SubscriberCurrency,
      Ssn: customer.Ssn
    }
  });
};
