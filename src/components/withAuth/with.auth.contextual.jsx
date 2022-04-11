import { RefreshSession } from '@selfcare/core/redux/session/session.actions';
import { CurrentSession, IsCurrentSessionRefreshing } from '@selfcare/core/redux/session/session.selectors';
import { SubscriberIsLoaded } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import compose from 'ramda/src/compose';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { RetrieveUserAccountInformation, RetrieveSubscriberAndAccounts } from '../../redux/account/account.actions';
import { SubscriberAndAccountsIsLoaded } from '../../redux/account/account.selectors';
import { ConvergentBillerAccountsLoading } from '../../redux/convergentBiller/convergent.biller.selectors';
import { ProspectIsAvailable } from '../../redux/orderFlow/subscriberInformation/subscriber.information.selectors';
import { SubscriberInformationAndROCIsLoading } from '../../redux/ordering/ordering.selectors';
import { LocalStorageChecked } from '../../redux/createSubscriber/create.subscriber.selectors';
import WithAuth from './with.auth';

const mapStateToProps = createStructuredSelector({
  accountsAreLoading: ConvergentBillerAccountsLoading,
  currentSession: CurrentSession,
  isCurrentSessionRefreshing: IsCurrentSessionRefreshing,
  isProspect: ProspectIsAvailable,
  isRetrieveSubscriberAndAccountsLoaded: SubscriberAndAccountsIsLoaded,
  isSubscriberLoading: SubscriberInformationAndROCIsLoading,
  isSubscriberLoaded: SubscriberIsLoaded,
  localStorageChecked: LocalStorageChecked
});

const mapActionsToProps = {
  refreshSession: RefreshSession,
  retrieveSubscriberAndAccounts: RetrieveSubscriberAndAccounts,
  retrieveUserAccountInformation: RetrieveUserAccountInformation
};

const withAuth = (Component, opts = {}) => {
  return class extends React.Component {
        static displayName = `WithAuth(${Component.displayName || Component.name || 'Component'})`;

        render() {
          return (
            <WithAuth
              {...this.props}
              {...opts}
              component={Component}
            />
          );
        }
  };
};
export default (Component, opts) => {
  return compose(
    withRouter,
    connect(mapStateToProps, mapActionsToProps),
    withAuth,
  )(Component, opts);
};
