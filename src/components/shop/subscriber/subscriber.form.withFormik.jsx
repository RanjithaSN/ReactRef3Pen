import { withFormik } from 'formik';
import flatten from 'ramda/src/flatten';
import pathOr from 'ramda/src/pathOr';
import Immutable from 'seamless-immutable';
import SubscriberForm from './subscriber.form';

export default withFormik({
  displayName: 'SubscriberForm',
  enableReinitialize: true,
  mapPropsToValues: ({ subscriberFormFields }) => {
    const values = flatten(subscriberFormFields)
      .reduce((prev, field) => {
        return field.display ? {
          ...prev,
          [field.key]: prev[field.key] === 0 || field.defaultValue === 0 ? 0 : prev[field.key] || field.defaultValue || ''
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

    props.updateSubscriberFormValues(values, !errors.Email && !errors.MobilePhone && !errors.Login);
    return errors;
  },
  handleSubmit: (values, { props }) => {
    props.onSubmit(values);
  },
  ref: (node) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    pathOr(() => {}, ['props', 'bindForm'], node)(node);
  }
})(SubscriberForm);
