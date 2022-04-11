import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import { AppContext } from 'selfcare-ui/src/components/appContext/app.context';
import { MEDIA_CONTEXT_SIZES } from 'selfcare-ui/src/components/mediaContext/media.context.constants';
import LocaleKeys from '../../../locales/keys';
import Notifications from '../../notification/notification.list.contextual';
import PageContent, { Aside, Main } from '../../pageContent/page.content';
import MetaData from '../../pageMetaData/meta.data.handler.contextual';
import DashboardHero from '../dashboardHero/dashboard.hero';
import OTTGuidedExperience from '../ottGuidedExperience/ott.guided.experience.contextual';
import Products from '../products/products.contextual';
import './dashboard.dbss.scss';
import DashboardHeroImage from './dashboard_hero.jpg';
import PurchaseAllowance from './purchaseAllowance/purchase.allowance.contextual';

class DashboardDbss extends React.Component {
  componentDidMount() {
    this.props.retrieveConvergentBillerSummary();

    if (this.props.accountsNeedRefreshed) {
      this.props.retrieveAccountInformation();
    }
    if (this.props.subscriberFirstName) {
      this.props.fetchMessages();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.subscriberFirstName !== this.props.subscriberFirstName) {
      this.props.fetchMessages();
    }
  }

  render() {
    const { hasPennyPlayProduct, shouldShowOTTGuidedExperience, subscriberFirstName, t } = this.props;
    const { media } = this.context;
    const isDesktopSize = media.includes(MEDIA_CONTEXT_SIZES.LARGE);

    return (
      <React.Fragment>
        {hasPennyPlayProduct && shouldShowOTTGuidedExperience && (
          <OTTGuidedExperience />
        )}
        <MetaData title={t(LocaleKeys.META_DATA.ACCOUNT.TITLE)} description={t(LocaleKeys.META_DATA.ACCOUNT.DESCRIPTION)} />
        <DashboardHero
          header={t(LocaleKeys.DASHBOARD.WELCOME, {
            firstName: subscriberFirstName
          })}
          imageUrls={{
            basic: DashboardHeroImage,
            webp: `${DashboardHeroImage}.webp`
          }}
          variant="light"
        />
        <PageContent variant="aside-right" className="c-dashboard">
          <Main>
            <Notifications />
            {!isDesktopSize && <PurchaseAllowance isDesktopSize={false} />}
            <Products />
          </Main>
          {isDesktopSize && (
            <Aside>{<PurchaseAllowance isDesktopSize />}</Aside>
          )}
        </PageContent>
      </React.Fragment>
    );
  }
}

DashboardDbss.displayName = 'DashboardDbss';
DashboardDbss.propTypes = {
  /** True if the accounts need to be refreshed. */
  accountsNeedRefreshed: PropTypes.bool.isRequired,
  /** Action to refresh subscriber messages. */
  fetchMessages: PropTypes.func.isRequired,
  /** True if the user has the play product on their account. */
  hasPennyPlayProduct: PropTypes.bool.isRequired,
  /** Function to retrieve the ConvergentBillerAccounts */
  retrieveAccountInformation: PropTypes.func.isRequired,
  /** Retrieve convergent biller summary action */
  retrieveConvergentBillerSummary: PropTypes.func.isRequired,
  /** True if the user has not dismissed the guided experience before */
  shouldShowOTTGuidedExperience: PropTypes.bool.isRequired,
  /** First name of the logged in subscriber */
  subscriberFirstName: PropTypes.string,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default withI18n()(DashboardDbss);
DashboardDbss.contextType = AppContext;
