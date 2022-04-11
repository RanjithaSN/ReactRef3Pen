/* eslint-disable import/no-unresolved */
import Checkbox from '@selfcare/ui/components/checkbox/checkbox';
import Link from '@selfcare/ui/components/link/link';
import Heading from '@selfcare/ui/components/heading/heading';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import LocaleKeys from '../../../locales/keys';
import { withI18n } from 'react-i18next';
import axios from 'axios';
import compose from 'ramda/src/compose';
import ConsentModal from '../../consentModal/consent.modal';
const PrivacyPolicy = '/static/privacy_policy.json';
const RightToRegret = '/static/right_to_regret.json';
const Terms = '/static/terms.json';

const CheckoutConsent = ({ consentAcknowledged, consentArray, onAcknowledge, t }) => {
  const [consentModalAgreement, setConsentModalAgreement] = useState('');
  const [consentModalHeading, setConsentModalHeading] = useState('');
  const [isConsentModalOpen, setConsentModalOpen] = useState(false);

  const loadConsentContent = (contentPath) => {
    return axios.get(contentPath);
  };

  const openConsentModal = async (consent) => {
    const { data } = await loadConsentContent(consent);
    const { title, policy } = data;

    setConsentModalOpen(true);
    setConsentModalAgreement(policy.join('\n\n'));
    setConsentModalHeading(title);
  };

  const closeConsentModal = () => {
    setConsentModalOpen(false);
    setConsentModalAgreement('');
    setConsentModalHeading('');
  };

  const onAcknowledgeChanged = (e, consentType) => {
    const accepted = e.target.checked;
    if (onAcknowledge) {
      onAcknowledge(consentType, accepted);
    }
  };
  return (
    <div className="c-checkout__section">
      {consentArray.map((consent) => {
        const error = consentAcknowledged[consent.type].error;
        return (
          <React.Fragment key={consent.type}>
            <Checkbox
              checked={consentAcknowledged[consent.type].accepted}
              id={consent.type}
              onChange={(e) => onAcknowledgeChanged(e, consent.type)}
              error={error}
            >
              <Heading className="c-checkout__section-header" category="minor" tone="quiet">
                {consent.isGDPRConsent ? (
                  <div>
                    {`${t(LocaleKeys.ORDERING.GDPR_CONSENT_1)} `}
                    <Link onClick={() => openConsentModal(PrivacyPolicy)}>
                      {t(LocaleKeys.ORDERING.GDPR_CONSENT_2_LINK)}
                    </Link>
                    {`  ${t(LocaleKeys.ORDERING.GDPR_CONSENT_3)}`}
                  </div>
                ) : (
                  <div>
                    {`${t(LocaleKeys.ORDERING.GENERAL_CONSENT_1)} `}
                    <Link onClick={() => openConsentModal(Terms)}>{t(LocaleKeys.ORDERING.GENERAL_CONSENT_2_LINK)}</Link>
                    {`  ${t(LocaleKeys.ORDERING.GENERAL_CONSENT_3)} `}
                    <Link onClick={() => openConsentModal(RightToRegret)}>
                      {t(LocaleKeys.ORDERING.GENERAL_CONSENT_4_LINK)}
                    </Link>
                    {`  ${t(LocaleKeys.ORDERING.GENERAL_CONSENT_5)} `}
                    <Link onClick={() => openConsentModal(PrivacyPolicy)}>
                      {t(LocaleKeys.ORDERING.GENERAL_CONSENT_6_LINK)}
                    </Link>
                  </div>
                )}
              </Heading>
            </Checkbox>
            {error && (
              <Heading className="c-checkout__section-error" category="minor" tone="normal">
                {t(LocaleKeys.ORDERING.MUST_SELECT)}
              </Heading>
            )}
          </React.Fragment>
        );
      })}
      {isConsentModalOpen && (
        <ConsentModal
          closeModal={closeConsentModal}
          consentAgreement={consentModalAgreement}
          heading={consentModalHeading}
        />
      )}
    </div>
  );
};

CheckoutConsent.displayName = 'CheckoutConsent';
CheckoutConsent.propTypes = {
  consentAcknowledged: PropTypes.shape({}),
  consentArray: PropTypes.arrayOf(
    PropTypes.shape({
      consent: PropTypes.shape({
        type: PropTypes.string
      })
    })
  ),
  onAcknowledge: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default compose(withI18n())(CheckoutConsent);
