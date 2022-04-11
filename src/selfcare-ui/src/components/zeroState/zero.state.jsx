import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Heading from '../heading/heading';
import './zero.state.scss';


const ZeroState = ({ className, title, callToAction, description, elevatedDialogBox, elevatedDescription, elevatedNextStep, variant }) => {
  return (
    <div
      className={classNames('c-zero-state',
        [`c-zero-state--${variant}`],
        className)}
    >
      {title && <Heading category="major" className="c-zero-state__title">{title}</Heading>}
      {description && <Heading className="c-zero-state__description">{description}</Heading>}
      {callToAction && <div className="c-zero-state__call-to-action">{callToAction}</div>}
      {elevatedDialogBox && (
        <div className="c-zero-state__elevated-dialog-box">
          <div className="c-zero-state__elevated-description">{elevatedDescription}</div>
          <div className="c-zero-state__elevated-next-step">{elevatedNextStep}</div>
        </div>
      )}
    </div>
  );
};

ZeroState.displayName = 'ZeroState';
ZeroState.propTypes = {
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Display callToAction that the user can take in order to change the zero state */
  callToAction: PropTypes.node,
  /** Display description to show in zero state */
  description: PropTypes.string,
  /** Display elevated description if the elevatedDialog box when present */
  elevatedDescription: PropTypes.string,
  /** Display the dialog box that has additional information */
  elevatedDialogBox: PropTypes.bool,
  /** Display the next step action for the elevatedDialog box when present */
  elevatedNextStep: PropTypes.string,
  /** Display title to show in the zero state */
  title: PropTypes.string,
  /** Theme variant: affects the fill color */
  variant: PropTypes.oneOf(['standard', 'error'])
};
ZeroState.defaultProps = {
  elevatedDialogBox: false,
  variant: 'standard'
};

export default ZeroState;
