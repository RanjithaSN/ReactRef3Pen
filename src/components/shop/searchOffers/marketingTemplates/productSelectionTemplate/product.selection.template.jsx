import LocaleKeys from '../../../../../locales/keys';
import EligibilityModal from '../../../../eligibilityModal/eligibility.modal.contextual';
import { getOptionsViewData } from '../../../decision/decision.options.helper';
import {
  isBroadbandType,
  isMobileType
} from 'selfcare-core/src/redux/offeringContext/offering.context.constants';
import CardSelection from 'selfcare-ui/src/components/cardSelection/card.selection';
import UnorderedList from 'selfcare-ui/src/components/unorderedList/unordered.list';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import path from 'ramda/src/path';
import { isStudentRoute } from '../../../../../hooks/storefrontModeHooks/storefront.mode.helpers';
import React, { useState, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router';
import { withI18n } from 'react-i18next';
import './product.selection.template.scss';
import InvalidStudentSSNModal from '../../../../invalidStudentSSNModal/invalid.student.ssn.modal';

const BENIFY_TYPE = 'BenefyDeals_Mobil';

const chooseHeaderText = (template, t) => {
  const isBroadband = isBroadbandType(template);

  if (template.IsPartOfBundle && isBroadband) {
    return t(LocaleKeys.SHOP.CUSTOMIZE_BROADBAND_BUNDLE);
  }

  if (template.IsPartOfBundle) {
    return t(LocaleKeys.SHOP.CUSTOMIZE_MOBILE_BUNDLE);
  }

  if (template.type === BENIFY_TYPE) {
    return t(LocaleKeys.SHOP.CUSTOMIZE_BENIFYDEALS);
  }

  return t(LocaleKeys.SHOP.CUSTOMIZE_GENERIC);
};

const ProductSelectionTemplate = ({ className,
  haveUser,
  isLoadingDecisions,
  template,
  t,
  updateDecisionGroupForPurchase,
  studentSSNCheck,
  updateCartOffers,
  subscriberSSN,
  offersMeta,
  section }) => {
  const [forceEligibilityModal, setForceEligibilityModal] = useState(false);
  const [deselectCard, setDeselectCard] = useState(false);
  const [
    forceCardSelectiontoDefault,
    setForceCardSelectiontoDefault
  ] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const { pathname } = useLocation();

  const isBroadband = useMemo(() => isBroadbandType(template), [template]);

  const successfullySubmittedAction = (submitted) => {
    setSelectedOptionIndex(submitted ? selectedOptionIndex : null);
    setForceCardSelectiontoDefault(
      forceCardSelectiontoDefault + (submitted ? 0 : 1)
    );
    setSuccessfullySubmitted(submitted);
    setForceEligibilityModal(false);
  };

  const isPurchaseNew = true;
  const decisionViewData = useMemo(() => {
    return template.PrimaryDecisions ?
      getOptionsViewData(template, isPurchaseNew, false, offersMeta) :
      [];
  }, [template, offersMeta, isPurchaseNew]);

  const cards = decisionViewData.map((viewData) => {
    const { sizeDisplayData } = viewData;
    return {
      ...viewData,
      cardHeader: (
        <div>
          <div>{sizeDisplayData.name}</div>
        </div>
      ),
      action: t(LocaleKeys.ADD),
      cardFooter: (
        <UnorderedList
          variant="condensed"
          list={sizeDisplayData.uspListItems}
        />
      )
    };
  });

  const updateDecisionForOffer = useCallback(
    (optionId, isDeselect) => {
      if (isBroadband && !successfullySubmitted) {
        const index = decisionViewData.findIndex(
          (item) => item.id === optionId
        );
        setForceEligibilityModal(index !== -1);
        setSelectedOptionIndex(index === -1 ? null : index);
      } else {
        const item = isBroadband ?
          decisionViewData.find(({ id }) => id === optionId) :
          undefined;

        const options = {
          decisionId: template.PrimaryDecisions.Id,
          optionId,
          offeringId: item ?
            path(['feasibilityOffer', 'offerid'], item) :
            template.Id,
          offeringInstanceId: item ?
            path(['feasibilityOffer', 'offerid'], item) :
            template.Id,
          isDeselect,
          isMobile: isMobileType(template),
          serviceId: path(['feasibilityOffer', 'serviceid'], item)
        };
        updateDecisionGroupForPurchase(options);
        setDeselectCard(isDeselect);
      }
    },
    [
      successfullySubmitted,
      template,
      updateDecisionGroupForPurchase,
      setForceEligibilityModal,
      setSelectedOptionIndex,
      decisionViewData,
      isBroadband
    ]
  );

  const isStudentAndLoggedIn = async (optionId, isDeselect) => {
    if (isStudentRoute(pathname, t) && haveUser && subscriberSSN) {
      const showInvalidStudentModal = await studentSSNCheck();
      if (showInvalidStudentModal) {
        setshowModal(showInvalidStudentModal);
      } else {
        updateDecisionForOffer(optionId, isDeselect);
      }
    } else {
      updateDecisionForOffer(optionId, isDeselect);
    }
  };

  const onClose = () => {
    setForceEligibilityModal(false);
    setSelectedOptionIndex(null);
  };

  const closeModal = () => {
    setshowModal(false);
  };

  return (
    <div className={classNames('c-product-selection-template', className)}>
      <InvalidStudentSSNModal isOpen={showModal} closeModal={closeModal} updateOffers={updateCartOffers} />
      <CardSelection
        headerText={
          template.IsPartOfBundle ? chooseHeaderText(template, t) : null
        }
        isMarketingTemplate
        headerDescription={template.OfferDescription}
        requiredAction={
          isBroadband && (
            <EligibilityModal
              className="c-product-selection-template__eligibility"
              onClose={onClose}
              forceLaunch={forceEligibilityModal}
              deselectCard={deselectCard}
              autoLaunchDismissed
              hasSubmitted={(submitted) => successfullySubmittedAction(submitted)
              } 
            />
          )
        }
        unSelectAction={t(LocaleKeys.CART.REMOVE)}
        submittedAction={successfullySubmitted}
        cards={cards}
        zeroState={t(LocaleKeys.ELIGIBILITY.ZERO_STATE)}
        haveUser={haveUser}
        isLoadingCards={isLoadingDecisions}
        onChange={isStudentAndLoggedIn}
        forceBackToDefault={forceCardSelectiontoDefault}
        section={section}
        defaultSelectedId={
          selectedOptionIndex !== null &&
            decisionViewData.length &&
            !forceEligibilityModal ?
            decisionViewData[selectedOptionIndex].id :
            null
        }
      />
    </div>
  );
};

ProductSelectionTemplate.displayName = 'ProductSelectionTemplate';
ProductSelectionTemplate.propTypes = {
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Is User Available */
  haveUser: PropTypes.bool,
  /** Flag for decisions loaded so we can render the selection options in the product selection template */
  isLoadingDecisions: PropTypes.bool.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Template to base the display off of */
  template: PropTypes.shape({
    /** currency of offer */
    CurrencyCode: PropTypes.string,
    /** id of template */
    Id: PropTypes.string,
    /** Whether the template is part of a bundle or not. */
    IsPartOfBundle: PropTypes.bool,
    /** language of offer */
    Language: PropTypes.string,
    /** Function to perform the student ssn check */
    studentSSNCheck: PropTypes.func,
    /** Function to update the cart offers */
    updateCartOffers: PropTypes.func,
    /** line of business */
    LineOfBusinesses: PropTypes.arrayOf(PropTypes.number),
    /** offer description */
    OfferDescription: PropTypes.string,
    /** display name of offer */
    OfferName: PropTypes.string,
    PreferenceLocale: PropTypes.string,
    /** non required decisions on an offer */
    PrimaryDecisions: PropTypes.shape({
      Id: PropTypes.string.isRequired,
      Options: PropTypes.arrayOf(
        PropTypes.shape({
          BillerRuleInstanceAmounts: PropTypes.array,
          Id: PropTypes.string,
          Name: PropTypes.string,
          Quantity: PropTypes.number
        })
      )
    }),
    /** Thumbnail Url to render image */
    ThumbnailUrl: PropTypes.string,
    /** The type of this template */
    type: PropTypes.string
  }),
  /** Function used to updated decision and return relevant information */
  updateDecisionGroupForPurchase: PropTypes.func.isRequired,
  /** Offer metadata */
  offersMeta: PropTypes.object.isRequired
};

export default withI18n()(ProductSelectionTemplate);
