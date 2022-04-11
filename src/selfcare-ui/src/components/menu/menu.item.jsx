import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import merge from 'deepmerge';
import Popper from '../popper/popper';
import ClickableArea from '../popper/clickable.area';
import IconAngleRight from '../../icons/react-icons/angle-right';
import IconInfoFilled from '../../icons/react-icons/info-filled';
import Link from '../link/link';
import Tooltip from '../tooltip/tooltip';

import './menu.scss';

const defaultOptions = {
  placement: 'right-start',
  modifiers: {
    offset: {
      offset: '0, 8'
    }
  }
};

const ItemContents = ({ icon, text, isDisabled, label, onClick, onClose, disabledTooltip, ...props }) => (
  isDisabled ? (
    <span className="c-menuItem-content">
      {icon && <span className="c-menuItem-icon">{icon}</span>}
      {text && <span className="c-menuItem-text">{text}</span>}
      {label && <span className="c-menuItem-label">{label}</span>}
      {disabledTooltip && (
        <Tooltip content={<div className="c-menuItem-tooltip__content">{disabledTooltip}</div>}>
          <IconInfoFilled className="c-menuItem-tooltip__icon" />
        </Tooltip>
      )}
    </span>
  ) : (
    <ClickableArea>
      <Link
        className="c-menuItem-action"
        onClick={(e) => {
          onClick(e);
          onClose();
        }}
        {...props}
      >
        <span className="c-menuItem-content">
          {icon && <span className="c-menuItem-icon">{icon}</span>}
          {text && <span className="c-menuItem-text">{text}</span>}
          {label && <span className="c-menuItem-label">{label}</span>}
        </span>
      </Link>
    </ClickableArea>
  )
);

ItemContents.propTypes = {
  /** MenuItem main text */
  text: PropTypes.node,
  /** MenuItem prepended icon element */
  icon: PropTypes.element,
  /** Flag to determine if the button is disabled or not. */
  isDisabled: PropTypes.bool,
  /** MenuItem appended icon element, text, or number */
  label: PropTypes.node,
  /** The menu item callback for handling menu item selection */
  onClick: PropTypes.func.isRequired,
  /** Fn to call after `onClicked` fires. Typically related to popout closure */
  onClose: PropTypes.func,
  /** Content to be displayed inside of a tooltip to tell the user more information. */
  disabledTooltip: PropTypes.string
};

ItemContents.defaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose: () => {}
};

const Control = ({ icon, text, togglePopper, innerRef }) => (
  <div ref={innerRef}>
    <ItemContents
      onClick={togglePopper}
      icon={icon}
      text={text}
      label={<IconAngleRight />}
    />
  </div>
);

Control.propTypes = {
  /** MenuItem main text */
  text: PropTypes.node,
  /** MenuItem prepended icon element */
  icon: PropTypes.element,
  /** Control for opening and closing the Popper */
  togglePopper: PropTypes.func.isRequired,
  /** A forwarded ref emitted by the Popper */
  innerRef: PropTypes.object
};

const PopContent = ({ children, onClose, closePopper }) => (
  React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      onClose: () => {
        closePopper();
        onClose();
      }
    });
  })
);

const MenuItem = ({ children, text, icon, isDisabled, label, className, options, onClose, disabledTooltip, ...props }) => {
  const opts = merge(defaultOptions, options);
  const hasSubmenu = React.Children.count(children) > 0;
  return (
    <li
      className={classNames('c-menuItem', {
        'has-subMenu': hasSubmenu,
        'is-disabled': isDisabled
      }, className)}
    >
      {hasSubmenu ? (
        <Popper
          options={opts}
          emitControlRef
          control={Control}
          controlProps={{
            text,
            icon
          }}
          content={PopContent}
          contentProps={{
            children,
            onClose
          }}
        />
      ) : (
        <ItemContents
          {...props}
          isDisabled={isDisabled}
          onClose={onClose}
          icon={icon}
          text={text}
          disabledTooltip={disabledTooltip}
          label={label}
        />
      )}
    </li>
  );
};

MenuItem.displayName = 'MenuItem';
MenuItem.propTypes = {
  /** Submenu <Menu /> */
  children: PropTypes.node,
  /** MenuItem main text */
  text: PropTypes.node,
  /** MenuItem prepended icon element */
  icon: PropTypes.element,
  /** Flag to determine if a button is disabled or not. */
  isDisabled: PropTypes.bool,
  /** MenuItem appended icon element, text, or number. Will be overridden on items with submenus */
  label: PropTypes.node,
  /** `className` to pass to the menu item */
  className: PropTypes.string,
  /** Popper.js options to override default behavior. See https://popper.js.org/popper-documentation.html#Popper.Defaults */
  options: PropTypes.object,
  /** Fn to call after `onClicked` fires. Typically related to popout closure */
  onClose: PropTypes.func,
  /** Content to be displayed inside of a tooltip to tell the user more information on why it is disabled. */
  disabledTooltip: PropTypes.string
};
MenuItem.defaultProps = {
  options: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose: () => {}
};

export default MenuItem;
