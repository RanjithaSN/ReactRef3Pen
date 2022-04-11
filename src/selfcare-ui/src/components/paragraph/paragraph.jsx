import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './paragraph.scss';


const Paragraph = ({ className, children, html }) => {
  if (html) {
    return <div className={classNames('c-paragraph', className)}>{children}</div>;
  }
  return <p className={classNames('c-paragraph', className)}>{children}</p>;
};

Paragraph.displayName = 'Paragraph';

Paragraph.defaultProps = {
  html: false
};

Paragraph.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  html: PropTypes.bool
};
export default Paragraph;
