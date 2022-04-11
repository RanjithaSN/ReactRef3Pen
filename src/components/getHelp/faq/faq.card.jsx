import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import ExpandableSection from 'selfcare-ui/src/components/expandableSection/expandable.section';
import Heading from 'selfcare-ui/src/components/heading/heading';
import IconButton from 'selfcare-ui/src/components/iconButton/icon.button';
import { getViewArticleNavItem } from '../../../navigation/sitemap.selectors';
import './faq.card.scss';

const FaqCard = ({ answer, buttonText, buttonIcon, history, navigateInHelp, relatedArticle, title }) => {
  const viewRelatedArticlePath = `${getViewArticleNavItem().url}/${relatedArticle}`;

  return (
    <ExpandableSection
      key={title}
      className="c-faq-card"
      heading={<Heading category="minor" tone="normal">{title}</Heading>}
      body={(
        <>
          <div className="c-faq-card__answer">{answer}</div>
          {relatedArticle && (
            <IconButton
              className="c-faq-card__action-button"
              kind="outline"
              orientation="reversed"
              icon={buttonIcon}
              onClick={() => {
                navigateInHelp(history, viewRelatedArticlePath);
              }}
            >
              {buttonText}
            </IconButton>
          )}
        </>
      )}
    />
  );
};

FaqCard.displayName = 'FaqCard';
FaqCard.propTypes = {
  /** Answer text to display on faq card */
  answer: PropTypes.string.isRequired,
  /** Icon to display on faq button */
  buttonIcon: PropTypes.node.isRequired,
  /** Text to display on faq button */
  buttonText: PropTypes.string.isRequired,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Action to either navigate to help page or load new page in help overlay */
  navigateInHelp: PropTypes.func.isRequired,
  /** ID of related article, if one exists */
  relatedArticle: PropTypes.number,
  /** Title text to display on faq card */
  title: PropTypes.string.isRequired
};

export const NakedFaqCard = FaqCard;
export default withRouter(FaqCard);
