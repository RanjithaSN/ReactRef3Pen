import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import React from 'react';
import { withI18n } from 'react-i18next';
import { Redirect, withRouter } from 'react-router';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import OutlineButton from 'selfcare-ui/src/components/button/outline.button';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import LocaleKeys from '../../../locales/keys';
import { getNotFoundNavItem } from '../../../navigation/sitemap.selectors';
import PageContent from '../../pageContent/page.content';
import { checkToSeeIfProductIsEditable, navigateToProducts } from './manage.product.helper';
import './manage.product.scss';

class ManageProduct extends React.Component {
    state = {
      mode: path(['params', 'mode'], this.props.match),
      showConfirmation: false
    };

    async componentDidMount() {
      const { history, match, searchSupportRequest, selectedProduct, setActiveOfferIds, t } = this.props;
      const mode = path(['params', 'mode'], match);

      if (!mode || !selectedProduct.offeringInstanceId) {
        navigateToProducts(history);
      }
      checkToSeeIfProductIsEditable(selectedProduct, history, t);

      await searchSupportRequest();

      if (selectedProduct) {
        await setActiveOfferIds(selectedProduct.offeringId, selectedProduct.offeringInstanceId);
      }

      this.props.clearOrderData();

      if (!this.props.isAccountDetailsLoaded && !this.props.isAccountDetailsLoading) {
        this.props.retrieveAccountDetails();
      }
    }

    componentDidUpdate(prevProps) {
      if (path(['billing', 'unformattedNextChargeDate'], prevProps.selectedProduct) !== path(['billing', 'unformattedNextChargeDate'], this.props.selectedProduct)) {
        checkToSeeIfProductIsEditable(this.props.selectedProduct, this.props.history, this.props.t);
      }
    }

    componentWillUnmount() {
      this.props.clearOrderData();
    }

    render() {
      const { history, isHandlingProductAction, t } = this.props;

      const setupContentBasedOnMode = () => {
        switch (this.state.mode) {
        default:
          return null;
        }
      };
      const contentToUse = setupContentBasedOnMode();

      return contentToUse ? (
        <PageContent>
          <div className={classNames('c-manage-product c-loading-indicator-containment', this.props.className)}>
            <LoadingIndicator isLoading={isHandlingProductAction} />
            <Heading category="brand" tone="normal">
              {contentToUse.heading}
            </Heading>
            {!this.state.showConfirmation && (
              <React.Fragment>
                <div>{contentToUse.primaryContent}</div>
                <div className="c-manage-product__actions">
                  {contentToUse.primaryAction && (
                    <div className="c-manage-product__button-actions">
                      <OutlineButton className="c-manage-product__primary-action c-button-double" onClick={() => navigateToProducts(history)}>{t(LocaleKeys.CANCEL)}</OutlineButton>
                      <FilledButton
                        className="c-manage-product__primary-action c-button-double"
                        onClick={contentToUse.primaryAction}
                      >
                        {contentToUse.primaryActionLabel}
                      </FilledButton>
                    </div>
                  )}
                </div>
              </React.Fragment>
            )}
            {this.state.showConfirmation && contentToUse.confirmationContent}
          </div>
        </PageContent>
      ) : (
        <Redirect to={getNotFoundNavItem().url} />
      );
    }
}

ManageProduct.displayName = 'ManageProduct';

ManageProduct.propTypes = {
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Function used to clear order data. */
  clearOrderData: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  isAccountDetailsLoaded: PropTypes.bool,
  isAccountDetailsLoading: PropTypes.bool,
  /** Flag for when a product action is being utilized and the loading indicator should be triggered. */
  isHandlingProductAction: PropTypes.bool.isRequired,
  /** The location object provided by the router */
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  /** [[IgnoreDoc]] Function to get the url params */
  match: PropTypes.object,
  retrieveAccountDetails: PropTypes.func.isRequired,
  /** Function used to retrieve search requests to start to determine a port's state. */
  searchSupportRequest: PropTypes.func.isRequired,
  /** Selected product to perform actions against. */
  selectedProduct: PropTypes.shape({
    /** Offering Id */
    offeringId: PropTypes.string,
    /** Offering Instance Id */
    offeringInstanceId: PropTypes.string,
    /** Display Name */
    displayName: PropTypes.string,
    /** Flag to determine if a use can opt out of the renewal at the end of the billing cycle. */
    canOptOutOnRenew: PropTypes.bool,
    /** Currency Code */
    currencyCode: PropTypes.string,
    /** Billing object on the offer */
    billing: PropTypes.shape({
      /** Next charge date for the offer */
      nextChargeDate: PropTypes.string
    }),
    /** Bool for product having first usage */
    hasFirstUsage: PropTypes.bool,
    /** The selected option Id on the primary decision. */
    hasPrimaryOption: PropTypes.string,
    /** Bool for product being broadband */
    isBroadband: PropTypes.bool,
    /** Bool for product being penny play */
    isPennyPlay: PropTypes.bool,
    /** Flag to tell us if the product is wireless */
    isWireless: PropTypes.bool,
    /** Marketing Template object to be used to render upgrade /downgrade */
    marketingTemplate: PropTypes.shape({}),
    /** Options */
    options: PropTypes.array,
    /** Right to Return */
    rightToReturn: PropTypes.bool,
    /** Service Identifier for the product. Also called the phone number. */
    serviceIdentifier: PropTypes.string
  }),
  /** Action used to set the offer id and offering instance id. */
  setActiveOfferIds: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default compose(
  withI18n(),
  withRouter
)(ManageProduct);
