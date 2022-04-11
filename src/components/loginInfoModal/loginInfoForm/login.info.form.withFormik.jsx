import { withFormik } from 'formik';
import flatten from 'ramda/src/flatten';
import pathOr from 'ramda/src/pathOr';
import Immutable from 'seamless-immutable';
import LoginInfoForm from './login.info.form';

export default withFormik({
  displayName: 'LoginInfoForm',
  enableReinitialize: true,
  mapPropsToValues: ({ loginInfoFormFields }) => {
    const values = flatten(loginInfoFormFields)
      .reduce((prev, field) => {
        return field.display ? {
          ...prev,
          [field.key]: prev[field.key] || field.defaultValue || ''
        } :
          prev;
      }, {});
    return values;
  },
  validate: (values = {}, props) => {
    const errors = Object.keys(props.validationFunctions)
      .reduce((prev, key) => prev.set(key, props.validationFunctions[key](values)), new Immutable({}))
      .asMutable();
    Object.keys(errors)
      .forEach((key) => {
        if (errors[key] === undefined) {
          delete errors[key];
        }
      });
    return errors;
  },
  handleSubmit: (values, { props }) => {
    props.onSubmit(values);
  },
  ref: (node) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    pathOr(() => {}, ['props', 'bindForm'], node)(node);
  }
})(LoginInfoForm);
