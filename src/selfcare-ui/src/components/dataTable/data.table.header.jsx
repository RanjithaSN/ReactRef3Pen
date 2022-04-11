import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import IconAngleDown from '../../icons/react-icons/angle-down';
import IconAngleUp from '../../icons/react-icons/angle-up';
import { onEnter } from '../../utilities/keyboard.helper';
import Heading from '../heading/heading';
import { SORT_DIRECTION } from './data.table.constants';

const TableHeader = (props) => {
  let sortIcon = null;
  if (props.sortDirection === SORT_DIRECTION.ASCENDING) {
    sortIcon = <IconAngleDown />;
  } else if (props.sortDirection === SORT_DIRECTION.DESCENDING) {
    sortIcon = <IconAngleUp />;
  }

  const contentClassName = classNames('c-data-table__header-content rt-resizable-header-content', {
    'c-data-table__header-content--center': props.justify === 'center',
    'c-data-table__header-content--right': props.justify === 'right'
  });

  return (
    <div
      className={classNames('c-data-table__header rt-th rt-resizable-header', {
        'c-data-table__header--sortable': props.sortable
      })}
      style={props.style}
      role="columnheader"
      aria-sort={props.sortDirection}
    >
      {props.sortable && (
        <div
          className={contentClassName}
          role="button"
          tabIndex={0}
          onClick={props.toggleSort}
          onKeyPress={onEnter((event) => props.toggleSort(event))}
        >
          <Heading category="minor" tone="quiet">{props.header}</Heading>
          {sortIcon}
        </div>
      )}
      {!props.sortable && (
        <div className={contentClassName}>
          <Heading category="minor" tone="quiet">{props.header}</Heading>
          {sortIcon}
        </div>
      )}
    </div>
  );
};

TableHeader.displayName = 'TableHeader';
TableHeader.propTypes = {
  /** Heading text */
  header: PropTypes.string,
  /** Used to center or right-justify the header & cell content */
  justify: PropTypes.oneOf(['left', 'center', 'right']),
  /** Enables forting for the column */
  sortable: PropTypes.bool,
  /** Sorting status of the current column */
  sortDirection: PropTypes.oneOf(Object.keys(SORT_DIRECTION).map((key) => SORT_DIRECTION[key])).isRequired,
  /** style object, passed in from the react-table */
  style: PropTypes.object.isRequired,

  /** [[IgnoreDoc]] Callback to handle sort toggle, passed in from react-table */
  toggleSort: PropTypes.func.isRequired
};
TableHeader.defaultProps = {
  justify: 'left'
};

export default TableHeader;
