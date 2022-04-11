import { PAYMENT_INSTRUMENT_TYPES } from '@selfcare/core/constants/payment.instrument.constants';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React, { useEffect, useState } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import { apiFaultPropTypes } from 'selfcare-core/src/constants/api.fault.prop.types';
import { AppContext } from 'selfcare-ui/src/components/appContext/app.context';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import LinkButton from 'selfcare-ui/src/components/button/link.button';
import OutlineButton from 'selfcare-ui/src/components/button/outline.button';
import Checkbox from 'selfcare-ui/src/components/checkbox/checkbox';
import FormErrors from 'selfcare-ui/src/components/formErrors/form.errors';
import InputField from 'selfcare-ui/src/components/inputField/input.field';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import { MEDIA_CONTEXT_SIZES } from 'selfcare-ui/src/components/mediaContext/media.context.constants';
import Notice from 'selfcare-ui/src/components/notice/notice';
import ZeroState from 'selfcare-ui/src/components/zeroState/zero.state';
import object from 'yup/lib/object';
import { showFormError, SUBMIT_ATTEMPTED } from '../../../../helpers/validation.helpers';
import LocaleKeys from '../../../../locales/keys';
import { getPaymentMethodsNavItem } from '../../../../navigation/sitemap.selectors';
import PageContent, { Main } from '../../../pageContent/page.content';
import EditPaymentMethodForm from '../../../paymentInstrument/adyenExternalPaymentMethod/edit.payment.method.form';
import { generatePaymentMethodDescriptor } from '../../../paymentInstrument/adyenExternalPaymentMethod/payment.method.helper';
import RemovePaymentMethodModal from '../removePaymentMethodModal/remove.payment.method.modal.contextual';
import './edit.payment.method.scss';

