import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Heading from '../heading/heading';
import Clickable from '../link/clickable';
import './flag.scss';


const Flag = ({ appearance, className, icon, orientation, text, textTone, ...props }) => (
  <Clickable
    className={classNames('c-flag unset-button-min-width',
      [`c-flag--${orientation}`],
      [`c-flag--${appearance}`],
      {
        'c-flag--actionable': props.href || props.onClick || props.to
      },
      className)}
    {...props}
  >
    {icon && <span className="c-flag__icon">{icon}</span>}
    <Heading category="minor" tone={textTone} className="c-flag__text">{text}</Heading>
  </Clickable>
);

Flag.displayName = 'Flag';
Flag.propTypes = {
  /** Optionally apply bolder styles to the text and icon */
  appearance: PropTypes.oneOf(['normal', 'emphasis']),
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  /** <a /> href */
  href: PropTypes.string,
  /** Icon Component to the side of the main content */
  icon: PropTypes.node,
  /** <button /> action */
  onClick: PropTypes.func,
  /** Optionally reverse the order of the text and icon */
  orientation: PropTypes.oneOf(['normal', 'reversed']),
  /** Main content to display */
  text: PropTypes.node.isRequired,
  /** The tone for the heading of the text */
  textTone: PropTypes.oneOf(['quiet', 'normal']),
  /** react-router href */
  to: PropTypes.string
};
Flag.defaultProps = {
  appearance: 'normal',
  orientation: 'normal',
  textTone: 'quiet'
};

export default Flag;
