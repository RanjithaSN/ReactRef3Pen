/*
 * Formats a postal code based upon country specific expectations.  For example, in the US if a nine digit
 * postal code is provided, a hyphen will separate the final four digits.
 *
 * Currenly only US rules exist.
 */
export const formatPostalCode = (country = '', postalCode = '') => {
  if (postalCode === null) {
    return '';
  }

  let formattedPostalCode = '';
  if (country === 'US' || country === 'USA') {
    if (!postalCode.match(/^[0-9]+$/)) {
      formattedPostalCode = `${postalCode}`; // ensures type is string
    } else if (postalCode.length === 9) {
      formattedPostalCode = `${postalCode.substr(0, 5)}-${postalCode.substr(5, 9)}`;
    } else {
      formattedPostalCode = `${postalCode.substr(0, 5)}`;
    }
  } else {
    formattedPostalCode = `${postalCode}`; // ensures type is string
  }

  return formattedPostalCode.trim();
};

/*
 * Generates a string containing the country, followed by a formatted postal code.
 */
export const formatCountryAndPostalCode = (country = '', postalCode = '') => {
  const formattedPostalCode = formatPostalCode(country, postalCode);
  return `${country} ${formattedPostalCode}`.trim();
};

export const createTwoLineBillingAddress = (billingAddress) => {
  const addressLineTwo = billingAddress.LineTwo ? `, ${billingAddress.LineTwo}` : '';
  const postalCode = formatPostalCode(billingAddress.Country, billingAddress.PostalCode);
  const city = billingAddress.City ? `${billingAddress.City}, ` : '';
  return {
    lineOne: `${billingAddress.LineOne}${addressLineTwo}`,
    lineTwo: `${city}${billingAddress.State || billingAddress.Country} ${postalCode}`.trim()
  };
};
