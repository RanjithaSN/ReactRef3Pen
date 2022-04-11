import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UpdateUserInfoFormValues } from '../../../redux/userInfo/user.info.actions';
import { ClientValidation, UserInfoFormFieldsFormatted } from '../../../redux/userInfo/user.info.selectors';
import UseInfoForm from './user.info.form.withFormik';


const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  userInfoFormFields: UserInfoFormFieldsFormatted,
  validationFunctions: ClientValidation
});
const mapActionsToProps = {
  updateUserInfoFormValues: UpdateUserInfoFormValues
};

export default connect(mapStateToProps, mapActionsToProps)(UseInfoForm);
