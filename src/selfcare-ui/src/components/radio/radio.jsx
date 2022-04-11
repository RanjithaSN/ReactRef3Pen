import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Heading from '../heading/heading';
import './radio.scss';


const Radio = ({ className, id, children, ...props }) => (
  <label className={classNames('c-radio', className)} htmlFor={id}>
    <input type="radio" className="c-radio__input" id={id} {...props} />
    <span className="c-radio__label" />
    <Heading className="c-radio__content" category="minor" tone="normal">{children}</Heading>
  </label>
);

Radio.displayName = 'Radio';
Radio.propTypes = {
  className: PropTypes.string,
  /** The value of the id property will be set as the HTML ID attribute on the radio button. */
  id: PropTypes.string.isRequired,
  /** The value of the children property will be rendered as the label content for the radio button. */
  children: PropTypes.node
};

export default Radio;
