import ChatButton from './directHelp/chat.button';
import { initializeDirectHelp } from './directHelp/direct.help.helpers';
import { USABILITY } from '../../../constants/usability.constants';
import LocaleKeys from '../../../locales/keys';
import { getTroubleshooterNavItem } from '../../../navigation/sitemap.selectors';
import { TROUBLESHOOTER_API, TROUBLESHOOTER } from '../../../redux/troubleshooter/troubleshooter.constants';
import PageContent, { Main } from '../../pageContent/page.content';
import withAuth from '../../withAuth/with.auth.contextual';
import { getContextPageObject } from '../../../helpers/inaccount.help.helpers';
import Container from 'selfcare-ui/src/components/container/container';
import ExternalImage from 'selfcare-ui/src/components/externalImage/external.image';
import Heading from 'selfcare-ui/src/components/heading/heading';
import IconButton from 'selfcare-ui/src/components/iconButton/icon.button';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import Radio from 'selfcare-ui/src/components/radio/radio';
import RadioGroup from 'selfcare-ui/src/components/radioGroup/radio.group';
import IconArrowThinRight from 'selfcare-ui/src/icons/react-icons/arrow-thin-right';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import './troubleshooter.scss';

class Troubleshooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLiveChat: false,
      option: null,
      section: 'other',
      isLoading: true
    };
  }

  componentDidMount() {
    window.__initZenDesk();
    const { location } = this.props;

    this.getTroubleshooter();

    if (location.pathname.indexOf(TROUBLESHOOTER.RIGHT_TO_BE_FORGOTTEN) !== -1) {
      const { setContextPageData } = this.props;

      setContextPageData(getContextPageObject(1, 'manage'));
      setContextPageData(getContextPageObject(2, 'removeAccount'));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.subscriber && this.props.subscriber) {
      this.getTroubleshooter();
    }
    const { troubleshooterHistory } = this.props;
    if (!prevState.showLiveChat && this.state.showLiveChat) {
      initializeDirectHelp(troubleshooterHistory, this.state.section);
    }
    if (!prevState.action && this.state.action) {
      // Update the rendered component to include the usabillla feedback
      window.usabilla.load('w.usabilla.com', USABILITY.accountKey);
    }
  }

  getTroubleshooter() {
    if (this.props.subscriber) {
      const troubleshooterId = this.props.match.params.troubleshooterId;
      const { subscriber } = this.props;

      const flow = {
        flow: troubleshooterId
      };
      if (subscriber) {
        // eslint-disable-next-line no-param-reassign
        flow.subscriber = subscriber.Id;
      }
      fetch(TROUBLESHOOTER_API, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(flow)
      })
        .then((res) => res.json())
        .then((dialog) => {
          // eslint-disable-next-line no-param-reassign
          dialog.flow = troubleshooterId;
          if (subscriber) {
            // eslint-disable-next-line no-param-reassign
            dialog.subscriber = subscriber.Id;
          }
          this.setState(dialog);
          this.setState({
            isLoading: false
          });
        });
    }
  }

  handleChange = (event) => {
    this.setState({
      option: event.target.value
    });
  };

  handleTroubleshooterAction = () => {
    this.setState({
      isLoading: true
    });
    const { subscriber } = this.props;
    const answer = this.state.dialog;
    answer.answers.push(this.state.option);
    answer.flow = this.props.match.params.troubleshooterId;
    const answerDialog = {
      dialog: answer
    };

    answerDialog.flow = this.props.match.params.troubleshooterId;
    answerDialog.dialog.subscriber = subscriber.Id;
    answerDialog.subscriber = subscriber.Id;
    this.updateTroubleshooterHistory(answer);
    fetch(TROUBLESHOOTER_API, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(answerDialog)
    })
      .then((res) => res.json())
      .then((dialog) => {
        console.log({
          dialog
        });
        // eslint-disable-next-line no-param-reassign
        dialog.subscriber = subscriber.Id;
        this.setState(dialog);
        this.setState({
          option: null,
          isLoading: false
        });
        if (dialog.action && dialog.action.name === 'chat') {
          this.setState({
            showLiveChat: true,
            section: dialog.section
          });
        }
        if (dialog.action && dialog.action.name === 'redirect') {
          const { history } = this.props;
          const checkUrl = dialog.action.targets[0].goto.charAt(0);
          history.push(checkUrl === '/' ? dialog.action.targets[0].goto : `/${dialog.action.targets[0].goto}`);
        }
      });
  };

  updateTroubleshooterHistory = (action) => {
    const { pushToHistory } = this.props;
    const historyNode = {
      type: 'error',
      error: {
        contextId: action.comments[0].comment,
        message: action.comments[1].comment,
        code: action.answers[0]
      }
    };
    pushToHistory(historyNode);
  };

  render() {
    const { t } = this.props;
    return (
      <PageContent>
        <Main className="c-troubleshooter">
          <LoadingIndicator isLoading={this.state.isLoading} />
          {this.state.dialog && !this.state.action && (
            <>
              <div className="c-troubleshooter__section">
                <Heading className="c-troubleshooter__section--heading" category="brand" tone="normal">{this.state.dialog.comments[0].comment}</Heading>
                {this.state.dialog.comments[1].comment && <Paragraph className="c-troubleshooter__node-description">{this.state.dialog.comments[1].comment}</Paragraph>}
              </div>
              <div className="c-troubleshooter__actions">
                {this.state.dialog.options && (
                  <div>
                    {this.state.dialog.imageUrl && this.state.dialog.imageUrl !== 'nil' && (
                      <ExternalImage
                        altText="Felsökar bild"
                        className="c-troubleshooter__image"
                        imageUrls={{
                          basic: this.state.dialog.imageUrl
                        }}
                      />
                    )}
                    <Container className="c-troubleshooter__answers">
                      <RadioGroup
                        name={this.state.dialog.dialogid}
                        onChange={this.handleChange}
                      >
                        {this.state.dialog.options.map((action) => {
                          return (
                            <Radio
                              key={`${action.option}`}
                              id={`${action.option}`}
                              value={action.option}
                              checked={this.state.option === action.option}
                            >
                              {action.option}
                            </Radio>
                          );
                        })}
                      </RadioGroup>
                    </Container>

                    <IconButton
                      className="c-troubleshooter__nav-button"
                      orientation="reversed"
                      icon={<IconArrowThinRight />}
                      onClick={this.handleTroubleshooterAction}
                    >
                      {t(LocaleKeys.GET_HELP.TROUBLESHOOTER_NEXT)}
                    </IconButton>
                  </div>
                )}
              </div>
            </>
          )}
          {this.state.action && this.state.action.name === 'chat' && (
            <div className="c-troubleshooter__section">
              <Heading className="c-troubleshooter__section--heading" category="brand" tone="normal">{t(LocaleKeys.GET_HELP.LIVE_PERSON.HEADING)}</Heading>
              <Paragraph className="c-troubleshooter__node-description">{t(LocaleKeys.GET_HELP.LIVE_PERSON.DESCRIPTION)}</Paragraph>
              <Paragraph className="c-troubleshooter__node-time_attending">{t(LocaleKeys.GET_HELP.LIVE_PERSON.TIME_ATTENDING)}</Paragraph>
              <ChatButton />
            </div>
          )}
          {this.state.action && (
            <div ub-in-page={USABILITY.inPageId} ub-in-page-item={getTroubleshooterNavItem().url} />
          )}
        </Main>
      </PageContent>
    );
  }
}

Troubleshooter.propTypes = {
  subscriber: PropTypes.shape({
    Id: PropTypes.number
  }),
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** [[IgnoreDoc]] Function to get the url params */
  match: PropTypes.object,
  /** Function to push the node into history object */
  pushToHistory: PropTypes.func.isRequired,
  /** Troubleshooter History */
  troubleshooterHistory: PropTypes.arrayOf(PropTypes.shape({})),
  /** [[IgnoreDoc]] translate */
  t: PropTypes.func.isRequired,
  /** Location from react router */
  location: PropTypes.object.isRequired,
  /** Action to change context ui page data for in account help */
  setContextPageData: PropTypes.func.isRequired
};

export default compose(
  withI18n(),
  withRouter,
  withAuth
)(Troubleshooter);
