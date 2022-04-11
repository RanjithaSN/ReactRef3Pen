import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import LocaleKeys from '../../../../locales/keys';

const RenewingProduct = ({ t }) => (
  <div className="c-manage-product c-loading-indicator-containment">
    <Paragraph className="c-manage-product__description">{t(LocaleKeys.PRODUCTS.SETTINGS.PRODUCT_RENEW_IN_PROCESS)}</Paragraph>
  </div>
);

RenewingProduct.displayName = 'RenewingProduct';
RenewingProduct.propTypes = {
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default withI18n()(RenewingProduct);
