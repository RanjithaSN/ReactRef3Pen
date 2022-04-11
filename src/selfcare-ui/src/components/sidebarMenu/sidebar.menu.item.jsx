import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { AppContext } from '../appContext/app.context';
import Heading from '../heading/heading';
import { MEDIA_CONTEXT_SIZES } from '../mediaContext/media.context.constants';
import './sidebar.menu.item.scss';


const SidebarMenuItem = ({ heading, subtext, thumbnail }) => (
  <AppContext.Consumer>
    {({ media }) => (
      <div className="c-sidebar-menu-item">
        {media.includes(MEDIA_CONTEXT_SIZES.NOTSMALL) && (
          <React.Fragment>
            {thumbnail && React.cloneElement(thumbnail, {
              className: classNames(thumbnail.props.className, 'c-sidebar-menu-item__thumbnail')
            })}
            <div className="c-sidebar-menu-item__text">
              <Heading category="brand" tone="quiet">{heading}</Heading>
              <span className="c-sidebar-menu-item__subtext">{subtext}</span>
            </div>
          </React.Fragment>
        )}
        {media.includes(MEDIA_CONTEXT_SIZES.SMALL) && <Heading variant={2}>{heading}</Heading>}
      </div>
    )}
  </AppContext.Consumer>
);

SidebarMenuItem.displayName = 'SidebarMenuItem';
SidebarMenuItem.propTypes = {
  /** The menu item banner text */
  heading: PropTypes.node.isRequired,
  /** The optional subtext to be displayed beneath the banner text */
  subtext: PropTypes.node,
  /** An optional thumbnail image to render aside-left */
  thumbnail: PropTypes.node
};

export default SidebarMenuItem;
