import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import CheckboxGroup from '../checkboxGroup/checkbox.group';
import Heading from '../heading/heading';
import Input from '../input/input';
import Label, { LabelAffix } from '../label/label';
import RadioGroup from '../radioGroup/radio.group';
import Select from '../select/select';
import { withStandardSize } from '../withStandardSize/with.standard.size';
import './input.field.scss';

const NakedInputField = ({ className, help, labelText, description, input, ...props }) => {
  let labelId;
  let isInputType = false;
  if ([CheckboxGroup, RadioGroup].includes(input.type)) {
    labelId = `${input.props.name}_label`;
  }
  if ([Input, Select].includes(input.type)) {
    isInputType = true;
  }
  return (
    <div
      className={classNames('c-inputField',
        {
          'is-disabled': props.disabled,
          'is-readonly': props.readOnly,
          'is-error': props.error
        }, className)}
    >
      {labelText && !isInputType && (
        <LabelAffix
          required={props.required}
          help={help}
          arrowEnabled
        >
          <Label
            htmlFor={input.props.id}
            id={labelId}
          >
            {labelText}
          </Label>
        </LabelAffix>
      )}
      <div className="c-inputField-inner">
        {isInputType && React.cloneElement(input, { // TODO: handle aria for radios & checkboxes
          label: labelText && labelId,
          size: 'full',
          placeholder: input.props.placeholder ? input.props.placeholder : labelText,
          ...props
        })}
        {!isInputType && React.cloneElement(input, { // TODO: handle aria for radios & checkboxes
          label: labelText && labelId,
          size: 'full',
          ...props
        })}
      </div>
      {description && <LabelAffix required={props.required} className="c-inputField__description">{description}</LabelAffix>}
      {props.info && <div className="c-inputField-info"><Heading tone="quiet">{props.info}</Heading></div>}
      {props.error && <div className="c-inputField-error">{props.error}</div>}
    </div>
  );
};

NakedInputField.propTypes = {
  className: PropTypes.string,
  /** The value of the information text that should be printed under the input field for entry guidance. */
  info: PropTypes.node,
  /** Setting the required property to true will render the input field with a required indicator. */
  required: PropTypes.bool,
  /** Shows a description below the form element. */
  description: PropTypes.node,
  /** Setting the disabled property to true will render the input within the field in its disabled state. */
  disabled: PropTypes.bool,
  /** Setting the readOnly property to true will render the input within the field in its read-only state. */
  readOnly: PropTypes.bool,
  /** Setting the error property to true will render the input within the field in its error state. */
  error: PropTypes.string,
  /** Content which will be rendered when the user interacts with the help indicator. */
  help: PropTypes.node,
  /** Show input field label */
  labelText: PropTypes.string,
  /** <Input /> component */
  input: PropTypes.element.isRequired,
  /** Permitted, pre-defined component sizes. */
  size: PropTypes.oneOf(['full', 'large', 'medium', 'small', 'x-small', 'xx-small'])
};

const InputField = withStandardSize(NakedInputField);

export default InputField;
