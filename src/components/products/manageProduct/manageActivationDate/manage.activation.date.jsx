import format from 'date-fns/format';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import isEmpty from 'ramda/src/isEmpty';
import path from 'ramda/src/path';
import React, { useEffect, useState } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import OutlineButton from 'selfcare-ui/src/components/button/outline.button';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Notice from 'selfcare-ui/src/components/notice/notice';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import LocaleKeys from '../../../../locales/keys';
import { getProductsNavItem } from '../../../../navigation/sitemap.selectors';
import { ProductTypes } from '../../../../redux/products/products.actions';
import DatePicker from '../../../datePicker/date.picker';
import PageContent from '../../../pageContent/page.content';
import './manage.activation.date.scss';

const ManageActivationDate = ({ apiFault, clearAPIFault, history, isHandlingProductAction, productDefaults, productIdentifier, retrieveProductMetadata, searchSupportRequests, selectedProduct, supportRequest, t, updateActivationDate, updateFutureActivationDateInStore, offeringContextsByInstanceId, activeOfferInstanceId }) => {
  const [editFlag, setEditFlag] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessful, setSaveSuccessful] = useState(false);
  const [activationDate, setActivationDate] = useState(selectedProduct.futureActivationDate);

  useEffect(() => {
    if (!isEmpty(offeringContextsByInstanceId) && !isEmpty(offeringContextsByInstanceId[activeOfferInstanceId])) {
      retrieveProductMetadata(productIdentifier);
    }
  }, [productIdentifier, retrieveProductMetadata, offeringContextsByInstanceId, activeOfferInstanceId]);

  // On refresh of the edit activation date page I am seeing an error with an unrelated API call. This clears that error.
  useEffect(() => {
    const { BEGIN, FAILURE } = ProductTypes.ModifyScheduledDate;
    if (apiFault && apiFault.trigger && apiFault.trigger !== BEGIN && apiFault.trigger !== FAILURE) {
      clearAPIFault();
    }
  }, [apiFault, clearAPIFault]);

  useEffect(() => {
    searchSupportRequests();
  }, [searchSupportRequests]);

  useEffect(() => {
    setActivationDate(selectedProduct.futureActivationDate);
  }, [selectedProduct.futureActivationDate]);


  const navigateBack = () => {
    const instanceId = path(['offeringInstanceId'], selectedProduct);
    const id = path(['offeringId'], selectedProduct);
    const route = `${getProductsNavItem().url}/${id}-${instanceId}`;
    history.push(route);
  };

  const getRange = () => {
    const range = selectedProduct.isWireless ? 45 : 60;
    return range;
  };

  const initialActionButtons = () => (
    <div className="c-manage-activation-date__buttons">
      <OutlineButton
        className="c-manage-activation-date__left"
        onClick={navigateBack}
      >
        {t(LocaleKeys.PRODUCTS.SETTINGS.ACTIVATION_DATE_BACK_BUTTON)}
      </OutlineButton>
      <FilledButton
        className="c-manage-activation-date__right"
        onClick={() => {
          setEditFlag(true);
        }}
      >
        {t(LocaleKeys.PRODUCTS.SETTINGS.ACTIVATION_DATE_CHANGE_BUTTON)}
      </FilledButton>
    </div>
  );

  const backActionButton = () => (
    <OutlineButton
      onClick={navigateBack}
    >
      {t(LocaleKeys.PRODUCTS.SETTINGS.ACTIVATION_DATE_BACK_BUTTON)}
    </OutlineButton>
  );

  const onChangeActivationDate = async () => {
    setIsSaving(true);
    const response = await updateActivationDate('Update', supportRequest, selectedProduct.offeringInstanceId, format(activationDate, 'YYYY-MM-DD'));
    setIsSaving(false);

    if (response.Status === 'Success') {
      setEditFlag(false);
      setSaveSuccessful(true);
      updateFutureActivationDateInStore(format(activationDate, 'YYYY-MM-DD'));
    }
  };

  const displayInitialActivationDate = () => (
    <>
      <Paragraph className="c-manage-activation-date__text">
        {t(LocaleKeys.PRODUCTS.SETTINGS.ACTIVATION_DATE_TEXT)}
      </Paragraph>
      <div className="c-manage-activation-date__text">
        <Heading className="c-manage-activation-date__label" category="minor" tone="normal">{t(LocaleKeys.PRODUCTS.SETTINGS.ACTIVATION_DATE)}</Heading>
        <Heading category="minor" tone="normal">{format(activationDate, 'YYYY-MM-DD')}</Heading>
      </div>
      {saveSuccessful ? backActionButton() : initialActionButtons()}
    </>
  );

  const displayChangeActivationDate = () => (
    <>
      <Paragraph className="c-manage-activation-date__text">
        {t(LocaleKeys.PRODUCTS.SETTINGS.ACTIVATION_DATE_TEXT)}
      </Paragraph>
      <div className="c-manage-activation-date__text">
        <DatePicker
          allowNonBusinessDays
          id="edit-activation-date"
          initialValue={new Date(`${format(activationDate, 'YYYY-MM-DD')}T00:00:00`)}
          labelText={t(LocaleKeys.PRODUCTS.SETTINGS.ACTIVATION_DATE)}
          onDayChange={(day) => {
            setActivationDate(format(day, 'YYYY-MM-DD'));
          }}
          size="large"
          maxDays={productDefaults.maxDays}
          minDays={productDefaults.minDays}
          range={getRange()}
        />
      </div>
      <div className="c-manage-activation-date__buttons">
        <OutlineButton
          className="c-manage-activation-date__left"
          onClick={() => {
            setActivationDate(selectedProduct.futureActivationDate);
            setEditFlag(false);
          }}
        >
          {t(LocaleKeys.PRODUCTS.SETTINGS.ACTIVATION_DATE_CANCEL_BUTTON)}
        </OutlineButton>
        <FilledButton
          className="c-manage-activation-date__right"
          onClick={onChangeActivationDate}
        >
          {t(LocaleKeys.PRODUCTS.SETTINGS.ACTIVATION_DATE_CHANGE_BUTTON)}
        </FilledButton>
      </div>
    </>
  );

  return (
    <PageContent>
      <div className="c-loading-indicator-containment">
        <LoadingIndicator isLoading={isHandlingProductAction || isSaving} />
        <Heading className="c-manage-activation-date__heading" category="brand" tone="normal">
          {t(LocaleKeys.PRODUCTS.SETTINGS.ACTIVATION_DATE)}
        </Heading>
        {apiFault && (
          <div className="c-manage-activation-date__notice">
            <Notice
              apiFault={apiFault}
              type="error"
              heading={apiFault.translatedMessage}
            />
          </div>
        )}
        {saveSuccessful && (
          <div className="c-manage-activation-date__notice">
            <Notice
              type="success"
              heading={t(LocaleKeys.PRODUCTS.SETTINGS.ACTIVATION_DATE_SUCCESS)}
            />
          </div>
        )}
        {editFlag ? displayChangeActivationDate() : displayInitialActivationDate()}
      </div>
    </PageContent>
  );
};

