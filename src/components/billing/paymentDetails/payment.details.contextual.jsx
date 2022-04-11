import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import { Transactions } from '@selfcare/core/redux/searchTransactions/search.transactions.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { PushToHistory } from '../../../redux/troubleshooter/troubleshooter.actions';
import PaymentDetails from './payment.details';
import { SetData, SetContextPageData } from '../../../redux/inAccountHelp/in.accounthelp.actions';

const mapStateToProps = createStructuredSelector({
  locale: SelectedLocale,
  transactions: Transactions
});
const mapActionsToProps = {
  pushToTroubleshooterHistory: PushToHistory,
  setData: SetData,
  setContextPageData: SetContextPageData
};

export default connect(mapStateToProps, mapActionsToProps)(PaymentDetails);
