import {
  getBroadbandExternalOfferNames,
  getBundleExternalOfferNames,
  getMobileExternalOfferNames,
  ShopBenifyExternalDisplayNames,
  ShopPlayExternalDisplayNames
} from '@selfcare/core/redux/offeringContext/offering.context.constants';
import { OFFER_TYPES } from '@selfcare/core/redux/searchOffers/search.offers.constants';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React, { useEffect, useState } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import API_FAULT_CODES from 'selfcare-core/src/constants/api.fault.codes';
import Notice from 'selfcare-ui/src/components/notice/notice';
import Collapsible from 'ui/components/collapsible/collapsible';
import Columns from 'ui/components/columns/columns';
import InfoBlock from 'ui/components/info-block/info-block';
import Markdown from 'ui/components/markdown/markdown';
import Stack from 'ui/components/stack/stack';
import TableComp from 'ui/components/table/table';
import LocaleKeys from '../../../locales/keys';
import PageContent, { Main } from '../../pageContent/page.content';
import MetaData from '../../pageMetaData/meta.data.handler.contextual';
import OfferSummaryPreview from '../offerSummary/offer.summary.preview.contextual';
import MarketingTemplates from './marketingTemplates/marketing.templates.contextual';
import './search.offers.scss';

const SearchOffers = ({
  apiFault,
  checkForAttributes,
  clearApiFault,
  clearAddresses,
  clearCart,
  displayOverlayedOfferSummary,
  fetchOfferExternalIdMetaData,
  fromLandingPage,
  history,
  isCampaign,
  loadingHandler,
  productsMoreInformation,
  retrieveDecisionsForOffers,
  section,
  session,
  t
}) => {

  const [loadedOffers, setLoadedOffers] = useState([]);

  const mapRouteToExternalOfferingTypeBySection = () => {
    let targetOffers;

    switch (section) {
    case t(LocaleKeys.ROUTES.ABOUT_BROADBAND_KEY):
    case `${t(LocaleKeys.ROUTES.ABOUT_BROADBAND_KEY)}/${t(LocaleKeys.ROUTES.STUDENT)}`:
      targetOffers = getBroadbandExternalOfferNames(isCampaign);
      break;
    case t(LocaleKeys.ROUTES.ABOUT_BUNDLE_KEY):
    case `${t(LocaleKeys.ROUTES.ABOUT_BUNDLE_KEY)}/${t(LocaleKeys.ROUTES.STUDENT)}`:
      targetOffers = getBundleExternalOfferNames(isCampaign);
      break;
    case t(LocaleKeys.ROUTES.ABOUT_MOBILE_KEY):
    case `${t(LocaleKeys.ROUTES.ABOUT_MOBILE_KEY)}/${t(LocaleKeys.ROUTES.STUDENT)}`:
      targetOffers = getMobileExternalOfferNames(isCampaign);
      break;
    case t(LocaleKeys.ROUTES.ABOUT_PENNY_KEY):
      targetOffers = Object.values(ShopPlayExternalDisplayNames);
      break;
    case t(LocaleKeys.ROUTES.ABOUT_BENIFY_DEALS_KEY):
      targetOffers = Object.values(ShopBenifyExternalDisplayNames);
      break;
    default:
      targetOffers = [];
      break;
    }
    return targetOffers;
  };

  const filterLoadedOffers = (offersToRetrieve) => {
    const filtered = [];
    offersToRetrieve.forEach((offer) => {
      if (loadedOffers.indexOf(offer) === -1) {
        filtered.push(offer);
      }
    });

    return filtered;
  };

  const fetchOffers = async () => {
    const options = {
      OfferType: OFFER_TYPES.DEVICE
    };

    const offersToRetrieve = filterLoadedOffers(mapRouteToExternalOfferingTypeBySection());

    if (offersToRetrieve.length) {
      await fetchOfferExternalIdMetaData(offersToRetrieve, options);
      retrieveDecisionsForOffers(offersToRetrieve, {});

      setLoadedOffers(loadedOffers.concat(offersToRetrieve));
    }
  };

  useEffect(() => {
    clearCart();
    window.scrollTo(0, 0);

    return () => {
      clearApiFault();
    };
  }, []);

  useEffect(() => {
    clearAddresses();
    if (apiFault) {
      clearApiFault();
    }

    fetchOffers();
  }, [section]);

  const onClickFunc = () => {
    if (loadingHandler) {
      loadingHandler(true);
    }
    checkForAttributes(history.push);
  };

  const replaceAll = (string, search, replace) => {
    return string.replace(search, replace);
  };

  const renderSearchOffers = () => {
    const overlayRoot = document.getElementById('offer-summary-overlay-root');
    const hasProductsMoreInformation =
      productsMoreInformation &&
      (productsMoreInformation.table1 ||
        productsMoreInformation.description1 ||
        productsMoreInformation.table2 ||
        productsMoreInformation.description2);
    return (
      <Stack id="Shop" stackSpace="largePlus">
        <Stack stackSpace="largePlus">
          <MarketingTemplates isOffersLoaded={true} section={section} />
          {hasProductsMoreInformation && (
            <InfoBlock className="c-search-offers__offer-product-more-information">
              <Collapsible label={productsMoreInformation.button_label || t(LocaleKeys.GET_HELP.FAQ_READ_MORE)}>
                <Columns>
                  {productsMoreInformation.table1 && (
                    <TableComp.Wrapper>
                      <Markdown source={replaceAll(productsMoreInformation.table1, /<br \/>/g, '\n')} />
                    </TableComp.Wrapper>
                  )}
                  {productsMoreInformation.description1 && (
                    <Markdown source={replaceAll(productsMoreInformation.description1, /<br \/>/g, '\n')} />
                  )}
                  {productsMoreInformation.table2 && (
                    <TableComp.Wrapper>
                      <Markdown source={replaceAll(productsMoreInformation.table2, /<br \/>/g, '\n')} />
                    </TableComp.Wrapper>
                  )}
                  {productsMoreInformation.description2 && (
                    <Markdown source={replaceAll(productsMoreInformation.description2, /<br \/>/g, '\n')} />
                  )}
                </Columns>
              </Collapsible>
            </InfoBlock>
          )}
          {!displayOverlayedOfferSummary && <OfferSummaryPreview onClickFunc={onClickFunc} />}
          {displayOverlayedOfferSummary &&
              (<div className="c-search-offers__offer-summary--overlay-container">
                <OfferSummaryPreview onClickFunc={onClickFunc} className="c-search-offers__offer-summary--overlay" />
              </div>
              )}
        </Stack>
      </Stack>
    );
  };

  if (apiFault && apiFault.Code !== API_FAULT_CODES.PENDING_ACTIVATION) {
    if (loadingHandler) {
      loadingHandler(false);
    }
    return <Notice apiFault={apiFault} type="error" heading={apiFault.translatedMessage} />;
  }

  return (
    <>
      {fromLandingPage ? (
        <div className={classNames('c-search-offers c-loading-indicator-containment')}>{renderSearchOffers()}</div>
      ) : (
        <PageContent
          variant="flush"
          className={classNames('c-search-offers c-loading-indicator-containment', {
            'c-search-offers--loading': false
          })}
        >
          <MetaData title={t(LocaleKeys.META_DATA.SHOP.TITLE)} description={t(LocaleKeys.META_DATA.SHOP.DESCRIPTION)} />
          <Main isShop className={classNames('c-search-offers__main')}>
            {renderSearchOffers()}
          </Main>
        </PageContent>
      )}
    </>
  );
};

