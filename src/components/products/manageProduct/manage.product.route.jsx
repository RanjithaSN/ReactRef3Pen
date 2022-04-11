import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import Keys from '../../../locales/keys';
import { getNotFoundNavItem, getProductsNavItem } from '../../../navigation/sitemap.selectors';
import PageContent, { Main } from '../../pageContent/page.content';
import FailedPayment from './failedPayment/failed.payment.contextual';
import MakeChange from './makeChange/make.change.contextual';
import ManageProduct from './manage.product.contextual';
import ManageActivationDate from './manageActivationDate/manage.activation.date.contextual';
import ChangeOfServicePending from './noProductChangeAllowed/change.of.service.pending.contextual';
import RenewingProduct from './noProductChangeAllowed/renewing.product';
import PortIn from './portIn/port.in.contextual';
import Restore from './restore/restore.contextual';
import ReturnProduct from './returnProduct/return.product.contextual';
import SimSwap from './simSwap/sim.swap.contextual';
import Suspend from './suspend/suspend.contextual';

const ManageProductRoute = ({ t }) => (
  <PageContent>
    <Main>
      <Switch>
        <Route exact path={`${getProductsNavItem().url}/:productId/${t(Keys.ROUTES.MANAGE)}/${t(Keys.ROUTES.MANAGE_PAGE.ACTIVATION_DATE)}`} component={ManageActivationDate} />
        <Route exact path={`${getProductsNavItem().url}/:productId/${t(Keys.ROUTES.MANAGE)}/${t(Keys.ROUTES.MANAGE_PAGE.CHANGE)}`} component={MakeChange} />
        <Route exact path={`${getProductsNavItem().url}/:productId/${t(Keys.ROUTES.MANAGE)}/${t(Keys.ROUTES.MANAGE_PAGE.CURRENTLY_RENEWING)}`} component={RenewingProduct} />
        <Route exact path={`${getProductsNavItem().url}/:productId/${t(Keys.ROUTES.MANAGE)}/${t(Keys.ROUTES.MANAGE_PAGE.CURRENTLY_PENDING)}`} component={ChangeOfServicePending} />
        <Route exact path={`${getProductsNavItem().url}/:productId/${t(Keys.ROUTES.MANAGE)}/${t(Keys.ROUTES.MANAGE_PAGE.FAILED_PAYMENT)}`} component={FailedPayment} />
        <Route exact path={`${getProductsNavItem().url}/:productId/${t(Keys.ROUTES.MANAGE)}/${t(Keys.ROUTES.MANAGE_PAGE.PORT_NUMBER)}`} component={PortIn} />
        <Route exact path={`${getProductsNavItem().url}/:productId/${t(Keys.ROUTES.MANAGE)}/${t(Keys.ROUTES.MANAGE_PAGE.RETURN)}`} component={ReturnProduct} />
        <Route exact path={`${getProductsNavItem().url}/:productId/${t(Keys.ROUTES.MANAGE)}/${t(Keys.ROUTES.MANAGE_PAGE.RESTORE)}`} component={Restore} />
        <Route exact path={`${getProductsNavItem().url}/:productId/${t(Keys.ROUTES.MANAGE)}/${t(Keys.ROUTES.MANAGE_PAGE.SUSPEND)}`} component={Suspend} />
        <Route exact path={`${getProductsNavItem().url}/:productId/${t(Keys.ROUTES.MANAGE)}/${t(Keys.ROUTES.MANAGE_PAGE.REPLACE_SIM)}`} component={SimSwap} />
        <Route exact path={`${getProductsNavItem().url}/:productId/${t(Keys.ROUTES.MANAGE)}/:mode`} component={ManageProduct} />
        <Redirect to={getNotFoundNavItem().url} />
      </Switch>
    </Main>
  </PageContent>
);

ManageProductRoute.propTypes = {
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default compose(
  withI18n(),
  withRouter
)(ManageProductRoute);
