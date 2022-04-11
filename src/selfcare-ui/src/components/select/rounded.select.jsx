import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/button';
import IconAngleDown from '../../icons/react-icons/angle-down';
import Menu from '../menu/menu';
import MenuItem from '../menu/menu.item';
import Popper from '../popper/popper';

import './rounded.select.scss';

const PopContent = ({ closePopper, menuItems }) => (
  <Menu onClose={closePopper}>
    {menuItems}
  </Menu>
);

PopContent.propTypes = {
  closePopper: PropTypes.func.isRequired,
  menuItems: PropTypes.node.isRequired
};

const Control = ({ togglePopper, affix, selected }) => (
  <Button className="c-rounded-select" onClick={togglePopper}>
    {affix && <span className="c-rounded-select__affix">{affix}</span>}
    <span className="c-rounded-select__selected">{selected}</span>
    <span className="c-rounded-select__arrow">
      <IconAngleDown />
    </span>
  </Button>
);

Control.propTypes = {
  togglePopper: PropTypes.func.isRequired,
  affix: PropTypes.node,
  selected: PropTypes.string
};

const RoundedSelect = ({ affix, selected, options, onChange }) => (
  <Popper
    options={{
      placement: 'bottom'
    }}
    control={Control}
    controlProps={{
      affix,
      selected
    }}
    content={PopContent}
    contentProps={{
      menuItems: options && options.map((option) => (
        <MenuItem
          key={option}
          text={option}
          onClick={() => {
            if (option !== selected) {
              onChange(option);
            }
          }}
        />
      ))
    }}
  />
);

RoundedSelect.displayName = 'RoundedSelect';
RoundedSelect.propTypes = {
  /** Content to display next to the selected item */
  affix: PropTypes.node,
  /** The selected item */
  selected: PropTypes.string,
  /** Options to show in the menu */
  options: PropTypes.arrayOf(PropTypes.string),
  /** Function to call when the selection is changed */
  onChange: PropTypes.func
};


export default RoundedSelect;
