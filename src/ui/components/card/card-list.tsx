import { CARD_SIZE } from './card-constants';
import { remToPx, spacing } from 'ui/theme/theme.helpers';
import styled from 'styled-components';

interface CardListProps {
  twoStack?: boolean;
  listSpace?: string;
}

const CardList = styled.div<CardListProps>`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: ${({ listSpace }) => spacing(listSpace)};
  @media (min-width: ${remToPx(CARD_SIZE * 2 + 3)}px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${remToPx(CARD_SIZE * 4 + 5)}px) {
    grid-template-columns: repeat(${(props) => (props.twoStack ? '2' : '4')}, 1fr);
  }
`;

CardList.defaultProps = {
  listSpace: 'small',
  twoStack: false
};

export default CardList;
