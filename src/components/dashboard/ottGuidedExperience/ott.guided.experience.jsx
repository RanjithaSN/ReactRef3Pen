import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import Heading from 'selfcare-ui/src/components/heading/heading';
import IconPlayCircle from 'selfcare-ui/src/icons/react-icons/play-circle';
import LocaleKeys from '../../../locales/keys';
import './ott.guided.experience.scss';


const OTTGuidedExperience = ({ t, updateShouldShowOTTGuidedExperience }) => [
  <Heading category="brand" tone="quiet" className="c-ott-guided-experience__bouncing-arrow" key="guided_experience_arrow">
        &#8594;
  </Heading>,
  <div className="c-ott-guided-experience" key="guided_experience_overlay">
    <div className="c-ott-guided-experience__content">
      <Heading category="brand">
        {t(LocaleKeys.DASHBOARD.OTT_GUIDED_EXPERIENCE.HEADING)}
      </Heading>
      <Heading className="c-ott-guided-experience__description">
        {t(LocaleKeys.DASHBOARD.OTT_GUIDED_EXPERIENCE.DESCRIPTION_1)}
        <IconPlayCircle className="c-ott-guided-experience__description-play-icon" />
        {t(LocaleKeys.DASHBOARD.OTT_GUIDED_EXPERIENCE.DESCRIPTION_2)}
      </Heading>
      <FilledButton
        className="c-ott-guided-experience__button"
        onClick={() => updateShouldShowOTTGuidedExperience(false)}
      >
        {t(LocaleKeys.DASHBOARD.OTT_GUIDED_EXPERIENCE.BUTTON_TEXT)}
      </FilledButton>
    </div>
  </div>
];

OTTGuidedExperience.displayName = 'OTTGuidedExperience';
OTTGuidedExperience.propTypes = {
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Function used to indicate the user has seen the guided experience already */
  updateShouldShowOTTGuidedExperience: PropTypes.func.isRequired
};

export default withI18n()(OTTGuidedExperience);
