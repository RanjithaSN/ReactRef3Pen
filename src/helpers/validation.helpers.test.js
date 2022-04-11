import i18next from 'i18next';
import * as ValidationHelpers from './validation.helpers';
import LocaleKeys from '../locales/keys';

describe('ValidationHelpers...', () => {
  describe('When requiredError is called...', () => {
    const fieldName = 'requiredErrorTestField';

    beforeEach(() => {
      ValidationHelpers.requiredError(fieldName);
    });

    test('It should translate the field name', () => {
      expect(i18next.t).toBeCalledWith(fieldName);
    });

    test('It should translate the required error message', () => {
      ValidationHelpers.requiredError('field1');
      expect(i18next.t).toBeCalledWith(
        LocaleKeys.VALIDATION.REQUIRED_FIELD_TEMPLATE,
        {
          field: i18next.mockReturn
        }
      );
    });
  });

  describe('When minLengthError is called...', () => {
    const fieldName = 'minLengthErrorTestField';
    const min = 10;

    beforeEach(() => {
      ValidationHelpers.minLengthError(fieldName, min);
    });

    test('It should translate the field name', () => {
      expect(i18next.t).toBeCalledWith(fieldName);
    });

    test('It should translate the min length error message', () => {
      expect(i18next.t).toBeCalledWith(
        LocaleKeys.VALIDATION.MIN_LENGTH_TEMPLATE,
        {
          field: i18next.mockReturn,
          min
        }
      );
    });
  });

  describe('When maxLengthError is called...', () => {
    const fieldName = 'maxLengthErrorTestField';
    const max = 10;

    beforeEach(() => {
      ValidationHelpers.maxLengthError(fieldName, max);
    });

    test('It should translate the field name', () => {
      expect(i18next.t).toBeCalledWith(fieldName);
    });

    test('It should translate the max length error message', () => {
      expect(i18next.t).toBeCalledWith(
        LocaleKeys.VALIDATION.MAX_LENGTH_TEMPLATE,
        {
          field: i18next.mockReturn,
          max
        }
      );
    });
  });
  describe('checkForDisplayedErrors method', () => {
    const POPULATED_ERRORS = {
      1: 'Data is required',
      2: 'Incorrect format for field',
      3: 'Name is required'
    };

    test('It should return false if no fields have been touched', () => {
      expect(ValidationHelpers.checkForDisplayedErrors(POPULATED_ERRORS, {})).toEqual(false);
    });

    test('It should return false if no touched fields have errors', () => {
      expect(ValidationHelpers.checkForDisplayedErrors(POPULATED_ERRORS, {
        5: true,
        19: true
      })).toEqual(false);
    });

    test('It should return true if touched fields have errors', () => {
      expect(ValidationHelpers.checkForDisplayedErrors(POPULATED_ERRORS, {
        1: true,
        19: true
      })).toEqual(true);
    });
  });
  describe('showFormError', () => {
    const errors = {
      one: 'one',
      two: 'two'
    };

    test('It should return true if the status is SUBMIT_ATTEMPTED and errors exist', () => {
      const result = ValidationHelpers.showFormError({
        errors,
        status: ValidationHelpers.SUBMIT_ATTEMPTED
      });
      expect(result).toEqual(true);
    });

    test('It should return false if the status is SUBMIT_ATTEMPTED and errors do not exist', () => {
      const result = ValidationHelpers.showFormError({
        errors: {},
        status: ValidationHelpers.SUBMIT_ATTEMPTED
      });
      expect(result).toEqual(false);
    });

    test('It should return false if the status is not SUBMIT_ATTEMPTED and errors exist', () => {
      const result = ValidationHelpers.showFormError({
        errors,
        status: ''
      });
      expect(result).toEqual(false);
    });
  });

  describe('filterVisibleErrors', () => {
    const errors = {
      one: 'one',
      two: 'two'
    };

    test('It should return the full error object when status is SUBMIT_ATTEMPTED', () => {
      const result = ValidationHelpers.filterVisibleErrors({
        errors,
        status: ValidationHelpers.SUBMIT_ATTEMPTED
      });
      expect(result).toEqual(errors);
    });

    test('It should filter error keys not in touched when status is not SUBMIT_ATTEMPTED', () => {
      const result = ValidationHelpers.filterVisibleErrors({
        errors,
        touched: {
          one: true
        }
      });
      expect(result).toEqual({
        one: 'one'
      });
    });
  });

  describe('patternExists', () => {
    describe('When patternExists is called...', () => {
      const values = ['12345', 'abcde'];
      const pattern = '\\d+';

      test('It should return true when value matches the pattern', () => {
        const result = ValidationHelpers.patternExists(values[0], pattern);
        expect(result).toBeTruthy();
      });

      test('It should return false when value does not match the pattern', () => {
        const result = ValidationHelpers.patternExists(values[1], pattern);
        expect(result).toBeFalsy();
      });
    });
  });
});
