import { formatCurrency, getCurrencySymbol } from './currency';

describe('Currency', () => {
  test('It should format the value into USD', () => {
    expect(formatCurrency(123, 'USD', 'en-US')).toEqual('$123');
    expect(formatCurrency(123, 'USD', 'en-US', false)).toEqual('$123.00');
  });
  test('It should include a comma for the thousands of dollars', () => {
    expect(formatCurrency(1234, 'USD', 'en-US')).toBe('$1,234');
    expect(formatCurrency(1234, 'USD', 'en-US', false)).toBe('$1,234.00');
  });
  test('It should return a placeholder string in the event of there being no currency code', () => {
    expect(formatCurrency(123, null, 'en-US')).toBe('?');
  });
  test('It should return a placeholder string in the event that the supplied value is not a number', () => {
    expect(formatCurrency('not a number', null, 'en-US')).toBe('?');
  });
  test('It should return a locally aware currency symbol', () => {
    expect(getCurrencySymbol('EUR', 'de-DE')).toEqual('€');
  });
});
