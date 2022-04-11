import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './tag.scss';

const Tag = ({ children, className, type }) => {
  const variantClass = `c-tag--${type}`;
  return (
    <span className={classNames('c-tag', variantClass, className)}>
      {children}
    </span>
  );
};

Tag.displayName = 'Tag';
Tag.propTypes = {
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error'])
};
Tag.defaultProps = {
  type: 'info'
};

export default Tag;
