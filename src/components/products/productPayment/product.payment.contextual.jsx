import { ClearApiFault } from '@selfcare/core/redux/fault/fault.actions';
import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { UpdatePaymentInstrument } from '@selfcare/core/redux/paymentInstrument/payment.instrument.actions';
import { ExistingSupportedPaymentInstruments, IsCreatingPaymentInstrument, PaymentInstrumentIsUpdating } from '@selfcare/core/redux/paymentInstrument/payment.instrument.selectors';
import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import { SearchSupportRequest } from '@selfcare/core/redux/supportRequest/support.request.actions';
import { SubmitPaymentRetry } from '@selfcare/core/redux/submitOneTimePayment/submit.one.time.payment.actions';
import { RetrieveWallet } from '@selfcare/core/redux/wallet/wallet.actions';
import { WalletIsLoading } from '@selfcare/core/redux/wallet/wallet.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { RetrieveAddressesOnce } from '../../../redux/address/address.actions';
import { DefaultPaymentInstrument } from '../../../redux/makePayment/make.payment.selectors';
import { CreatePaymentInstrument, SetPaymentInstrumentDefault, UpdatePaymentInstrumentValues } from '../../../redux/paymentInstrument/payment.instrument.form.actions';
import { IsAbleToRetryPaymentForSelectedProduct, PaymentFailureRequestsForSelectedProduct, PaymentRetryStatusForSelectedProduct } from '../../../redux/supportRequest/support.request.selectors';
import { RetrieveWalletOnce } from '../../../redux/wallet/wallet.actions';
import ProductPayment from './product.payment';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  defaultPaymentInstrument: DefaultPaymentInstrument,
  isCreating: IsCreatingPaymentInstrument,  
  isUpdating: PaymentInstrumentIsUpdating,
  isWalletLoading: WalletIsLoading,
  paymentMethods: ExistingSupportedPaymentInstruments,
  paymentFailure: PaymentFailureRequestsForSelectedProduct,
  paymentRetryStatus: PaymentRetryStatusForSelectedProduct,
  isAbleToRetryPayment: IsAbleToRetryPaymentForSelectedProduct,
  selectedLocale: SelectedLocale
});

const mapActionsToProps = {
  clearFault: ClearApiFault,
  createPayment: CreatePaymentInstrument,
  submitPaymentRetry: SubmitPaymentRetry,
  retrieveAddress: RetrieveAddressesOnce,
  retrieveWallet: RetrieveWallet,
  retrieveWalletOnce: RetrieveWalletOnce,
  searchSupportRequest: SearchSupportRequest,
  setPaymentInstrumentDefault: SetPaymentInstrumentDefault,
  updatePayment: UpdatePaymentInstrument,
  updatePaymentInstrumentValues: UpdatePaymentInstrumentValues
};

export default connect(mapStateToProps, mapActionsToProps)(ProductPayment);
