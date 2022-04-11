import PropTypes from 'prop-types';
import qs from 'query-string';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import { apiFaultPropTypes } from 'selfcare-core/src/constants/api.fault.prop.types';
import { AppContext } from 'selfcare-ui/src/components/appContext/app.context';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import { MEDIA_CONTEXT_SIZES } from 'selfcare-ui/src/components/mediaContext/media.context.constants';
import Notice from 'selfcare-ui/src/components/notice/notice';
import ZeroState from 'selfcare-ui/src/components/zeroState/zero.state';
import LocaleKeys from '../../../locales/keys';
import { getAddPaymentMethodNavItem, getEditPaymentMethodNavItem, getPaymentMethodsNavItem } from '../../../navigation/sitemap.selectors';
import PageContent, { Main } from '../../pageContent/page.content';
import './payment.methods.scss';
import PaymentMethod from './paymentMethod/payment.method.contextual';

class PaymentMethods extends React.Component {
  async componentDidMount() {
    const queryParams = qs.parse(this.props.location.search, {
      decode: false
    });
    const decodedParams = {
      MD: decodeURIComponent(queryParams.MD),
      PaRes: decodeURIComponent(queryParams.PaRes)
    };
    if (queryParams && queryParams.MD === this.props.current3DS1MDValue) {
      this.props.history.push(getPaymentMethodsNavItem().url);
      this.props.submit3DS1FinalRequest(decodedParams);
    }
  }

    showAddForm = () => {
      const { history } = this.props;
      history.push(getAddPaymentMethodNavItem().url);
    };

    showEditForm = (paymentMethodId) => {
      const { history } = this.props;
      history.push(`${getEditPaymentMethodNavItem().url}/${paymentMethodId}`);
    };

    render() {
      const { apiFault, isWalletLoading, paymentMethods, t } = this.props;
      const callToAction = (buttonWidth) => (
        <FilledButton
          width={buttonWidth}
          className="c-payment-methods__add-new-button"
          onClick={() => this.showAddForm()}
        >
          {t(LocaleKeys.PAYMENT_METHODS.ADD_NEW)}
        </FilledButton>
      );

      return (
        <AppContext.Consumer>
          {({ media }) => {
            const buttonWidth = media.includes(MEDIA_CONTEXT_SIZES.NOTSMALL) ? 'auto' : 'full';

            return (
              <PageContent className="c-payment-methods c-loading-indicator-containment">
                <LoadingIndicator isLoading={isWalletLoading} />
                <Main>
                  {apiFault && (
                    <div className="c-payment-information__notification">
                      <Notice
                        apiFault={this.props.apiFault}
                        type="error"
                        heading={apiFault.translatedMessage}
                      />
                    </div>
                  )}
                  {!isWalletLoading && !paymentMethods.length && (
                    <ZeroState
                      className="c-payment-methods__zero-state"
                      description={t(LocaleKeys.PAYMENT_METHODS.ZERO_STATE_DESCRIPTION)}
                      title={t(LocaleKeys.ZERO_STATE.EMPTY.TITLE, {
                        title: t(LocaleKeys.NAVIGATOR.PAYMENT_METHODS)
                      })}
                      callToAction={callToAction(buttonWidth)}
                    />
                  )}
                  {Boolean(paymentMethods.length) && (
                    <React.Fragment>
                      <Heading category="brand">{t(LocaleKeys.PAYMENT_METHODS.YOUR_PAYMENT_METHODS)}</Heading>
                      <div className="c-payment-methods__list">
                        {Boolean(paymentMethods.length) && paymentMethods.map((paymentMethod) => (
                          <div key={paymentMethod.Id} className="c-payment-methods__item">
                            <PaymentMethod
                              paymentMethod={paymentMethod}
                              onShowEditForm={this.showEditForm}
                            />
                          </div>
                        ))}
                      </div>
                      {Boolean(paymentMethods.length) && callToAction(buttonWidth)}
                    </React.Fragment>
                  )}
                </Main>
              </PageContent>
            );
          }}
        </AppContext.Consumer>
      );
    }
}

PaymentMethods.displayName = 'PaymentMethods';
PaymentMethods.propTypes = {
  /** Application fault */
  apiFault: apiFaultPropTypes,
  /** Stored 3DS MD Value */
  current3DS1MDValue: PropTypes.string,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Whether the subscriber's wallet is loading */
  isWalletLoading: PropTypes.bool.isRequired,
  /** The location object provided by the router */
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
    pathname: PropTypes.string
  }),
  /** Payment methods */
  paymentMethods: PropTypes.arrayOf(PropTypes.shape({
    Id: PropTypes.number.isRequired,
    Name: PropTypes.string.isRequired,
    ECheck: PropTypes.shape({
      AccountNumber: PropTypes.string.isRequired,
      RoutingNumber: PropTypes.string.isRequired
    }),
    CreditCard: PropTypes.shape({
      AccountNumber: PropTypes.string.isRequired,
      ExpirationMonth: PropTypes.string.isRequired,
      ExpirationYear: PropTypes.string.isRequired,
      Type: PropTypes.number.isRequired
    })
  })).isRequired,
  /** Function to perform the challenge request/response for 3DS1 */
  submit3DS1FinalRequest: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default compose(
  withI18n(),
  withRouter
)(PaymentMethods);
