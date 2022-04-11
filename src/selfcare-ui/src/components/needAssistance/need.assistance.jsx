import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import LocaleKeys from '../../locales/keys';
import FacebookMessenger from '../facebookMessenger/facebook.messenger';
import './need.assistance.scss';


const NeedAssistance = ({ assistanceLabel, className, secondGroup, t }) => {
  const needAssistanceLabel = assistanceLabel || t(LocaleKeys.NEED_ASSISTANCE.NAME);
  return (
    <div className={classNames('c-need-assistance', className)}>
      <div className="c-need-assistance__label">
        {needAssistanceLabel}
      </div>
      <div className="c-need-assistance__action">
        <FacebookMessenger className="c-need-assistance__facebook-messenger" />
        {t(LocaleKeys.NEED_ASSISTANCE.CHAT)}
      </div>
      <div className="c-need-assistance__action">
        {secondGroup}
      </div>
    </div>
  );
};

NeedAssistance.displayName = 'NeedAssistance';
NeedAssistance.propTypes = {
  /** Custom label to ovveride default */
  assistanceLabel: PropTypes.string,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Used to display the second group of information for the user. */
  secondGroup: PropTypes.node.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export const NakedNeedAssistance = NeedAssistance;
export default withI18n()(NeedAssistance);
