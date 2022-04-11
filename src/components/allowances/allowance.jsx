import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { withI18n } from 'react-i18next';
import DataTable from 'selfcare-ui/src/components/dataTable/data.table';
import { DEFAULT_PAGE_SIZE_SMALL } from 'selfcare-ui/src/components/dataTable/data.table.constants';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import ZeroState from 'selfcare-ui/src/components/zeroState/zero.state';
import { formatDate } from 'selfcare-ui/src/utilities/localization/datetime';
import LocaleKeys from '../../locales/keys';
import './allowance.scss';

const Allowance = ({ activeWirelessProducts, allowancesAcrossProducts, allowancesForSelectedProduct, allProductsUsageIsLoading, currentManagedAccountSubscriberId, locale, offeringsAreLoaded, retrieveAllProductsUsage, retrieveCodes, showHeading, showSelectedProductOnly, t }) => {
  const [allowanceValues, setAllowanceValues] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [index, setIndex] = useState(DEFAULT_PAGE_SIZE_SMALL);
  const [page, setPage] = useState(1);

  useEffect(() => {
    retrieveCodes(CODES.NetworkEventType);
    retrieveCodes(CODES.UnitOfMeasure);
  });

  useEffect(() => {
    if (offeringsAreLoaded && activeWirelessProducts.length) {
      retrieveAllProductsUsage(activeWirelessProducts, currentManagedAccountSubscriberId);
    }
  }, [currentManagedAccountSubscriberId, retrieveAllProductsUsage, offeringsAreLoaded, activeWirelessProducts]);

  useEffect(() => {
    if (showSelectedProductOnly) {
      setAllowanceValues(allowancesForSelectedProduct);
    } else {
      setAllowanceValues(allowancesAcrossProducts);
    }
  }, [allowancesAcrossProducts, allowancesForSelectedProduct, setAllowanceValues, showSelectedProductOnly]);

  useEffect(() => {
    setDisplayList(allowanceValues.slice(0, DEFAULT_PAGE_SIZE_SMALL));
    setPage(0);
  }, [allowanceValues]);

  const onPageChange = () => {
    setDisplayList(allowanceValues.slice(0, index + DEFAULT_PAGE_SIZE_SMALL));
    setIndex(index + DEFAULT_PAGE_SIZE_SMALL);
    setPage(page + 1);
  };

  const columns = () => {
    const columnConfig = [{
      accessor: 'date',
      Header: t(LocaleKeys.ALLOWANCES.COLUMN.DATE),
      Cell: ({ original }) => (
        <div>{formatDate(new Date(original.date), locale)}</div>
      )
    }, {
      accessor: 'sender',
      Header: t(LocaleKeys.ALLOWANCES.COLUMN.FROM)
    }, {
      accessor: 'receiver',
      Header: t(LocaleKeys.ALLOWANCES.COLUMN.TO)
    }, {
      accessor: 'type',
      Header: t(LocaleKeys.ALLOWANCES.COLUMN.TYPE)
    }, {
      accessor: 'amount',
      Header: t(LocaleKeys.ALLOWANCES.COLUMN.AMOUNT)
    }];

    if (showSelectedProductOnly) {
      // remove product column
      columnConfig.splice(1, 2);
    }

    return columnConfig;
  };

  return (
    <div className="c-loading-indicator-containment">
      <LoadingIndicator isLoading={allProductsUsageIsLoading} />
      {showHeading && <Heading className="c-allowance__heading" category="major">{t(LocaleKeys.ALLOWANCES.ALLOWANCE)}</Heading>}
      {!!allowanceValues.length && (
        <DataTable
          className="c-allowance__table"
          manual
          columns={columns()}
          data={displayList}
          totalResults={allowanceValues.length}
          pageSize={DEFAULT_PAGE_SIZE_SMALL}
          defaultPageSize={DEFAULT_PAGE_SIZE_SMALL}
          onPageChange={onPageChange}
          page={page}
          pages={allowanceValues.length <= DEFAULT_PAGE_SIZE_SMALL ? 1 : Math.round(allowanceValues.length / DEFAULT_PAGE_SIZE_SMALL)}
          format="ledger"
          showPagination
        />
      )}
      {!allowanceValues.length && !allProductsUsageIsLoading && (
        <ZeroState
          description={t(LocaleKeys.ALLOWANCES.ZERO_STATE_DESCRIPTION)}
        />
      )}
    </div>
  );
};

Allowance.propTypes = {
  /** active wireless products */
  activeWirelessProducts: PropTypes.arrayOf(PropTypes.shape({})),
  /** [[IgnoreDoc]] Current object being used to build tabular data */
  original: PropTypes.object,
  /** Allowances across all products */
  allowancesAcrossProducts: PropTypes.arrayOf(PropTypes.shape({
    /** Date of allowance */
    date: PropTypes.string,
    /** Product that is associated with the allowance */
    product: PropTypes.string,
    /** Amount of allowance */
    amount: PropTypes.string,
    /** Type of allowance */
    type: PropTypes.string
  })),
  /** Allowances for the currently selected product */
  allowancesForSelectedProduct: PropTypes.arrayOf(PropTypes.shape({
    /** Date of allowance */
    date: PropTypes.string,
    /** Product that is associated with the allowance */
    product: PropTypes.string,
    /** Amount of allowance */
    amount: PropTypes.string,
    /** Type of allowance */
    type: PropTypes.string
  })),
  /** Indicates if product usage is loading */
  allProductsUsageIsLoading: PropTypes.bool.isRequired,
  /** The current managed account's subscriber id, or undefined if not managed */
  currentManagedAccountSubscriberId: PropTypes.number,
  /** The locale with which to render the date. */
  locale: PropTypes.string.isRequired,
  /** Retrieve usage for all products */
  retrieveAllProductsUsage: PropTypes.func.isRequired,
  /** retrieve codes function */
  retrieveCodes: PropTypes.func.isRequired,
  /** Indicates if heading should be displayed */
  showHeading: PropTypes.bool,
  /** offerings are loaded */
  offeringsAreLoaded: PropTypes.bool,
  /** Indicates of allowances for all products or selected product should be shown */
  showSelectedProductOnly: PropTypes.bool,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

Allowance.defaultProps = {
  showHeading: false
};

export default withI18n()(Allowance);
