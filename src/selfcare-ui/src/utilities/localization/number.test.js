import { formatNumber } from './number';

describe('Number', () => {
  test('It should round a string representation of a number to 2 decimal places', () => {
    expect(formatNumber('123.123')).toBe('123.12');
  });
  test('It should round a number to 2 decimal placed', () => {
    expect(formatNumber(123.123)).toBe('123.12');
  });
  test('It should format integers to not have decimal places', () => {
    expect(formatNumber(1)).toBe('1');
  });
  test('It should format integers represented as strings', () => {
    expect(formatNumber('1')).toBe('1');
  });
  test('It should add commas per thousand in en-US for strings', () => {
    expect(formatNumber('1000', 'en-US')).toBe('1,000');
  });
  test('It should add commas and round decimals for strings', () => {
    expect(formatNumber('1000.123', 'en-US')).toBe('1,000.12');
  });
  test('It should add commas per thousand in en-US for numbers', () => {
    expect(formatNumber(1000, 'en-US')).toBe('1,000');
  });
  test('It should round and add commas for numbers', () => {
    expect(formatNumber(1000.123, 'en-US')).toBe('1,000.12');
  });
});
