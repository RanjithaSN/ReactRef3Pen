import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import LocaleKeys from '../../locales/keys';
import { getEntireAccountNavItem } from '../../navigation/sitemap.selectors';
import AuthenticationPanel from '../authenticationPanel/authentication.panel';
import PageContent, { Main } from '../pageContent/page.content';
import ResetPasswordForm from './reset.password.form';

class ResetPassword extends React.Component {
  componentDidMount() {
    this.props.fetchCodes(CODES.PasswordRequirements);
    // There is an api fault happening on reset password this clears the faults coming in to the reset password page
    this.props.resetFaults();
  }

    handleResetPassword = async (password) => {
      await this.props.resetPassword(this.props.match.params.token, password);

      // checks if this instance is coming from the modal
      if (this.props.afterSubmit) {
        this.props.afterSubmit();
      } else {
        this.props.ensureDashboardReload();
        this.props.history.push(getEntireAccountNavItem().url);
      }
    };

    render() {
      const { passwordRequirementCodeItems, t } = this.props;
      let passwordRequirements = passwordRequirementCodeItems.map((item) => item.Description);

      // Remove this line and make passwordRequirements a const once we get real data
      passwordRequirements = undefined;
      return (

        <PageContent className="c-resetPassword">
          <Main className="c-resetPassword__main">
            <AuthenticationPanel
              className="c-loading-indicator-containment"
              heading={!this.props.afterSubmit ? t(LocaleKeys.RESET_PASSWORD.RESET_PASSWORD_HEADING) : null}
            >
              <LoadingIndicator isLoading={this.props.updatePasswordLoadingIndicator} />
              <ResetPasswordForm
                apiFault={this.props.apiFault}
                handleResetPassword={this.handleResetPassword}
                passwordRequirements={passwordRequirements}
                push={this.props.history.push}
              />
            </AuthenticationPanel>
          </Main>
        </PageContent>
      );
    }
}

ResetPassword.displayName = 'ResetPassword';
ResetPassword.propTypes = {
  /** Modal function to close modal after submiting */
  afterSubmit: PropTypes.func,
  /** A fault object representing an error that occurred attempting to reset the password.  Must have a translatedMessage attribute. */
  apiFault: PropTypes.object,
  /** Allows the component to ensure password will reset reload the */
  ensureDashboardReload: PropTypes.func.isRequired,
  /** Allows the component to retrieve codes */
  fetchCodes: PropTypes.func.isRequired,
  /** The array of password requirements */
  passwordRequirementCodeItems: PropTypes.arrayOf(PropTypes.object),
  /** Clears api faults coming in to reset password */
  resetFaults: PropTypes.func.isRequired,
  /** Callback which will be executed when a user provides a new password. */
  resetPassword: PropTypes.func.isRequired,
  /** Navigation function used to change the browser url. */
  history: PropTypes.object.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Router articleId URL parameter */
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    })
  }),
  /** The loading indicator will be displayed until the password is updated. */
  updatePasswordLoadingIndicator: PropTypes.bool
};

export default withRouter(withI18n()(ResetPassword));
