import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import RadioButton from '../radioButton/radio.button';
import RadioGroup from '../radioGroup/radio.group';
import './radio.button.group.scss';


const RADIO_BUTTON_CONTENT = '.c-radio-button__content'; // See `radio.button.scss`
const RADIO_BUTTON_WIDTH = 148; // `rem`-based min-size calculation. See `radio.button.group.scss`
const RADIO_BUTTON_SPACING = 80; // `padding-right` + `padding-left`. See `radio.button.scss`

class RadioButtonGroup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.radioGroup = React.createRef();
    this.state = {
      standardWidth: null
    };
  }

  componentDidMount() {
    const radioContentNodes = this.radioGroup.current.querySelectorAll(RADIO_BUTTON_CONTENT);
    const radioContentArray = Array.from(radioContentNodes);
    const minimumWidth = radioContentArray.length ? radioContentArray.map((r) => r.clientWidth).sort((a, b) => b - a)[0] + RADIO_BUTTON_SPACING : null;
    this.setState({
      standardWidth: minimumWidth
    });
  }

  render() {
    const { className, ...props } = this.props;
    const customWidth = this.state.standardWidth > RADIO_BUTTON_WIDTH;
    return (
      <RadioGroup
        className={classNames('c-radio-button-group', className)}
        ref={this.radioGroup}
        {...props}
        style={customWidth ? {
          gridTemplateColumns: `repeat(auto-fit, minmax(${this.state.standardWidth}px, 1fr))`
        } : null}
      />
    );
  }
}

RadioButtonGroup.displayName = 'RadioButtonGroup';
RadioButtonGroup.propTypes = {
  className: PropTypes.string,
  /** The name attribute which will be applied to the HTML input element for the radio buttons in the group. */
  name: PropTypes.string.isRequired,
  /** Aria label attribute to be applied to the radio button group. */
  label: PropTypes.string,
  /** The HTML disabled attribute to be applied to each radio button within the group. */
  disabled: PropTypes.bool,
  /** The HTML readOnly attribute to be applied to each radio button within the group. */
  readOnly: PropTypes.bool,
  /** The error attribute to be passed to each radio button in the group. */
  error: PropTypes.string,
  /** Callback function which will be called whenever the values of the group are updated. */
  onChange: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.objectOf(RadioButton))
};

export default RadioButtonGroup;
