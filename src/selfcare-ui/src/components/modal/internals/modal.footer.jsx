import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CardFooter } from '../../card/card';

import './modal.footer.scss';

const ModalFooter = (props) => (
  <CardFooter
    appearance={props.appearance || props.dialogStyle ? 'seamless' : 'normal'}
    variant={props.variant}
    className={classNames('c-modal-footer', props.className)}
  >
    {props.buttons}
  </CardFooter>
);

ModalFooter.displayName = 'ModalFooter';
ModalFooter.propTypes = {
  /** Conditionally render a border */
  appearance: PropTypes.oneOf(['normal', 'seamless']),
  /** The buttons to be rendered in the footer of the modal */
  buttons: PropTypes.node.isRequired,
  /** Display heading with default dialog style instead of normal modal style */
  dialogStyle: PropTypes.bool,
  /** Class name to be put on the first element of the modal to customize based on implementation */
  className: PropTypes.string,
  /** Variant type to be passed to CardFooter */
  variant: PropTypes.oneOf(['action', 'auto'])
};
ModalFooter.defaultProps = {
  dialogStyle: false,
  variant: 'action'
};

export default ModalFooter;
