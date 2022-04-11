import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UpdateLoginInfoFormValues } from '../../../redux/loginInfo/login.info.actions';
import { ClientValidation, LoginInfoFormFieldsFormatted } from '../../../redux/loginInfo/login.info.selectors';
import LoginInfoForm from './login.info.form.withFormik';


const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  loginInfoFormFields: LoginInfoFormFieldsFormatted,
  validationFunctions: ClientValidation
});
const mapActionsToProps = {
  updateLoginInfoFormValues: UpdateLoginInfoFormValues
};

export default connect(mapStateToProps, mapActionsToProps)(LoginInfoForm);
