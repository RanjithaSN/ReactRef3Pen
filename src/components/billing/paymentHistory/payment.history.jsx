import classNames from 'classnames';
import startOfDay from 'date-fns/start_of_day';
import subtractDays from 'date-fns/sub_days';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import { enableDiscounts } from '@selfcare/core/redux/settings/settings.selectors.ts';
import Currency from 'selfcare-ui/src/components/currency/currency';
import DataTable from 'selfcare-ui/src/components/dataTable/data.table';
import { DEFAULT_PAGE_SIZE_SMALL } from 'selfcare-ui/src/components/dataTable/data.table.constants';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import ZeroState from 'selfcare-ui/src/components/zeroState/zero.state';
import { formatDate } from 'selfcare-ui/src/utilities/localization/datetime';
import { generateDescriptor } from '../../../helpers/payment.instrument.helpers';
import LocaleKeys from '../../../locales/keys';
import { getBillingNavItem } from '../../../navigation/sitemap.selectors';
import './payment.history.scss';
import { TransactionType } from '@selfcare/core/constants/transaction.constants';
import { last } from 'ramda';

class PaymentHistory extends React.Component {
  state = {
    page: 0,
    pageSize: DEFAULT_PAGE_SIZE_SMALL,
    startDate: null
  };

  async componentDidMount() {
    this.setState(
      {
        startDate: path(
          [this.dateRangeOptions.length - 1, 'value'],
          this.dateRangeOptions
        )
      },
      async () => {
        this.props.retrieveWallet();
        await this.searchTransactions();
        await this.retrieveTransactions();
      }
    );
  }

  get columns() {
    const { locale, t } = this.props;
    return [
      {
        accessor: 'Transacted',
        Header: t(LocaleKeys.PAYMENT_HISTORY.COLUMN.DATE),
        Cell: ({ value }) => formatDate(new Date(value), locale),
        useForMobile: true,
        minWidth: 10,
        style: {
          whiteSpace: 'normal'
        }
      },
      {
        accessor: 'PurchasedProducts',
        Header: t(LocaleKeys.PAYMENT_HISTORY.COLUMN.PRODUCTS),
        Cell: ({ value }) => (
          <div className="c-payment-history--truncate-cell-text">{value}</div>
        ),
        useForMobile: true,
        minWidth: 10,
        style: {
          whiteSpace: 'normal'
        }
      },
      {
        accessor: 'Amount',
        Header: t(LocaleKeys.PAYMENT_HISTORY.COLUMN.AMOUNT),
        Cell: ({ original }) => (
          <div>
            {Boolean(original.Amount.HasDiscount) && (
              <>
                <span className="c-payment-history__discount">
                  {original.Type === TransactionType.Credit ? '+ ' : null}
                  <Currency
                    value={original.Amount.Original}
                    code={original.Amount.Currency}
                    locale={locale}
                  />
                </span>
                {original.Type === TransactionType.Credit ? '+ ' : null}
                <Currency
                  value={original.Amount.Amount}
                  code={original.Amount.Currency}
                  locale={locale}
                />
              </>
            )}
            {Boolean(!original.Amount.HasDiscount) && (
              <>
                {original.Type === TransactionType.Credit ? '+ ' : null}
                <Currency
                  value={original.Amount.Amount}
                  code={original.Amount.Currency}
                  locale={locale}
                />
              </>
            )}
          </div>
        ),
        useForMobile: true,
        minWidth: 10,
        style: {
          whiteSpace: 'normal'
        }
      }
    ];
  }

  get dateRangeOptions() {
    const { t } = this.props;
    const now = new Date();
    return [30, 60, 90].map((days) => ({
      value: startOfDay(subtractDays(now, days)).toISOString(),
      label: t(LocaleKeys.PAYMENT_HISTORY.PAST_X_DAYS, {
        days
      })
    }));
  }

  get paymentMethodOptions() {
    const { creditCardTypes, paymentInstruments, t } = this.props;
    return [
      {
        label: t(LocaleKeys.PAYMENT_HISTORY.ALL),
        value: ''
      }
    ].concat(
      paymentInstruments.map((instrument) => ({
        label: generateDescriptor(instrument, creditCardTypes),
        value: instrument.Id
      }))
    );
  }

  get isLoading() {
    const { isLoadingTransactions, isLoadingWallet } = this.props;
    return isLoadingTransactions || isLoadingWallet;
  }

  setStartDate = (event) => {
    this.setState(
      {
        page: 0,
        startDate: event.target.value
      },
      this.searchTransactions
    );
  };

  onPageChange = (page) => {
    this.setState(
      {
        page
      },
      async () => {
        await this.searchTransactions();
        await this.retrieveTransactions();
      }
    );
  };

  onPageSizeChange = (pageSize, page) => {
    this.setState(
      {
        page,
        pageSize
      },
      this.searchTransactions
    );
  };

  searchTransactions = () => {
    const { page, pageSize, startDate } = this.state;
    return this.props.searchTransactions({
      page: page + 1,
      pageSize,
      undefined,
      startDate
    });
  };

  retrieveTransactions = () => {
    const unretrievedTransactions = this.props.transactions.filter(
      (transaction) => {
        return !this.props.transactionDetails.find(
          (details) => details.Transaction.Id === transaction.TransactionId
        );
      }
    );

    const promises = unretrievedTransactions.map(async (transaction) => {
      return this.props.retrieveTransaction(transaction.TransactionId);
    });
    return Promise.all(promises);
  };

  constructPurchasedProductsColumnValue = (detailsForTransaction) => {
    const names = pathOr('', ['Transaction', 'PurchasedProducts'], detailsForTransaction);
    const splitNames = names.split(', ');
    const value = splitNames.find((elem) => elem.toLowerCase().includes('data') || elem.toLowerCase().includes('modem'));

    return value ? value : last(splitNames);
  };

