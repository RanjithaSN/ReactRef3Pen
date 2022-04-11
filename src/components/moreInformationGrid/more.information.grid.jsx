import { MoreInformationItemProps } from '../landingPageBase/landing.page.base.helpers';
import './more.information.grid.scss';
import USPList from 'ui/components/usp/usp-list';
import USPListItem from 'ui/components/usp/usp-list-item';
import React from 'react';
import PropTypes from 'prop-types';

const MoreInformationGrid = ({ items }) => {
  return (
    <USPList>
      {items.map((item) => (
        <USPListItem key={item.title}>{item.title}</USPListItem>
      ))}
    </USPList>
  );
};

MoreInformationGrid.displayName = 'MoreInformationGrid';
MoreInformationGrid.propTypes = {
  /** Items to be rendered in grid */
  items: PropTypes.arrayOf(MoreInformationItemProps).isRequired
};
export default MoreInformationGrid;