ManageActivationDate.displayName = 'ManageActivationDate';
ManageActivationDate.propTypes = {
  /** Application fault */
  apiFault: PropTypes.shape({
    trigger: PropTypes.string.isRequired,
    translatedMessage: PropTypes.string.isRequired
  }),
  /** Action used to clear the api fault when changing betweeen addresses. */
  clearAPIFault: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Flag for when a product action is being utilized and the loading indicator should be triggered. */
  isHandlingProductAction: PropTypes.bool,
  productDefaults: PropTypes.shape({
    /** The number of days in the future to set the default date value */
    defaultDays: PropTypes.number,
    /** The number of days in the future to set the max date value */
    maxDays: PropTypes.number,
    /** The number of days in the future to set the min date value */
    minDays: PropTypes.number
  }),
  /** Product Identifier */
  productIdentifier: PropTypes.number,
  /** Retrieve Product Metadata */
  retrieveProductMetadata: PropTypes.func.isRequired,
  /** The cooresponding support request for the product */
  supportRequest: PropTypes.string,
  /** Lookup support requests for the current user */
  searchSupportRequests: PropTypes.func.isRequired,
  /** Selected product to perform actions against. */
  selectedProduct: PropTypes.shape({
    /** The date the product will be activated */
    futureActivationDate: PropTypes.string,
    /** Offering Instance Id */
    offeringInstanceId: PropTypes.string,
    /** Is Wireless? */
    isWireless: PropTypes.bool
  }),
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** The id of the future activation date based on the environment */
  updateFutureActivationDateInStore: PropTypes.func.isRequired,
  /** Update the future activation date for the selected product */
  updateActivationDate: PropTypes.func.isRequired,
  offeringContextsByInstanceId: PropTypes.object,
  activeOfferInstanceId: PropTypes.string
};

export default compose(
  withI18n(),
  withRouter
)(ManageActivationDate);
