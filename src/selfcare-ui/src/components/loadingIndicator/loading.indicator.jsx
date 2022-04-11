import OpaquePane from '../opaquePane/opaque.pane';
import styled, { keyframes } from 'styled-components';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isClientSide } from '../../../../helpers/ssr.helpers';
import './loading.indicator.scss';
import { color } from 'ui/theme/theme.helpers';

const scaleInOut = keyframes`
  0% {
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
  }
  50% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  100% {
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
  }
`;

const RedCircle = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  background-color: ${color('accentSecondary')};
  animation: ${scaleInOut} 1.5s cubic-bezier(.55,0,.53,1.04) infinite;
`;

const LoadingIndicator = ({ enableButtonFlip, isLoading }) => {
  const buttons = isClientSide() ? Object.values(document.getElementsByTagName('Button')) : [];
  const disabledActivatedButtons = buttons.filter((btn) => btn.getAttribute('previousDisabled'));
  const disabledButtons = buttons.filter((btn) => btn.disabled);
  const flipDisabled = (btnListToChangeDisabled, source, target) => {
    if (btnListToChangeDisabled.length) {
      btnListToChangeDisabled.forEach((btn) => {
        btn.setAttribute(target, btn.source);
        btn.removeAttribute(source);
      });
    }
  };

  useEffect(() => {
    if (enableButtonFlip) {
      if (!isLoading) {
        buttons.forEach((btn) => {
          btn.removeAttribute('disabled');
        });

        if (disabledActivatedButtons.length) {
          flipDisabled(disabledActivatedButtons, 'previousDisabled', 'disabled');
        }

      } else {
        if (disabledButtons.length) {
          flipDisabled(disabledButtons, 'disabled', 'previousDisabled');
        }

        buttons.forEach((btn) => {
          btn.setAttribute('disabled', 'disabled');
        });
      }
    }
  }, [isLoading, enableButtonFlip]);

  return (
    <div
      className={classNames('c-loading-indicator', {
        'is-loading': isLoading
      })}
    >
      <OpaquePane isLight />
      <div className="c-loading-indicator__spinner">
        <RedCircle />
      </div>
    </div>
  );
};

LoadingIndicator.displayName = 'LoadingIndicator';
LoadingIndicator.propTypes = {
  /** Do not disable button flip during loading */
  enableButtonFlip: PropTypes.bool,
  /** While true, the loading indicator will be displayed. */
  isLoading: PropTypes.bool
};

LoadingIndicator.defaultProps = {
  enableButtonFlip: false,
  isLoading: false
};

export default React.memo(LoadingIndicator);
