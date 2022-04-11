const round = (value = 0) => {
  const parsed = typeof value === 'string' ? Number.parseFloat(value) : value;
  return Number.parseFloat(parsed.toFixed(Number.isInteger(parsed) ? 0 : 2));
};

export const formatNumber = (number, locale) => {
  return round(number).toLocaleString(locale);
};
