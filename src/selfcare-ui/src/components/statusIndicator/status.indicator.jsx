import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Flag from '../flag/flag';
import { STATUS_FILL_OPTIONS } from './status.indicator.constants';
import { getStatusIndicatorToDisplay } from './status.indicator.helpers';
import './status.indicator.scss';

const StatusIndicator = ({ appearance, className, type, value, customLabel, labelTone }) => {
  const getStatusIndicator = () => {
    return type && (value >= 0) ? getStatusIndicatorToDisplay(type, value, customLabel) : null;
  };
  const statusIndicator = getStatusIndicator();

  const StatusIndicatorVariant = () => {
    switch (statusIndicator.fill) {
    case STATUS_FILL_OPTIONS.INFO:
      return 'c-status-indicator_icon--info';
    case STATUS_FILL_OPTIONS.SUCCESS:
      return 'c-status-indicator_icon--success';
    case STATUS_FILL_OPTIONS.ERROR:
      return 'c-status-indicator_icon--error';
    case STATUS_FILL_OPTIONS.WARNING:
      return 'c-status-indicator_icon--warning';
    default:
      break;
    }
  };

  return (
    <div className={classNames('c-status-indicator', className)}>
      <Flag appearance={appearance} className={classNames('c-status-indicator_icon', StatusIndicatorVariant())} text={statusIndicator.label} textTone={labelTone} icon={statusIndicator.icon} />
    </div>
  );
};

StatusIndicator.displayName = 'StatusIndicator';
StatusIndicator.propTypes = {
  /** Optionally apply bolder styles to the text and icon */
  appearance: PropTypes.oneOf(['normal', 'emphasis']),
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Label to use in place of generated label by the component. */
  customLabel: PropTypes.string,
  /** Tone used for label flag rendering */
  labelTone: PropTypes.oneOf(['quiet', 'normal']),
  /** Use to specify which definition should be used for the indicator */
  type: PropTypes.string.isRequired,
  /** Use to determine which status of the indicator to show */
  value: PropTypes.number.isRequired
};
StatusIndicator.defaultProps = {
  appearance: 'normal',
  labelTone: 'quiet'
};

export default StatusIndicator;
