import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withI18n } from 'react-i18next';
import { apiFaultPropTypes } from 'selfcare-core/src/constants/api.fault.prop.types';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Modal, { ModalButtons } from 'selfcare-ui/src/components/modal/modal';
import Notice from 'selfcare-ui/src/components/notice/notice';
import LocaleKeys from '../../../locales/keys';
import './activate.product.modal.scss';

const ActivateProductModal = ({ activationRequestId, apiFault, isLoading, onClose, onActivate, t, ...props }) => {
  const [submitted, setSubmitted] = useState(false);

  const activate = async () => {
    setSubmitted(true);
    await props.fixedActivationRequest(activationRequestId);
    if (onActivate) {
      onActivate();
    }
    onClose();
  };

  return (
    <Modal
      className="c-activate-product-modal"
      heading={t(LocaleKeys.PRODUCTS.BILLING.ACTIVATE)}
      content={(
        <>
          {submitted && apiFault && (
            <Notice apiFault={apiFault} className="c-activate-product-modal__fault-notice" type="error" heading={apiFault.translatedMessage} />
          )}
          <Heading category="minor" tone="normal">
            {t(LocaleKeys.PRODUCTS.BILLING.ACTIVATE_MODAL_DESCRIPTION)}
          </Heading>
        </>
      )}
      buttons={(
        <ModalButtons
          primaryAction={activate}
          primaryText={t(LocaleKeys.PRODUCTS.BILLING.ACTIVATE)}
          secondaryAction={onClose}
          secondaryText={t(LocaleKeys.CANCEL)}
        />
      )}
      onClose={onClose}
      isLoading={isLoading}
    />
  );
};

ActivateProductModal.displayName = 'ActivateProductModal';
ActivateProductModal.propTypes = {
  /** activation support request case ID */
  activationRequestId: PropTypes.string.isRequired,
  /** An error message response kicked back from an API call */
  apiFault: apiFaultPropTypes,
  /** Action to activate the product that has the activationRequestID support case */
  fixedActivationRequest: PropTypes.func.isRequired,
  /** Flag to determine the state of the activation API call */
  isLoading: PropTypes.bool.isRequired,
  /** Callback when modal closes */
  onClose: PropTypes.func.isRequired,
  /** Callback when activation call has finished */
  onActivate: PropTypes.func,
  /** i18next */
  t: PropTypes.func.isRequired
};

export default withI18n()(ActivateProductModal);
