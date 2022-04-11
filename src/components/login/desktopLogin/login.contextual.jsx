import { ClearApiFault } from '@selfcare/core/redux/fault/fault.actions';
import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { RetrieveCodes } from '@selfcare/core/redux/metadata/codes/codes.actions';
import { CurrentSession, IsCurrentSessionCreating } from '@selfcare/core/redux/session/session.selectors';
import { ShouldCaptureEmailAsLogin, SubscriberIsLoading } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { RetrieveUserAccountInformation } from '../../../redux/account/account.actions';
import { CartHasPlay } from '../../../redux/cart/cart.selectors';
import { CreateSubscriberOrProspectSession } from '../../../redux/createSubscriber/create.subscriber.actions';
import { UpdateUserId } from '../../../redux/forgotPassword/forgot.password.actions';
import { FromForgotPasswordPage, UserId } from '../../../redux/forgotPassword/forgot.password.selectors';
import { UpdateShouldShowSessionExpiration } from '../../../redux/login/login.actions';
import { ClearProspect, SwitchToSubscriberCart } from '../../../redux/orderFlow/subscriberInformation/subscriber.information.actions';
import { ProspectIsAvailable } from '../../../redux/orderFlow/subscriberInformation/subscriber.information.selectors';
import { HasPennyPlayProduct } from '../../../redux/products/products.selectors';
import { FromResetPasswordPage } from '../../../redux/resetPassword/reset.password.selectors';
import Login from './login';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  currentSession: CurrentSession,
  shouldCaptureEmailAsLogin: ShouldCaptureEmailAsLogin,
  hasPennyPlayProduct: HasPennyPlayProduct,
  hasPennyPlayInCart: CartHasPlay,
  isPropectCustomer: ProspectIsAvailable,
  isSubscriberLoading: SubscriberIsLoading,
  sessionCreatingLoadingIndicator: IsCurrentSessionCreating,
  showForgotPasswordSuccessNotification: FromForgotPasswordPage,
  showUpdatePasswordNotification: FromResetPasswordPage,
  userId: UserId
});

const mapActionsToProps = {
  clearApiFault: ClearApiFault,
  clearProspect: ClearProspect,
  createSession: CreateSubscriberOrProspectSession,
  retrieveCodes: RetrieveCodes,
  retrieveAccounts: RetrieveUserAccountInformation,
  saveCart: SwitchToSubscriberCart,
  updateShouldShowExpiration: UpdateShouldShowSessionExpiration,
  updateUserId: UpdateUserId
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
