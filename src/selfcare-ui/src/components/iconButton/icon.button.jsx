import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import FilledButton from '../button/filled.button';
import OutlineButton from '../button/outline.button';
import './icon.button.scss';


const IconButton = ({ children, className, icon, kind, labelClassName, orientation, theme, ...props }) => {
  const Element = kind === 'filled' ? FilledButton : OutlineButton;
  return (
    <Element
      className={classNames('c-icon-button',
        [`c-icon-button--${orientation}`],
        [`c-icon-button--${kind}`],
        [`c-icon-button--${theme}`],
        {
          'c-icon-button--square': !children || !children.length
        },
        className)}
      {...props}
    >
      <div className="c-icon-button__icon">{icon}</div>
      {children && <div className={classNames(labelClassName)}>{children}</div>}
    </Element>
  );
};

IconButton.displayName = 'IconButton';
IconButton.propTypes = {
  /** Content to appear on the right of the icon. */
  children: PropTypes.string,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** String used to render color for icon button */
  theme: PropTypes.oneOf(['dark', 'light']),
  /** Icon to display on the left of the button text. */
  icon: PropTypes.element.isRequired,
  /** Button styles */
  kind: PropTypes.oneOf(['filled', 'outline', 'transparent']),
  /** Use to pass a custom class name to the component's label. */
  labelClassName: PropTypes.string,
  /** Optionally reverse the order of the text and icon */
  orientation: PropTypes.oneOf(['normal', 'reversed'])
};
IconButton.defaultProps = {
  kind: 'filled',
  orientation: 'normal'
};

export default IconButton;
