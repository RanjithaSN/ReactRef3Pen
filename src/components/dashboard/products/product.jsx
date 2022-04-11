import { displayDate } from '@selfcare/core/helpers/date.helper';
import { OFFERING_OVERALL_STATUS } from '@selfcare/core/redux/subscriberOfferings/subscriber.offering.constants';
import { SUPPORT_REQUEST_STATUS } from '@selfcare/core/redux/supportRequest/support.request.constants';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import React, { useState } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import AmountWithLabel from 'selfcare-ui/src/components/amountWithLabel/amount.with.label';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import { CardBody } from 'selfcare-ui/src/components/cardSelection/card.selection.card';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Number from 'selfcare-ui/src/components/number/number';
import StatusIndicator from 'selfcare-ui/src/components/statusIndicator/status.indicator';
import { STATUS_TYPES } from 'selfcare-ui/src/components/statusIndicator/status.indicator.constants';
import LocaleKeys from '../../../locales/keys';
import { getProductsNavItem } from '../../../navigation/sitemap.selectors';
import ActivateProductModal from '../../products/activateProductModal/activate.product.modal.contextual';
import { getLocaleToUseForStatusIndicator } from '../../products/product.helper';
import './product.scss';


const Product = ({ getActivationRequestForProduct, history, inSweden, offering, locale, paymentFailure, t, usage }) => {
  const { displayName, offeringId, offeringInstanceId, displayServiceIdentifier, status, isBroadband, isPennyPlay, isWireless, isBenify, planName, primaryOptionDisplayInfo } = offering;

  const offerPageUrl = `${getProductsNavItem().url}/${offeringId}-${offeringInstanceId}`;
  const offerIsActive = OFFERING_OVERALL_STATUS.ACTIVE === status;

  const newActivationRequest = getActivationRequestForProduct(offering, SUPPORT_REQUEST_STATUS.NEW);
  const pendingActivationRequest = getActivationRequestForProduct(offering, SUPPORT_REQUEST_STATUS.OPEN);
  const activationRequest = pendingActivationRequest || newActivationRequest;

  const activationRequestId = path(['Id', 'Value'], activationRequest);
  const activationStarted = Boolean(pathOr([], ['customCaseDetails'], activationRequest).filter((detail) => {
    return detail.Name === 'ResponseMSG' && detail.Value === 'PROVISIONINGHASSTARTED';
  }).length > 0);
  const [activated, setActivated] = useState(false);
  const [activationModalOpen, setActivationModalOpen] = useState(false);

  const getCardHeader = () => {
    if (isBroadband) {
      return planName;
    } if (isWireless) {
      return displayServiceIdentifier;
    } if (isPennyPlay) {
      return t(LocaleKeys.PLANS_AND_SERVICES.PLAN.PENNY_PLAY.TITLE);
    }
  };

  const broadbandBalanceSection = () => (
    <div className="c-product__balance">
      <Heading category="brand">
        {t(LocaleKeys.PLANS_AND_SERVICES.PLAN.CURRENT_SPEED)}
      </Heading>
      <Heading category="brand" className="c-product__balance-amount">
        <span className="c-product__arrow">
                    &#8599;
        </span>
        <span>{primaryOptionDisplayInfo.uploadSpeed}</span>
      </Heading>
      <Heading category="brand" className="c-product__balance-amount">
        <span className="c-product__arrow">
                    &#8600;
        </span>
        <span>{primaryOptionDisplayInfo.downloadSpeed}</span>
      </Heading>
    </div>
  );

  const wirelessBalanceSection = () => (
    <div className="c-product__balance">
      <Heading category="brand">
        {t(LocaleKeys.PLANS_AND_SERVICES.PLAN.DATA)}
        <br />
        {t(LocaleKeys.PLANS_AND_SERVICES.PLAN.REMAINING)}
      </Heading>
      <AmountWithLabel
        amount={(
          <span className="c-product__balance-amount">
            <span className="c-product__arrow">
              &#8594;
            </span>
            <Number
              value={inSweden ? (path(['totalMonthlyDataRemaining'], usage) * 1 + path(['totalRolloverData'], usage) * 1) : (path(['totalRoamingDataRemaining'], usage) * 1) || 0}
              locale={locale}
            />
            {inSweden ? path(['monthlyDataUnitOfMeasure'], usage) : path(['roamingDataUnitOfMeasure'], usage)}
          </span>
        )}
      />
    </div>
  );

  const pennyPlayBalanceSection = () => (
    <div className="c-product__balance">
      <Heading category="brand" className="c-product__balance-amount">
        {t(LocaleKeys.PLANS_AND_SERVICES.PLAN.PENNY_PLAY.HEADER_LINE_1)}
        <br />
        {t(LocaleKeys.PLANS_AND_SERVICES.PLAN.PENNY_PLAY.HEADER_LINE_2)}
      </Heading>
    </div>
  );

  const renderStatusMessage = () => (
    <>
      {!offering.hasFirstUsage && offering.billing.nextChargeDate && offerIsActive && (
        <StatusIndicator className="c-product__status" type={STATUS_TYPES.OFFERING} value={status} customLabel={t(LocaleKeys.PRODUCTS.STATUS.PENDING_FIRST_USAGE)} />
      )}
      {!offering.hasFirstUsage && !offering.billing.nextChargeDate && activationStarted && offerIsActive && (
        <StatusIndicator className="c-product__status" type={STATUS_TYPES.OFFERING} value={status} customLabel={t(LocaleKeys.PRODUCTS.STATUS.PENDING_ACTIVATION)} />
      )}
      <div className="c-product__atribute-section">
        {paymentFailure && (
          <Heading category="major" tone="quiet" className="c-product__attribute-item">{t(LocaleKeys.PRODUCTS.PAYMENT.FAILED_PAYMENT)}</Heading>
        )}
        {!offerIsActive && (
          !getLocaleToUseForStatusIndicator(offering) ?
            (
              <Heading category="minor" tone="quiet" className="c-product__attribute-item">
                {
                  t(LocaleKeys.PLANS_AND_SERVICES.PLAN.FUTURE_ACTIVATION_DATE, {
                    activationDate: displayDate(offering.futureActivationDate, t)
                  })
                }
              </Heading>
            ) : (
              <StatusIndicator className="c-product__status" type={STATUS_TYPES.OFFERING} value={status} customLabel={getLocaleToUseForStatusIndicator(offering)} />
            )
        )}
      </div>
    </>

  );
  return (
    <div className="c-product">
      <div className="c-product__selection-card" >
        <CardBody className="c-product__body" onClick={() => history.push(offerPageUrl)}>
          <div className="c-product__attribute">
            <div className="c-product__balance-section">
              <Heading category="minor" tone="normal" className="c-product__identifier">{getCardHeader()}</Heading>
              {isBroadband && broadbandBalanceSection()}
              {(isWireless || isBenify) && wirelessBalanceSection()}
              {isPennyPlay && pennyPlayBalanceSection()}
            </div>
            <div className="c-product__atribute-section">
              <Heading category="major" tone="quiet" className="c-product__attribute-item">{isPennyPlay ? t(LocaleKeys.PLANS_AND_SERVICES.PLAN.PENNY_PLAY.CATEGORY) : displayName}</Heading>
              {((offering.hasFirstUsage && offering.billing.nextChargeDate && offerIsActive) || isPennyPlay) && (
                <Heading category="minor" tone="quiet" className="c-product__attribute-item">
                  {
                    t(LocaleKeys.PLANS_AND_SERVICES.PLAN.RENEW_DATE, {
                      date: offering.billing.nextChargeDate
                    })
                  }
                </Heading>
              )}
              {!isPennyPlay && renderStatusMessage()}
            </div>
          </div>
        </CardBody>
      </div>
      {isBroadband && !activationStarted && !activated && offerIsActive && activationRequestId && (
        <>
          <FilledButton width="full" onClick={() => setActivationModalOpen(true)}>
            {t(LocaleKeys.PRODUCTS.BILLING.ACTIVATE)}
          </FilledButton>
          {activationModalOpen && (
            <ActivateProductModal
              activationRequestId={activationRequestId}
              onClose={() => setActivationModalOpen(false)}
              onActivate={() => setActivated(true)}
            />
          )}
        </>
      )}
    </div>
  );
};