const EditPaymentMethod = ({ apiFault, currentDefaultPaymentInstrument, history, isDefaultPaymentInstrument, isUpdatingPaymentInstrument, match, paymentInstrumentValues, paymentMethods, setPaymentInstrument, setPaymentInstrumentDefault, t, updatePaymentInstrumentFromFormValues, updatePaymentInstrumentValues, validationSchema }) => {
  const [hasChanges, setHasChanges] = useState(false);
  const [forceDefault, setForceDefault] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [paymentMethodStartedAsDefault, setPaymentMethodStartedAsDefault] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  useEffect(() => {
    const paymentMethodIdParam = match.params.paymentMethodId;
    const foundPaymentMethod = paymentMethods.length ?
      paymentMethods.find((pm) => pm.Id.toString() === paymentMethodIdParam) :
      null;
    if (foundPaymentMethod) {
      setPaymentMethod(foundPaymentMethod);
    }

    // Force default if there is only one payment method and it is the default
    setForceDefault(paymentMethods.length === 1 && isDefaultPaymentInstrument);

    if (paymentMethod.Type === PAYMENT_INSTRUMENT_TYPES.CREDIT_CARD) {
      setHasChanges(true);
    }
  }, [isDefaultPaymentInstrument, match, paymentMethod, paymentMethods, setForceDefault, setPaymentMethod]);

  useEffect(() => {
    setPaymentMethodStartedAsDefault(currentDefaultPaymentInstrument && (currentDefaultPaymentInstrument.Id === paymentMethod.Id));
  }, [currentDefaultPaymentInstrument, paymentMethod]);

  const getSetDefaultCheckbox = (formikProps) => {
    const isDisabled = (currentDefaultPaymentInstrument && (currentDefaultPaymentInstrument.Id === paymentMethod.Id)) || forceDefault;
    return (
      <InputField
        input={(
          <Checkbox
            id="Default"
            name="Default"
            className="c-edit-payment-method__default-checkbox"
            labelClassName="c-edit-payment-method__default-checkbox-label"
            disabled={isDisabled}
            checked={isDefaultPaymentInstrument}
            onChange={(event) => {
              setHasChanges((event.target.checked === true) && !paymentMethodStartedAsDefault);
              setPaymentInstrumentDefault(event.target.checked);
              formikProps.handleChange(event);
            }}
          >
            {t(LocaleKeys.PAYMENT_METHODS.SET_AS_DEFAULT)}
          </Checkbox>
        )}
      />
    );
  };
  const handleSubmit = (event, formikProps) => {
    formikProps.setStatus(SUBMIT_ATTEMPTED);
    formikProps.handleSubmit(event);
  };
  const handleClickCancel = () => {
    history.goBack();
    setPaymentInstrument(undefined);
  };
  const handleExternalPaymentChange = (values) => {
    const { ExternalBill } = paymentMethod;
    let changesMade = false;

    if (values.ExpirationMonth !== ExternalBill.ExpirationMonth ||
            values.ExpirationYear !== ExternalBill.ExpirationYear) {
      changesMade = true;
    }
    setHasChanges(changesMade);

    updatePaymentInstrumentValues(values);
  };
  const toggleRemoveDialog = () => {
    setShowRemoveDialog((prevShowRemoveDialog) => !prevShowRemoveDialog);
  };
  const handleRemoveModalCancel = () => {
    toggleRemoveDialog();
  };
  const handleRemoveModalSuccess = () => {
    toggleRemoveDialog();
    handleClickCancel();
  };
  const submitPaymentInstrument = async (paymentInstrumentId) => {
    await updatePaymentInstrumentFromFormValues(paymentInstrumentId);
    handleClickCancel();
  };
  return (
    <PageContent>
      <Main>
        {showRemoveDialog && (
          <RemovePaymentMethodModal
            paymentMethod={paymentMethod}
            onCancel={handleRemoveModalCancel}
            onRemoveSuccess={handleRemoveModalSuccess}
          />
        )}
        {!paymentMethod && (
          <ZeroState
            title={t(LocaleKeys.PAYMENT_METHODS.EDIT_PAYMENT_METHOD_ZERO_STATE)}
            callToAction={(
              <FilledButton className="c-cart__action" onClick={() => (history.push(getPaymentMethodsNavItem().url))}>
                {t(LocaleKeys.NAVIGATOR.PAYMENT_METHODS)}
              </FilledButton>
            )}
          />
        )}
        {paymentMethod && (
          <AppContext.Consumer>
            {({ media }) => (
              <Formik
                initialValues={paymentInstrumentValues}
                validationSchema={object(validationSchema)}
                onSubmit={() => submitPaymentInstrument(paymentMethod.Id)}
                render={(formikProps) => (
                  <form
                    noValidate
                    className="c-loading-indicator-containment"
                    onSubmit={(event) => handleSubmit(event, formikProps)}
                  >
                    <LoadingIndicator isLoading={!showRemoveDialog && isUpdatingPaymentInstrument} />
                    <div className="c-edit-payment-method__body">
                      {apiFault && (
                        <Notice
                          apiFault={apiFault}
                          type="error"
                          className="c-edit-payment-method__error-banner"
                          heading={apiFault.translatedMessage}
                        />
                      )}
                      {showFormError(formikProps) &&
                                                <FormErrors className="c-edit-payment-method__error-banner" />
                      }
                      {(paymentMethod.Type === PAYMENT_INSTRUMENT_TYPES.EXTERNAL_PAYMENT) && (
                        <React.Fragment>
                          <EditPaymentMethodForm
                            paymentMethodName={generatePaymentMethodDescriptor(paymentMethod)}
                            paymentMethodId={paymentMethod.Id}
                            onChange={handleExternalPaymentChange}
                            {...formikProps}
                            values={paymentInstrumentValues}
                          />
                          {getSetDefaultCheckbox(formikProps)}
                        </React.Fragment>
                      )}
                    </div>
                    <div className="c-edit-payment-method__footer">
                      <div className="c-edit-payment-method__footer-buttons">
                        {media.includes(MEDIA_CONTEXT_SIZES.NOTSMALL) ?
                          (
                            <React.Fragment>
                              <OutlineButton className="c-edit-payment-method__cancel-save-button c-button-double" onClick={handleClickCancel}>{t(LocaleKeys.CANCEL)}</OutlineButton>
                              <FilledButton disabled={!hasChanges} type="submit" className="c-edit-payment-method__submit-button c-edit-payment-method__cancel-save-button c-button-double">{t(LocaleKeys.SAVE)}</FilledButton>
                            </React.Fragment>
                          ) :
                          (
                            <React.Fragment>
                              <OutlineButton className="c-edit-payment-method__cancel-save-button c-button-double" onClick={handleClickCancel}>{t(LocaleKeys.CANCEL)}</OutlineButton>
                              <FilledButton className="c-edit-payment-method__cancel-save-button c-button-double" disabled={!hasChanges} type="submit">{t(LocaleKeys.SAVE)}</FilledButton>
                            </React.Fragment>
                          )}
                      </div>
                      <LinkButton className="c-edit-payment-method__remove" onClick={toggleRemoveDialog}>{t(LocaleKeys.PAYMENT_METHODS.REMOVE_PAYMENT_METHOD)}</LinkButton>
                    </div>
                  </form>
                )}
              />
            )}
          </AppContext.Consumer>

        )}
      </Main>
    </PageContent>
  );
};
EditPaymentMethod.propTypes = {
  /** Application fault */
  apiFault: apiFaultPropTypes,
  /** Returns the currently selected default payment instrument */
  currentDefaultPaymentInstrument: PropTypes.object.isRequired,
  /** Indicates if the selected payment method is the default one */
  isDefaultPaymentInstrument: PropTypes.bool.isRequired,
  /** Is Edit Active */
  isEditActive: PropTypes.bool,
  /** Whether an update payment instrument API request is in progress */
  isUpdatingPaymentInstrument: PropTypes.bool.isRequired,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** [[IgnoreDoc]] Match object provided by react-router */
  match: PropTypes.object.isRequired,
  /** Payment instrument form values */
  paymentInstrumentValues: PropTypes.object.isRequired,
  /** Payment methods */
  paymentMethods: PropTypes.arrayOf(PropTypes.shape({
    Id: PropTypes.number.isRequired,
    Name: PropTypes.string.isRequired,
    ECheck: PropTypes.shape({
      AccountNumber: PropTypes.string.isRequired,
      RoutingNumber: PropTypes.string.isRequired
    }),
    CreditCard: PropTypes.shape({
      AccountNumber: PropTypes.string.isRequired,
      ExpirationMonth: PropTypes.string.isRequired,
      ExpirationYear: PropTypes.string.isRequired,
      Type: PropTypes.number.isRequired
    })
  })),
  /** Used to request deletion of a payment instrument */
  removePaymentInstrument: PropTypes.func.isRequired,
  /** Sets the current payment instrument */
  setPaymentInstrument: PropTypes.func.isRequired,
  /** Sets whether the payment instrument is the default one */
  setPaymentInstrumentDefault: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Action used to submit a payment instrument object for update */
  updatePaymentInstrument: PropTypes.func.isRequired,
  /** Action used to update a payment instruments values */
  updatePaymentInstrumentValues: PropTypes.func.isRequired,
  /** Action used to submit form values to update a payment instrument */
  updatePaymentInstrumentFromFormValues: PropTypes.func.isRequired,
  /** Validation schema Not shaped since its only used by formik */
  validationSchema: PropTypes.object
};

export default compose(
  withI18n(),
  withRouter
)(EditPaymentMethod);
