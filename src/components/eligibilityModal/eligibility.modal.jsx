import { useGoogleAnalytics } from '@selfcare/core/hooks/analytics';
import CoreLocaleKeys from '@selfcare/core/locales/keys';
import { FeasibilityTypes } from '@selfcare/core/redux/feasibility/feasibility.actions';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { withI18n } from 'react-i18next';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Input from 'selfcare-ui/src/components/input/input';
import InputField from 'selfcare-ui/src/components/inputField/input.field';
import Link from 'selfcare-ui/src/components/link/link';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Modal, { ModalButtons } from 'selfcare-ui/src/components/modal/modal';
import Notice from 'selfcare-ui/src/components/notice/notice';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import Select from 'selfcare-ui/src/components/select/select';
import { POSTAL_ZIP_CODE_REGEX } from '../../constants/postal.code';
import LocaleKeys from '../../locales/keys';
import './eligibility.modal.scss';

const EligibilityModal = ({ addressList, apiFault, areAddressesLoading, autoLaunchDismissed, className, clearAddresses, clearApiFault, defaultAddress, feasibilityAttributeData, feasibilityIsLoaded, feasibilityIsLoading, fetchAddresses, forceLaunch, hasSubmitted, onClose, retrieveSubscriberOffers, deselectCard, t }) => {

  const feasibilityAttributeRecord = feasibilityAttributeData && feasibilityAttributeData.address ? feasibilityAttributeData.address : '';

  const [eligibilityAddress, setEligibilityAddress] = useState(undefined);
  const [formError, setFormError] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(feasibilityAttributeRecord);
  const [submitted, setSubmitted] = useState(false);
  const areAddressesLoadingRef = useRef(areAddressesLoading);
  const forceLaunchRef = useRef(forceLaunch);
  const logAnalytic = useGoogleAnalytics();

  const noAddressesAvailableGoogleString = 'No address available on postalcode';

  const createAnalytic = useCallback(
    (eventDescription) => ({
      event: 'feasabilityCheck',
      eventInfo: {
        category: 'feasability',
        action: eventDescription,
        label: eventDescription === noAddressesAvailableGoogleString ? postalCode : selectedAddress,
        value: undefined,
        nonInteraction: false
      }
    }), [postalCode, selectedAddress],
  );

  useEffect(() => {
    if (apiFault && postalCode.match(POSTAL_ZIP_CODE_REGEX)) {
      switch (apiFault.trigger) {
        case FeasibilityTypes.FETCH_ADDRESSES.BEGIN:
          logAnalytic(createAnalytic(noAddressesAvailableGoogleString));
          break;
        case FeasibilityTypes.RETRIEVE_SUBSCRIBER_OFFERS.BEGIN:
          logAnalytic(createAnalytic('Coax not eligable on address'));
          break;
        default:
          logAnalytic(createAnalytic(apiFault.translatedMessage));
      }
    }
  }, [apiFault, postalCode, logAnalytic, createAnalytic]);

  const openModal = () => {
    setEligibilityAddress(null);
    setIsModalOpen(true);
  };

  /**
   * resetModal - reset the values/state for the modal popup
   */
  const resetModal = () => {
    setPostalCode('');
    setSelectedAddress('');
    hasSubmitted(false);
    clearAddresses();
    onClose();
  }

  const hiddenKeyboard = () => {
    document.activeElement.blur();
  };

  /**
 * useEffect
 * if the card was deselected, clear the address with feasibilityAttributeData
 */
   useEffect(() => {
    if (deselectCard) {
      setSubmitted(false);
      resetModal();
    }
  }, [deselectCard]);

  useEffect(() => {
    if (
      (areAddressesLoading && (areAddressesLoadingRef.current !== areAddressesLoading)) ||
      (forceLaunch && (forceLaunchRef.current !== forceLaunch))
    ) {
      areAddressesLoadingRef.current = areAddressesLoading;
      forceLaunchRef.current = forceLaunchRef;
      if (((!defaultAddress && !autoLaunchDismissed && !areAddressesLoading) || forceLaunch)) {
        openModal();
      }
    }
    // set the default values in the address dropdown after entering the postal code sucess
    if (addressList.length > 0 && selectedAddress === '' && postalCode !== '') {
      hiddenKeyboard();
      setSelectedAddress(addressList[0].value);
    }
  }, [areAddressesLoading, forceLaunch, addressList, selectedAddress, defaultAddress, autoLaunchDismissed]);

  /**
   * closeModal -  Invoke while clicking on cancel or close button in the modal popup
   */
  const closeModal = () => {
    setEligibilityAddress(null);
    setIsModalOpen(false); // set to false to close the modal popup
    setSubmitted(false); // remove the error scenario in popup
    setSelectedAddress(feasibilityAttributeRecord);
    // if selection is not available, reset all the modal values & links
    if (!feasibilityAttributeRecord) {
      resetModal();
    }
    if (apiFault) {
      clearApiFault();
    }
  };

  const updateParentAndBlur = () => {
    setFormError(postalCode && !postalCode.match(POSTAL_ZIP_CODE_REGEX) ? t(LocaleKeys.SUBSCRIBER.POSTAL_ZIP_CODE_FORMAT_ERROR) : undefined);
  };

  const handleChanges = (evt) => {
    if (apiFault) {
      clearApiFault();
    }

    const newPostalCode = evt.target.value.replace(/[^\d]/g, '').replace(/(.{3})/g, '$1 ').trim();
    const isValid = Boolean(newPostalCode && newPostalCode.match(POSTAL_ZIP_CODE_REGEX));

    setSubmitted(isValid);
    setPostalCode(newPostalCode);
    setFormError(undefined);

    if (isValid && newPostalCode !== pathOr('', ['postal_code'], eligibilityAddress)) {
      clearApiFault();
      setSelectedAddress('');
      fetchAddresses(newPostalCode);
    }
    setEligibilityAddress({
      ...eligibilityAddress,
      postal_code: newPostalCode
    });
  };

  const handleAddressChange = async (newSelectedAddress) => {
    await clearApiFault();
    setSelectedAddress(newSelectedAddress);
  };

  const handleSubmit = async () => {
    if (!selectedAddress) {
      setFormError(t(LocaleKeys.ELIGIBILITY.ERROR_STATE));
    } else {
      await retrieveSubscriberOffers(selectedAddress);
      setSubmitted(true);
      hasSubmitted(true);
      setIsModalOpen(false);
      onClose();
      logAnalytic(createAnalytic('Eligible for Penny Coax'));
    }
  };

  return (
    <div className={classNames('c-eligibility-modal', className)}>
      <div className="c-eligibility-modal__offers-for">
        {selectedAddress && (
          <React.Fragment>
            <Heading tone="quiet">
              {t(LocaleKeys.OFFER_SUMMARY.AVAILABLE_OFFERS_FOR, {
                address: pathOr('', ['label'], addressList.find(({ value }) => value === Number(selectedAddress)))
              })}
              <Link className="c-eligibility-modal__change" onClick={openModal}>{t(LocaleKeys.PRODUCTS.SETTINGS.CHANGE)}</Link>
            </Heading>
          </React.Fragment>
        )}
      </div>
      {isModalOpen &&
        (
          <Modal
            className="c-loading-indicator-containment"
            heading={t(LocaleKeys.ELIGIBILITY.CONFIRM_YOUR_LOCATION)}
            onClose={closeModal}
            content={(
              <form>
                <LoadingIndicator isLoading={feasibilityIsLoading} />
                <Paragraph>{t(LocaleKeys.ELIGIBILITY.LOCATION_MODAL_DESCRIPTION)}</Paragraph>
                {/* Display notice if the API returns zero addresses and doesn't throw a fault */}
                {submitted && !apiFault && addressList.length === 0 && feasibilityIsLoaded && (
                  <div className="c-eligibility-modal__section">
                    <Notice type="error" heading={t(`${CoreLocaleKeys.FAULT_PREFIX}1117`)} />
                  </div>
                )}

                {submitted && apiFault && (
                  <div className="c-eligibility-modal__section">
                    <Notice apiFault={apiFault} type="error" heading={apiFault.translatedMessage} />
                  </div>
                )}
                <InputField
                  className="c-eligibility-modal__section"
                  input={(
                    <Input
                      onChange={handleChanges}
                      id="postalCode"
                      type="text"
                      name="postalCode"
                      onBlur={updateParentAndBlur}
                      value={postalCode}
                      maxLength={6}
                    />
                  )}
                  required
                  key="postal_code"
                  labelText={t(LocaleKeys.SUBSCRIBER.POSTAL_ZIP_CODE)}
                  info={t(LocaleKeys.SUBSCRIBER.POSTAL_ZIP_CODE_FORMAT)}
                  error={formError}
                  size="full"
                />
                {Boolean(postalCode) && addressList.length > 0 && (
                  <div>
                    <div className="c-with-standard-size--full" />
                    <InputField
                      onChange={(event) => handleAddressChange(event.target.value)}
                      input={<Select
                        id="feasibility-address-list"
                        options={addressList}
                        selected={selectedAddress}
                      />}
                      required
                      key="feasibility-address-list"
                      labelText={t(LocaleKeys.ELIGIBILITY.ADDRESSES)}
                      size="full"
                    />
                  </div>
                )}


              </form>
            )}
            buttons={(
              <ModalButtons
                primaryAction={handleSubmit}
                primaryText={t(LocaleKeys.ELIGIBILITY.TEST_ELIGIBILITY)}
                secondaryAction={closeModal}
                secondaryText={t(LocaleKeys.CANCEL)}
              />
            )}
            size="small"
          />
        )}
    </div>
  );
};

