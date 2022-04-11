import * as AddressHelper from './address.helper';

describe('AddressHelper...', () => {
  describe('When formatPostalCode is called...', () => {
    describe('And the country is either "US" or "USA"...', () => {
      test('It should return the provided postal code if the postal code is not only numeric characters.', () => {
        const postalCode = 'abcd';
        expect(AddressHelper.formatPostalCode('US', postalCode)).toBe(postalCode);
        expect(AddressHelper.formatPostalCode('USA', postalCode)).toBe(postalCode);
      });

      test('It should return a hyphen separated postal code string if the postal code contains 9 digits.', () => {
        const postalCode = '123456789';
        const expectedFormat = '12345-6789';
        expect(AddressHelper.formatPostalCode('US', postalCode)).toBe(expectedFormat);
        expect(AddressHelper.formatPostalCode('USA', postalCode)).toBe(expectedFormat);
      });

      test('It should return the first five digits of the postal code if the postal code is not 9 digits.', () => {
        const postalCode = '12345';
        const expectedFormat = '12345';
        expect(AddressHelper.formatPostalCode('US', postalCode)).toBe(expectedFormat);
        expect(AddressHelper.formatPostalCode('USA', postalCode)).toBe(expectedFormat);
      });

      test('It should trim any extra spaces from the postal code.', () => {
        const postalCode = '1234 ';
        const expectedFormat = '1234';
        expect(AddressHelper.formatPostalCode('US', postalCode)).toBe(expectedFormat);
        expect(AddressHelper.formatPostalCode('USA', postalCode)).toBe(expectedFormat);
      });
    });

    describe('And the country is not either "US" or "USA"...', () => {
      test('It should return the provided postal code.', () => {
        const postalCode = 'abcd';
        expect(AddressHelper.formatPostalCode('NOT_USA', postalCode)).toBe(postalCode);
      });

      test('It should trim any extra spaces from the postal code.', () => {
        const postalCode = 'abcd ';
        const expectedFormat = 'abcd';
        expect(AddressHelper.formatPostalCode('NOT_USA', postalCode)).toBe(expectedFormat);
      });
    });

    test('It should return an empty string when neither a country or a postal code are passed.', () => {
      expect(AddressHelper.formatPostalCode()).toBe('');
    });

    test('It should return an empty string when country and postal code are null.', () => {
      expect(AddressHelper.formatPostalCode(null, null)).toBe('');
    });
  });

  describe('When formatCountryAndPostalCode is called...', () => {
    test('It should return a string with the country, followed by a space and the formatted postal code.', () => {
      expect(AddressHelper.formatCountryAndPostalCode('USA', '12345')).toBe('USA 12345');
    });
  });

  describe('When createTwoLineBillingAddress is called...', () => {
    const billingAddressBase = {
      Id: 1,
      LineOne: 'test1',
      LineTwo: 'test2',
      City: 'testCity1',
      Country: 'USA',
      State: 'testState1',
      PostalCode: '11111'
    };
    describe('And all fields have been provided...', () => {
      test('It should return a complete address.', () => {
        const response = AddressHelper.createTwoLineBillingAddress(billingAddressBase);
        expect(response).toEqual({
          lineOne: 'test1, test2',
          lineTwo: 'testCity1, testState1 11111'
        });
      });
    });
    describe('And there is no LineTwo...', () => {
      const billingAddress = {
        ...billingAddressBase,
        LineTwo: null
      };
      test('It should return an address without a line two.', () => {
        const response = AddressHelper.createTwoLineBillingAddress(billingAddress);
        expect(response).toEqual({
          lineOne: 'test1',
          lineTwo: 'testCity1, testState1 11111'
        });
      });
    });
    describe('And there is no State...', () => {
      const billingAddress = {
        ...billingAddressBase,
        State: null
      };
      test('It should return an address with country in place of state.', () => {
        const response = AddressHelper.createTwoLineBillingAddress(billingAddress);
        expect(response).toEqual({
          lineOne: 'test1, test2',
          lineTwo: 'testCity1, USA 11111'
        });
      });
    });
    describe('And there is no postal code...', () => {
      const billingAddress = {
        ...billingAddressBase,
        PostalCode: null
      };
      test('It should return an address without a postal code.', () => {
        const response = AddressHelper.createTwoLineBillingAddress(billingAddress);
        expect(response).toEqual({
          lineOne: 'test1, test2',
          lineTwo: 'testCity1, testState1'
        });
      });
    });
    describe('And the country is not US or USA...', () => {
      test('It should return full 5+ digit postal codes.', () => {
        const billingAddress = {
          ...billingAddressBase,
          Country: 'CAN',
          PostalCode: '123456789'
        };
        const response = AddressHelper.createTwoLineBillingAddress(billingAddress);
        expect(response).toEqual({
          lineOne: 'test1, test2',
          lineTwo: 'testCity1, testState1 123456789'
        });
      });
      test('It should return full 5 digit postal codes.', () => {
        const billingAddress = {
          ...billingAddressBase,
          Country: 'CAN',
          PostalCode: '12345'
        };
        const response = AddressHelper.createTwoLineBillingAddress(billingAddress);
        expect(response).toEqual({
          lineOne: 'test1, test2',
          lineTwo: 'testCity1, testState1 12345'
        });
      });
    });
    describe('And the country is US or USA...', () => {
      test('It should format 9-digit postal codes.', () => {
        const billingAddress = {
          ...billingAddressBase,
          PostalCode: '123456789'
        };
        const response = AddressHelper.createTwoLineBillingAddress(billingAddress);
        expect(response).toEqual({
          lineOne: 'test1, test2',
          lineTwo: 'testCity1, testState1 12345-6789'
        });
      });
      test('It should truncate 5+ digit postal codes.', () => {
        const billingAddress = {
          ...billingAddressBase,
          PostalCode: '1234567'
        };
        const response = AddressHelper.createTwoLineBillingAddress(billingAddress);
        expect(response).toEqual({
          lineOne: 'test1, test2',
          lineTwo: 'testCity1, testState1 12345'
        });
      });
      test('It should return full 5 digit postal codes.', () => {
        const billingAddress = {
          ...billingAddressBase,
          PostalCode: '12345'
        };
        const response = AddressHelper.createTwoLineBillingAddress(billingAddress);
        expect(response).toEqual({
          lineOne: 'test1, test2',
          lineTwo: 'testCity1, testState1 12345'
        });
      });
    });
  });
});
