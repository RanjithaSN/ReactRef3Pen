import PropTypes from 'prop-types';
import React from 'react';
import { formatCurrency } from '../../utilities/localization/currency';

const Currency = ({ value, code, locale }) => (
  <React.Fragment>{formatCurrency(value, code, locale)}</React.Fragment>
);

Currency.displayName = 'Currency';
Currency.propTypes = {
  /** A numeric value representing an amount of currency. */
  value: PropTypes.number,
  /** The currency code for the currency. */
  code: PropTypes.string,
  /** The locale with which to render the currency.  Should be the locale of the user, i.e. someone from France would expect to see commas rather than decimal points in their currencies. */
  locale: PropTypes.string
};

Currency.defaultProps = {
  value: 0,
  code: 'SEK'
};

export default Currency;
