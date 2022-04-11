import { ClearConvergentBillerAccounts } from '@selfcare/core/redux/convergentBillerSummary/convergent.biller.summary.actions';
import { ClearApiFault } from '@selfcare/core/redux/fault/fault.actions';
import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { RetrieveCodes } from '@selfcare/core/redux/metadata/codes/codes.actions';
import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import { CodeItems } from '@selfcare/core/redux/metadata/codes/codes.selectors';
import { IssuePasswordReset } from '@selfcare/core/redux/passwordManagement/password.management.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ResetPasswordIsUpdating } from '../../redux/resetPassword/reset.password.selectors';
import ResetPassword from './reset.password';


const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  passwordRequirementCodeItems: CodeItems(CODES.PasswordRequirements),
  updatePasswordLoadingIndicator: ResetPasswordIsUpdating
});

const mapActionsToProps = {
  ensureDashboardReload: ClearConvergentBillerAccounts,
  fetchCodes: RetrieveCodes,
  resetFaults: ClearApiFault,
  resetPassword: IssuePasswordReset

};

export default connect(mapStateToProps, mapActionsToProps)(ResetPassword);
