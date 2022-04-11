import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import Container from 'selfcare-ui/src/components/container/container';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LocaleKeys from '../../locales/keys';
import MetaData from '../pageMetaData/meta.data.handler.contextual';
import './not.found.scss';

const NotFound = ({ t }) => {
  return (
    <Container className="c-not-found">
      <MetaData title={t(LocaleKeys.META_DATA.PAGE_404.TITLE)} description={t(LocaleKeys.META_DATA.PAGE_404.DESCRIPTION)} />
      <Heading className="c-not-found__heading" category="brand" tone="normal">{t(LocaleKeys.NOT_FOUND.HEADER)}</Heading>
      {t(LocaleKeys.NOT_FOUND.DESCRIPTION)}
      <a href={t(LocaleKeys.PENNY_WEBSITE.URL)}>{t(LocaleKeys.PENNY_WEBSITE.LABEL).toLowerCase()}</a>
    </Container>
  );
};

NotFound.displayName = 'NotFound';
NotFound.propTypes = {
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default withI18n()(NotFound);