Product.displayName = 'Product';
Product.propTypes = {
  /** Gets the support request case for the given product */
  getActivationRequestForProduct: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** True if user's current location is Sweden. */
  inSweden: PropTypes.bool,
  /** Use correct locale to display plan */
  locale: PropTypes.string.isRequired,
  /** offering to in a plan */
  offering: PropTypes.shape({
    /** billing object on the offering */
    billing: PropTypes.shape({
      /** Next charge date for  */
      nextChargeDate: PropTypes.string
    }),
    /** The display name of the plan */
    displayName: PropTypes.string,
    /** Activation date for pending active products */
    futureActivationDate: PropTypes.string,
    /** Boolean to determine if the plan has first usage yet */
    hasFirstUsage: PropTypes.bool,
    /** Boolean to determine if a plan is broadband */
    isBroadband: PropTypes.bool.isRequired,
    /** Boolean to determine if a plan is penny play */
    isPennyPlay: PropTypes.bool.isRequired,
    /** Boolean to determine if a plan is wireless */
    isWireless: PropTypes.bool.isRequired,
    /** Broadband planName */
    planName: PropTypes.string,
    /** Primary option display info */
    primaryOptionDisplayInfo: PropTypes.shape({
      /** download speed */
      downloadSpeed: PropTypes.string,
      /** upload speed */
      uploadSpeed: PropTypes.string
    }),
    /** The id of the plan */
    offeringId: PropTypes.string.isRequired,
    /** The instance id of the plan */
    offeringInstanceId: PropTypes.string.isRequired,
    /** The name of the plan */
    name: PropTypes.string,
    /** Formatted service identifier for the product */
    displayServiceIdentifier: PropTypes.string,
    /** The status of the plan */
    status: PropTypes.number.isRequired
  }).isRequired,
  /** Returns the case object for a failed payment on the selected product */
  paymentFailure: PropTypes.shape({
    /** The payment failure case id */
    caseId: PropTypes.string,
    /** The current subscriber id */
    subscriberId: PropTypes.number
  }),
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Usage for this product. */
  usage: PropTypes.shape({
    /** The balance of available usage for the current billing period. */
    totalMonthlyDataRemaining: PropTypes.number,
    /** Unit for the balance value. */
    monthlyDataUnitOfMeasure: PropTypes.string,
    /** Amount of current roaming remaining data */
    totalRoamingDataRemaining: PropTypes.number,
    /** Unit of measure for roaming data */
    roamingDataUnitOfMeasure: PropTypes.string,
    /** Amount of current roll-over remaining data */
    totalRolloverData: PropTypes.number
  })
};

export default compose(
  withI18n(),
  withRouter
)(Product);
