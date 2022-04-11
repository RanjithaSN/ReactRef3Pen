import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Radio from 'selfcare-ui/src/components/radio/radio';
import RadioGroup from 'selfcare-ui/src/components/radioGroup/radio.group';
import LocaleKeys from '../../locales/keys';
import './consent.radio.card.scss';

const ConsentRadioCard = ({ consent, onClick, t }) => {
  return (
    <div className="c-consent-radio-card__consent-item" key={consent.type}>
      <Heading className="c-consent-radio-card__consent-item-label" category="major" tone="quiet">{consent.label}</Heading>
      <div className="c-consent-radio-card__consent-item-description">
        <Heading category="minor" tone="normal">{consent.description}</Heading>
        <RadioGroup className="c-consent-radio-card__radio-buttons" name={consent.type} onChange={(e) => onClick(consent, e.target.value)}>
          <Radio
            id={`${consent.type}-${t(LocaleKeys.YES)}`}
            value={t(LocaleKeys.YES)}
            checked={consent.consentAccepted}
          >
            {t(LocaleKeys.YES)}
          </Radio>
          <Radio
            id={`${consent.type}-${t(LocaleKeys.NO)}`}
            value={t(LocaleKeys.NO)}
            checked={!consent.consentAccepted}
          >
            {t(LocaleKeys.NO)}
          </Radio>
        </RadioGroup>
      </div>
    </div>
  );
};

ConsentRadioCard.propTypes = {
  /** Consent object to display */
  consent: PropTypes.shape({
    /** Consent id from SubscriberConsents */
    configConsentId: PropTypes.number,
    /** Whether the user has accepted the consent */
    consentAccepted: PropTypes.bool,
    /** Description to display for the consent */
    description: PropTypes.string,
    /** Label to display for the consent */
    label: PropTypes.string,
    /** The type of consent config */
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  /** Callback for when radio button is clicked */
  onClick: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export const NakedConsentRadioCard = ConsentRadioCard;
export default withI18n()(ConsentRadioCard);
