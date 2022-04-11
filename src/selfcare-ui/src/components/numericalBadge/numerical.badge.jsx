import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './numerical.badge.scss';

const NumericalBadge = ({ className, badgeNumber, variant }) => (
  <div
    className={
      classNames(
        'c-numerical-badge',
        `c-numerical-badge--${variant}`,
        className
      )
    }
  >
    {badgeNumber}
  </div>
);

NumericalBadge.displayName = 'NumericalBadge';

NumericalBadge.defaultProps = {
  variant: 'standard'
};

NumericalBadge.propTypes = {
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** The number to show in the badge */
  badgeNumber: PropTypes.number.isRequired,
  /** All size variants */
  variant: PropTypes.oneOf(['small', 'standard'])
};

export default NumericalBadge;
