import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { ExistingSupportedPaymentInstruments } from '@selfcare/core/redux/paymentInstrument/payment.instrument.selectors';
import { WalletIsLoading } from '@selfcare/core/redux/wallet/wallet.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Current3DS1MDValue } from '../../../redux/threeDS/threeDS.selectors';
import { Submit3DS1FinalRequest } from '../../../redux/paymentInstrument/payment.instrument.form.actions';
import PaymentMethods from './payment.methods';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  current3DS1MDValue: Current3DS1MDValue,
  isWalletLoading: WalletIsLoading,
  paymentMethods: ExistingSupportedPaymentInstruments
});
const mapActionsToProps = {
  submit3DS1FinalRequest: Submit3DS1FinalRequest
};

export default connect(mapStateToProps, mapActionsToProps)(PaymentMethods);
