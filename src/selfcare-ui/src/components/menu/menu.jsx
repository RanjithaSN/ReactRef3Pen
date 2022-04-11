import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './menu.scss';

const Menu = ({ standalone, children, className, onClose }) => (
  <ul
    className={classNames('c-menu', {
      'c-menu--standalone': standalone
    }, className)}
  >
    {React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        onClose
      });
    })}
  </ul>
);

Menu.displayName = 'Menu';
Menu.propTypes = {
  /** Standalone mode, which is consumed via CSS */
  standalone: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  /** Fn to call after a MenuItem's `onClicked` fires. Typically related to popout closure */
  onClose: PropTypes.func
};
Menu.defaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose: () => { }
};

export default Menu;
