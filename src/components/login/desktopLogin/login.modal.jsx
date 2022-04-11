import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withI18n } from 'react-i18next';
import Modal from 'selfcare-ui/src/components/modal/modal';
import LocaleKeys from '../../../locales/keys';
import LoginContainer from './login.container';

const LoginModal = ({ closeModal, t }) => {
  const [loginHeader, setLoginHeader] = useState(LocaleKeys.LOGIN_FORM.PANEL_HEADING);
  return (
    <div>
      <Modal
        appearance="seamless"
        heading={t(loginHeader)}
        onClose={closeModal}
        content={<LoginContainer closeModal={closeModal} headerController={setLoginHeader} />}
        size="small"
      />
    </div>
  );
};

LoginModal.propTypes = {
  /** Callback to close the modal */
  closeModal: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default withI18n()(LoginModal);
