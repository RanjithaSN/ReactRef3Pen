import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React, { useEffect, useState } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LocaleKeys from '../../../locales/keys';
import ChatButton from './directHelp/chat.button';
import { buildHistoryNodeFromKeyValue, initializeDirectHelp, UNAUTHENTICATED_SECTIONS } from './directHelp/direct.help.helpers';
import './troubleshooter.scss';

const DirectHelp = ({ match, t }) => {
  const [initializedHelp, setInitializedHelp] = useState(false);
  const troubleshooterReason = match.params.troubleshooterReason;
  const troubleshooterSection = match.params.troubleshooterSection;

  // if (!AUTHENTICATED_SECTIONS.includes(troubleshooterSection) && !UNAUTHENTICATED_SECTIONS.includes(troubleshooterSection)) {
  //     troubleshooterSection = DEFAULT_LP_SECTION;
  // }

  useEffect(() => {
    if (troubleshooterReason && !initializedHelp) {
      initializeDirectHelp([buildHistoryNodeFromKeyValue(troubleshooterReason, troubleshooterReason)], troubleshooterSection);
      setInitializedHelp(true);
    }
  }, [troubleshooterReason, troubleshooterSection, initializedHelp]);

  const isUnauthenticated = UNAUTHENTICATED_SECTIONS.includes(troubleshooterSection);

  return (
    <div className="c-troubleshooter">
      <div className="c-troubleshooter__section">
        <Heading className="c-troubleshooter__section--heading" category="major" tone="normal">{t(LocaleKeys.GET_HELP.LIVE_PERSON.HEADING)}</Heading>
        <Heading category="minor" tone="normal">{t(LocaleKeys.GET_HELP.LIVE_PERSON.DESCRIPTION)}</Heading>
        <ChatButton unauthenticated={isUnauthenticated} />
      </div>
    </div>
  );
};

DirectHelp.propTypes = {
  /** [[IgnoreDoc]] Function to get the url params */
  match: PropTypes.object,
  /** [[IgnoreDoc]] translate */
  t: PropTypes.func.isRequired
};

export default compose(
  withI18n(),
  withRouter
)(DirectHelp);
