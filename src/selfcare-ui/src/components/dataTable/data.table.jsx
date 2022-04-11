import classNames from 'classnames';
import PropTypes from 'prop-types';
import is from 'ramda/src/is';
import React from 'react';
import ReactTable from 'react-table';
import IconMinus from '../../icons/react-icons/minus';
import IconPlus from '../../icons/react-icons/plus';
import { AppContext } from '../appContext/app.context';
import Heading from '../heading/heading';
import { MEDIA_CONTEXT_SIZES } from '../mediaContext/media.context.constants';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS, SORT_DIRECTION } from './data.table.constants';
import TableHeader from './data.table.header';
import TablePager from './data.table.pager';
import './data.table.scss';

class DataTable extends React.Component {
    getPropsWithClass = (className) => {
      return () => ({
        className
      });
    };

    getTheadThProps = (state, rowInfo, column) => {
      let sortDirection = SORT_DIRECTION.NONE;
      if (state.sorted.length) {
        const { id, desc } = state.sorted[0];
        if (id === column.id) {
          sortDirection = desc ? SORT_DIRECTION.DESCENDING : SORT_DIRECTION.ASCENDING;
        }
      }

      return {
        ...column,
        header: column.Header,
        sortable: Boolean(column.sortable),
        sortDirection
      };
    };

    getTdProps = (state, rowInfo, column) => {
      return {
        className: classNames('c-data-table__cell', `c-data-table__cell--${column.justify}`),
        onClick: (e, handleOriginal) => {
          const clickingExpandedIcon = String(e.currentTarget.className).includes('rt-expandable');
          if (!clickingExpandedIcon && this.props.onRowClick) {
            this.props.onRowClick(rowInfo);
          }
          if (handleOriginal) {
            handleOriginal();
          }
        }
      };
    };

