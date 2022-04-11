import React, { FC } from 'react';
import Icon from './icon';

interface ChevronUpDownProps {
  direction: 'up' | 'down'
}

const ChevronUpDown: FC<ChevronUpDownProps> = ({ direction = 'up' }) => {
  const up = direction === 'up';
  return (
    <Icon>
      <g strokeWidth={2} stroke="currentColor">
        <line x1={6} y1={up ? 12 : 8} x2={10} y2={up ? 8 : 12} />
        <line x1={10} y1={up ? 8 : 12} x2={14} y2={up ? 12 : 8} />
      </g>
    </Icon>
  );
};

export default ChevronUpDown;
