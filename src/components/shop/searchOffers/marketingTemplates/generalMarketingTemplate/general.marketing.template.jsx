import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import Card from 'selfcare-ui/src/components/card/card';
import CardBody from 'selfcare-ui/src/components/card/card.body';
import CardFooter from 'selfcare-ui/src/components/card/card.footer';
import CardHeader from 'selfcare-ui/src/components/card/card.header';
import Currency from 'selfcare-ui/src/components/currency/currency';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LocaleKeys from '../../../../../locales/keys';
import { getAddNewOfferNavItem } from '../../../../../navigation/sitemap.selectors';
import './general.marketing.template.scss';


const GeneralMarketingTemplate = ({ className, history, t, template }) => (
  <Card className={classNames('c-general-marketing-template', className)}>
    <CardHeader className="c-general-marketing-template__header">
      <Heading category="major">{template.DisplayName}</Heading>
      <Heading category="brand" className="c-general-marketing-template__price">
        <Currency value={template.Amount} code={template.CurrencyCode} locale={template.PreferenceLocale} />
      </Heading>
    </CardHeader>
    {(template.Description && <CardBody className="c-general-marketing-template__body">{template.Description}</CardBody>)}
    <CardFooter className="c-general-marketing-template__footer">
      <FilledButton
        key={template.Id}
        className="c-general-marketing-template__primary-cta"
        onClick={() => {
          history.push(`${getAddNewOfferNavItem().url}/${template.Id}`);
        }}
      >
        {t(LocaleKeys.SEARCH_OFFERS.ADD_TO_CART)}
      </FilledButton>
    </CardFooter>
  </Card>
);

GeneralMarketingTemplate.displayName = 'GeneralMarketingTemplate';
GeneralMarketingTemplate.propTypes = {
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Marketing template to render within this card. */
  template: PropTypes.shape({
    Id: PropTypes.string.isRequired,
    DisplayName: PropTypes.string,
    Amount: PropTypes.number,
    CurrencyCode: PropTypes.string,
    Description: PropTypes.string,
    /** Preference locale */
    PreferenceLocale: PropTypes.string
  }).isRequired
};

export const NakedGeneralMarketingTemplate = GeneralMarketingTemplate;
export default compose(
  withI18n(),
  withRouter
)(GeneralMarketingTemplate);
