import { TransactionType } from '@selfcare/core/constants/transaction.constants';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React, { useEffect } from 'react';
import { withI18n } from 'react-i18next';
import { Redirect, withRouter } from 'react-router';
import LocaleKeys from '../../../locales/keys';
import { getNotFoundNavItem, getTroubleshooterNavItem } from '../../../navigation/sitemap.selectors';
import { TROUBLESHOOTER } from '../../../redux/troubleshooter/troubleshooter.constants';
import PageContent, { Main } from '../../pageContent/page.content';
import { getContextPageObject } from '../../../helpers/inaccount.help.helpers';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import Card, { CardBody } from 'selfcare-ui/src/components/card/card';
import Currency from 'selfcare-ui/src/components/currency/currency';
import DefinitionList from 'selfcare-ui/src/components/definitionList/definition.list';
import Heading from 'selfcare-ui/src/components/heading/heading';
import { formatDate } from 'selfcare-ui/src/utilities/localization/datetime';
import './payment.details.scss';

const PaymentDetails = ({ history,
  locale,
  match,
  pushToTroubleshooterHistory,
  t,
  transactions,
  setData,
  setContextPageData }) => {
  const transactionId = match.params.transactionId;
  const transaction = transactions.find((x) => x.TransactionNumber === transactionId);

  useEffect(() => {
    if (transaction) {
      const { OfferingId, PricingPlanId } = transaction.PurchaseInformation[0];

      setContextPageData(getContextPageObject(3, 'details'));
      setData({
        OfferingId,
        PricingPlanId
      });
    }
  }, [transaction, setData, setContextPageData]);

  if (!transaction) {
    return <Redirect to={getNotFoundNavItem().url} />;
  }

  const openDisputeFlow = () => {
    const historyNode = {
      type: 'error',
      error: {
        contextId: 'Payment TransactionId',
        code: transactionId
      }
    };
    pushToTroubleshooterHistory(historyNode);
    history.push(`${getTroubleshooterNavItem().url}/${TROUBLESHOOTER.DISPUTE}`);
  };

  const definitionList = [
    {
      label: t(LocaleKeys.PAYMENT_HISTORY.COLUMN.DATE),
      value: formatDate(transaction.Transacted)
    },
    {
      label: t(LocaleKeys.PAYMENT_HISTORY.COLUMN.TRANSACTION_NUMBER),
      value: transactionId
    },
    {
      label: t(LocaleKeys.PAYMENT_HISTORY.COLUMN.PRODUCTS),
      value: transaction.PurchasedProducts
    },
    {
      label: t(LocaleKeys.PAYMENT_HISTORY.COLUMN.AMOUNT),
      value: (
        <>
          {(transaction.Type === TransactionType.Credit) ? '+ ' : null}
          <Currency value={transaction.Amount} code={transaction.Currency} locale={locale} />
        </>
      )
    }
  ];

  return (
    <PageContent>
      <Main>
        <div>
          <Heading category="brand" tone="quiet">
            {t(LocaleKeys.PAYMENT_DETAILS.PAYMENT_DETAILS)}
          </Heading>
          <DefinitionList list={definitionList} />
          <Card className="c-payment-details__dispute-card">
            <CardBody className="c-payment-details__dispute-card-body">
              <Heading category="major" tone="normal">
                {t(LocaleKeys.PAYMENT_DETAILS.DISPUTE_CARD_TITLE)}
              </Heading>
              <Heading category="minor" tone="normal">
                {t(LocaleKeys.PAYMENT_DETAILS.DISPUTE_CARD_DESCRIPTION)}
              </Heading>
              <FilledButton className="c-payment-details__dispute-button" onClick={openDisputeFlow}>
                {t(LocaleKeys.PAYMENT_DETAILS.DISPUTE)}
              </FilledButton>
            </CardBody>
          </Card>
        </div>
      </Main>
    </PageContent>
  );
};

PaymentDetails.displayName = 'PaymentDetails';
PaymentDetails.propTypes = {
  /** Injected from react router */
  history: PropTypes.object.isRequired,
  /** Current locale of session */
  locale: PropTypes.string.isRequired,
  /** React router match details */
  match: PropTypes.shape({
    /** Path param details */
    params: PropTypes.shape({
      /** Path variable of current transaction ID */
      transactionId: PropTypes.string.isRequired
    })
  }),
  /** Add a node to the troubleshooter history */
  pushToTroubleshooterHistory: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** List of all recently searched transactions */
  transactions: PropTypes.arrayOf(PropTypes.shape({
  /** Transaction identifier string */
    TransactionNumber: PropTypes.string
  })).isRequired,
  setData: PropTypes.func.isRequired,
  setContextPageData: PropTypes.func.isRequired
};

export default compose(withI18n(), withRouter)(PaymentDetails);
