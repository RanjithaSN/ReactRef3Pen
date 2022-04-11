import ApiFaultCodes from '@selfcare/core/constants/api.fault.codes';
import { ClearApiFault } from '@selfcare/core/redux/fault/fault.actions';
import { CreatePaymentInstrument as CoreCreatePaymentInstrument, UpdatePaymentInstrument as CoreUpdatePaymentInstrument } from '@selfcare/core/redux/paymentInstrument/payment.instrument.actions';
import { PaymentInstruments } from '@selfcare/core/redux/paymentInstrument/payment.instrument.selectors';
import { RetrieveWallet } from '@selfcare/core/redux/wallet/wallet.actions';
import path from 'ramda/src/path';
import { Create3DS1PaymentInstrument as BaseCreate3DSPaymentInstrument, Create3DS1PaymentInstrumentSecondRequest, SetProcessing3DS, Submit3DS1FinalRequest as BaseSubmit3DS1FinalRequest } from '../threeDS/threeDS.actions';
import { EncryptedPaymentInstrument, SubmittablePaymentInstrument, ThreeDSPaymentInstrument } from './payment.instrument.form.selectors';
import { read as localStorageRead, remove as localStorageRemove } from '@selfcare/core/helpers/storage/local.storage';
import { MAKE_CARD_DEFAULT } from '@selfcare/core/redux/utils/api.constants';


export const PaymentInstrumentFormTypes = {
  INITIALIZE_EDIT_PAYMENT_INSTRUMENT_FORM: 'INITIALIZE_EDIT_PAYMENT_INSTRUMENT_FORM',
  RESET_PAYMENT_INSTRUMENT_FORM: 'RESET_PAYMENT_INSTRUMENT_FORM',
  SET_PAYMENT_INSTRUMENT: 'SET_PAYMENT_INSTRUMENT',
  SET_PAYMENT_INSTRUMENT_DEFAULT: 'SET_PAYMENT_INSTRUMENT_DEFAULT',
  SET_PAYMENT_INSTRUMENT_OPTIONS: 'SET_PAYMENT_INSTRUMENT_OPTIONS',
  UPDATE_PAYMENT_INSTRUMENT_VALUES: 'UPDATE_PAYMENT_INSTRUMENT_VALUES'
};

export const ResetPaymentInstrumentForm = () => (dispatch) => {
  dispatch(ClearApiFault());
  dispatch({
    type: PaymentInstrumentFormTypes.RESET_PAYMENT_INSTRUMENT_FORM
  });
};

export const InitializeEditForm = (type, values, billingAddressId) => (dispatch) => {
  dispatch(ClearApiFault());
  dispatch({
    type: PaymentInstrumentFormTypes.INITIALIZE_EDIT_PAYMENT_INSTRUMENT_FORM,
    payload: {
      type,
      values,
      billingAddressId
    }
  });
};

export const SetPaymentInstrument = (paymentInstrument) => ({
  type: PaymentInstrumentFormTypes.SET_PAYMENT_INSTRUMENT,
  payload: paymentInstrument
});

export const SetPaymentInstrumentDefault = (defaultValue) => ({
  type: PaymentInstrumentFormTypes.SET_PAYMENT_INSTRUMENT_DEFAULT,
  payload: defaultValue
});

export const SetPaymentInstrumentOptions = ({ canSave,
  isDefault }) => ({
  type: PaymentInstrumentFormTypes.SET_PAYMENT_INSTRUMENT_OPTIONS,
  payload: {
    canSave,
    isDefault
  }
});

export const UpdatePaymentInstrumentValues = (values) => ({
  type: PaymentInstrumentFormTypes.UPDATE_PAYMENT_INSTRUMENT_VALUES,
  payload: values
});

export const CreatePaymentInstrument = () => async (dispatch, getState) => {
  const paymentInstrument = EncryptedPaymentInstrument(getState());
  const savedPI = await dispatch(CoreCreatePaymentInstrument(paymentInstrument));
  dispatch(ResetPaymentInstrumentForm());
  dispatch(UpdatePaymentInstrumentValues(null));
  return savedPI;
};

export const Create3DS1PaymentInstrument = () => async (dispatch, getState) => {
  const paymentInstrument = ThreeDSPaymentInstrument(getState());
  const responseOne = await dispatch(BaseCreate3DSPaymentInstrument(paymentInstrument));
  dispatch(ResetPaymentInstrumentForm());
  dispatch(UpdatePaymentInstrumentValues(null));

  if (path(['Fault', 'Code'], responseOne) === ApiFaultCodes.ADYEN_ADDITIONAL_AUTH_REQUIRED) {
    dispatch(SetProcessing3DS(true));
    dispatch(Create3DS1PaymentInstrumentSecondRequest(responseOne));
  } else {
    dispatch(SetProcessing3DS(false));
    localStorageRead(MAKE_CARD_DEFAULT) && localStorageRemove(MAKE_CARD_DEFAULT);
    await dispatch(RetrieveWallet());
    return responseOne;
  }
};

export const Submit3DS1FinalRequest = (requestValues) => async (dispatch) => {
  const savedPI = await dispatch(BaseSubmit3DS1FinalRequest(requestValues));
  await dispatch(RetrieveWallet());
  return savedPI;
};

export const UpdatePaymentInstrument = (paymentInstrumentId) => async (dispatch, getState) => {
  const state = getState();
  const paymentInstrument = path([paymentInstrumentId], PaymentInstruments(state));
  const updatedInstrument = SubmittablePaymentInstrument(state);

  await dispatch(CoreUpdatePaymentInstrument({
    ...paymentInstrument,
    ...updatedInstrument,
    Id: paymentInstrumentId
  }));
  dispatch(ResetPaymentInstrumentForm());
};