SearchOffers.displayName = 'SearchOffers';
SearchOffers.propTypes = {
  /** A fault object representing an error that occurred when fetching search offers */
  apiFault: PropTypes.object,
  /** Function will check for attributes and correctly forward the user. */
  checkForAttributes: PropTypes.func.isRequired,
  /** Func to reset api faults. */
  clearApiFault: PropTypes.func.isRequired,
  /** Func to reset cart values. */
  clearCart: PropTypes.func.isRequired,
  /**  Function to clear street address **/
  clearAddresses : PropTypes.func.isRequired,
  /** Func to reset search offer call. */
  clearSearchOffer: PropTypes.func.isRequired,
  /** Check if the external reference code is loaded */
  externalReferenceCodeIsLoaded: PropTypes.bool,
  /** Flag which determines if the offer summary preview should be overlayed */
  displayOverlayedOfferSummary: PropTypes.bool.isRequired,
  /** Boolean to determine if were on the landing page */
  fromLandingPage: PropTypes.bool,
  /** Function to get the metadata and offers */
  fetchOfferExternalIdMetaData: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Whether this is active campaign */
  isCampaign: PropTypes.bool,
  /** Loading Handler */
  loadingHandler: PropTypes.func,
  /** Function to fetch the decisions from the ROC for each of the search offers. */
  retrieveDecisionsForOffers: PropTypes.func.isRequired,
  /** ID or key of the aboutPage this came from, if any */
  section: PropTypes.string,
  /** More information for the products to be displays */
  productsMoreInformation: PropTypes.shape({
    button_label: PropTypes.string,
    table1: PropTypes.string,
    description1: PropTypes.string,
    table2: PropTypes.string,
    description2: PropTypes.string
  }),
  /** Session Id used to determine if we should fetch the cart or not. */
  session: PropTypes.string,
  /** [[IgnoreDoc]] Translate */
  t: PropTypes.func
};

export const NakedSearchOffers = SearchOffers;
export default compose(withI18n(), withRouter)(SearchOffers);
