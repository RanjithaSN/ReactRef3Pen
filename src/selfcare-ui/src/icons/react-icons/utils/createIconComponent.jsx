
import React from 'react';

const createIconComponent = ({content, height = 24, width = 24, viewBox, fill, fillRule, stroke, strokeWidth, strokeLinecap, strokeLinejoin, strokeMiterlimit}) =>
    (props) => React.createElement('svg', {
            fill: fill || (!stroke ? 'currentColor' : ''),
            fillRule,
            stroke,
            strokeWidth,
            strokeLinecap,
            strokeLinejoin,
            strokeMiterlimit,
            viewBox,
            height: props.height || height,
            width: props.width || width,
            ...props
        },
        content);

export default createIconComponent;
