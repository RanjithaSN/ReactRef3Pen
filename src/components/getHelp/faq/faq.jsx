import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import Heading from 'selfcare-ui/src/components/heading/heading';
import IconArrowThinRight from 'selfcare-ui/src/icons/react-icons/arrow-thin-right';
import LocaleKeys from '../../../locales/keys';
import FaqCard from './faq.card';
import './faq.scss';

const Faq = ({ faqs, headingCategory, navigateInHelp, t }) => {
  return (
    !faqs.length ?
      null : (
        <div className="c-faq">
          <Heading className={`c-faq__section-content c-faq__section-content-${headingCategory}`} category={headingCategory} tone="normal">{t(LocaleKeys.GET_HELP.FAQ_HEADING)}</Heading>
          {faqs.map((faq) => {
            return (
              <FaqCard
                key={faq.id}
                answer={faq.answer}
                buttonIcon={<IconArrowThinRight />}
                buttonText={t(LocaleKeys.GET_HELP.FAQ_READ_MORE)}
                relatedArticle={faq.relatedArticle}
                title={faq.title}
                navigateInHelp={navigateInHelp}
              />
            );
          })}
        </div>
      )
  );
};

Faq.propTypes = {
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
  /** The category to use when rendering the header */
  headingCategory: PropTypes.oneOf(['major', 'brand']),
  /** Action to either navigate to help page or load new page in help overlay */
  navigateInHelp: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

Faq.defaultProps = {
  faqs: [],
  headingCategory: 'major'
};

export const NakedFaq = Faq;
export default withI18n()(Faq);
