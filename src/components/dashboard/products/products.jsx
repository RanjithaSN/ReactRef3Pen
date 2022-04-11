import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React, { useEffect } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import Product from './product.contextual';
import LocaleKeys from '../../../locales/keys';
import { getShopNavItem } from '../../../navigation/sitemap.selectors';
import CrossSell from '../../crossSell/cross.sell.contextual';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import CardList, { CardListBody, CardListHeader } from 'selfcare-ui/src/components/cardList/card.list';
import Heading from 'selfcare-ui/src/components/heading/heading';
import ZeroState from 'selfcare-ui/src/components/zeroState/zero.state';
import { AppContext } from 'selfcare-ui/src/components/appContext/app.context';
import './products.scss';

const Products = ({
  areSubscriberOfferingsLoaded,
  fetchCatalog,
  fetchMobileServiceFeatures,
  retrieveCodes,
  serviceFeaturesReadyToLoad,
  ...rest
}) => {
  useEffect(() => {
    retrieveCodes(CODES.UnitOfMeasure);
  }, []);

  useEffect(() => {
    if (areSubscriberOfferingsLoaded) {
      fetchCatalog();
    }
  }, [areSubscriberOfferingsLoaded]);

  useEffect(() => {
    if (serviceFeaturesReadyToLoad) {
      fetchMobileServiceFeatures();
    }
  }, [serviceFeaturesReadyToLoad]);

  const { allUsage, history, inSweden, offers, offersLoading, offeringHasPaymentFailure, locale, t } = rest;
  return (
    <AppContext.Consumer>
      {() =>
        !offersLoading && Boolean(offers.length) ? (
          <React.Fragment>
            <CardList className='c-products'>
              <CardListHeader>
                <Heading className='c-products__header' category='major'>
                  {t(LocaleKeys.PRODUCT_CARD.HEADING)}
                </Heading>
              </CardListHeader>
              <CardListBody isLoading={offersLoading} className='c-products__list'>
                {offers.map((offering) => (
                  <Product
                    key={offering.offeringInstanceId}
                    inSweden={inSweden}
                    locale={locale}
                    offering={offering}
                    paymentFailure={offeringHasPaymentFailure(offering)}
                    usage={allUsage[offering.serviceIdentifier]}
                  />
                ))}
              </CardListBody>
            </CardList>
            <CrossSell />
          </React.Fragment>
        ) : (
          <>
            <ZeroState
              title={t(LocaleKeys.DASHBOARD.NO_ACCOUNT_MESSAGE)}
              callToAction={
                <FilledButton
                  onClick={() => {
                    return history.push(getShopNavItem().url);
                  }}
                >
                  {t(LocaleKeys.SHOP_NOW)}
                </FilledButton>
              }
            />
            <CrossSell />
          </>
        )
      }
    </AppContext.Consumer>
  );
};

Products.displayName = 'Products';
Products.propTypes = {
  /** Object of usage identified by service identifier. */
  allUsage: PropTypes.object,
  /** True if subscriber offerings have been loaded */
  areSubscriberOfferingsLoaded: PropTypes.bool,
  /** Requests the mobile catalog of service features */
  fetchCatalog: PropTypes.func.isRequired,
  /** Requests additional information on the mobile service features */
  fetchMobileServiceFeatures: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,  
  /** True if user's current location is Sweden. */
  inSweden: PropTypes.bool,
  /** Use correct locale to display plan */
  locale: PropTypes.string.isRequired,
  /** Returns case information if offering has a payment failure */
  offeringHasPaymentFailure: PropTypes.func.isRequired,
  /** Offerings array to get each listed plans */
  offers: PropTypes.arrayOf(
    PropTypes.shape({
      /** The id of the plan */
      offeringInstanceId: PropTypes.string.isRequired,
    })
  ).isRequired,
  /** Indicates whether offerings are currently loading */
  offersLoading: PropTypes.bool,
  /** Retrieve codes call to perform a lookup of the metadata required to display the entitlements to the user */
  retrieveCodes: PropTypes.func.isRequired,  
  /** True if service features need to be loaded */
  serviceFeaturesReadyToLoad: PropTypes.bool,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
};

export default compose(withI18n(), withRouter)(Products);
