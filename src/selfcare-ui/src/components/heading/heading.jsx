import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './heading.scss';

const headingMapping = {
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
  h6: 6,
  span: 7
};

const Heading = ({ children, className, category, tone, bold }) => {
  let hNumber = 4;
  const hNumberModifier = (base) => {
    // If quiet, go down one rank (base + 1 eg h4 + 1 => h5)
    return base + (tone === 'quiet' ? 1 : 0);
  };
  switch (category) {
  case 'brand':
    hNumber = tone === 'loud' ? headingMapping.h1 : hNumberModifier(headingMapping.h2);
    break;
  case 'major':
    hNumber = hNumberModifier(headingMapping.h4);
    break;
  case 'medium':
    hNumber = hNumberModifier(headingMapping.h3);
    break;
  case 'minor':
    hNumber = hNumberModifier(headingMapping.h6);
    break;
  default:
    hNumber = headingMapping.h4;
  }
  const boldClass = {
    'c-heading--bold': bold
  };
  switch (hNumber) {
  case headingMapping.h1:
    return (
      <h1 className={classNames(boldClass, className)}>
        {children}
      </h1>
    );
  case headingMapping.h2:
    return (
      <h2 className={classNames(boldClass, className)}>
        {children}
      </h2>
    );
  case headingMapping.h3:
    return (
      <h3 className={classNames(boldClass, className)}>
        {children}
      </h3>
    );
  case headingMapping.h4:
    return (
      <h4 className={classNames(boldClass, className)}>
        {children}
      </h4>
    );
  case headingMapping.h5:
    return (
      <h5 className={classNames(boldClass, className)}>
        {children}
      </h5>
    );
  case headingMapping.h6:
    return (
      <h6 className={classNames(boldClass, className)}>
        {children}
      </h6>
    );
  case headingMapping.span:
    return (
      <span className={classNames(boldClass, 'c-heading--minor-quiet', className)}>
        {children}
      </span>
    );
  default:
    return (
      <h4 className={className}>
        {children}
      </h4>
    );
  }
};

Heading.displayName = 'Heading';
Heading.propTypes = {
  /** Adds classes necessary to render font styles.   */
  category: PropTypes.oneOf(['brand', 'major', 'medium', 'minor']),
  /** Adds classes necessary to render the sizing of the header. */
  tone: PropTypes.oneOf(['quiet', 'normal', 'loud']),
  /** Makes the font bold **/
  bold: PropTypes.bool,
  /** Any children for this component will be rendered as the content of the heading span. */
  children: PropTypes.node,
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string
};
Heading.defaultProps = {
  category: 'minor',
  tone: 'normal',
  bold: false
};

export default Heading;
