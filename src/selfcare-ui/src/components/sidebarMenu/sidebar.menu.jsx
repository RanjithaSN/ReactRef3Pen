import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { AppContext } from '../appContext/app.context';
import Button from '../button/button';
import { MEDIA_CONTEXT_SIZES } from '../mediaContext/media.context.constants';
import './sidebar.menu.scss';

class SidebarMenu extends React.Component {
    state = {
      selected: this.defaultSelectedItem
    };

    componentDidUpdate(prevProps) {
      const { defaultSelected, items } = this.props;

      if (prevProps.defaultSelected !== defaultSelected || prevProps.items !== items) {
        this.setState({
          selected: this.defaultSelectedItem
        });
      }
    }

    getSelectedItem(selectedId) {
      return this.props.items.find(({ id }) => String(id) === selectedId);
    }

    get defaultSelectedItem() {
      return this.props.defaultSelected && this.getSelectedItem(String(this.props.defaultSelected));
    }

    handleOnChange = () => {
      this.props.onChange(this.state.selected);
    };

    onSelectChange = (event) => {
      this.setState({
        selected: this.getSelectedItem(event.target.value)
      }, this.handleOnChange);
    };

    onChange = (item) => () => {
      this.setState({
        selected: item
      }, this.handleOnChange);
    };

    renderNonMobileItem = (item, active) => (
      <div key={item.id} className="c-sidebar-menu__item">
        <span
          className={classNames('c-sidebar-menu__border', {
            'c-sidebar-menu__border--active': active
          })}
        />
        <Button className="c-sidebar-menu__button" onClick={this.onChange(item)}>
          {item.content}
        </Button>
      </div>
    );

    render() {
      const { selected } = this.state;
      const { media } = this.context;
      return media.includes(MEDIA_CONTEXT_SIZES.LARGE) && (
        <div className="c-sidebar-menu__container">
          {this.props.items.map((item) => {
            const active = selected && selected.id === item.id;
            return this.renderNonMobileItem(item, active);
          })}
        </div>
      );
    }
}

SidebarMenu.displayName = 'SidebarMenu';
SidebarMenu.contextType = AppContext;
SidebarMenu.propTypes = {
  /** The default selected sidebar item ID */
  defaultSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** A list of ID'd content to render */
  items: PropTypes.arrayOf(PropTypes.shape({
    /** Item ID */
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /** The content of the item to be rendered */
    content: PropTypes.node.isRequired
  })).isRequired,
  /** Used to inform consumers that the selected menu item has changed */
  onChange: PropTypes.func.isRequired
};

export default SidebarMenu;
