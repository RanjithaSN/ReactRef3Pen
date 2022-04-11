import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './divider.scss';


const Divider = ({ className, description, direction, type }) => (
  <div
    className={
      classNames({
        'c-divider': true,
        [`c-divider--${type}`]: true,
        'c-divider--descriptive': Boolean(description),
        [`c-divider--${direction}`]: true,
        [className]: Boolean(className)
      })
    }
  >
    {description}
  </div>
);

Divider.displayName = 'Divider';
Divider.propTypes = {
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  /** An optional description centered on the divider */
  description: PropTypes.string,
  /** Selects horizontal or vertical direction of divider */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /** Selects either a lighter or darker divider style */
  type: PropTypes.oneOf(['light', 'dark'])
};

Divider.defaultProps = {
  direction: 'horizontal',
  type: 'dark'
};

export default Divider;
