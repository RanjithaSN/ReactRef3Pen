import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import { apiFaultPropTypes } from 'selfcare-core/src/constants/api.fault.prop.types';
import FieldRow from 'selfcare-ui/src/components/fieldRow/field.row';
import FormErrors from 'selfcare-ui/src/components/formErrors/form.errors';
import Input from 'selfcare-ui/src/components/input/input';
import InputField from 'selfcare-ui/src/components/inputField/input.field';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Notice from 'selfcare-ui/src/components/notice/notice';
import { checkForDisplayedErrors, filterVisibleErrors, SUBMIT_ATTEMPTED } from '../../../helpers/validation.helpers';
import { INPUT_FIELD_TYPES } from '../../../redux/userInfo/user.info.selectors';
import Code from '../../codeSelector/code.selector.contextual';

class UserInfoForm extends React.Component {
    state = {
      status: null
    };

    updateFormValuesAndHandleChange = (evt) => {
      this.props.handleChange(evt);
      this.props.updateUserInfoFormValues({
        ...this.props.values,
        [evt.target.name]: evt.target.value
      });
    };

    getInputForField = (field, errors) => {
      const { handleChange,
        handleBlur,
        t,
        values } = this.props;

      const errorMsg = errors[field.key];

      const COMMON_INPUT_PROPS = {
        id: field.key,
        name: field.key,
        onBlur: handleBlur,
        value: values[field.key] || ''
      };

      const COMMON_INPUT_FIELD_PROPS = {
        key: field.key,
        info: field.info ? t(field.info) : undefined,
        required: field.validation.required,
        labelText: t(field.label),
        error: errorMsg,
        size: field.size
      };

      switch (field.type) {
      case (INPUT_FIELD_TYPES.CODE_SELECT): {
        return (
          <InputField
            input={(
              <Code
                code={field.code}
                selected={values[field.key]}
                onChange={this.updateFormValuesAndHandleChange}
                {...COMMON_INPUT_PROPS}
              />
            )}
            {...COMMON_INPUT_FIELD_PROPS}
          />
        );
      }
      default:
        return (
          <InputField
            input={(
              <Input
                type={field.type}
                onChange={handleChange}
                {...COMMON_INPUT_PROPS}
              />
            )}
            {...COMMON_INPUT_FIELD_PROPS}
          />
        );
      }
    };

    onSubmit = (event, formikProps) => {
      this.setState({
        status: SUBMIT_ATTEMPTED
      });
      formikProps.handleSubmit(event);
    };

    render() {
      const { apiFault, errors, handleSubmit, isLoading, touched, userInfoFormFields } = this.props;
      const { status } = this.state;

      return (
        <div className="c-user-info-form">
          <LoadingIndicator isLoading={isLoading} />
          {apiFault && (
            <Notice
              apiFault={apiFault}
              className="c-with-standard-size--large"
              type="error"
              heading={apiFault.translatedMessage}
            />
          )}
          {checkForDisplayedErrors(errors, touched) && <FormErrors className="c-user-info-form__errors c-with-standard-size--large" />}
          <form noValidate onSubmit={handleSubmit}>
            <div className="c-user-info-fields">
              {userInfoFormFields.map((fieldCollection) => {
                const fields = fieldCollection.filter(({ display }) => display);

                if (fields.length) {
                  const visibileErrors = filterVisibleErrors({
                    errors,
                    status,
                    touched
                  });

                  const inputs = fields
                    .map((field) => this.getInputForField(field, visibileErrors))
                    .filter((field) => !!field);

                  if (inputs.length) {
                    const key = fields.map((field) => field.key).join('_');
                    return <FieldRow key={key}>{inputs}</FieldRow>;
                  }
                }
                return null;
              })}
            </div>
          </form>
        </div>
      );
    }
}
UserInfoForm.displayName = 'UserInfoForm';
UserInfoForm.propTypes = {
  /** An error message response kicked back from an API call */
  apiFault: apiFaultPropTypes,
  /** is loading boolean */
  isLoading: PropTypes.bool,
  /** Submit the form */
  onSubmit: PropTypes.oneOfType([PropTypes.func, PropTypes.objectOf({
    // Promise-type supported in anticipation of a need to redirect after performing some logic.
    then: PropTypes.func,
    catch: PropTypes.func
  })]).isRequired,
  /** The fields to be rendered inside of the form */
  userInfoFormFields: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    /** The type of field */
    type: PropTypes.oneOf(Object.values(INPUT_FIELD_TYPES)).isRequired,
    /** The fields label */
    label: PropTypes.string.isRequired,
    /** Other options can exist, but required is most common */
    validation: PropTypes.shape({
      required: PropTypes.bool
    }),
    /** The fields key */
    key: PropTypes.string.isRequired,
    /** Optional for code selects */
    code: PropTypes.number,
    /**  Optional display property */
    display: PropTypes.bool
  }))),
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Function to perform when form values are updated */
  updateUserInfoFormValues: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Validation errors passed in from Formik */
  errors: PropTypes.object.isRequired,
  /** [[IgnoreDoc]] Is-touched passed in from Formik */
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  /** [[IgnoreDoc]] Form status passed in from Formik */
  status: PropTypes.string,
  /** [[IgnoreDoc]] Values passed in from Formik */
  values: PropTypes.object.isRequired,
  /** [[IgnoreDoc]] Submit function passed in from Formik */
  handleSubmit: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] On blur function passed in from Formik, handles "change" events inputs */
  handleBlur: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] On change function pass in from Formik */
  handleChange: PropTypes.func.isRequired
};

export default withI18n()(UserInfoForm);
