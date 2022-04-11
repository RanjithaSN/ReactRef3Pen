import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import useSSRAction from '../../hooks/useSSRAction';
import { withRouter } from 'react-router';
import { getLoginNavItem, getShopNavItem } from '../../navigation/sitemap.selectors';

const PlaceHolder = () => {
  return <p>...</p>;
};

// This is specific condition where 3DS validation came be to continue finalizing the order process
const inBetweenCheckout = location.pathname.startsWith(getShopNavItem().url);// pathOr(false, ['MD'], qs.parse(location.search));

const refreshSubscriber = (props) => {
  if (!props.isRetrieveSubscriberAndAccountsLoaded) {
    props.retrieveSubscriberAndAccounts();
  }
  return false;
};

const refreshSubscriberSession = (props) => {
  let reLoginNeeded = false;
  // Missing a current session or subscriber
  if (!props.allowAccessWithoutAuth) {
    if (!props.currentSession) {
      reLoginNeeded = true;
    } else if (props.isProspect && !props.allowAccessWithoutAuth) {
      reLoginNeeded = true;
    } else {
      refreshSubscriber(props);
    }
  } else if (props.currentSession) {
    refreshSubscriber(props);
  }

  return reLoginNeeded;
};

const WithAuth = (props) => {
  const [shouldShow, setShouldShow] = useState(props.allowAccessWithoutAuth);
  const [subInfoFetched, setSubInfoFetched] = useState(false);
  const [promptLogin, setPromptLogin] = useState(false);
  const loginUrl = getLoginNavItem().url;
  const referrer = props.location.pathname;

  useSSRAction(() => {
    if (subInfoFetched) {
      setShouldShow(true);
    }
  }, [subInfoFetched]);

  useEffect(() => {
    if (promptLogin) {
      const login = `${loginUrl}?referrer=${referrer}`;
      props.history.push(login);
    }
  }, [promptLogin]);

  useEffect(() => {
    if (props.localStorageChecked && !subInfoFetched) {
      setSubInfoFetched(true);

      const mustLogin = refreshSubscriberSession(props);
      setPromptLogin(mustLogin);
    }
  }, [props.localStorageChecked, subInfoFetched]);

  useEffect(() => {
    if (props.isSubscriberLoaded && !props.isProspect) {
      props.retrieveUserAccountInformation(inBetweenCheckout);
    } else if (props.isProspect && !props.allowAccessWithoutAuth) {
      setPromptLogin(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isSubscriberLoaded]);

  const component = props.component;
  const isLoading = props.isCurrentSessionRefreshing || props.isSubscriberLoading || props.accountsAreLoading;

  return (
    <React.Fragment>
      { <LoadingIndicator isLoading={isLoading || !shouldShow} /> }
      { shouldShow ? //!props.allowAccessWithoutAuth && isLoading ?
        React.createElement(component, props) :
        <PlaceHolder/>
      }
    </React.Fragment>
  );
};

WithAuth.displayName = 'WithAuth';
WithAuth.propTypes = {
  /** true if accounts are currently loading. */
  accountsAreLoading: PropTypes.bool,
  /** Whether the wrapped component should render if user is not authenticated */
  allowAccessWithoutAuth: PropTypes.bool,
  /** The component to be rendered if properly authenticated */
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  /** The current session of the user */
  currentSession: PropTypes.string,
  /** Push function to redirect to login in the event of the user being unauthenticated */
  history: PropTypes.object.isRequired,
  /** Refresh session action to be called if the session based on local variables */
  refreshSession: PropTypes.func.isRequired,
  /** Retrieve subscriber call to get the subscriber data and accounts on refresh */
  retrieveSubscriberAndAccounts: PropTypes.func.isRequired,
  /** Retrieve additional subscriber information */
  retrieveUserAccountInformation: PropTypes.func.isRequired,
  /** Boolean indicating whether the refreshSession action is in progress */
  isCurrentSessionRefreshing: PropTypes.bool,
  /** Boolean indicating if current subscriber is a prospect */
  isProspect: PropTypes.bool,
  /** Boolean indicating whether the subscriber information loading is done */
  isRetrieveSubscriberAndAccountsLoaded: PropTypes.bool,
  /** Boolean indicating whether the retrieveSubscriber action is in progress */
  isSubscriberLoading: PropTypes.bool,
  /** Boolean indicating whether the store has subscriber information from a previous retrieveSubscriber action */
  isSubscriberLoaded: PropTypes.bool,
  /** Boolean indicating whether we have checked that there is a sessionId in localstorage**/
  localStorageChecked: PropTypes.bool,
  displayName: PropTypes.string
};
WithAuth.defaultProps = {
  allowAccessWithoutAuth: false
};

export default withRouter(WithAuth);
