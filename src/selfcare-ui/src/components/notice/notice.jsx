import LocaleKeys from 'selfcare-core/src/locales/keys';
import LocaleKeysApp from '../../../../locales/keys';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Trans, withI18n } from 'react-i18next';
import isNil from 'ramda/src/isNil';
import IconClose from '../../icons/react-icons/close';
import Banner from '../banner/banner';
import Button from '../button/button';
import FilledButton from '../button/filled.button';
import Heading from '../heading/heading';
import Link from 'selfcare-ui/src/components/link/link';
import { dataLayerPush } from '@selfcare/core/analytics/analytics.helper';
import './notice.scss';
import ApiFaultCodes from 'selfcare-core/src/constants/api.fault.codes';
import { buildHistoryNodeFromKeyValue, initializeDirectHelp } from '../../../../components/getHelp/troubleshooter/directHelp/direct.help.helpers';
import ChatButton from '../../../../components/getHelp/troubleshooter/directHelp/chat.button';

const Notice = (props) => {
  useEffect(() => {
    if (props.apiFault) {
      const errorMessage = {
        event: 'errorMessage',
        eventInfo: {
          category: 'Error message',
          action: props.apiFault.translatedMessage,
          label: props.apiFault.trigger,
          value: undefined,
          nonInteraction: false
        }
      };
      dataLayerPush(errorMessage);
    }
  }, [props.apiFault]);

  useEffect(() => {
    window.__initZenDesk();
  }, [window]);

  return (
    <Banner
      className={classNames('c-notice', `is-${props.type}`, props.className, {
        'c-notice__inline': props.inline,
        'c-notice__full-width': props.fullWidth
      })}
    >
      <div
        className={classNames({
          'c-notice__full-width__content': props.fullWidth
        })}
      >
        {props.heading && (
          <div className="c-notice__header">
            
            {(props.apiFault && !isNil(props.apiFault.linkText)) ? (
              <div className="c-notice__header-main">
                <Heading>
                  <Trans
                    i18nKey={`${LocaleKeys.FAULT_PREFIX}${props.apiFault.faultCode}.content`}
                    values={{
                      linkText: props.heading.linkText
                    }}
                    components={[
                      <a className="c-notice__header-main__link" href={props.heading.ref} target="_blank" rel="noopener noreferrer">
                        {' '}
                        {props.heading.linkText}
                      </a>
                    ]}
                  />
                </Heading>
              </div>
            ) : (
              <div className="c-notice__header-main">
                <Heading category="minor" tone="normal" className="c-notice__heading">
                    {props.heading}
                    {props.apiFault && props.apiFault.Code === ApiFaultCodes.ADYEN_PAYMENT_FAULT && props.apiFault.Subcode && ApiFaultCodes.ADYEN_PAYMENT_FAULT_CODES_FOR_ZENDESK.includes(props.apiFault.Subcode) && (
                      <Link
                      onClick={() => {
                        initializeDirectHelp([
                          buildHistoryNodeFromKeyValue('Action', 'Payment Failure')
                        ]);
                      }}
            
                      className="c-notice__heading-zendesk__link"
                    >
                      {props.t(LocaleKeysApp.GET_HELP.CUSTOMER_SERVICE)}
                    </Link>
                    )}
                  </Heading><ChatButton />
              </div>
            )
            }
            {(props.apiFault && !isNil(props.apiFault.login)) && (
              <Link
                onClick={props.openLoginModal}
                className="c-header-actionsLink c-header-login-button"
              >
                <button class="c-button c-button--auto c-outline-button c-outline-button--inverted unset-button-min-width" type="button">{props.t(LocaleKeysApp.GET_HELP.LOGIN_BUTTON)}</button>
              </Link>
            )}
            {!props.inline && props.onClose && <Button className="unset-button-min-width" onClick={props.onClose} aria-label={props.t(LocaleKeys.PROMPT.ACCEPT)}><IconClose /></Button>}
            {!props.inline && props.onCTA && (
              <FilledButton
                onClick={props.onCTA}
                variant={props.type}
                height="short"
              >
                {props.ctaLabel}
              </FilledButton>
            )}
          </div>
        )}
        {props.children && (
          <div className="c-notice__body">
            {props.children}
          </div>
        )}
        {props.inline && props.onClose && <Button className="c-notice__on-close" onClick={props.onClose} aria-label={props.t(LocaleKeys.PROMPT.ACCEPT)}><IconClose /></Button>}
        {props.inline && props.onCTA && (
          <FilledButton
            className="c-notice__button"
            onClick={props.onCTA}
            variant={props.type}
            height="short"
          >
            {props.ctaLabel}
          </FilledButton>
        )}
      </div>
    </Banner>
  );
};

Notice.displayName = 'Notice';
Notice.propTypes = {
  /** A fault object representing an error that occurred */
  apiFault: PropTypes.object,
  /** Any children elements will be included in the body portion of the notification */
  children: PropTypes.node,
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  /** Call to Action text to be displayed in the button. */
  ctaLabel: PropTypes.string,
  /** Renders assuming we are going full width. Set our gutters and center the content */
  fullWidth: PropTypes.bool,
  /** The heading of the notification is displayed to the right of the icon. */
  heading: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /** Renders the heading and body of the component next to each other. */
  inline: PropTypes.bool,
  /** Callback to be performed when attempting to click on the call to action. */
  onCTA: PropTypes.func,
  /** Callback to be performed when attempting to close the notification */
  onClose: PropTypes.func,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Open the login modal */
  openLoginModal: PropTypes.func,
  /** Type type of the notification, controls the palette used for the notification. */
  type: PropTypes.oneOf(['error', 'warning', 'info', 'success'])
};
Notice.defaultProps = {
  type: 'info'
};

export default withI18n()(Notice);
