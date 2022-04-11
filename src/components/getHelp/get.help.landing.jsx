import Faq from './faq/faq.contextual';
import './get.help.scss';
import GetHelpCard from './getHelpCard/get.help.card';
import GetHelpCategories from './getHelpCategories/get.help.categories.contextual';
import GetHelpSearch from './search/get.help.search.contextual';
import GetInaccountHelp from './getInAccountHelp/get.inaccount.help.contextual';
import MetaData from '../pageMetaData/meta.data.handler.contextual';
import LocaleKeys from '../../locales/keys';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import { withI18n } from 'react-i18next';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const GetHelpLanding = ({
  changeTitle,
  currentSession,
  faqs,
  isCategoriesLoading,
  isFaqsLoading,
  openLoginModal,
  retrieveFaqs,
  isFaqsLoaded,
  t,
  showInaccountHelpList,
  isLoadingInaccountList
}) => {
  useEffect(() => {
    if (!isFaqsLoaded) {
      retrieveFaqs();
    }
  }, [isFaqsLoaded]);

  const showLoading = isFaqsLoading && isCategoriesLoading;

  return (
    <div className="c-get-help">
      {changeTitle && (
        <MetaData title={t(LocaleKeys.META_DATA.GET_HELP.TITLE)} description={t(LocaleKeys.META_DATA.GET_HELP.DESCRIPTION)} />
      )}
      <LoadingIndicator isLoading={showLoading} />
      {!currentSession && (
        <GetHelpCard
          heading={t(LocaleKeys.GET_HELP.LOGIN_HEADING)}
          subheading={t(LocaleKeys.GET_HELP.LOGIN_CONTENT)}
          onClick={() => {
            openLoginModal();
          }}
          buttonText={t(LocaleKeys.GET_HELP.LOGIN_BUTTON)}
          className="c-get-help__login"
        />
      )}
      <LoadingIndicator isLoading={isLoadingInaccountList} />
      {!isLoadingInaccountList && showInaccountHelpList && (
        <GetInaccountHelp />
      )}
      <GetHelpSearch />
      <GetHelpCategories
        heading={t(LocaleKeys.GET_HELP.CATEGORIES_HEADING)}
      />
      <Faq faqs={faqs} />
    </div>
  );
};

GetHelpLanding.displayName = 'GetHelpLanding';
GetHelpLanding.propTypes = {
  /** Whether or not to change the document title. */
  changeTitle: PropTypes.bool,
  /** The current session token if logged in */
  currentSession: PropTypes.string,
  /** Array of faq objects */
  faqs: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    title: PropTypes.string,
    uri: PropTypes.string
  })),
  /** Indicates if the categories are currently loading */
  isCategoriesLoading: PropTypes.bool,
  /** Indicates if the faqs are currently loading */
  isFaqsLoading: PropTypes.bool,
  /** function to open the login modal */
  openLoginModal: PropTypes.func.isRequired,
  /** Fetches the faq objects */
  retrieveFaqs: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Value of showInaccountHelpList from state */
  showInaccountHelpList: PropTypes.bool.isRequired,
  /** Value to check if inaccount help list is loading */
  isLoadingInaccountList: PropTypes.bool.isRequired
};
GetHelpLanding.defaultProps = {
  changeTitle: true
};

export const NakedGetHelpLanding = GetHelpLanding;
export default withI18n()(GetHelpLanding);
