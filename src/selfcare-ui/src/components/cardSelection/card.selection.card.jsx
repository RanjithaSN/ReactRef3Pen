import { ActiveCampaign } from '../../../../../src/redux/aws/campaigns/campaigns.selectors';
import Button from 'ui/components/button/button';
import Card from 'ui/components/card/card';
import Pill, { PillContainer } from 'ui/components/pill/pill';
import Stack from 'ui/components/stack/stack';
import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

export const NakedCardSelectionCard = (
  { children, active, t, onClick, pills = [], action, ...rest },
  ref
) => {
  const hasPills = !!pills.length;

  // If this card selection has potential to have any pills at all then we set it to true,
  // because otherwise the alignment of cards would be ugly.
  return (
    <Card className="c-card-selection-card" ref={ref} hasPills {...rest}>
      <Card.Body>
        <Stack className="c-card-selection-card__body">{children}</Stack>
      </Card.Body>
      {action && (
        <Card.Footer>
          <Button variant={active ? 'reversed' : 'primary'} onClick={onClick}>
            {action || t(active ? 'cart.remove' : 'add')}
          </Button>
        </Card.Footer>
      )}
      {hasPills && (
        <PillContainer>
          {pills.map((pill) => (
            <Pill key={pill}>{pill}</Pill>
          ))}
        </PillContainer>
      )}
    </Card>
  );
};

const tokenize = (input, divider = ';') => (input && input.length ? input.split(divider) : []);

const PILL_CONTEXT_PAGE = {
  MOBILE: '0',
  BROADBAND: '1',
  BUNDLE: '2'
};

const selectLandingPagePills = (landingPage, type, campaignPage, isStudent) => {
  const activePage = isStudent || !campaignPage ? landingPage : campaignPage;

  switch (type) {
  case PILL_CONTEXT_PAGE.MOBILE:
    return tokenize(activePage.custom_fields.mobile_pill);
  case PILL_CONTEXT_PAGE.BROADBAND:
    return tokenize(activePage.custom_fields.broadband_pill);
  case PILL_CONTEXT_PAGE.BUNDLE:
    return tokenize(activePage.custom_fields.bundle_pill);
  default:
    break;
  }

  return [];
};

const selectAboutPagePills = (aboutPages, type, campaignPage, isStudent) => {
  const page = aboutPages.find((page) => {
    if (type.toLowerCase() === 'mobile') {
      const aboutPageRoute = campaignPage ? 'mobil/campaign' : 'mobil';
      const comparisonKey = isStudent ? 'mobil/student' : aboutPageRoute;
      return page.custom_fields.key === comparisonKey;
    }

    if (type.toLowerCase() === 'broadband') {
      const aboutPageRoute = campaignPage ? 'bredband/campaign' : 'bredband';
      const comparisonKey = isStudent ? 'bredband/student' : aboutPageRoute;
      return page.custom_fields.key === comparisonKey;
    }
    return false;
  });
  return page ? tokenize(page.custom_fields.product_pill) : [];
};

const selectPills = createSelector(
  (state) => state.client.aboutPages.data,
  (state, type, isStudent) => (isStudent ?
    state.client.landingPage.studentLandingPage :
    state.client.landingPage.landingPage),
  (state, type) => type || '',
  ActiveCampaign,
  (state, type, isStudent) => isStudent,
  (aboutPages, landingPage, type, campaignPage, isStudent) => {
    let pills = [];
    if (type.toLowerCase() === 'mobile' || type.toLowerCase() === 'broadband') {
      pills = selectAboutPagePills(aboutPages, type, campaignPage, isStudent);
    } else if (landingPage) {
      pills = selectLandingPagePills(
        landingPage,
        type,
        campaignPage,
        isStudent
      );
    }

    return pills;
  }
);

const CardSelectionCard = withI18n()(React.forwardRef(NakedCardSelectionCard));

export const CardHeader = Card.Header;
export const CardBody = Card.Body;
export const CardFooter = Card.Footer;

CardSelectionCard.displayName = 'CardSelectionCard';
CardSelectionCard.propTypes = {
  /** Whether or not the current card is active */
  active: PropTypes.bool,
  /** Conditionally render borders and shadows */
  children: PropTypes.node,
  /** Allows you to pass additional classes for layout concerns */
  action: PropTypes.string,
  /** Has top margin even if the card has no pills */
  hasMargin: PropTypes.bool,
  /** Allows you to pass a pill to be displayed to the card */
  pills: PropTypes.arrayOf(PropTypes.string),
  /** Used to inform consumers that the selected menu item has changed */
  onClick: PropTypes.func.isRequired
};
CardSelectionCard.defaultProps = {};

const mapStateToProps = (state, props) => {
  const pathname =
    typeof window !== 'undefined' ? window.location.pathname : '';
  const isStudent = pathname.search('student') > -1;
  return {
    pills: selectPills(state, props.type, isStudent)
  };
};

export default connect(mapStateToProps)(CardSelectionCard);
