import classNames from 'classnames';
import PropTypes from 'prop-types';
import range from 'ramda/src/range';
import React from 'react';
import { withI18n } from 'react-i18next';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import IconAngleLeft from '../../icons/react-icons/angle-left';
import IconAngleRight from '../../icons/react-icons/angle-right';
import LocaleKeys from '../../locales/keys';
import Button from '../button/button';
import Select from '../select/select';
import './data.table.pager.scss';

const TablePager = (props) => {
  const pageNumbers = range(1, props.pages + 1)
    .map((pageNumber) => {
      const isCurrentPage = (pageNumber - 1) === props.page;
      return (
        <Button
          key={pageNumber}
          onClick={() => props.onPageChange(pageNumber - 1)}
          disabled={isCurrentPage}
          className={classNames('c-data-table__page-number', {
            'c-data-table__page-number--disabled': isCurrentPage
          })}
        >
          {pageNumber}
        </Button>
      );
    });
  return props.buttonPager ? (
    <div className="c-data-table-pager">
      <FilledButton
        className="c-data-table-pager__button-bar"
        onClick={() => props.onPageChange(props.page + 1)}
      >
        {props.t(LocaleKeys.DATA_TABLE.VIEW_MORE)}
      </FilledButton>
    </div>
  ) : (
    <div className="c-data-table-pager">
      <div className="c-data-table-pager__total-results">
        {Boolean(props.totalResults) && props.t(LocaleKeys.DATA_TABLE.RESULTS, {
          results: props.totalResults
        })}
      </div>
      <div className="c-data-table-pager__pager">
        <div className="c-data-table-pager__page-size-selector">
          <Select
            id="tablePageSize"
            options={props.pageSizeOptions}
            selected={props.pageSize}
            onChange={(e) => props.onPageSizeChange(parseInt(e.target.value, 10), 0)}
          />
          <span className="c-data-table-pager__page-size-label">{props.t(LocaleKeys.DATA_TABLE.PER_PAGE)}</span>
        </div>
        <Button onClick={() => props.onPageChange(props.page - 1)} disabled={!props.canPrevious}>
          <IconAngleLeft
            className={classNames('c-data-table-pager__page-arrow', {
              'c-data-table-pager__page-arrow--disabled': !props.canPrevious
            })}
          />
        </Button>
        <div className="c-data-table-pager__page-number-list">
          {pageNumbers}
        </div>
        <Button onClick={() => props.onPageChange(props.page + 1)} disabled={!props.canNext}>
          <IconAngleRight
            className={classNames('c-data-table-pager__page-arrow', {
              'c-data-table-pager__page-arrow--disabled': !props.canNext
            })}
          />
        </Button>
      </div>
    </div>
  );
};

TablePager.displayName = 'TablePager';
TablePager.propTypes = {
  /** Whether to enable the next page button */
  buttonPager: PropTypes.bool.isRequired,
  /** Whether to enable the next page button */
  canNext: PropTypes.bool.isRequired,
  /** Whether to enable the previous page button */
  canPrevious: PropTypes.bool.isRequired,
  /** Current page */
  page: PropTypes.number.isRequired,
  /** Total number of pages */
  pages: PropTypes.number.isRequired,
  /** Currently selected page size */
  pageSize: PropTypes.number.isRequired,
  /** Options in the page size dropdown */
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  /** Callback invoked with the selected page */
  onPageChange: PropTypes.func.isRequired,
  /** Callback invoked with the selected page size and new page */
  onPageSizeChange: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Total number of results */
  totalResults: PropTypes.number
};

export default withI18n()(TablePager);
