import isWithinRange from 'date-fns/is_within_range';
import addDays from 'date-fns/add_days';
import format from 'date-fns/format';
import getDay from 'date-fns/get_day';
import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';
import isSameDay from 'date-fns/is_same_day';
import isSunday from 'date-fns/is_sunday';
import isValid from 'date-fns/is_valid';
import LocaleKeys from 'locales/keys';
import { getUpcomingHolidays } from 'swedish-holidays';


export const parseToISOString = (birthDate, removeHours = false) => {
  let result = '';

  const timeStamp = Date.parse(birthDate);
  if (timeStamp) {
    const utcDate = new Date(timeStamp);
    if (removeHours) {
      utcDate.setUTCHours(0, 0, 0, 0);
    }
    result = utcDate.toISOString();
  }

  return result;
};

export const addBusinessDays = (date, businessDays) => {
  const day = getDay(date);
  let daysToAdd = parseInt(businessDays, 10);

  // If the current day is Sunday add one day
  if (isSunday(date)) {
    daysToAdd += 1;
  }

  // If the start date plus the additional days falls on or after the closest Saturday calculate weekends
  if (day + daysToAdd >= 6) {
    // Subtract days in current working week from work days
    const remainingWorkDays = daysToAdd - (5 - day);

    // Add current working week's weekend
    daysToAdd += 2;

    if (remainingWorkDays > 5) {
      // Add two days for each working week by calculating how many weeks are included
      daysToAdd += 2 * Math.floor(remainingWorkDays / 5);

      // Exclude final weekend if remainingWorkDays resolves to an exact number of weeks
      if (remainingWorkDays % 5 === 0) {
        daysToAdd -= 2;
      }
    }
  }
  return addDays(date, daysToAdd);
};

/**
 * Adds the number of months to a date without mutating the date object.
 * */
export const addMonths = (date, months) => {
  const tmpDate = new Date(date);
  tmpDate.setMonth(tmpDate.getMonth() + months);
  return tmpDate;
};


export const subtractBusinessDays = (date, businessDays) => {
  const day = getDay(date);
  let daysToSubtract = -(parseInt(businessDays, 10));

  // If the current day is Sunday subtract two days
  if (isSunday(date)) {
    daysToSubtract -= 2;
  }

  // Shift 2 more for Weekends
  if (day + daysToSubtract <= 0) {
    // Add days in current working week from work days
    const remainingWorkDays = daysToSubtract + (5 + day);

    // Subtract current working week's weekend
    daysToSubtract -= 2;

    if (remainingWorkDays > 5) {
      // Subtract two days for each working week by calculating how many weeks are included
      daysToSubtract -= 2 * Math.floor(remainingWorkDays / 5);

      // Exclude final weekend if remainingWorkDays resolves to an exact number of weeks
      if (remainingWorkDays % 5 === 0) {
        daysToSubtract += 2;
      }
    }
  }
  return addDays(date, daysToSubtract);
};

export const inRange = (date, start, end) => {
  return isBefore(date, end) && isAfter(date, start);
};

export const isSwedishHoliday = (date) => {
  const holidays = getUpcomingHolidays();

  // Filter out holidays that aren't official ones
  const filteredHolidays = [
    'trettondagsafton', // Twelfth Night
    'skärtorsdagen', // Maundy Thursday
    'allhelgonaafton', // All Saint's Eve
    'valborgsmässoafton' // Walpurgisnacht
    // These ones are national or bank holidays
    // 'Nyårsdagen' - New Year's Day
    // 'Trettondedag jul' - Epiphany
    // 'Långfredagen' - Good Friday
    // 'Påskafton' - Easter Eve
    // 'Påskdagen' - Easter Sunday
    // 'Annandag påsk' - Easter Monday
    // 'Första maj' - May Day
    // 'Kristi himmelsfärdsdag' - Ascension Day
    // 'Sveriges nationaldag', - Swedish National Day
    // 'Pingstafton' - Whitsunday
    // 'Pingstdagen' - Pentecost
    // 'Midsommarafton' - Midsommar Eve
    // 'Midsommardagen' - Midsommar Day
    // 'Alla helgons dag' - Halloween
    // 'Julafton' - Christmas Eve
    // 'Juldagen' - Christmas
    // 'Annandag jul' - Boxing Day
    // 'Nyårsafton'  - New Year's Eve
  ];

  const actualHolidays = holidays.filter((holiday) => {
    return !filteredHolidays.includes(holiday.name.toLowerCase());
  });

  return actualHolidays.filter((holiday) => {
    return isSameDay(date, holiday.date);
  }).length > 0;
};

// This function will return the current day with the time set to 00:00:00. Basically this allows use to create a date and ignore the time.
export const today = () => format(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), 'YYYY-MM-DD');

export const displayDate = (date, t) => {
  if (!isValid(new Date(date))) {
    return date;
  }

  return format(date, t(LocaleKeys.DATE.DATE_FORMAT));
};

export const withinXDays = (date, day) => {
  return isWithinRange(date, today(), addDays(new Date(), day));
};


export const getNextAvailableDay = (minimumDaysforPortin) => {
  let firstAvailableDay;

  for (let index = 1; index <= minimumDaysforPortin; index++) {
    firstAvailableDay = addBusinessDays(today(), index);
    if (isSwedishHoliday(firstAvailableDay)) {
      minimumDaysforPortin++;
    }
  }

  return firstAvailableDay;
};
