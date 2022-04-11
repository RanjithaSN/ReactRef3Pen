const getSafeDate = (date) => (
  date instanceof Date ? date : new Date(date)
);

export const formatDateTime = (datetime, locale) => {
  return getSafeDate(datetime).toLocaleString(locale);
};

export const formatDate = (date, locale, pattern) => {
  const formattedDate = getSafeDate(date).toLocaleDateString(locale, pattern);

  return formattedDate === 'Invalid Date' ? date : formattedDate;
};

export const formatTime = (time, locale) => {
  return getSafeDate(time).toLocaleTimeString(locale);
};

export const formatShortDate = (date, locale) => {
  return getSafeDate(date).toLocaleDateString(locale, {
    month: '2-digit',
    day: '2-digit'
  });
};

const getNoZuluDate = (date) => {
  let dateValue;
  if (typeof (date) === 'string') {
    dateValue = date.replace('Z', '');
  } else if (date instanceof Date) {
    dateValue = date.toISOString().replace('Z', '');
  } else {
    dateValue = date;
  }

  return getSafeDate(dateValue);
};

export const formatZuluDate = (date, locale, pattern) => {
  const safeDate = getNoZuluDate(date);
  return formatDate(new Date(safeDate.toLocaleDateString()), locale, pattern);
};
