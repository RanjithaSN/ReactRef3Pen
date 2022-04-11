import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CardBody } from '../../card/card';

import './modal.content.scss';

const ModalContent = (props) => (
  <CardBody className={classNames('c-modal-content', props.className)}>{props.content}</CardBody>
);

ModalContent.displayName = 'ModalContent';
ModalContent.propTypes = {
  /** Class name to be put on the first element of the modal to customize based on implementation */
  className: PropTypes.string,
  /** The contents of the modal */
  content: PropTypes.node.isRequired
};
ModalContent.defaultProps = {};

export default ModalContent;
