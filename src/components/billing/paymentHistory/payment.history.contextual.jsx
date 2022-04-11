import { SupportedCreditCardTypes, SupportedPaymentInstruments } from '@selfcare/core/redux/paymentInstrument/payment.instrument.selectors';
import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import { RetrieveTransaction, SearchTransactions } from '@selfcare/core/redux/searchTransactions/search.transactions.actions';
import { IsLoadingTransactions, PageData, TransactionDetailsWithDiscounts, Transactions } from '@selfcare/core/redux/searchTransactions/search.transactions.selectors';
import { WalletIsLoading } from '@selfcare/core/redux/wallet/wallet.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { RetrieveWalletOnce } from '../../../redux/wallet/wallet.actions';
import PaymentHistory from './payment.history';

const mapStateToProps = createStructuredSelector({
  creditCardTypes: SupportedCreditCardTypes,
  isLoadingTransactions: IsLoadingTransactions,
  isLoadingWallet: WalletIsLoading,
  locale: SelectedLocale,
  pageData: PageData,
  paymentInstruments: SupportedPaymentInstruments,
  transactions: Transactions,
  transactionDetails: TransactionDetailsWithDiscounts
});
const mapActionsToProps = {
  retrieveWallet: RetrieveWalletOnce,
  retrieveTransaction: RetrieveTransaction,
  searchTransactions: SearchTransactions
};

export default connect(mapStateToProps, mapActionsToProps)(PaymentHistory);
