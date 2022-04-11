export const FORMAT_CURRENCY_FALLBACK = '?';

export const formatCurrency = (value, currencyCode, locale, noDecimals = true) => {
  let config = {
    style: 'currency',
    currency: currencyCode
  };

  if (noDecimals) {
    config = {
      ...config,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    };
  }

  if (!Number.isNaN(value) && currencyCode) {
    try {
      return value.toLocaleString(locale, config);
    } catch (e) {
      return FORMAT_CURRENCY_FALLBACK;
    }
  }

  return FORMAT_CURRENCY_FALLBACK;
};

export const getCurrencySymbol = (currencyCode, locale) => {
  /*
    FIXME When we have better browser support for Intl functions.
    const formatter = Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode
    });
    const currencyParts = formatter.format(0);
    const symbol = currencyParts.find(part => part.type === 'currency');
    return symbol.value;
    */
  return formatCurrency(0, currencyCode, locale).replace(/[\d\s,.]/g, '');
};
