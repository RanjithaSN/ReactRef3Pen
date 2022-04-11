import { FallbackCurrencyLocale } from '@selfcare/core/constants/transaction.constants';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { withI18n } from 'react-i18next';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import Select from 'selfcare-ui/src/components/select/select';
import { formatCurrency, FORMAT_CURRENCY_FALLBACK } from 'selfcare-ui/src/utilities/localization/currency';
import LocaleKeys from '../../locales/keys';
import DashboardHero from '../dashboard/dashboardHero/dashboard.hero';
import PageContent, { Main } from '../pageContent/page.content';
import withAuth from '../withAuth/with.auth.contextual';
import { SWEDEN_NAME } from './roaming.constants';
import './roaming.details.scss';
import { FormattedRoamingObject, SwedenToCountryData } from './roaming.formatters';
import MetaData from '../pageMetaData/meta.data.handler.contextual';
import RoamingHeroImage from './roaming_hero.jpg';

const RoamingDetails = ({ locale, t }) => {
  const [formattedData, setFormattedData] = useState(null);
  const [swedenRoamingData, setSwedenRoamingData] = useState(null);
  const [topLevelCountry, setTopLevelCountry] = useState(null);
  const [subCountry, setSubCountry] = useState(SWEDEN_NAME);
  const [countryNames, setCountryNames] = useState(null);
  const [subCountryNames, setSubCountryNames] = useState(null);
  let currentCountrySwedenRoaming;

  useEffect(() => {
    if (!formattedData) {
      const data = FormattedRoamingObject();
      const tempCountryNames = Object.keys(data).sort();
      setCountryNames(tempCountryNames);
      setSwedenRoamingData(SwedenToCountryData());
      setTopLevelCountry(tempCountryNames[0]);
      data[SWEDEN_NAME] = {
        zoneId: 1
      };
      setFormattedData(data);
      setSubCountryNames(Object.keys(data).sort());
    }
  }, [formattedData]);

  if (formattedData) {
    currentCountrySwedenRoaming = swedenRoamingData[topLevelCountry];
  }

  const renderSwedenRoaming = () => (
    <div className="c-roaming-details__table-info">
      <div className="c-roaming-details__table-info-row">
        <div>{t(LocaleKeys.ROAMING_DETAILS.MOBILE)}</div>
        <div>
          {t(LocaleKeys.ROAMING_DETAILS.PER_MIN, {
            price: formatCurrency(currentCountrySwedenRoaming.toMobilePerMin, FallbackCurrencyLocale, locale, false)
          })}
        </div>
      </div>
      <div className="c-roaming-details__table-info-row">
        <div>{t(LocaleKeys.ROAMING_DETAILS.LANDLINE)}</div>
        <div>
          {t(LocaleKeys.ROAMING_DETAILS.PER_MIN, {
            price: formatCurrency(currentCountrySwedenRoaming.toFixedPerMin, FallbackCurrencyLocale, locale, false)
          })}
        </div>
      </div>
      <div className="c-roaming-details__table-info-row">
        <div>{t(LocaleKeys.ROAMING_DETAILS.TEXT)}</div>
        <div>
          {t(LocaleKeys.ROAMING_DETAILS.PER_TEXT, {
            price: formatCurrency(currentCountrySwedenRoaming.SMS, FallbackCurrencyLocale, locale, false)
          })}
        </div>
      </div>
      <div className="c-roaming-details__table-info-row">
        <div>{t(LocaleKeys.ROAMING_DETAILS.MMS)}</div>
        <div>
          {t(LocaleKeys.ROAMING_DETAILS.PER_MMS, {
            price: formatCurrency(currentCountrySwedenRoaming.MMS, FallbackCurrencyLocale, locale, false)
          })}
        </div>
      </div>
      <div className="c-roaming-details__table-info-row">
        <div>{t(LocaleKeys.ROAMING_DETAILS.CONNECTION_FEE)}</div>
        {formatCurrency(currentCountrySwedenRoaming.setupFee, FallbackCurrencyLocale, locale, false)}
      </div>
    </div>
  );

  const renderCommonTableRows = () => (
    <>
      <div className="c-roaming-details__table-info-row">
        <div>{t(LocaleKeys.ROAMING_DETAILS.RECEIVE_PHONE_CALLS)}</div>
        <div>
          {t(LocaleKeys.ROAMING_DETAILS.PER_MIN, {
            price: formatCurrency(formattedData[topLevelCountry].inboundCall, FallbackCurrencyLocale, locale, false)
          })}
        </div>
      </div>
      <div className="c-roaming-details__table-info-row">
        <div>{t(LocaleKeys.ROAMING_DETAILS.SEND_SMS)}</div>
        <div>
          {t(LocaleKeys.ROAMING_DETAILS.PER_TEXT, {
            price: formatCurrency(formattedData[topLevelCountry].smsUnitPrice, FallbackCurrencyLocale, locale, false)
          })}
        </div>
      </div>
      <div className="c-roaming-details__table-info-row">
        <div>{t(LocaleKeys.ROAMING_DETAILS.RECEIVE_SMS)}</div>
        <div>
          {t(LocaleKeys.ROAMING_DETAILS.PER_TEXT, {
            price: formatCurrency(0, FallbackCurrencyLocale, locale, false)
          })}
        </div>
      </div>
      <div className="c-roaming-details__table-info-row">
        <div>{t(LocaleKeys.ROAMING_DETAILS.MMS)}</div>
        <div>
          {t(LocaleKeys.ROAMING_DETAILS.PER_MMS, {
            price: formatCurrency(formattedData[topLevelCountry].mmsUnitPrice, FallbackCurrencyLocale, locale, false)
          })}
        </div>
      </div>
      <div className="c-roaming-details__table-info-row">
        <div>{t(LocaleKeys.ROAMING_DETAILS.CONNECTION_FEE)}</div>
        {formatCurrency(formattedData[topLevelCountry].connectionFee, FallbackCurrencyLocale, locale, false)}
      </div>
    </>
  );

  const renderTopLevelCountryToSubCountry = () => {
    const makeCallsCost = formatCurrency(formattedData[topLevelCountry].zoneRatesPerMinute[formattedData[subCountry].zoneId], FallbackCurrencyLocale, locale, false);

    // If we get the fallback, that means this country => country mapping is invalid
    if (makeCallsCost === FORMAT_CURRENCY_FALLBACK) {
      return (
        <div>
          {t(LocaleKeys.ROAMING_DETAILS.NO_ROAMING_AGREEMENT)}
        </div>
      );
    }
    return (
      <div className="c-roaming-details__table-info">
        <div className="c-roaming-details__table-info-row">
          <div>{t(LocaleKeys.ROAMING_DETAILS.MAKE_CALLS)}</div>
          <div>
            {t(LocaleKeys.ROAMING_DETAILS.PER_MIN, {
              price: makeCallsCost
            })}
          </div>
        </div>
        {renderCommonTableRows()}
      </div>
    );
  };

  const renderTopLevelCountryInfo = () => {
    if (!formattedData[topLevelCountry].camelRoaming) {
      return (
        <div>
          {t(LocaleKeys.ROAMING_DETAILS.NO_ROAMING_AGREEMENT)}
        </div>
      );
    }
    return (
      <div className="c-roaming-details__table-info">
        <div className="c-roaming-details__table-info-row">
          <div>{t(LocaleKeys.ROAMING_DETAILS.MAKE_CALLS)}</div>
          <div>
            {t(LocaleKeys.ROAMING_DETAILS.PER_MIN, {
              price: formatCurrency(formattedData[topLevelCountry].outboundCall, FallbackCurrencyLocale, locale, false)
            })}
          </div>
        </div>
        {renderCommonTableRows()}
        <div className="c-roaming-details__table-info-row">
          <div>{t(LocaleKeys.ROAMING_DETAILS.BROWSE_WITHOUT_PACKAGE)}</div>
          <div>
            {t(LocaleKeys.ROAMING_DETAILS.PER_MB, {
              price: formatCurrency(formattedData[topLevelCountry].dataPerMb, FallbackCurrencyLocale, locale, false)
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <DashboardHero
        header={t(LocaleKeys.ROAMING_DETAILS.HEADING)}
        imageUrls={{
          basic: RoamingHeroImage,
          webp: `${RoamingHeroImage}.webp`
        }}
      />
      <PageContent className="c-roaming-details" variant="flush">
        <MetaData title={t(LocaleKeys.META_DATA.ABROAD.TITLE)} description={t(LocaleKeys.META_DATA.ABROAD.DESCRIPTION)} />
        <Main>
          <Paragraph className="c-roaming-details__information">{t(LocaleKeys.ROAMING_DETAILS.INFORMATION)}</Paragraph>
          <div className="c-roaming-details__main-selector">
            <Select
              id="input_1"
              options={countryNames || []}
              selected={topLevelCountry || ''}
              onChange={(event) => setTopLevelCountry(event.target.value)}
            />
          </div>
          <div className="c-roaming-details__tables">
            {currentCountrySwedenRoaming && (
              <div>
                {/* Sweden to TOPLEVELCOUNTRY */}
                <Heading className="c-roaming-details__table-header" category="brand" tone="quiet">
                  {t(LocaleKeys.ROAMING_DETAILS.FROM_TO, {
                    from: SWEDEN_NAME,
                    to: topLevelCountry
                  })}
                </Heading>
                {renderSwedenRoaming()}
              </div>
            )}
            <div />
            {topLevelCountry && subCountry && (
              <div>
                {/* TOPLEVELCOUNTRY to SUBCOUNTRY */}
                <div className="c-roaming-details__table-header">
                  <Heading className="c-roaming-details__table-header-with-dropdown" category="brand" tone="quiet">
                    {t(LocaleKeys.ROAMING_DETAILS.FROM_TO, {
                      from: topLevelCountry
                    })}
                  </Heading>
                  <div className="c-roaming-details__sub-country-selector">
                    <Select
                      id="input_2"
                      options={subCountryNames || []}
                      selected={subCountry || ''}
                      onChange={(event) => setSubCountry(event.target.value)}
                    />
                  </div>
                </div>
                {renderTopLevelCountryToSubCountry()}
              </div>
            )}
            <div />
            <div>
              {/* TOPLEVELCOUNTRY overall Info */}
              <Heading className="c-roaming-details__table-header" category="brand" tone="quiet">
                {t(LocaleKeys.ROAMING_DETAILS.PRICES_IN, {
                  country: topLevelCountry
                })}
              </Heading>
              {formattedData && (renderTopLevelCountryInfo())}
            </div>
          </div>
        </Main>
      </PageContent>
    </>
  );
};

RoamingDetails.displayName = 'RoamingDetails';
RoamingDetails.propTypes = {
  /** Currently selected locale */
  locale: PropTypes.string.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default withAuth(withI18n()(RoamingDetails), {
  allowAccessWithoutAuth: true
});
