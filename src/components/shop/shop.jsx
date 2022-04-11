import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import { OFFER_CUSTOMIZATION_TYPES } from '../../constants/order.constants';
import { getCheckoutNavItem, getConfigureOfferNavItem, getConfirmationNavItem, getEditNewOfferNavItem, getEditPurchasedOfferNavItem, getNotFoundNavItem, getShopNavItem, getSubscriberInformationNavItem, getUpdatePurchasedOfferNavItem, getUpdateTransitionOfferNavItem } from '../../navigation/sitemap.selectors';
import withAuth from '../withAuth/with.auth.contextual';
import Checkout from './checkout/checkout.contextual';
import Confirmation from './confirmation/confirmation.contextual';
import CustomizeOfferRoutable from './customizeOffer/newConnect/customize.offer.routable';
import SearchOffers from './searchOffers/search.offers.contextual';
import SubscriberInformation from './subscriberInformation/subscriber.information.contextual';

const Shop = ({ history, match, isUserAvailable, updateIsBenifyDistributionChannel }) => {
  useEffect(() => {
    return history.listen(({ pathname }) => {
      if (!pathname.startsWith(match.url)) {
        updateIsBenifyDistributionChannel(false);
      }
    });
  }, [history, match, updateIsBenifyDistributionChannel]);

  return (
    <Switch>
      <Route exact component={SearchOffers} path={getShopNavItem().url} />
      {!!isUserAvailable && <Route exact component={Checkout} path={getCheckoutNavItem().url} />}
      <Route exact component={SubscriberInformation} path={getSubscriberInformationNavItem().url} />
      <Route exact component={Confirmation} path={getConfirmationNavItem().url} />
      <Route
        exact
        render={(props) => <CustomizeOfferRoutable {...props} customizationType={OFFER_CUSTOMIZATION_TYPES.NEW_OFFER} />}
        path={`${getConfigureOfferNavItem().url}/:id`}
      />
      <Route
        exact
        render={(props) => <CustomizeOfferRoutable {...props} customizationType={OFFER_CUSTOMIZATION_TYPES.PURCHASED_OFFER} />}
        path={`${getUpdatePurchasedOfferNavItem().url}/:id`}
      />
      <Route
        exact
        render={(props) => <CustomizeOfferRoutable {...props} customizationType={OFFER_CUSTOMIZATION_TYPES.NEW_OFFER_BEING_MODIFIED} />}
        path={`${getEditNewOfferNavItem().url}/:id`}
      />
      <Route
        exact
        render={(props) => (
          <CustomizeOfferRoutable {...props} customizationType={OFFER_CUSTOMIZATION_TYPES.TRANSITION} />
        )}
        path={`${getUpdateTransitionOfferNavItem().url}/:id`}
      />
      <Route
        exact
        render={(props) => <CustomizeOfferRoutable {...props} customizationType={OFFER_CUSTOMIZATION_TYPES.PURCHASED_OFFER_BEING_MODIFIED} />}
        path={`${getEditPurchasedOfferNavItem().url}/:id`}
      />
      {!!isUserAvailable && <Redirect to={getNotFoundNavItem().url} />}
    </Switch>
  );
};

Shop.displayName = 'Shop';
Shop.propTypes = {
  /** History object from router */
  history: PropTypes.object.isRequired,
  /** Flag to tell us if the user is available */
  isUserAvailable: PropTypes.bool.isRequired,
  /** Router articleId URL parameter */
  match: PropTypes.object,
  /** Updates whether the distribution channel should be the Benify one or not. */
  updateIsBenifyDistributionChannel: PropTypes.func.isRequired
};
export default withAuth(compose(
  withRouter
)(Shop), {
  allowAccessWithoutAuth: true
});
