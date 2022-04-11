
import * as formatOptions from './datetime';

const testDate = new Date(0);
const dateMatch = /(\d{1,2})\/(\d{1,2})\/(\d{4})/;
const timeMatch = /(\d{1,2}):(\d{2}):(\d{2}) [AP]M/;
const dateTimeMatch = new RegExp(`${dateMatch.source}, ${timeMatch.source}`);

describe('Datetime', () => {
  test('It should have date and time formatted in the returned string', () => {
    expect(formatOptions.formatDateTime(testDate, 'en-US')).toMatch(dateTimeMatch);
  });
  test('It should have only the date', () => {
    expect(formatOptions.formatDate(testDate, 'en-US')).toMatch(dateMatch);
  });
  test('It should only provide the time', () => {
    expect(formatOptions.formatTime(testDate, 'en-US')).toMatch(timeMatch);
  });
});
