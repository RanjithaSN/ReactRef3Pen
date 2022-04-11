import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Heading from 'selfcare-ui/src/components/heading/heading';
import './amount.with.label.scss';

const Wrapper = styled.div`
  display: inline-block;
`;

const AmountWithLabel = (props) => (
  <Wrapper>
    <Heading category="brand">{props.amount}</Heading>
    <Heading category="minor" tone="quiet" className="c-amountWithLabel-label">{props.label}</Heading>
  </Wrapper>
);

AmountWithLabel.displayName = 'AmountWithLabel';
AmountWithLabel.propTypes = {
  /** The amount to be displayed */
  amount: PropTypes.node,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** The label for the amount */
  label: PropTypes.string
};
AmountWithLabel.defaultProps = {};

export default AmountWithLabel;
