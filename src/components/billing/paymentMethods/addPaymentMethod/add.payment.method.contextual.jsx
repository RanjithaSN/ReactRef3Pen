import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { DefaultPaymentInstrument, ExistingSupportedPaymentInstruments } from '@selfcare/core/redux/paymentInstrument/payment.instrument.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Create3DS1PaymentInstrument, SetPaymentInstrumentOptions, UpdatePaymentInstrumentValues } from '../../../../redux/paymentInstrument/payment.instrument.form.actions';
import { Set3DS1RedirectUrl } from '../../../../redux/threeDS/threeDS.actions';
import { Processing3DS, ThreeDS1PaymentInstrumentRedirectUrl } from '../../../../redux/threeDS/threeDS.selectors';
import AddPaymentMethod from './add.payment.method';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  defaultPaymentInstrument: DefaultPaymentInstrument,
  isProcessing3DSPaymentInstrument: Processing3DS,
  paymentMethods: ExistingSupportedPaymentInstruments,
  threeDSPaymentInstrumentRedirectUrl: ThreeDS1PaymentInstrumentRedirectUrl
});
const mapActionsToProps = {
  createPaymentInstrument: Create3DS1PaymentInstrument,
  set3DS1RedirectUrl: Set3DS1RedirectUrl,
  setPaymentInstrumentOptions: SetPaymentInstrumentOptions,
  updatePaymentInstrumentValues: UpdatePaymentInstrumentValues
};

export default connect(mapStateToProps, mapActionsToProps)(AddPaymentMethod);
