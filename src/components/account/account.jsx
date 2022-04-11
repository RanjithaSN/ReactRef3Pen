import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React, { useEffect } from 'react';
import { withI18n } from 'react-i18next';
import { Redirect, Route, Switch } from 'react-router';
import styled from 'styled-components';
import {
  getAccountNavItem,
  getAddPaymentMethodNavItem,
  getBillingNavItem,
  getEditPaymentMethodNavItem,
  getManageNavItem,
  getNotFoundNavItem,
  getPaymentMethodsNavItem,
  getProductsNavItem
} from '../../navigation/sitemap.selectors';
import Billing from '../billing/billing.contextual';
import PaymentDetails from '../billing/paymentDetails/payment.details.contextual';
import AddPaymentMethod from '../billing/paymentMethods/addPaymentMethod/add.payment.method.contextual';
import EditPaymentMethod from '../billing/paymentMethods/editPaymentMethod/edit.payment.method.contextual';
import PaymentMethods from '../billing/paymentMethods/payment.methods.contextual';
import DashboardDbss from '../dashboard/dashboardDbss/dashboard.dbss.contextual';
import Manage from '../manage/manage.contextual';
import Products from '../products/products.contextual';
import withAuth from '../withAuth/with.auth.contextual';
import './account.scss';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Account = ({
  isSearchSupportLoaded,
  isWalletLoaded,
  retrieveAddressesOnce,
  retrieveSupportRequestTypes,
  retrieveWallet,
  searchSupportRequest,
  updateIsBenifyDistributionChannel
}) => {
  useEffect(() => {
    updateIsBenifyDistributionChannel(false);

    const prerequisites = [retrieveAddressesOnce(), retrieveSupportRequestTypes()];

    if (!isSearchSupportLoaded) {
      prerequisites.push(searchSupportRequest());
    }

    if (!isWalletLoaded) {
      prerequisites.push(retrieveWallet());
    }

    Promise.all(prerequisites);
  }, []);

  return (
    <Wrapper>
      <Switch>
        <Route exact path={`${getBillingNavItem().url}/:transactionId`} component={PaymentDetails} />
        <Route exact path={getBillingNavItem().url} component={Billing} />
        <Route exact path={getAddPaymentMethodNavItem().url} component={AddPaymentMethod} />
        <Route exact path={`${getEditPaymentMethodNavItem().url}/:paymentMethodId?`} component={EditPaymentMethod} />
        <Route exact path={getPaymentMethodsNavItem().url} component={PaymentMethods} />
        <Route path={`${getProductsNavItem().url}/:productId?`} component={Products} />
        <Route exact path={getManageNavItem().url} component={Manage} />
        <Route exact path={getAccountNavItem().url} component={DashboardDbss} />
        <Redirect to={getNotFoundNavItem().url} />
      </Switch>
    </Wrapper>
  );
};

Account.displayName = 'Account';
Account.propTypes = {
  /** Search Support request loaded */
  isSearchSupportLoaded: PropTypes.bool,
  /** Indicator of whether the subscriber's wallet is already loaded in the store. */
  isWalletLoaded: PropTypes.bool,
  /** Allows the component to retrieve subscriber addresses */
  retrieveAddressesOnce: PropTypes.func.isRequired,
  /** Retrieves the support request types */
  retrieveSupportRequestTypes: PropTypes.func.isRequired,
  /** Function used to retrieve the subscriber's wallet. */
  retrieveWallet: PropTypes.func.isRequired,
  /** Retrieves the support requests to see if we already have a port-in selected */
  searchSupportRequest: PropTypes.func.isRequired,
  /** Update if it is the benify distribution channel */
  updateIsBenifyDistributionChannel: PropTypes.func.isRequired
};

export default compose(withI18n(), withAuth)(Account);
