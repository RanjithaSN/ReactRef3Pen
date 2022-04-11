import IconClose from '../../../icons/react-icons/close';
import Button from '../../button/button';
import { CardHeader } from '../../card/card';
import Heading from '../../heading/heading';
import BrandMark from '../../../../../../src/components/brandMark/brand.mark';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './modal.header.scss';

const ModalHeader = (props) => (
  <>
    <CardHeader
      appearance={props.appearance}
      className={classNames('c-modal-header-1', props.className)}
    >
      <BrandMark brandText="penny" />
      <Button
        onClick={props.onClose}
        className="c-modal-header__close unset-button-min-width"
      >
        <IconClose className="c-modal-header__close-icon" />
      </Button>
    </CardHeader>

    <Heading className="c-modal-header__title" category="major" tone="normal">
      {props.heading}
    </Heading>
  </>
);

ModalHeader.displayName = 'ModalHeader';
ModalHeader.propTypes = {
  /** Conditionally render a border */
  appearance: PropTypes.oneOf(['normal', 'seamless']),
  /** Class name to be put on the first element of the modal header to customize based on implementation */
  className: PropTypes.string,
  /** Heading */
  heading: PropTypes.node,
  /** The close function callback for handling the `X` being clicked */
  onClose: PropTypes.func.isRequired
};
ModalHeader.defaultProps = {
  appearance: 'normal'
};

export default ModalHeader;