    getMobileView = (reactTableProps) => {
      const { columns } = this.props;
      if (columns.length < 3) {
        return this.getNonMobileView(reactTableProps);
      }
      let smallColumns = [columns[0], columns[columns.length - 1]];
      let remainingColumns = columns.slice(1, columns.length - 1);
      const filteredColumns = columns.filter(({ useForMobile }) => useForMobile);
      if (filteredColumns.length) {
        smallColumns = filteredColumns;
        remainingColumns = columns.filter(({ useForMobile }) => !useForMobile);
        if (!remainingColumns.length) {
          return this.getNonMobileView(reactTableProps);
        }
      }

      smallColumns.splice(0, 0, {
        expander: true,
        justify: 'center',
        width: 30,
        Header: ' ',
        Expander: ({ isExpanded }) => (
          <div className="c-data-table__expand-icon">
            {isExpanded ? (<IconMinus />) : (<IconPlus />)}
          </div>
        )
      });

      return (
        <ReactTable
          {...reactTableProps}
          columns={smallColumns}
          SubComponent={(row) => {
            const rowData = remainingColumns.map((column) => {
              return {
                property: column.Header,
                value: (column.Cell) ? column.Cell({
                  ...row,
                  value: row.original[column.accessor]
                }) : row.original[column.accessor],
                justify: column.justify
              };
            });
            return (
              <div className="c-data-table__subcomponent">
                {rowData.map((obj) => (
                  <React.Fragment key={obj.property || obj.value}>
                    <div />
                    <Heading category="minor" tone="quiet">
                      {obj.property}
                    </Heading>
                    <div className={`c-data-table__subcomponent-cell--${obj.justify}`}>
                      {obj.value}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            );
          }}
        />
      );
    };

    getNonMobileView = (reactTableProps) => {
      return (
        <ReactTable
          {...reactTableProps}
        />
      );
    };

    render() {
      const { media } = this.context;
      const reactTableProps = {
        className: classNames('s-data-table c-data-table', {
          '-striped': this.props.format === 'ledger',
          '-highlight': this.props.onRowClick
        }),
        multiSort: false,
        getPaginationProps: () => ({
          buttonPager: this.props.buttonPager,
          totalResults: this.props.totalResults
        }),
        getTheadProps: this.getPropsWithClass('c-data-table__head'),
        getTheadThProps: this.getTheadThProps,
        getTbodyProps: this.getPropsWithClass('c-data-table__body'),
        getTrGroupProps: this.getPropsWithClass('c-data-table__row-group'),
        getTrProps: this.getPropsWithClass('c-data-table__row'),
        getTdProps: this.getTdProps,
        ThComponent: TableHeader,
        PaginationComponent: TablePager,
        manual: this.props.manual,
        columns: this.props.columns,
        data: this.props.data,
        page: this.props.page,
        pages: this.props.pages,
        pageSizeOptions: this.props.pageSizeOptions,
        defaultPageSize: this.props.defaultPageSize,
        showPagination: this.props.showPagination,
        minRows: this.props.showPagination ? undefined : 1,

        onFetchData: this.props.onFetchData,
        onPageChange: this.props.onPageChange,
        onPageSizeChange: this.props.onPageSizeChange
      };
      return media.includes(MEDIA_CONTEXT_SIZES.LARGE) || this.props.disableMobileRender ?
        this.getNonMobileView(reactTableProps) : this.getMobileView(reactTableProps);
    }
}

const validateManualProp = (type) => (props, propName, componentName) => {
  if (props.manual && !is(type, props[propName])) {
    return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${propName}\` is required when \`manual\` is \`true\`.`);
  }
};

const validateManualCallbacks = (props, propName, componentName) => {
  if (props[propName] && !is(Function, props.onFetchData) && !is(Function, props.onPageChange)) {
    return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Either \`onFetchData\` or \`onPageChange\` must be defined when \`manual\` is \`true\`.`);
  }
};

DataTable.displayName = 'DataTable';
DataTable.contextType = AppContext;
DataTable.propTypes = {
  /** Defaults to true for Penny implementation, false for normal pager. */
  buttonPager: PropTypes.bool,
  /** Column definitions */
  columns: PropTypes.arrayOf(PropTypes.shape({
    /** or Accessor eg. (row) => row.propertyName */
    accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /** Used to render a standard cell, defaults to the accessed value */
    Cell: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /** Used to render the header of a column or column group */
    Header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /** Header variant used to render the column header */
    headerVariant: PropTypes.number,
    /** Conditional - A unique ID is required if the accessor is not a string */
    id: PropTypes.string,
    /** Used to center or right-justify the header & cell content */
    justify: PropTypes.oneOf(['left', 'center', 'right']),
    /** A maximum width for this column */
    maxWidth: PropTypes.number,
    /** A minimum width for this column. If there is extra room, column will flex to fill available space (up to the max-width, if set) */
    minWidth: PropTypes.number,
    /** A hardcoded width for the column. This overrides both min and max width options */
    width: PropTypes.number,
    /** optional value to tell the table which columns to display in mobile view. */
    useForMobile: PropTypes.bool
  })).isRequired,
  /** Rows to display in the table */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Default selected page size option */
  defaultPageSize: PropTypes.number,
  /** Flag to determine if we disabled the mobile render or not. */
  disableMobileRender: PropTypes.bool,
  /** String used to determine which style table we should render based on the context  */
  format: PropTypes.oneOf(['informational', 'ledger']),
  /** Whether the table should operate in manual mode (no automatic paging/sorting) */
  manual: PropTypes.bool,
  /** The method to call when a row of the datatable is clicked */
  onRowClick: PropTypes.func,
  /** Callback invoked on page or sort change */
  onFetchData: validateManualCallbacks,
  /** Callback invoked when a new page is selected */
  onPageChange: validateManualCallbacks,
  /** Callback invoked when the page size is changed */
  onPageSizeChange: PropTypes.func,
  /** Current page, needed for full control mode */
  page: PropTypes.number,
  /** Total number of pages available, needed for manual mode */
  pages: validateManualProp(Number),
  /** Options for the page size dropdown */
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  /** Show pagination on this table */
  showPagination: PropTypes.bool,
  /** Total number of results */
  totalResults: PropTypes.number
};
DataTable.defaultProps = {
  buttonPager: true,
  defaultPageSize: DEFAULT_PAGE_SIZE,
  disableMobileRender: false,
  format: 'ledger',
  manual: false,
  pageSizeOptions: PAGE_SIZE_OPTIONS,
  showPagination: true
};

export default DataTable;
