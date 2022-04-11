import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import { apiFaultPropTypes } from 'selfcare-core/src/constants/api.fault.prop.types';
import FieldRow from 'selfcare-ui/src/components/fieldRow/field.row';
import FormErrors from 'selfcare-ui/src/components/formErrors/form.errors';
import Input from 'selfcare-ui/src/components/input/input';
import InputField from 'selfcare-ui/src/components/inputField/input.field';
import Notice from 'selfcare-ui/src/components/notice/notice';
import { getFieldSize } from '../../../helpers/form.helpers';
import { checkForDisplayedErrors, filterVisibleErrors, SUBMIT_ATTEMPTED } from '../../../helpers/validation.helpers';
import { CUSTOM_PASSWORD_CHALLENGE_VALUE, INPUT_FIELD_TYPES } from '../../../redux/createSubscriber/create.subscriber.selectors';
import Code from '../../codeSelector/code.selector.contextual';
import PasswordChallenge from './passwordChallenge/password.challenge.contextual';
import './subscriber.form.scss';

class SubscriberForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null
    };
  }

  componentDidMount() {
    this.props.retrieveCodes(CODES.SubscriberRequirements);
  }

    updateFormValuesAndHandleChange = (evt) => {
      this.props.handleChange(evt);
      this.props.updateSubscriberFormValues({
        ...this.props.values,
        [evt.target.name]: evt.target.value
      });
    };

    getInputForField = (field, errors) => {
      const { handleChange,
        handleBlur,
        hasSubscriber,
        t,
        values } = this.props;

      const errorMsg = errors[field.key];

      const COMMON_INPUT_PROPS = {
        id: field.key,
        name: field.key,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onBlur: hasSubscriber ? () => {} : handleBlur,
        value: values[field.key] || ''
      };

      const COMMON_INPUT_FIELD_PROPS = {
        key: field.key,
        required: field.validation.required,
        info: field.info ? t(field.info) : undefined,
        labelText: t(field.label),
        error: hasSubscriber ? undefined : errorMsg,
        readOnly: hasSubscriber,
        size: field.size
      };

      switch (field.type) {
      case (INPUT_FIELD_TYPES.CODE_SELECT):
        return (
          <InputField
            input={(
              <Code
                code={field.code}
                selected={values[field.key]}
                readOnly={hasSubscriber}
                onChange={this.updateFormValuesAndHandleChange}
                {...COMMON_INPUT_PROPS}
              />
            )}
            {...COMMON_INPUT_FIELD_PROPS}
          />
        );
      case (INPUT_FIELD_TYPES.PASSWORD_CHALLENGE):
        return (
          <InputField
            input={(
              <PasswordChallenge
                selected={values[field.key]}
                onChange={handleChange}
                {...COMMON_INPUT_PROPS}
              />
            )}
            {...COMMON_INPUT_FIELD_PROPS}
          />
        );
      case (INPUT_FIELD_TYPES.CUSTOM_PASSWORD_CHALLENGE):
        return values.PasswordChallenge === CUSTOM_PASSWORD_CHALLENGE_VALUE ?
          (
            <InputField
              required
              input={(
                <Input
                  type={field.type}
                  onChange={handleChange}
                  {...COMMON_INPUT_PROPS}
                />
              )}
              {...COMMON_INPUT_FIELD_PROPS}
            />
          ) :
          null;
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
      const { apiFault, errors, fullWidth, handleSubmit, hasSubscriber, subscriberFormFields, touched } = this.props;
      const { status } = this.state;
      return (
        <div className="c-subscriber-form">
          {apiFault && (
            <Notice
              apiFault={apiFault}
              className="c-with-standard-size--large"
              type="error"
              heading={apiFault.translatedMessage}
            />
          )}
          {!hasSubscriber && checkForDisplayedErrors(errors, touched) && <FormErrors className="c-subscriber-form__errors c-with-standard-size--large" />}
          <form noValidate onSubmit={handleSubmit}>
            <div className="c-subscriber-fields">
              {subscriberFormFields.map((fieldCollection) => {
                const fields = fieldCollection.filter(({ display }) => display);

                if (fields.length) {
                  const visibleErrors = filterVisibleErrors({
                    errors,
                    status,
                    touched
                  });
                  const inputs = fields
                    .map((field) => (
                      this.getInputForField({
                        ...field,
                        size: getFieldSize(fields.length, fullWidth)
                      }, visibleErrors)
                    ))
                    .filter((field) => !!field);

                  if (inputs.length) {
                    const key = fields.map((field) => field.key).join('_');
                    return (<FieldRow key={key}>{inputs}</FieldRow>);
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

SubscriberForm.displayName = 'SubscriberForm';
SubscriberForm.propTypes = {
  /** An error message response kicked back from an API call */
  apiFault: apiFaultPropTypes,
  /** Property to determine if the form should take up the full width provided */
  fullWidth: PropTypes.bool,
  /** used here just to determine if one exists or not. */
  hasSubscriber: PropTypes.bool,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Function to retrieve codes */
  retrieveCodes: PropTypes.func.isRequired,
  /** Specifies custom submit button text to render */
  submitButtonText: PropTypes.string,
  /** The fields to be rendered inside of the form */
  subscriberFormFields: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(Object.values(INPUT_FIELD_TYPES)).isRequired,
    label: PropTypes.string.isRequired,
    /** Other options can exist, but required is most common */
    validation: PropTypes.shape({
      required: PropTypes.bool
    }),
    key: PropTypes.string.isRequired,
    code: PropTypes.number,
    display: PropTypes.bool
  }))),
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Function to perform when form values are updated */
  updateSubscriberFormValues: PropTypes.func.isRequired,
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
SubscriberForm.defaultProps = {
  fullWidth: false
};

export default compose(
  withI18n(),
  withRouter
)(SubscriberForm);
