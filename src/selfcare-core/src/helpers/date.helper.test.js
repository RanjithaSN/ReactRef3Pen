import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days';
import addYears from 'date-fns/add_years';
import format from 'date-fns/format';
import isBefore from 'date-fns/is_before';
import { addBusinessDays, displayDate, isSwedishHoliday, parseToISOString, subtractBusinessDays, withinXDays } from './date.helper';

describe('Date Helper', () => {
  describe('When parseToISOString is used...', () => {
    it('should return an empty string for a null value', () => {
      expect(parseToISOString(null)).toEqual('');
    });

    it('should return an empty string for an empty value', () => {
      expect(parseToISOString('')).toEqual('');
    });

    it('should return an empty string for an invalid date', () => {
      expect(parseToISOString('13/13/2000', true)).toEqual('');
    });

    it('should return time as UTC 0 hours from a valid date', () => {
      expect(parseToISOString('1/20/2000Z', true)).toEqual('2000-01-20T00:00:00.000Z');
    });

    it('should return time as UTC 0 hours from a valid date', () => {
      expect(parseToISOString('2020-02-06T20:16:16.316Z', false)).toEqual('2020-02-06T20:16:16.316Z');
    });
  });
  describe('When addBusinessDays is used...', () => {
    it('Should set date to Mon July 20th when adding 1 business day and the day passed in is a Fri July 17th', () => {
      const date = new Date('2020-07-17T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = addBusinessDays(date, 1);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-20');
    });

    it('Should set date to Tues July 21st when adding 1 business day and the day passed in is a Sat July 18th', () => {
      const date = new Date('2020-07-18T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = addBusinessDays(date, 1);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-21');
    });

    it('Should set date to Tues July 21st when adding 1 business day and the day passed in is a Sun July 19th', () => {
      const date = new Date('2020-07-19T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = addBusinessDays(date, 1);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-21');
    });

    it('Should set date to Wed July 23rd when adding 1 business day and the day passed in is a Tues July 22th', () => {
      const date = new Date('2020-07-22T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = addBusinessDays(date, 1);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-23');
    });

    it('Should set date to Thurs July 24rd when adding 2 business days and the day passed in is a Tues July 22th', () => {
      const date = new Date('2020-07-22T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = addBusinessDays(date, 2);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-24');
    });

    it('Should set date to Wed July 23rd when adding 1 business day and the day passed in is a Tues July 22th', () => {
      const date = new Date('2020-07-22T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = addBusinessDays(date, 3);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-27');
    });

    it('Should set date to Wed July 23rd when adding 1 business day and the day passed in is a Tues July 22th', () => {
      const date = new Date('2020-07-22T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = addBusinessDays(date, 4);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-28');
    });

    it('Should set date to Wed July 23rd when adding 1 business day and the day passed in is a Tues July 22th', () => {
      const date = new Date('2020-07-22T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = addBusinessDays(date, 5);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-29');
    });

    it('Should set date to Wed July 23rd when adding 1 business day and the day passed in is a Tues July 22th', () => {
      const date = new Date('2020-07-22T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = addBusinessDays(date, 6);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-30');
    });

    it('Should set date to Wed July 23rd when adding 1 business day and the day passed in is a Tues July 22th', () => {
      const date = new Date('2020-07-22T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = addBusinessDays(date, 7);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-31');
    });
  });

  describe('When subtractBusinessDays is used...', () => {
    it('Should set date to Fri July 17th when subtracting 1 business day and the day passed in is a Mon July 20th', () => {
      const date = new Date('2020-07-20T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = subtractBusinessDays(date, 1);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-17');
    });

    it('Should set date to Thu July 16th when subtracting 2 business day and the day passed in is a Mon July 20th', () => {
      const date = new Date('2020-07-20T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = subtractBusinessDays(date, 2);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-16');
    });

    it('Should set date to Wed July 15th when subtracting 3 business day and the day passed in is a Mon July 20th', () => {
      const date = new Date('2020-07-20T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = subtractBusinessDays(date, 3);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-15');
    });

    it('Should set date to Tue July 14th when subtracting 4 business day and the day passed in is a Mon July 20th', () => {
      const date = new Date('2020-07-20T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = subtractBusinessDays(date, 4);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-14');
    });

    it('Should set date to Mon July 13th when subtracting 5 business day and the day passed in is a Mon July 20th', () => {
      const date = new Date('2020-07-20T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = subtractBusinessDays(date, 5);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-13');
    });

    it('Should set date to Thu July 16th when adding 1 business day and the day passed in is a Fri July 17th', () => {
      const date = new Date('2020-07-17T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = subtractBusinessDays(date, 1);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-16');
    });

    it('Should set date to Wed July 15th when adding 1 business day and the day passed in is a Fri July 17th', () => {
      const date = new Date('2020-07-17T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = subtractBusinessDays(date, 2);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-15');
    });

    it('Should set date to Tue July 14th when adding 1 business day and the day passed in is a Fri July 17th', () => {
      const date = new Date('2020-07-17T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = subtractBusinessDays(date, 3);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-14');
    });

    it('Should set date to Mon July 13th when adding 1 business day and the day passed in is a Fri July 17th', () => {
      const date = new Date('2020-07-17T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = subtractBusinessDays(date, 4);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-13');
    });

    it('Should set date to Fri July 10th when adding 1 business day and the day passed in is a Fri July 17th', () => {
      const date = new Date('2020-07-17T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });
      const futureDate = subtractBusinessDays(date, 5);
      expect(format(futureDate, 'YYYY-MM-DD')).toEqual('2020-07-10');
    });
  });

  describe('When isSwedishHoliday is used...', () => {
    it('Should count New Years Day as a holiday', () => {
      let date = new Date();
      date.setUTCFullYear(date.getFullYear(), 0, 1);
      date.setUTCHours(0, 0, 0, 0);

      if (isBefore(date, new Date())) {
        date = addYears(date, 1);
      }

      expect(isSwedishHoliday(date)).toEqual(true);
    });

    it('Should count Christmas Eve as a holiday', () => {
      let date = new Date();
      date.setUTCFullYear(date.getFullYear(), 11, 24);
      date.setUTCHours(0, 0, 0, 0);

      if (isBefore(date, new Date())) {
        date = addYears(date, 1);
      }

      expect(isSwedishHoliday(date)).toEqual(true);
    });

    it('Should count Christmas as a holiday', () => {
      let date = new Date();
      date.setUTCFullYear(date.getFullYear(), 11, 25);
      date.setUTCHours(0, 0, 0, 0);

      if (isBefore(date, new Date())) {
        date = addYears(date, 1);
      }

      expect(isSwedishHoliday(date)).toEqual(true);
    });

    it('Should not count the 2nd of January as a holiday', () => {
      let date = new Date();
      date.setUTCFullYear(date.getFullYear(), 0, 2);
      date.setUTCHours(0, 0, 0, 0);

      if (isBefore(date, new Date())) {
        date = addYears(date, 1);
      }

      expect(isSwedishHoliday(date)).toEqual(false);
    });
  });

  describe('When formatting the date', () => {
    it('Should return the Date object in the proper format', () => {
      const date = new Date('2020-01-01T12:00:00.000+00:00').toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });

      const t = jest.fn();
      t.mockReturnValue('MM/DD/YYYY');

      const output = displayDate(date, t);
      expect(output).toEqual('01/01/2020');
    });

    it('Should return the string date in the proper format', () => {
      const date = '2020-01-01';

      const t = jest.fn();
      t.mockReturnValue('MM/DD/YYYY');

      const output = displayDate(date, t);
      expect(output).toEqual('01/01/2020');
    });

    it('Should return the string date in the proper format', () => {
      const date = '01/02/2020';

      const t = jest.fn();
      t.mockReturnValue('YYYY-MM-DD');

      const output = displayDate(date, t);
      expect(output).toEqual('2020-01-02');
    });

    it('Should return the date input when the date is invalid', () => {
      const date = 'asdfasdf';

      const t = jest.fn();
      t.mockReturnValue('MM/DD/YYYY');

      const output = displayDate(date, t);
      expect(output).toEqual('asdfasdf');
    });
  });

  describe('When getting a date within x days', () => {
    it('Should return a true boolean value indicating that the date is within range', () => {
      const date = new Date();
      const value = withinXDays(date, 1);
      expect(value).toEqual(true);
    });
    it('Should return a false boolean value indicating that the date is not within range', () => {
      const date = new Date();

      let value = withinXDays(subDays(date, 3), 1);
      expect(value).toEqual(false);

      value = withinXDays(addDays(date, 3), 1);
      expect(value).toEqual(false);
    });
  });
});
