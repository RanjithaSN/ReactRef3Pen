import { CROSS_SELL_SUGGESTION } from './cross.sell.constants';
import LocaleKeys from '../../locales/keys';
import {
  getAboutBroadbandNavItem,
  getAboutMobileNavItem,
  getAboutPennyPlayNavItem
} from '../../navigation/sitemap.selectors';
import Heading from 'selfcare-ui/src/components/heading/heading';
import OutlineButton from 'selfcare-ui/src/components/button/outline.button';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React, { useCallback } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import './cross.sell.scss';

const CrossSell = ({
  className,
  crossSellProducts,
  history,
  t,
  purchasePlay
}) => {
  const historyPushAction = useCallback(
    (url) => {
      return () => history.push(url);
    },
    [history]
  );

  const purchasePlayAction = useCallback(() => {
    purchasePlay(history.push);
  }, [purchasePlay, history.push]);

  const suggestionFromKey = useCallback((key) => {
    switch (key) {
    case CROSS_SELL_SUGGESTION.ADD_BROADBAND:
      return {
        heading: t(LocaleKeys.CROSS_SELL.ADD_BROADBAND_HEADING),
        description: t(LocaleKeys.CROSS_SELL.ADD_BROADBAND_DESCRIPTION),
        actionLabel: t(LocaleKeys.CROSS_SELL.ADD_BROADBAND_ACTION_LABEL),
        action: historyPushAction(getAboutBroadbandNavItem().url),
        color: 'red'
      };
    case CROSS_SELL_SUGGESTION.ADD_MOBILE:
      return {
        heading: t(LocaleKeys.CROSS_SELL.ADD_MOBILE_HEADING),
        description: t(LocaleKeys.CROSS_SELL.ADD_MOBILE_DESCRIPTION),
        actionLabel: t(LocaleKeys.CROSS_SELL.ADD_MOBILE_ACTION_LABEL),
        action: historyPushAction(getAboutMobileNavItem().url),
        color: 'red'
      };
    case CROSS_SELL_SUGGESTION.ADD_MORE_MOBILE:
      return {
        heading: t(LocaleKeys.CROSS_SELL.ADD_MORE_MOBILE_HEADING),
        description: t(LocaleKeys.CROSS_SELL.ADD_MORE_MOBILE_DESCRIPTION),
        actionLabel: t(LocaleKeys.CROSS_SELL.ADD_MORE_MOBILE_ACTION_LABEL),
        action: historyPushAction(getAboutMobileNavItem().url),
        color: 'red'
      };
    case CROSS_SELL_SUGGESTION.ADD_PENNY_PLAY:
      return {
        heading: t(LocaleKeys.CROSS_SELL.ADD_PENNY_PLAY_HEADING),
        description: t(LocaleKeys.CROSS_SELL.ADD_PENNY_PLAY_DESCRIPTION),
        actionLabel: t(LocaleKeys.CROSS_SELL.ADD_PENNY_PLAY_ACTION_LABEL),
        action: historyPushAction(getAboutPennyPlayNavItem().url),
        color: 'black'
      };
    case CROSS_SELL_SUGGESTION.REACTIVATE_PENNY_PLAY:
      return {
        heading: t(LocaleKeys.CROSS_SELL.REACTIVATE_PENNY_PLAY_HEADING),
        description: t(
          LocaleKeys.CROSS_SELL.REACTIVATE_PENNY_PLAY_DESCRIPTION
        ),
        actionLabel: t(
          LocaleKeys.CROSS_SELL.REACTIVATE_PENNY_PLAY_ACTION_LABEL
        ),
        action: purchasePlayAction,
        color: 'red'
      };
    default:
      return {};
    }
  }, [historyPushAction, purchasePlayAction, t]);

  return crossSellProducts.map((crossSellProduct) => {
    const suggestion = suggestionFromKey(crossSellProduct);
    return (
      <div
        className={classNames(
          'c-cross-sell',
          `c-cross-sell-${suggestion.color}`,
          className
        )}
        key={crossSellProduct}
      >
        <Heading category="brand" tone="normal">
          {suggestion.heading}
        </Heading>
        <Paragraph className="c-cross-sell__description">
          {suggestion.description}
        </Paragraph>
        <OutlineButton
          variant="inverted"
          className={classNames(
            'c-cross-sell__action',
            `c-cross-sell-${suggestion.color}-hover-effect`,
            className
          )}
          onClick={suggestion.action}
        >
          {suggestion.actionLabel}
        </OutlineButton>
      </div>
    );
  });
};

CrossSell.displayName = 'CrossSell';
CrossSell.propTypes = {
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** The keys to use to determine which content to display for cross sell */
  crossSellProducts: PropTypes.arrayOf(PropTypes.string),
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Allows user to start the shop flow to purchase play. */
  purchasePlay: PropTypes.func.isRequired
};

export default compose(withI18n(), withRouter)(CrossSell);
