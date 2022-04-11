import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './card.scss';

const CardHeader = ({ appearance, className, children }) => (
  <div
    className={classNames(
      'c-card__header',
      [`c-card__header--${appearance}`],
      className
    )}
  >
    {children}
  </div>
);

CardHeader.displayName = 'CardHeader';
CardHeader.propTypes = {
  /** Conditionally render a border */
  appearance: PropTypes.oneOf(['normal', 'seamless']),
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  children: PropTypes.node
};
CardHeader.defaultProps = {
  appearance: 'normal'
};

export default CardHeader;
