import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import { apiFaultPropTypes } from 'selfcare-core/src/constants/api.fault.prop.types';
import { AppContext } from 'selfcare-ui/src/components/appContext/app.context';
import Cost from 'selfcare-ui/src/components/cost/cost';
import CostWithLabel from 'selfcare-ui/src/components/costWithLabel/cost.with.label';
import Heading from 'selfcare-ui/src/components/heading/heading';
import IconButton from 'selfcare-ui/src/components/iconButton/icon.button';
import { MEDIA_CONTEXT_SIZES as SIZES } from 'selfcare-ui/src/components/mediaContext/media.context.constants';
import Notice from 'selfcare-ui/src/components/notice/notice';
import IconArrowThinRight from 'selfcare-ui/src/icons/react-icons/arrow-thin-right';
import IconEquals from 'selfcare-ui/src/icons/react-icons/equals';
import IconPlus from 'selfcare-ui/src/icons/react-icons/plus';
import LocaleKeys from '../../../locales/keys';
import './offer.summary.preview.scss';

const OfferSummaryPreview = ({ apiFault, className, costList, costListTotal, isCalculatingDecisionBeingModified, onClickFunc, t }) => {
  const renderIndividualItem = (costItem, idx, arr) => {
    const displayPlus = (idx !== arr.length - 1) && arr.length > 1;
    const potentialPlus = displayPlus ? (
      <div key={`${costItem.cost}_1`} className="c-offer-summary-preview__cost-list-plus">
        <IconPlus fill="white" />
      </div>
    ) : null;
    return [
      <div className="c-offer-summary-preview__item-container" key={costItem.cost}>
        <Heading className="c-offer-summary-preview__item-label" category="minor" tone="quiet">{costItem.label}</Heading>
        <Cost cost={costItem.cost} smallerPrice />
      </div>,
      potentialPlus
    ];
  };
  return (
    <AppContext.Consumer>
      {({ media }) => {
        return (
          <>
            {apiFault && (
              <Notice apiFault={apiFault} type="error" heading={apiFault.translatedMessage} />
            )}
            <div className={classNames('c-offer-summary-preview c-loading-indicator-containment', className)}>
              <div className="c-offer-summary-preview__meta">
                <Heading category="minor" tone="quiet" className="c-offer-summary-preview__name">{t(LocaleKeys.OFFER_SUMMARY.YOUR_PENNY)}</Heading>
                <Heading category="major" tone="quiet" className="c-offer-summary-preview__summary-text">{t(LocaleKeys.OFFER_SUMMARY.OFFER_SUMMARY)}</Heading>
              </div>
              {(media.includes(SIZES.LARGE) || media.includes(SIZES.MAX)) && !apiFault && (
                <div className="c-offer-summary-preview__cost-list-wrapper">
                  <div className="c-offer-summary-preview__cost-list">
                    {costList.map((costItem, idx, arr) => {
                      return renderIndividualItem(costItem, idx, arr);
                    })}
                  </div>
                  {(costList && costList.length) ? <IconEquals className="c-offer-summary-preview__equals" /> : null}
                </div>
              )}
              <div className="c-offer-summary-preview__total">
                <Heading category="minor" tone="quiet">{t(LocaleKeys.CART_SUMMARY.TOTAL)}</Heading>
                <Heading category="major" tone="quiet">
                  {(media.includes(SIZES.LARGE) || media.includes(SIZES.MAX)) ? (
                    <CostWithLabel cost={costListTotal.total} label={costListTotal.label} alternate />
                  ) : costListTotal.mobileTotal}
                </Heading>
              </div>
              <IconButton
                onClick={onClickFunc}
                icon={<IconArrowThinRight />}
                disabled={!costList.length || isCalculatingDecisionBeingModified}
                className="c-offer-summary-preview__next-button c-offer-summary-preview__select-button"
                orientation="reversed"
              >
                {t(LocaleKeys.SHOP.START_PURCHASE)}
              </IconButton>
            </div>
          </>
        );
      }}
    </AppContext.Consumer>
  );
};

OfferSummaryPreview.displayName = 'OfferSummaryPreview';
OfferSummaryPreview.propTypes = {
  /** An error message response kicked back from an API call */
  apiFault: apiFaultPropTypes,
  className: PropTypes.string,
  /** Collection of costs and labels to be presented in a list. */
  costList: PropTypes.arrayOf(PropTypes.shape({
    cost: PropTypes.string,
    label: PropTypes.string
  })),
  costListTotal: PropTypes.shape({
    total: PropTypes.string,
    label: PropTypes.string,
    mobileTotal: PropTypes.string
  }),
  /** Flag used to determine if we are changing selected decisions and/or retrieving ROC and Calculate Order Quote. */
  isCalculatingDecisionBeingModified: PropTypes.bool.isRequired,
  onClickFunc: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default withI18n()(OfferSummaryPreview);
