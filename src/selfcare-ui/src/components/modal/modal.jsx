import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Card from '../card/card';
import LoadingIndicator from '../loadingIndicator/loading.indicator';
import Overlay from '../overlay/overlay';
import ModalButtons from './internals/modal.buttons';
import ModalContent from './internals/modal.content';
import ModalFooter from './internals/modal.footer';
import ModalHeader from './internals/modal.header';
import './modal.scss';


const Modal = (props) => (
  <Overlay>
    <Card
      appearance="flat"
      className={classNames('c-modal',
        'c-loading-indicator-containment',
        `c-modal--${props.size}`,
        props.className, {
          'c-modal--mobile-viewport': props.isMobileViewport
        })}
    >
      <ModalHeader
        appearance={props.appearance}
        className={props.headingClassName}
        heading={props.heading}
        onClose={props.onClose}
      />
      <ModalContent className={props.contentClassName} content={props.content} />
      {props.buttons && <ModalFooter appearance={props.appearance} buttons={props.buttons} variant={props.footerVariant} />}
      <LoadingIndicator isLoading={props.isLoading} />
    </Card>
  </Overlay>
);

Modal.displayName = 'Modal';
Modal.propTypes = {
  /** Conditionally render a border */
  appearance: PropTypes.oneOf(['normal', 'seamless']),
  /** The buttons to be rendered in the footer of the modal */
  buttons: PropTypes.node,
  /** Class name to be put on the first element of the modal to customize based on implementation */
  className: PropTypes.string,
  /** The contents of the modal */
  content: PropTypes.node.isRequired,
  /** Class name to be passed on to the content component */
  contentClassName: PropTypes.string,
  /** Variant value to pass to footer */
  footerVariant: PropTypes.oneOf(['action', 'auto']),
  /** Heading */
  heading: PropTypes.node,
  /** Class name to be passed on to the header component */
  headingClassName: PropTypes.string,
  /** Flag to determine if the modal is in a loading state or not. */
  isLoading: PropTypes.bool,
  /** Whether the modal should be the full size of the viewport on small screens */
  isMobileViewport: PropTypes.bool,
  /** The close function callback for handling the `X` being clicked */
  onClose: PropTypes.func.isRequired,
  /** Size for the dialog */
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};
Modal.defaultProps = {
  appearance: 'seamless',
  isMobileViewport: true,
  size: 'medium'
};

export default Modal;
export { ModalButtons };