  constructAmount = (transaction, transactionDetails) => {
    const purchaseOrderTotals = path(
      ['Transaction', 'PurchaseOrder', 'Totals'],
      transactionDetails
    );
    const discount = path(['Discount'], transactionDetails);
    if (purchaseOrderTotals) {
      const hasDiscount =
        enableDiscounts() &&
        purchaseOrderTotals.DiscountAmount &&
        purchaseOrderTotals.DiscountAmount < 0;
      return {
        HasDiscount: hasDiscount,
        Original:
          purchaseOrderTotals.SubTotalAmount + purchaseOrderTotals.TaxAmount,
        Amount: transaction.Amount,
        Currency: transaction.Currency,
        Discount: discount
      };
    }
    return {};
  };

  adjustPurchasedProductsValues = (transactions) => {
    const transactionDetails = transactions.map((transaction) => {
      const detailsForTransaction = this.props.transactionDetails.find(
        (details) => details.Transaction.Id === transaction.TransactionId
      );
      return {
        ...transaction,
        Amount: this.constructAmount(transaction, detailsForTransaction),
        PurchasedProducts: this.constructPurchasedProductsColumnValue(
          detailsForTransaction
        )
      };
    });

    return transactionDetails;
  };

  openPaymentDetails = (rowInfo) => {
    const transactionId = rowInfo.original.TransactionNumber;
    this.props.history.push(`${getBillingNavItem().url}/${transactionId}`);
  };

  render() {
    const { className, pageData, t, transactions } = this.props;
    const { page, pageSize } = this.state;
    const tableTransactions = this.adjustPurchasedProductsValues(transactions);

    return (
      <div className={classNames(className, 'c-payment-history')}>
        <div className="c-loading-indicator-containment">
          <LoadingIndicator isLoading={this.isLoading} />
          <Heading className="c-payment-history__heading" category="major">
            {t(LocaleKeys.PAYMENT_HISTORY.TRANSACTIONS)}
          </Heading>
          {!tableTransactions.length && !this.isLoading && (
            <ZeroState
              description={t(LocaleKeys.PAYMENT_HISTORY.ZERO_STATE_DESCRIPTION)}
              title={t(LocaleKeys.PAYMENT_HISTORY.NO_TRANSACTIONS)}
            />
          )}
          {Boolean(tableTransactions.length) && (
            <DataTable
              manual
              columns={this.columns}
              data={tableTransactions}
              format="ledger"
              page={page}
              pageSize={pageSize}
              pages={pageData.pageCount}
              totalResults={pageData.recordCount}
              defaultPageSize={pageSize}
              onPageChange={this.onPageChange}
              onPageSizeChange={this.onPageSizeChange}
              onRowClick={this.openPaymentDetails}
            />
          )}
        </div>
      </div>
    );
  }
}

PaymentHistory.displayName = 'PaymentHistory';
PaymentHistory.propTypes = {
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Supported credit card types */
  creditCardTypes: PropTypes.arrayOf(
    PropTypes.shape({
      /** Name of the credit card type (i.e. - Visa) */
      Name: PropTypes.string.isRequired,
      /** Id of the credit card type */
      Value: PropTypes.number.isRequired
    })
  ).isRequired,
  /** History object from react router */
  history: PropTypes.object.isRequired,
  /** Whether a transaction search is in progress */
  isLoadingTransactions: PropTypes.bool.isRequired,
  /** Whether retrieve wallet is in progress */
  isLoadingWallet: PropTypes.bool.isRequired,
  /** The locale with which to render the date. */
  locale: PropTypes.string.isRequired,
  /** Pagination data */
  pageData: PropTypes.shape({
    /** Total number of pages */
    pageCount: PropTypes.number.isRequired,
    /** Total number of search results */
    recordCount: PropTypes.number.isRequired
  }).isRequired,
  /** Payment instruments */
  paymentInstruments: PropTypes.arrayOf(
    PropTypes.shape({
      /** Payment instrument ID */
      Id: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
      ]),
      /** Payment instrument nickname */
      Name: PropTypes.string.isRequired,
      /** E-check properties */
      ECheck: PropTypes.shape({
        /** Account number */
        AccountNumber: PropTypes.string.isRequired,
        /** Routing number */
        RoutingNumber: PropTypes.string.isRequired
      }),
      /** Credit card properties */
      CreditCard: PropTypes.shape({
        /** Account number */
        AccountNumber: PropTypes.string.isRequired,
        /** Month of card expiration */
        ExpirationMonth: PropTypes.string.isRequired,
        /** Year of card expiration */
        ExpirationYear: PropTypes.string.isRequired,
        /** Type of credit card (Visa, MasterCard, etc.) */
        Type: PropTypes.number.isRequired
      })
    })
  ).isRequired,
  /** Action used to retrieve the subscriber's wallet */
  retrieveWallet: PropTypes.func.isRequired,
  /** Action used to retrieve details about a transaction. */
  retrieveTransaction: PropTypes.func.isRequired,
  /** Action used to retrieve a page of transactions */
  searchTransactions: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Search results rendered in a data table */
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      /** Amount paid */
      Amount: PropTypes.number.isRequired,
      /** Date transacted */
      Transacted: PropTypes.string.isRequired,
      /** Transaction number */
      TransactionNumber: PropTypes.string.isRequired,
      /** Transaction Id */
      TransactionId: PropTypes.string.isRequired
    })
  ).isRequired,
  transactionDetails: PropTypes.arrayOf(
    PropTypes.shape({
      Discount: PropTypes.any,
      Transaction: PropTypes.any
    })
  )
};

export const NakedPaymentHistory = PaymentHistory;
export default compose(withI18n(), withRouter)(PaymentHistory);
