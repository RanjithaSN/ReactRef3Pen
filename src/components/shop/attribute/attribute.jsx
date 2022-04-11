import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Heading from 'selfcare-ui/src/components/heading/heading';
import './attribute.scss';


const Attribute = ({ children, className, description, error, icon, inlineView }) => (
  <div
    className={classNames('c-attribute', {
      'c-attribute-inline': inlineView
    }, className)}
  >
    {description && (
      <div className="c-attribute__main">
        <div className="c-attribute__icon" aria-hidden>
          {icon}
        </div>
        <div className="c-attribute__content">
          {description && <Heading>{description}</Heading>}
        </div>
      </div>
    )}
    <div className="c-attribute__input">
      {children}
    </div>
    {error && (
      <div className="c-attribute__error">
        {error}
      </div>
    )}
  </div>
);

Attribute.displayName = 'Attribute';
Attribute.propTypes = {
  /** The underlying form element */
  children: PropTypes.node.isRequired,
  /** Additional class names to be applied to the top level of the attribute object */
  className: PropTypes.string,
  /** Supporting content, if available */
  description: PropTypes.node,
  /** Whether these attributes are rendered inline */
  inlineView: PropTypes.bool,
  /** Validation error */
  error: PropTypes.string,
  /** Supporting icon element, if available */
  icon: PropTypes.element
};

export default Attribute;
