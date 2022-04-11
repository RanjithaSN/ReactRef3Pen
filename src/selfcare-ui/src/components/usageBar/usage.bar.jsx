import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './usage.bar.scss';


const UsageBar = (props) => {
  const usedWidth = (props.total <= 0 || props.unlimited) ? 100 : Math.min(100, (props.used / props.total) * 100);
  return (
    <div className={classNames('c-usageBar', props.className)}>
      <div
        className="c-usageBar-used"
        style={{
          width: `${usedWidth}%`
        }}
      />
    </div>
  );
};

UsageBar.displayName = 'UsageBar';
UsageBar.propTypes = {
  /** Use to pass a custom class name to the usage bar. */
  className: PropTypes.string,
  /** The total amount of a given commodity being used, only applies to limited entitlements */
  total: (props) => {
    if (props.total === undefined && !props.unlimited) {
      return new Error('Total is required if the usage is not unlimited');
    }
    if (typeof props.total !== 'number' && !props.unlimited) {
      return new Error('Total must be a number');
    }
  },
  /** The amount used out of the total, expressed as an amount in the same unit as the total */
  used: (props) => {
    if (typeof props.total === 'number' && typeof props.used !== 'number') {
      return new Error('Used must be provided as a number if total exists as a number');
    }
  },
  unlimited: PropTypes.bool
};
UsageBar.defaultProps = {
  unlimited: false
};

export default UsageBar;
