import { TransactionType } from '@selfcare/core/constants/transaction.constants';
import { OFFERING_OVERALL_STATUS } from '@selfcare/core/redux/subscriberOfferings/subscriber.offering.constants';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import PaymentHistory from './paymentHistory/payment.history.contextual';
import LocaleKeys from '../../locales/keys';
import { getPaymentMethodsNavItem } from '../../navigation/sitemap.selectors';
import Allowances from '../allowances/allowance.contextual';
import PageContent, { Main } from '../pageContent/page.content';
import MetaData from '../pageMetaData/meta.data.handler.contextual';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import Currency from 'selfcare-ui/src/components/currency/currency';
import DataTable from 'selfcare-ui/src/components/dataTable/data.table';
import Heading from 'selfcare-ui/src/components/heading/heading';
import StatusIndicator from 'selfcare-ui/src/components/statusIndicator/status.indicator';
import { STATUS_TYPES } from 'selfcare-ui/src/components/statusIndicator/status.indicator.constants';
import { formatDate } from 'selfcare-ui/src/utilities/localization/datetime';
import './billing.scss';

class Billing extends React.Component {
  navigateToPaymentMethods = () => {
    this.props.history.push(getPaymentMethodsNavItem().url);
  };

  renderDateCell = (original) => {
    const { locale, t } = this.props;
    if (original.status === OFFERING_OVERALL_STATUS.ORDER_PENDING) {
      return (
        <StatusIndicator
          type={STATUS_TYPES.OFFERING}
          value={original.status}
          labelTone="normal"
        />
      );
    }
    if (!original.hasFirstUsage) {
      return (
        <StatusIndicator
          type={STATUS_TYPES.OFFERING}
          value={original.status}
          customLabel={t(LocaleKeys.PRODUCTS.STATUS.PENDING_FIRST_USAGE)}
          labelTone="normal"
        />
      );
    }
    return <div>{formatDate(new Date(original.date), locale)}</div>;
  };

  renderAmountCell = (original, t) => {
    const { locale } = this.props;
    if (original.hasDiscount) {
      return (
        <div className="c-billing__amount">
          <span className="c-billing__discount">
            {original.Type === TransactionType.Credit ? '+ ' : null}
            <Currency
              value={original.originalAmount}
              code={original.currencyCode}
              locale={locale}
            />
          </span>
          {original.Type === TransactionType.Credit ? '+ ' : null}
          <Currency
            value={original.chargingAmount}
            code={original.currencyCode}
            locale={locale}
          />
          {' '}
          {t(LocaleKeys.UNTIL)}
          {' '}
          {formatDate(original.discountExpirationDate, locale).toString()}
        </div>
      );
    }

    return (
      <Currency
        value={original.chargingAmount}
        code={original.currencyCode}
        locale={locale}
      />
    );
  };

  render() {
    const { t, upcomingPaymentsAcrossProducts } = this.props;
    const upcomingPaymentsAcrossProductsFiltered = upcomingPaymentsAcrossProducts.filter(
      (item) => {
        if (item.isPennyPlay) {
          return item.canOptOutOnRenew ?  true : false;
        } else {
          return true;
        }
      }
    );
    const columns = () => {
      return [
        {
          accessor: 'date',
          Header: t(LocaleKeys.PAYMENT_HISTORY.COLUMN.DATE),
          Cell: ({ original }) => this.renderDateCell(original),
          useForMobile: true,
          minWidth: 10,
          style: {
            whiteSpace: 'normal'
          }
        },
        {
          accessor: 'product',
          Header: t(LocaleKeys.PAYMENT_HISTORY.COLUMN.PRODUCT),
          useForMobile: true,
          minWidth: 10,
          style: {
            whiteSpace: 'normal'
          }
        },
        {
          accessor: 'amount',
          Header: t(LocaleKeys.PAYMENT_HISTORY.COLUMN.AMOUNT),
          Cell: ({ original }) => (original.status === OFFERING_OVERALL_STATUS.ORDER_PENDING ?
            '-' :
            this.renderAmountCell(original, t)),
          useForMobile: true,
          minWidth: 10,
          style: {
            whiteSpace: 'normal'
          }
        }
      ];
    };
    return (
      <div className="c-billing">
        <PageContent>
          <MetaData
            title={t(LocaleKeys.META_DATA.PAYMENTS.TITLE)}
            description={t(LocaleKeys.META_DATA.PAYMENTS.DESCRIPTION)}
          />
          <Main>
            <div>
              <Heading
                className="c-billing__upcoming-payments-heading"
                category="brand"
                tone="normal"
              >
                {t(LocaleKeys.META_DATA.PAYMENTS.TITLE)}
              </Heading>
              <Heading
                className="c-billing__upcoming-payments-heading"
                category="major"
              >
                {t(LocaleKeys.BILLING.UPCOMING_PAYMENTS)}
              </Heading>
              {!!upcomingPaymentsAcrossProductsFiltered.length && (
                <DataTable
                  className="c-billing__upcoming-payments-table"
                  columns={columns()}
                  data={upcomingPaymentsAcrossProductsFiltered}
                  format="ledger"
                  showPagination={false}
                />
              )}
              <FilledButton
                className="c-billing__manage-product-button"
                onClick={this.navigateToPaymentMethods}
              >
                {t(LocaleKeys.BILLING.MANAGE_PAYMENT_METHODS)}
              </FilledButton>
            </div>
            <PaymentHistory className="c-billing__section" />
            <div className="c-billing__section">
              <Allowances showHeading />
            </div>
          </Main>
        </PageContent>
      </div>
    );
  }
}

Billing.displayName = 'Billing';
Billing.propTypes = {
  history: PropTypes.object.isRequired,
  /** The locale with which to render the date. */
  locale: PropTypes.string.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Upcoming payment amounts for purchased products. */
  upcomingPaymentsAcrossProducts: PropTypes.arrayOf(
    PropTypes.shape({
      chargingAmount: PropTypes.number,
      originalAmount: PropTypes.number,
      date: PropTypes.string,
      hasFirstUsage: PropTypes.bool,
      product: PropTypes.string,
      status: PropTypes.number,
      discountExpirationDate: PropTypes.string,
      hasDiscount: PropTypes.bool.isRequired
    })
  )
};

export default compose(withI18n(), withRouter)(Billing);
