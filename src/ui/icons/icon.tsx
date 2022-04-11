import React, { FC } from 'react';
import styled from 'styled-components';
import { ICON_SIZE } from '../theme/theme';

const Svg = styled.svg`
  vertical-align: middle;
`;

interface IconProps {
  width?: string;
  height?: string;
}

const Icon: FC<IconProps> = ({ width = '24px', height = width, ...rest }) => {
  return <Svg width={width} height={height} viewBox={`0 0 ${ICON_SIZE} ${ICON_SIZE}`} {...rest} />;
};

export default Icon;