EligibilityModal.displayName = 'EligibilityModal';
EligibilityModal.propTypes = {
  /** Array of addresses for a given postal code */
  addressList: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string
  })),
  /** An error message response kicked back from an API call */
  apiFault: PropTypes.shape({
    translatedMessage: PropTypes.string.isRequired,
    trigger: PropTypes.string.isRequired
  }),
  /** true if addresses are currently loading. */
  areAddressesLoading: PropTypes.bool,
  /* whether the modal has been closed by the user before */
  autoLaunchDismissed: PropTypes.bool,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Action used to clear the api fault when changing betweeen addresses. */
  clearApiFault: PropTypes.func.isRequired,
  /** State action used to clear out the address store. */
  clearAddresses: PropTypes.func,
  /** current address */
  defaultAddress: PropTypes.object,
  /** Boolean to determin if feasibility has loaded */
  feasibilityIsLoaded: PropTypes.bool,
  /** Boolean value to determine if feasibility is laoding */
  feasibilityIsLoading: PropTypes.bool,
  /** Function used to fetch all addresses for a given zip code */
  fetchAddresses: PropTypes.func,
  /** Flag to tell component to force a launch because of another restricted action */
  forceLaunch: PropTypes.bool,
  /** Flag to tell the parent component that the feasibility check was successful */
  hasSubmitted: PropTypes.func.isRequired,
  /** Callback for when the form is closed for any reason */
  onClose: PropTypes.func.isRequired,
  /** Callback for when the address form is submitted */
  retrieveSubscriberOffers: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default withI18n()(EligibilityModal);
