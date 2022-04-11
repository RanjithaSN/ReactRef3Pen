import LocaleKeys from '../../../locales/keys';
import { getViewArticleNavItem } from '../../../navigation/sitemap.selectors';
import CardList from 'selfcare-ui/src/components/cardList/card.list';
import ClickableBand from 'selfcare-ui/src/components/clickableBand/clickable.band';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Input from 'selfcare-ui/src/components/input/input';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import PropTypes from 'prop-types';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import './get.help.search.scss';

class GetHelpSearch extends React.Component {
    state = {
      searchTerm: ''
    };
    constructor(props) {
      super(props);
      this.state = {
        searchTerm: this.getQuerySearchTerm()
      };
    }

    getQuerySearchTerm = () => {
      const location = this.props.history.location;
      const params = new URLSearchParams(location.search);

      const qSearchTerm = params.get('q');
      return qSearchTerm;
    };

    componentWillMount() {
      if (this.state.searchTerm) {
        this.props.retrieveSearchResults(this.state.searchTerm);
      } else {
        this.props.clearSearchResults();
      }
    }

    handleSearch = () => {
      this.props.history.push({
        pathname: this.props.history.pathname,
        search: `?q=${this.state.searchTerm}`
      });
      this.props.retrieveSearchResults(this.state.searchTerm);
    };

    handleOnKeyPress = (event) => {
      if (event.key === 'Enter') {
        this.handleSearch();
      }
    }

    handleSearchTermChanged = (event) => {
      this.setState({
        searchTerm: event.target.value
      });
    };

    navigateToItem = (id) => {
      const { history, navigateInHelp } = this.props;
      navigateInHelp(history, `${getViewArticleNavItem().url}/${id}`);
    };

    render() {
      const { isLoadingSearchResults, searchResults, t } = this.props;
      return (
        <div className="c-get-help-search">
          <Heading className="c-get-help-search__section-content c-heading--no-max-width" category="brand" tone="normal">
            {
              this.props.showInaccountHelpList ?
                t(LocaleKeys.GET_HELP.SEARCH_HEADING_INACCOUNT) :
                t(LocaleKeys.GET_HELP.SEARCH_HEADING)
            }
          </Heading>
          <Heading className="c-get-help-search__section-content" category="minor" tone="normal">{t(LocaleKeys.GET_HELP.SEARCH_CONTENT)}</Heading>
          <div className='c-get-help-search__input-wrapper'>
            <Input id="search" onKeyPress={this.handleOnKeyPress} onChange={this.handleSearchTermChanged} type="search" placeholder={t(LocaleKeys.GET_HELP.SEARCH_PLACEHOLDER)} size="full" value={this.state.searchTerm} />
            <FilledButton
              width='min'
              onClick={this.handleSearch}
            >
              Sök
            </FilledButton>
          </div>
          <Heading category="minor" className="c-get-help-search__search-input" tone="quiet">{t(LocaleKeys.GET_HELP.SEARCH_SUBTEXT)}</Heading>
          {this.getQuerySearchTerm() && !searchResults.length && <Heading className="c-get-help-search__section-content" category="major">{t(LocaleKeys.GET_HELP.SEARCH_NO_RESULTS)}</Heading>}
          <div className="c-loading-indicator-containment">
            <LoadingIndicator isLoading={isLoadingSearchResults} />
            {!!searchResults.length && (
              <div className="c-get-help-search__search-results">
                <Heading className="c-get-help-search__section-content" category="major" tone="normal">{t(LocaleKeys.GET_HELP.SEARCH_RESULTS)}</Heading>
                <CardList className="c-get-help-search__section-content" listSpace="small">
                  {searchResults.map((result) => (
                    <ClickableBand key={result.key} title={result.title} onClickFunc={() => this.navigateToItem(result.id)} category="medium" />
                  ))}
                </CardList>
              </div>
            )}
          </div>
        </div>
      );
    }
}

GetHelpSearch.propTypes = {
  /** Function used to clear search results when unmounting component */
  clearSearchResults: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] History from react router */
  history: PropTypes.object.isRequired,
  /** Flag to tell us if the search results is loading or not. */
  isLoadingSearchResults: PropTypes.bool,
  /** Action to either navigate to help page or load new page in help overlay */
  navigateInHelp: PropTypes.func.isRequired,
  /** Function used to retrieve search results */
  retrieveSearchResults: PropTypes.func.isRequired,
  /** Search results object to display in list */
  searchResults: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    /** Search result title */
    title: PropTypes.string,
    /** Search result description */
    description: PropTypes.string
  })),
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Value of showInaccountHelpList from state */
  showInaccountHelpList: PropTypes.bool.isRequired
};

export const NakedGetHelpSearch = GetHelpSearch;
export default compose(
  withI18n(),
  withRouter
)(GetHelpSearch);
