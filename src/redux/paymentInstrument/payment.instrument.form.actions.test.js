import * as FaultActions from '@selfcare/core/redux/fault/fault.actions';
import * as PaymentInstrumentActions from '@selfcare/core/redux/paymentInstrument/payment.instrument.actions';
import * as PaymentInstrument from '@selfcare/core/redux/paymentInstrument/payment.instrument.selectors';
import * as actions from './payment.instrument.form.actions';
import * as PaymentInstrumentForm from './payment.instrument.form.selectors';

const types = actions.PaymentInstrumentFormTypes;

jest.mock('@selfcare/core/redux/fault/fault.actions');
jest.mock('@selfcare/core/redux/paymentInstrument/payment.instrument.actions');
jest.mock('@selfcare/core/redux/paymentInstrument/payment.instrument.selectors');
jest.mock('../account/account.selectors');
jest.mock('../convergentBiller/convergent.biller.actions');
jest.mock('./payment.instrument.form.selectors');

describe('CreatePaymentInstrument Actions', () => {
  const mockState = {
    prop: 'val'
  };
  const paymentInstrument = {
    AccountNumber: '12345'
  };

  const dispatch = jest.fn().mockResolvedValue();
  const getState = jest.fn(() => mockState);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ResetPaymentInstrumentForm', () => {
    beforeEach(() => {
      FaultActions.ClearApiFault.mockReturnValue('ClearApiFault');

      actions.ResetPaymentInstrumentForm()(dispatch, getState);
    });

    test('It should clear API faults.', () => {
      expect(FaultActions.ClearApiFault).toHaveBeenCalled();
      expect(dispatch).toHaveBeenNthCalledWith(1, 'ClearApiFault');
    });

    test('It should dispatch reset action.', () => {
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: types.RESET_PAYMENT_INSTRUMENT_FORM
      });
    });
  });

  describe('InitializeForm', () => {
    const type = 1;
    const values = {
      AccountNumber: '112345'
    };
    const billingAddressId = 123;

    beforeEach(() => {
      FaultActions.ClearApiFault.mockReturnValue('ClearApiFault');

      actions.InitializeEditForm(type, values, billingAddressId)(dispatch, getState);
    });

    test('It should clear API faults.', () => {
      expect(FaultActions.ClearApiFault).toHaveBeenCalled();
      expect(dispatch).toHaveBeenNthCalledWith(1, 'ClearApiFault');
    });

    test('It should dispatch initialize edit action with values.', () => {
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: types.INITIALIZE_EDIT_PAYMENT_INSTRUMENT_FORM,
        payload: {
          type,
          values,
          billingAddressId
        }
      });
    });
  });

  describe('CreatePaymentInstrument', () => {
    beforeEach(() => {
      PaymentInstrumentForm.EncryptedPaymentInstrument.mockReturnValue(paymentInstrument);
      PaymentInstrumentActions.CreatePaymentInstrument.mockReturnValue('CreatePaymentInstrument');

      actions.CreatePaymentInstrument()(dispatch, getState);
    });

    test('It should select formatted payment instrument from state.', () => {
      expect(getState).toHaveBeenCalled();
      expect(PaymentInstrumentForm.EncryptedPaymentInstrument).toHaveBeenCalledWith(mockState);
    });

    test('It should dispatch CreatePaymentInstrument with formatted instrument.', () => {
      expect(PaymentInstrumentActions.CreatePaymentInstrument).toHaveBeenCalledWith(paymentInstrument);
      expect(dispatch).toHaveBeenNthCalledWith(1, 'CreatePaymentInstrument');
    });

    test('It should dispatch ResetPaymentInstrumentForm.', () => {
      expect(dispatch).toHaveBeenCalledTimes(3);
    });

    test('It should dispatch ResetPaymentInstrumentForm.', () => {
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        payload: null,
        type: 'UPDATE_PAYMENT_INSTRUMENT_VALUES'
      });
    });
  });

  describe('UpdatePaymentInstrument', () => {
    const paymentInstrumentId = '1';
    const originalPaymentInstrument = {
      AccountNumber: '67890',
      OtherProp: 'OtherProp'
    };

    beforeEach(() => {
      PaymentInstrumentForm.SubmittablePaymentInstrument.mockReturnValue(paymentInstrument);
      PaymentInstrumentActions.UpdatePaymentInstrument.mockReturnValue('UpdatePaymentInstrument');
      PaymentInstrument.PaymentInstruments.mockReturnValue({
        [paymentInstrumentId]: originalPaymentInstrument
      });

      actions.UpdatePaymentInstrument(paymentInstrumentId)(dispatch, getState);
    });

    test('It should select original instrument values from state.', () => {
      expect(PaymentInstrument.PaymentInstruments).toHaveBeenCalledWith(mockState);
    });

    test('It should select formatted instrument from state.', () => {
      expect(PaymentInstrumentForm.SubmittablePaymentInstrument).toHaveBeenCalledWith(mockState);
    });

    test('It should dispatch UpdatePaymentInstrument with formatted instrument.', () => {
      expect(PaymentInstrumentActions.UpdatePaymentInstrument).toHaveBeenCalledWith({
        ...originalPaymentInstrument,
        ...paymentInstrument,
        Id: paymentInstrumentId
      });
      expect(dispatch).toHaveBeenNthCalledWith(1, 'UpdatePaymentInstrument');
    });

    test('It should dispatch ResetPaymentInstrumentForm.', () => {
      expect(dispatch).toHaveBeenCalledTimes(2); // todo: figure out why jest.spyOn(actions 'ResetPaymentInstrumentForm') isn't working
    });
  });
});
