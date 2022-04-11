import LocaleKeys from '../../locales/keys';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import Modal, { ModalButtons } from 'selfcare-ui/src/components/modal/modal';
import React from 'react';
import PropTypes from 'prop-types';
import { withI18n, Trans } from 'react-i18next';

const InvalidStudentSSNModal = ({ t, closeModal, isOpen, updateOffers }) => {
  return (
    <>
      {isOpen && (
        <Modal
          heading={t(LocaleKeys.SHOP.INVALID_STUDENT_SSN_MODAL.TITLE)}
          onClose={closeModal}
          content={(
            <Paragraph>
              <Trans
                i18nKey={LocaleKeys.SHOP.INVALID_STUDENT_SSN_MODAL.DESCRIPTION}
                default={LocaleKeys.SHOP.INVALID_STUDENT_SSN_MODAL.DESCRIPTION}
                components={[
                  <a
                    href={t(
                      LocaleKeys.SHOP.INVALID_STUDENT_SSN_MODAL.MECENAT_URL
                    )}
                  >
                    placeholder
                  </a>
                ]}
              />
            </Paragraph>
          )}
          buttons={(
            <ModalButtons
              primaryAction={updateOffers}
              primaryText={t(
                LocaleKeys.SHOP.INVALID_STUDENT_SSN_MODAL.BACK_TO_LANDING_PAGE
              )}
              secondaryAction={closeModal}
              secondaryText={t(LocaleKeys.CANCEL)}
            />
          )}
          size="small"
        />
      )}
    </>
  );
};

InvalidStudentSSNModal.propTypes = {
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  updateOffers: PropTypes.func.isRequired
};
export default withI18n()(InvalidStudentSSNModal);
