import { withFormik } from 'formik';
import { t } from 'i18next';
import { requiredError } from '../../../helpers/validation.helpers';
import LocaleKeys from '../../../locales/keys';
import AttributesDisplay from './attributes.display';


export const regularExpressionError = (fieldName) => {
  return t(LocaleKeys.VALIDATION.INVALID_VALUE, {
    field: fieldName
  });
};
export default withFormik({
  displayName: 'AttributesDisplay',
  enableReinitialize: true,
  validateOnChange: true,
  touchOnChange: true,
  mapPropsToValues: ({ decisionAttributes }) => {
    const keys = Object.keys(decisionAttributes);
    const values = {};
    keys.forEach((key) => {
      const attrList = decisionAttributes[key];
      attrList.forEach((attr) => {
        values[attr.id] = attr.formValue;
      });
    });
    return values;
  },
  validate: (values, { decisionAttributes }) => {
    const errors = {};
    Object.keys(decisionAttributes).forEach((key) => {
      const attrList = decisionAttributes[key];
      errors[key] = false;
      attrList.forEach((attr) => {
        if (attr.isRequired && (!values[attr.id] || values[attr.id] === '')) {
          errors[attr.id] = requiredError(attr.name);
          errors[key] = true;
        } else if (attr.regularExpression) {
          const regExp = new RegExp(attr.regularExpression);
          if (!regExp.test(values[attr.id])) {
            errors[attr.id] = regularExpressionError(attr.name);
            errors[key] = true;
          }
        }
      });
    });
    return errors;
  }
})(AttributesDisplay);
