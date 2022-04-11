import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { RetrieveCodes } from '@selfcare/core/redux/metadata/codes/codes.actions';
import { CurrentSession, IsCurrentSessionCreating } from '@selfcare/core/redux/session/session.selectors';
import { ForceEnvironmentUpdate } from '@selfcare/core/redux/settings/settings.actions';
import { ShouldCaptureEmailAsLogin, SubscriberIsLoading } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { RetrieveUserAccountInformation } from '../../redux/account/account.actions';
import { CreateSubscriberOrProspectSession } from '../../redux/createSubscriber/create.subscriber.actions';
import { UpdateUserId } from '../../redux/forgotPassword/forgot.password.actions';
import { FromForgotPasswordPage, UserId } from '../../redux/forgotPassword/forgot.password.selectors';
import { UpdateShouldShowSessionExpiration } from '../../redux/login/login.actions';
import { ProspectIsAvailable } from '../../redux/orderFlow/subscriberInformation/subscriber.information.selectors';
import { FromResetPasswordPage } from '../../redux/resetPassword/reset.password.selectors';
import { IsRunningMobile } from '../../redux/site/site.selectors';
import Login from './login';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  currentSession: CurrentSession,
  shouldCaptureEmailAsLogin: ShouldCaptureEmailAsLogin,
  isPropectCustomer: ProspectIsAvailable,
  isRunningMobile: IsRunningMobile,
  isSubscriberLoading: SubscriberIsLoading,
  sessionCreatingLoadingIndicator: IsCurrentSessionCreating,
  showForgotPasswordSuccessNotification: FromForgotPasswordPage,
  showUpdatePasswordNotification: FromResetPasswordPage,
  userId: UserId
});

const mapActionsToProps = {
  createSession: CreateSubscriberOrProspectSession,
  forceEnvironmentUpdate: ForceEnvironmentUpdate,
  retrieveCodes: RetrieveCodes,
  retrieveAccounts: RetrieveUserAccountInformation,
  updateShouldShowExpiration: UpdateShouldShowSessionExpiration,
  updateUserId: UpdateUserId
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
