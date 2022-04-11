import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './card.scss';

const CardFooter = ({ appearance, className, children, variant }) => (
  <div
    className={classNames(
      'c-card__footer',
      [`c-card__footer--${appearance}`],
      [`c-card__footer--${variant}`],
      className
    )}
  >
    {children}
  </div>
);

CardFooter.displayName = 'CardFooter';
CardFooter.propTypes = {
  /** Conditionally render a border */
  appearance: PropTypes.oneOf(['normal', 'seamless']),
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  children: PropTypes.node,
  /** Conditionally set sizing opinions for Button and Link children layout */
  variant: PropTypes.oneOf(['action', 'auto'])
};
CardFooter.defaultProps = {
  appearance: 'normal',
  variant: 'action'
};

export default CardFooter;
