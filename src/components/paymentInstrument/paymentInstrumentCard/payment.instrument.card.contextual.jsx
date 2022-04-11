import { SupportedCreditCardTypes } from '@selfcare/core/redux/paymentInstrument/payment.instrument.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PaymentInstrumentCard from './payment.instrument.card';

const mapStateToProps = createStructuredSelector({
  creditCardTypes: SupportedCreditCardTypes
});
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(PaymentInstrumentCard);
