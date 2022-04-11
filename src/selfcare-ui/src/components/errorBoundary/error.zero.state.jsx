import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import LocaleKeys from '../../locales/keys';
import ZeroState from '../zeroState/zero.state';
import './error.boundary.scss';

const ErrorZeroState = ({ description, t, title }) => {
  return (
    <ZeroState
      variant="error"
      title={title || t(LocaleKeys.COMPONENT_ERROR.UNABLE_TO_LOAD)}
      description={description || t(LocaleKeys.COMPONENT_ERROR.DESCRIPTION)}
      elevatedDialogBox
      elevatedDescription={t(LocaleKeys.COMPONENT_ERROR.ELEVATED_DESCRIPTION)}
      elevatedNextStep={t(LocaleKeys.COMPONENT_ERROR.ELEVATED_NEXT_STEP, {
        phoneNumber: '(555)555-5555'
      })}
    />
  );
};

ErrorZeroState.displayName = 'ErrorZeroState';
ErrorZeroState.propTypes = {
  /** Zero state description */
  description: PropTypes.string,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Zero state title */
  title: PropTypes.string
};

export default withI18n()(ErrorZeroState);
