import PropTypes from 'prop-types';
import React from 'react';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import './logout.scss';

import { getMobileLogoutNavItem } from '../../navigation/sitemap.selectors';

class Logout extends React.Component {
  async componentDidMount() {
    await this.props.closeSession();
    if (this.props.isRunningMobile) {
      window.location.href = getMobileLogoutNavItem().url;
    } else {
      window.location.href = '/';
    }
  }

  render() {
    return (
      <div className="c-logout c-loading-indicator-containment">
        <LoadingIndicator isLoading />
      </div>
    );
  }
}

Logout.displayName = 'Logout';
Logout.propTypes = {
  /** Action which will close the session. */
  closeSession: PropTypes.func.isRequired,
  /** Boolean indicating whether we are in the mobile app or not */
  isRunningMobile: PropTypes.bool
};

export default Logout;
