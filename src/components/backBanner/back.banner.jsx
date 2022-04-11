import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import LocaleKeys from '../../locales/keys';
import {
  BackBannerButton,
  BackBannerIcon,
  Container,
  BackBannerArrowIcon
} from './back.banner.styled';

const BackBanner = ({
  className, // dark class makes it black background on white
  text,
  route,
  history,
  t,
  showArrow
}) => {
  const renderIcon = () => {
    return showArrow ?
      <BackBannerArrowIcon />:
      <BackBannerIcon />;
  };

  return (
    <Container className={`
      ${className}
      ${showArrow ? 'show-arrow' : ''}
    `}>
      {route ? (
        <BackBannerButton
          icon={renderIcon()}
          onClick={() => history.push(route)}
          text={t(LocaleKeys.BACK_BANNER.BACK_TO, {
            parentName: text
          })}
        />
      ) : (
        <BackBannerButton
          icon={renderIcon()}
          onClick={() => history.goBack()}
          text={t(LocaleKeys.BACK)}
        />
      )}
    </Container>
  );
};

BackBanner.displayName = 'BackBanner';
BackBanner.propTypes = {
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Text to use after "Back to ..." */
  text: PropTypes.string,
  /** Route to navigate to */
  route: PropTypes.string,
  /** Use to show back button with a thin arrow */
  showArrow: PropTypes.bool
};

BackBanner.defaultProps = {
  showArrow: false
};

export default compose(
  withI18n(),
  withRouter
)(BackBanner);
