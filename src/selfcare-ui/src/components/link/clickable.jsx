import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/button';

import './link.scss';

const Clickable = (props) => {
  let Element = 'span';
  if (props.href) {
    Element = 'a';
  } else if (props.to) {
    Element = Link;
  } else if (props.onClick) {
    Element = Button;
  }
  return (
    <Element {...props} />
  );
};

Clickable.displayName = 'Clickable';
Clickable.propTypes = {
  /** <a /> href attribute */
  href: PropTypes.string,
  /** Optional action taken when clicked */
  onClick: PropTypes.func,
  /** react-router target Route */
  to: PropTypes.string
};
Clickable.defaultProps = {};
export default Clickable;
