import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { RemovePaymentInstrument, UpdatePaymentInstrument as UpdatePaymentInstrumentCore } from '@selfcare/core/redux/paymentInstrument/payment.instrument.actions';
import { DefaultPaymentInstrument, ExistingSupportedPaymentInstruments, PaymentInstrumentIsUpdating } from '@selfcare/core/redux/paymentInstrument/payment.instrument.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SetPaymentInstrument, SetPaymentInstrumentDefault, UpdatePaymentInstrument, UpdatePaymentInstrumentValues } from '../../../../redux/paymentInstrument/payment.instrument.form.actions';
import { PaymentInstrumentDefault, PaymentInstrumentValues, ValidationSchema } from '../../../../redux/paymentInstrument/payment.instrument.form.selectors';
import EditPaymentMethod from './edit.payment.method';


const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  currentDefaultPaymentInstrument: DefaultPaymentInstrument,
  isDefaultPaymentInstrument: PaymentInstrumentDefault,
  isUpdatingPaymentInstrument: PaymentInstrumentIsUpdating,
  paymentMethods: ExistingSupportedPaymentInstruments,
  paymentInstrumentValues: PaymentInstrumentValues,
  validationSchema: ValidationSchema
});
const mapActionsToProps = {
  removePaymentInstrument: RemovePaymentInstrument,
  setPaymentInstrumentDefault: SetPaymentInstrumentDefault,
  setPaymentInstrument: SetPaymentInstrument,
  updatePaymentInstrument: UpdatePaymentInstrumentCore,
  updatePaymentInstrumentFromFormValues: UpdatePaymentInstrument,
  updatePaymentInstrumentValues: UpdatePaymentInstrumentValues
};

export default connect(mapStateToProps, mapActionsToProps)(EditPaymentMethod);
