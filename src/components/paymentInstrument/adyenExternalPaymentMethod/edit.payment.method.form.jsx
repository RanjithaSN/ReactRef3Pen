import PropTypes from 'prop-types';
import range from 'ramda/src/range';
import React from 'react';
import { withI18n } from 'react-i18next';
import FieldRow from 'selfcare-ui/src/components/fieldRow/field.row';
import Heading from 'selfcare-ui/src/components/heading/heading';
import InputField from 'selfcare-ui/src/components/inputField/input.field';
import Select from 'selfcare-ui/src/components/select/select';
import { filterVisibleErrors } from '../../../helpers/validation.helpers';
import LocaleKeys from '../../../locales/keys';
import './edit.payment.method.form.scss';


const EditPaymentMethodForm = ({ handleBlur, handleChange, onChange, paymentMethodName, values, t, ...props }) => {
  const getExpirationMonths = () => {
    return range(1, 13).map((month) => {
      const paddedMonth = month.toString().padStart(2, '0');
      return {
        value: paddedMonth,
        label: `${t(LocaleKeys.DATE.MONTHS[month])}`
      };
    });
  };
  const getExpirationYears = () => {
    const year = new Date().getFullYear();
    return range(year, year + 12);
  };
  const handleOnChange = (event) => {
    onChange({
      ...values,
      [event.target.id]: event.target.value
    });
    handleChange(event);
  };
  const errors = filterVisibleErrors(props);
  const COMMON_INPUT_FIELD_PROPS = {
    onBlur: handleBlur,
    onChange: handleOnChange,
    required: true
  };
  return (
    <React.Fragment>
      <Heading className="c-edit-pay-method-form__heading" category="brand" tone="normal">{paymentMethodName}</Heading>
      <FieldRow className="c-edit-pay-method-form__field-row">
        <InputField
          className="c-edit-pay-method-form__input-field"
          error={errors.ExpirationMonth}
          labelText={t(LocaleKeys.PAYMENT_INSTRUMENT.FORM.EXPIRATION_DATE)}
          input={(
            <Select
              id="ExpirationMonth"
              placeholder={t(LocaleKeys.DATE.MONTH)}
              options={getExpirationMonths()}
              selected={values.ExpirationMonth}
            />
          )}
          size="small"
          {...COMMON_INPUT_FIELD_PROPS}
          required
        />
        <InputField
          className="c-edit-pay-method-form__input-field"
          error={(errors.ExpirationYear) ||
                    (errors.ExpirationMonth && '')}
          labelText="&nbsp;"
          input={(
            <Select
              id="ExpirationYear"
              placeholder={t(LocaleKeys.DATE.YEAR)}
              options={getExpirationYears()}
              selected={values.ExpirationYear}
            />
          )}
          size="small"
          {...COMMON_INPUT_FIELD_PROPS}
          required
        />
      </FieldRow>
    </React.Fragment>
  );
};

const getFormShape = (typeFn) => (
  PropTypes.shape({
    AccountNumber: typeFn,
    ExpirationMonth: typeFn,
    ExpirationYear: typeFn,
    ExternalBillData: typeFn,
    NameOnAccount: typeFn,
    Type: typeFn
  }).isRequired
);

EditPaymentMethodForm.displayName = 'EditPaymentMethodForm';
EditPaymentMethodForm.propTypes = {
  /** Id of the external payment method */
  paymentMethodId: PropTypes.number,
  /** Name of the external payment method */
  paymentMethodName: PropTypes.string,
  /** Flag indicating whether non-editable fields should be rendered as read-only */
  editMode: PropTypes.bool,
  /** Used to send form values to parent component */
  onChange: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Validation errors passed in from Formik */
  errors: getFormShape(PropTypes.string),
  /** [[IgnoreDoc]] onBlur callback passed in from Formik */
  handleBlur: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] onChange callback passed in from Formik */
  handleChange: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Is-touched passed in from Formik */
  touched: getFormShape(PropTypes.bool),
  /** [[IgnoreDoc]] Values passed in from Formik */
  values: getFormShape(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
};
EditPaymentMethodForm.defaultProps = {
  paymentMethodName: ''
};

export const NakedEditPaymentMethodForm = EditPaymentMethodForm;
export default withI18n()(EditPaymentMethodForm);
