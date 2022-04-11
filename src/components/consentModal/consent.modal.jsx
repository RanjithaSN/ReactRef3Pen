import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'selfcare-ui/src/components/modal/modal';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import './consent.modal.scss';

const ConsentModal = ({ consentAgreement, closeModal, heading }) => {
  return (
    <Modal
      appearance="seamless"
      heading={heading}
      onClose={closeModal}
      content={(
        <Paragraph className="c-consent-modal__text" tone="normal">{consentAgreement}</Paragraph>
      )}
      size="medium"
    />
  );
};

ConsentModal.propTypes = {
  /** Details of the consent */
  consentAgreement: PropTypes.string.isRequired,
  /** Callback to close the modal */
  closeModal: PropTypes.func.isRequired,
  /** Title of the consent */
  heading: PropTypes.string.isRequired
};

export default ConsentModal;
