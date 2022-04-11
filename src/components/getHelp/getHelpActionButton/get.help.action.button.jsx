import LocaleKeys from '../../../locales/keys';
import FloatingActionButton from '../../floatingActionButton/floating.action.button';
import GetHelpOverlay from '../getHelpOverlay/get.help.overlay.contextual';
import CloseIcon from 'selfcare-ui/src/icons/react-icons/close';
import QuestionIcon from 'selfcare-ui/src/icons/react-icons/question';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { withI18n } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import './get.help.action.button.scss';

const GetHelpActionButton = ({ retrieveHelpContent,
  shouldShowGetHelpOverlay,
  t,
  updateShouldShowGetHelpOverlay,
  setShowInaccountHelpList,
  getArticles }) => {
  const toggleGetHelpOverlay = () => updateShouldShowGetHelpOverlay(!shouldShowGetHelpOverlay);

  useEffect(() => {
    if (shouldShowGetHelpOverlay) {
      getArticles();
    } else {
      setShowInaccountHelpList(false);
    }
  }, [shouldShowGetHelpOverlay, setShowInaccountHelpList, getArticles]);

  return (
    <>
      <CSSTransition
        in={shouldShowGetHelpOverlay}
        timeout={750}
        onEntered={retrieveHelpContent}
        classNames="c-get-help-overlay"
      >
        <GetHelpOverlay />
      </CSSTransition>
      <div className="c-get-help-action-button-wrapper__outer">
        <div className="c-get-help-action-button-wrapper__inner">
          <FloatingActionButton className="c-get-help-action-button" onClick={toggleGetHelpOverlay} variant="high-contrast" aria-label={t(LocaleKeys.META_DATA.GET_HELP.TITLE)}>
            {shouldShowGetHelpOverlay ? <CloseIcon width={15} height={15} /> : <QuestionIcon />}
          </FloatingActionButton>
        </div>
      </div>
    </>
  );
};

GetHelpActionButton.displayName = 'GetHelpActionButton';
GetHelpActionButton.propTypes = {
  /** Retrieve all categories, articles, guides, and videos and load into redux store */
  retrieveHelpContent: PropTypes.func.isRequired,
  /** Whether or not the get help overlay should be shown */
  shouldShowGetHelpOverlay: PropTypes.bool,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** The function to update the state of whether or not the get help overlay should be visible */
  updateShouldShowGetHelpOverlay: PropTypes.func.isRequired,
  /** Function to set the state of showing of the inaccount help list of articles */
  setShowInaccountHelpList: PropTypes.func.isRequired,
  getArticles: PropTypes.func.isRequired
};

export default withI18n()(GetHelpActionButton);
