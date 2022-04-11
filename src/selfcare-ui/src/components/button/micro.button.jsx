import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './button';

import './micro.button.scss';

const MicroButton = ({ className, ...props }) => (
  <Button className={classNames('c-micro-button', className)} {...props} />
);

MicroButton.displayName = 'MicroButton';
MicroButton.propTypes = {
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string
};
MicroButton.defaultProps = {};

export default MicroButton;
