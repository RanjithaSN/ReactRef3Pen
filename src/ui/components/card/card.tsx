import React, { FC } from 'react';
import styled from 'styled-components';
import CardBody from './card-body';
import { CARD_SIZE } from './card-constants';
import CardFooter from './card-footer';
import CardHeading from './card-heading';
import CardList from './card-list';

interface CardProps {
  hasPills: boolean;
}

interface CardStatics {
  List: typeof CardList
  Body: typeof CardBody;
  Heading: typeof CardHeading;
  Footer: typeof CardFooter;
}

const StyledCard = styled.div<CardProps>`
  background-color: #FFF;
  margin-top: ${(p) => p.hasPills ? '0.75rem' : '0rem'};
  color: #000;
  min-width: ${CARD_SIZE}rem;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Card: FC<CardProps> & CardStatics = (props) => <StyledCard {...props} />;

Card.defaultProps = {
  hasPills: true
};

Card.List = CardList;
Card.Body = CardBody;
Card.Heading = CardHeading;
Card.Footer = CardFooter;

export default Card;
