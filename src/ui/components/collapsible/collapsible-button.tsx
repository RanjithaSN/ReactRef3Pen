import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import ChevronUpDown from 'ui/icons/chevron-down';
import { above, color } from 'ui/theme/theme.helpers';

type Value = string | number | readonly string[] | boolean;

interface CollapsibleButtonProps {
  value: Value;
  onClick: (value: Value) => void;
}

const StyledCollapsibleButton = styled.button`
  font-family: PennyText;
  display: block;
  font-size: 100%;
  font-weight: bold;
  padding: 1rem 1.5rem;
  color: ${color('accentTertiary')};
  border: 1px solid ${color('accentTertiary')};
  background-color: ${color('accentPrimary')};
  margin: 0;
  display: inline-block;
  cursor: pointer;
  transition: all .25s ease-in-out;
  align-self: stretch;
  width: 100%;
  &:hover {
    background-color: #404040;
  }
  @media ${above('small')} {
    align-self: center;
    width: auto;
  }
`;


const CollapsibleButton: FC<CollapsibleButtonProps> = ({ value, onClick, children, ...rest }) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(value);
    }
  }, [value, onClick]);
  return (
    <StyledCollapsibleButton onClick={handleClick} {...rest}>
      {children}
      <ChevronUpDown direction={value ? 'up' : 'down'} />
    </StyledCollapsibleButton>
  );
};

export default CollapsibleButton;
