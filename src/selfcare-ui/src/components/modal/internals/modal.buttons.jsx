import PropTypes from 'prop-types';
import React from 'react';
import FilledButton from '../../button/filled.button';
import OutlineButton from '../../button/outline.button';
import './modal.buttons.scss';

const ModalButtons = ({ primaryAction, primaryText, secondaryAction, secondaryText }) => (
  <React.Fragment>
    {secondaryAction && (
      <OutlineButton
        className="c-modal-button__button c-button-double"
        onClick={secondaryAction}
      >
        {secondaryText}

      </OutlineButton>
    )}
    {primaryAction && (
      <FilledButton
        className="c-modal-button__button c-button-double"
        onClick={primaryAction}
      >
        {primaryText}
      </FilledButton>
    )}
  </React.Fragment>
);

ModalButtons.displayName = 'ModalButtons';
ModalButtons.propTypes = {
  /** Primary button onClick */
  primaryAction: PropTypes.func,
  /** Primary button text */
  primaryText: PropTypes.string,
  /** Secondary button onClick */
  secondaryAction: PropTypes.func,
  /** Secondary button text */
  secondaryText: PropTypes.string
};

export default ModalButtons;
