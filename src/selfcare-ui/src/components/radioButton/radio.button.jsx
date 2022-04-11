import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './radio.button.scss';


const RadioButton = ({ className, id, children, ...props }) => (
  <div className={classNames('c-radio-button', className)}>
    <input type="radio" className="c-radio-button__input" id={id} {...props} />
    <label className="c-radio-button__label" htmlFor={id}>
      <div className="c-radio-button__content">{children}</div>
    </label>
  </div>
);

RadioButton.displayName = 'RadioButton';
RadioButton.propTypes = {
  className: PropTypes.string,
  /** The value of the id property will be set as the HTML ID attribute on the radio button. */
  id: PropTypes.string.isRequired,
  /** The value of the children property will be rendered as the label content for the radio button. */
  children: PropTypes.node
};

export default RadioButton;
