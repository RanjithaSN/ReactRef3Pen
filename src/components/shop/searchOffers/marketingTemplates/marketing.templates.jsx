import { productImpressionsAnalyticFromViewData } from '@selfcare/core/analytics/product.impression.analytics';
import { MARKETING_TEMPLATES } from '@selfcare/core/redux/marketingTemplates/marketing.templates.constants';
import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import isNil from 'ramda/src/isNil';
import isEmpty from 'ramda/src/isEmpty';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import GeneralMarketingTemplate from './generalMarketingTemplate/general.marketing.template';
import ProductSelectionTemplate from './productSelectionTemplate/product.selection.template';
import { aboutPageKeyToTemplateTypes, aboutPageKeyToCampaignType, isStudentRoute } from './marketing.templates.helpers';
import LocaleKeys from '../../../../locales/keys';
import { getOptionsViewData } from '../../decision/decision.options.helper';
import { isBenifyType } from 'selfcare-core/src/redux/offeringContext/offering.context.constants';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import ZeroState from 'selfcare-ui/src/components/zeroState/zero.state';
import Stack from 'ui/components/stack/stack';
import React, { useEffect, useState, useMemo } from 'react';
import './marketing.templates.scss';

const MarketingTemplates = ({ activeCampaign,
  history,
  haveUser,
  isLoadingDecisions,
  isOffersLoaded,
  marketingTemplates,
  retrieveCodes,
  section,
  t,
  updateDecisionGroupForPurchase,
  studentSSNCheck,
  subscriberSSN,
  offeringsMetadata }) => {
  const [analyticSent, setAnalyticSent] = useState(false);

  const templatesToDisplayTypes = useMemo(() => {
    return aboutPageKeyToTemplateTypes(section, t);
  }, [section, t]);

  const templates = useMemo(() => {
    const filteredTemplates = marketingTemplates
      .filter((template) => {
        if (isBenifyType(template) || isStudentRoute(history, t) || isNil(activeCampaign)) {
          return templatesToDisplayTypes.includes(template.type);
        }
        return aboutPageKeyToCampaignType(t, section).includes(template.type);
      })
      .map((template) => {
        return {
          IsPartOfBundle: templatesToDisplayTypes.length > 1,
          ...template
        };
      });
    return filteredTemplates;
  }, [activeCampaign, marketingTemplates, templatesToDisplayTypes, section, t, history]);

  useEffect(() => {
    setAnalyticSent(false);
  }, [history, history.location, history.location.pathname]);

  useEffect(() => {
    retrieveCodes(CODES.MarketingTemplateType);
    retrieveCodes(CODES.MarketingTemplateTypeAttribute);
  }, [retrieveCodes]);

  useEffect(() => {
    let sent = false;
    templates.forEach((template) => {
      const decisionViewData = template.PrimaryDecisions ?
        getOptionsViewData(template, true, false, offeringsMetadata) :
        [];
      if (!isEmpty(decisionViewData) && !analyticSent) {
        productImpressionsAnalyticFromViewData(decisionViewData, haveUser);
        sent = true;
      }
    });
    if (sent) {
      setAnalyticSent(true);
    }
  }, [analyticSent, haveUser, templates, offeringsMetadata]);

  const updateCartOffers = async () => {
    history.push('/');
  };

  return (
    <Stack stackSpace="largePlus">
      {templates.map((template) => {
        if (template.templateName === MARKETING_TEMPLATES.PRODUCT_SELECTION) {
          return (
            <ProductSelectionTemplate
              className="c-marketingTemplates__item"
              isLoadingDecisions={false}
              template={template}
              key={template.Id}
              offersMeta={offeringsMetadata}
              updateDecisionGroupForPurchase={(options) => updateDecisionGroupForPurchase(options)
              }
              haveUser={haveUser}
              studentSSNCheck={studentSSNCheck}
              updateCartOffers={updateCartOffers}
              subscriberSSN={subscriberSSN}
              section={section}
            />
          );
        }
        if (template.templateName === MARKETING_TEMPLATES.GENERIC) {
          return (
            <GeneralMarketingTemplate
              key={template.Id}
              template={template}
              className="c-marketingTemplates__item"
            />
          );
        }
        return null;
      })}
      {isOffersLoaded && !marketingTemplates.length && (
        <ZeroState
          className="c-marketingTemplates__zero-state"
          title={t(LocaleKeys.ZERO_STATE.FILTERED.TITLE, {
            title: t(LocaleKeys.SHOP.OFFERS)
          })}
          description={t(LocaleKeys.SHOP.ZERO_STATE_DESCRIPTION)}
        />
      )}
    </Stack>
  );
};

MarketingTemplates.displayName = 'MarketingTemplates';
MarketingTemplates.propTypes = {
  /** Current active campaign */
  activeCampaign: PropTypes.object,
  /** Is the User Available */
  haveUser: PropTypes.bool,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Flag for decisions loaded so we can render the selection options in the product selection template */
  isLoadingDecisions: PropTypes.bool.isRequired,
  /** Flag for offers loaded so we can format the marketing templates. */
  isOffersLoaded: PropTypes.bool.isRequired,
  /** Formatted marketing templates based on the corresponding offers. */
  marketingTemplates: PropTypes.arrayOf(
    PropTypes.shape({
      Id: PropTypes.string.isRequired,
      templateName: PropTypes.string
    })
  ),
  /** Function to update quantity for decision groups */
  updateDecisionGroupForPurchase: PropTypes.func.isRequired,
  /** Function to perform the ssn student validation */
  studentSSNCheck: PropTypes.func.isRequired,
  /** Func to retrieve code for marketing template. */
  retrieveCodes: PropTypes.func.isRequired,
  /** ID or key of the aboutPage this came from, if any */
  section: PropTypes.string,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Offerings metadata */
  offeringsMetadata: PropTypes.object.isRequired
};
MarketingTemplates.defaultProps = {
  marketingTemplates: []
};
export default compose(withI18n(), withRouter)(MarketingTemplates);
