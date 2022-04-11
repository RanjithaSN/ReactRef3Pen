import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '../../utilities/localization/number';

const Number = ({ value, locale }) => (
  <React.Fragment>{formatNumber(value, locale)}</React.Fragment>
);

Number.displayName = 'Number';
Number.propTypes = {
  /** A numeric value to be convert to locale. */
  value: PropTypes.number.isRequired,
  /** The locale with which to render number.  Should be the locale of the user, i.e. someone from Germany would expect to see decimal points rather than commas. */
  locale: PropTypes.string
};

export default Number;
