import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import { AppContext } from 'selfcare-ui/src/components/appContext/app.context';
import Flag from 'selfcare-ui/src/components/flag/flag';
import Heading from 'selfcare-ui/src/components/heading/heading';
import { MEDIA_CONTEXT_SIZES } from 'selfcare-ui/src/components/mediaContext/media.context.constants';
import NeedAssistance from 'selfcare-ui/src/components/needAssistance/need.assistance';
import IconBell from 'selfcare-ui/src/icons/react-icons/bell';
import LocaleKeys from '../../../locales/keys';
import { getSupportRequestsNavItem } from '../../../navigation/sitemap.selectors';
import BackBanner from '../../backBanner/back.banner';
import './support.request.details.header.scss';


const SupportRequestDetailsHeader = ({ requestDetails, t }) => (
  <AppContext.Consumer>
    {({ media }) => {
      // ToDo: Reference accurate number for support line
      const secondItem = <Flag icon={<IconBell />} text="(555)-555-5555" />;
      return (
        <div className="c-support-request-details-header">
          <BackBanner text={t(LocaleKeys.NAVIGATOR.SUPPORT_REQUESTS)} route={getSupportRequestsNavItem().url} />
          <Heading className="c-support-request-details-header__heading">
            {requestDetails ? requestDetails.Summary.replace('-', ': ') : null}
            {media.includes(MEDIA_CONTEXT_SIZES.LARGE) &&
                            <NeedAssistance className="c-support-request-details-header__need-assistance" secondGroup={secondItem} />
            }
          </Heading>
        </div>
      );
    }}
  </AppContext.Consumer>
);

SupportRequestDetailsHeader.displayName = 'SupportRequestDetailsHeader';
SupportRequestDetailsHeader.propTypes = {
  /** Details to be used to display information. */
  requestDetails: PropTypes.shape({
    Id: PropTypes.shape({
      Value: PropTypes.string
    }),
    Summary: PropTypes.string
  }),
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default withI18n()(SupportRequestDetailsHeader);
