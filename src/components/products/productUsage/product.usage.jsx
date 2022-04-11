import subMonths from 'date-fns/sub_months';
import PropTypes from 'prop-types';
import path from 'ramda/src/path';
import React, { useEffect, useState } from 'react';
import { withI18n } from 'react-i18next';
import Heading from 'selfcare-ui/src/components/heading/heading';
import IconButton from 'selfcare-ui/src/components/iconButton/icon.button';
import ZeroState from 'selfcare-ui/src/components/zeroState/zero.state';
import IconAngleLeft from 'selfcare-ui/src/icons/react-icons/angle-left';
import IconAngleRight from 'selfcare-ui/src/icons/react-icons/angle-right';
import LocaleKeys from '../../../locales/keys';
import { ENTITLEMENT_ADDITIONAL_DATA, ENTITLEMENT_UNIT_TYPE } from '../../../redux/products/products.constants';
import UsageBarInfo from '../../usage/usageBar/usage.bar.info';
import BarGraph from 'selfcare-ui/src/components/barGraph/bar.graph';
import './product.usage.scss';


const ProductUsage = ({ bonusData, currentLocale, entitlements, retrieveUsageDetails, roamingByServiceId, selectedProduct, t, usageDetails }) => {
  const CURRENT_USAGE_VIEW = 1;
  const PREVIOUS_USAGE_VIEW = 0;
  const USAGE_SELECTIONS = [
    LocaleKeys.PRODUCTS.USAGE_DETAILS.PREVIOUS,
    LocaleKeys.PRODUCTS.USAGE_DETAILS.CURRENT
  ];
  const [selectedSection, setSelectedSection] = useState(CURRENT_USAGE_VIEW);
  // eslint-disable-next-line no-unused-vars
  const [currentServiceId, setCurrentServiceId] = useState(false);
  const [selectedEntitlement, setSelectedEntitlement] = useState([]);
  const [indexOfMainData, setIndexOfMainData] = useState(null);
  const [roamingObject, setRoamingObject] = useState(null);

  useEffect(() => {
    if (currentServiceId && (entitlements && entitlements[currentServiceId] && entitlements[currentServiceId].length && !selectedEntitlement.length)) {
      setSelectedEntitlement(entitlements[currentServiceId] || []);
    }
  }, [currentServiceId, entitlements, selectedEntitlement]);

  useEffect(() => {
    if (!currentServiceId && selectedProduct.serviceIdentifier && selectedProduct.hasFirstUsage) {
      setCurrentServiceId(selectedProduct.serviceIdentifier);

      const MONTHS_OF_USAGE = 4;
      const service = {
        ServiceIdentifierName: null,
        Value: selectedProduct.serviceIdentifier
      };
      const endDate = new Date();
      const startDate = subMonths(endDate, MONTHS_OF_USAGE);

      retrieveUsageDetails(service, startDate, endDate);
      setSelectedSection(CURRENT_USAGE_VIEW);
    }
  }, [selectedProduct, currentServiceId, retrieveUsageDetails]);

  useEffect(() => {
    setIndexOfMainData(selectedEntitlement.findIndex((entitlement) => {
      if (entitlement.BalanceUnitCode === ENTITLEMENT_UNIT_TYPE.MOBILE_DATA && !ENTITLEMENT_ADDITIONAL_DATA.includes(entitlement.EntitlementName)) {
        if (bonusData) {
          return path(['EntitlementIdentifier', 'SubscriberProductId'], entitlement) !== path(['EntitlementIdentifier', 'SubscriberProductId'], bonusData);
        }
        return true;
      }
      return false;
    }));
  }, [bonusData, selectedEntitlement]);

  useEffect(() => {
    if (currentServiceId) {
      setRoamingObject(roamingByServiceId[currentServiceId]);
    }
  }, [currentServiceId, roamingByServiceId]);

  return (
    <div className="c-product-usage">
      <Heading category="minor" className="c-product-usage__heading" tone="normal">{t(LocaleKeys.PRODUCTS.USAGE_DETAILS.DESCRIPTION)}</Heading>
      <div className="c-product-usage__menu">
        <IconButton
          className="c-product-usage__menu--button"
          onClick={() => {
            setSelectedSection(PREVIOUS_USAGE_VIEW);
          }}
          kind="transparent"
          disabled={selectedSection === PREVIOUS_USAGE_VIEW || !usageDetails.length}
          icon={<IconAngleLeft />}
        />
        <Heading category="major" tone="quiet">{t(USAGE_SELECTIONS[selectedSection])}</Heading>
        <IconButton
          className="c-product-usage__menu--button"
          onClick={() => {
            setSelectedSection(CURRENT_USAGE_VIEW);
          }}
          kind="transparent"
          disabled={selectedSection === CURRENT_USAGE_VIEW}
          icon={<IconAngleRight />}
        />
      </div>
      {selectedSection === CURRENT_USAGE_VIEW && !selectedEntitlement.length && <ZeroState description={t(LocaleKeys.PRODUCTS.USAGE_DETAILS.ZERO_STATE_DESCRIPTION)} />}
      {selectedSection === CURRENT_USAGE_VIEW && selectedEntitlement.map((entitlement, index) => (
        <UsageBarInfo
          locale={currentLocale}
          entitlement={entitlement}
          key={`${entitlement.EntitlementName + index}`}
          rolloverData={index !== indexOfMainData}
          bonusData={bonusData}
          roamingData={roamingObject}
        />
      ))}
      {selectedSection === PREVIOUS_USAGE_VIEW && (
        <div className="c-product-usage__graph">
          <BarGraph xAxisKey="month" data={usageDetails} dataKey="usage" />
        </div>
      )}
    </div>
  );
};

ProductUsage.propTypes = {
  /** The bonus data for the selected product */
  bonusData: PropTypes.object,
  /** The selected locale */
  currentLocale: PropTypes.string,
  /** The entitlement data for the selected product */
  entitlements: PropTypes.object,
  /** Returns object referenced by phone number to determine if current service has roaming data. */
  roamingByServiceId: PropTypes.object,
  /** Function to retrieve the selected products usage details */
  retrieveUsageDetails: PropTypes.func.isRequired,
  // /** Selected product as defined by the identifier value in the list of products */
  selectedProduct: PropTypes.shape({
    /** True if the subscriber has triggered first usage for this product. */
    hasFirstUsage: PropTypes.bool,
    /** The service identifier to get usage data */
    serviceIdentifier: PropTypes.string
  }),
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Usage Details */
  usageDetails: PropTypes.arrayOf(PropTypes.object)
};

export default withI18n()(ProductUsage);
