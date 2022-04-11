/* eslint-disable @typescript-eslint/no-var-requires */
const camelCase = require('camelcase');
const Svgi = require('svgi');

const upperFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Get the contents of the optimized SVG
// by trimming leading and tailing <svg> tags
const getSVGContent = (source) => source.slice(source.indexOf('>') + 1).slice(0, -6);

/**
 * Template: React components
 */
const getReactSource = ({ componentName, height, width, svgPaths, viewBox, fill, fillRule, preserveAspectRatio, stroke, strokeWidth, strokeLinecap, strokeLinejoin, strokeMiterlimit }) => (`
import createIconComponent from './utils/createIconComponent';
import React from 'react';
const ${componentName} = createIconComponent({ content: <g>${svgPaths}</g>, height: ${height}, width: ${width}, viewBox: \`${viewBox}\`, fill: \`${fill}\`, fillRule: \`${fillRule}\`, preserveAspectRatio: \`${preserveAspectRatio}\`, stroke: \`${stroke}\`, strokeWidth: \`${strokeWidth}\`, strokeLinecap: \`${strokeLinecap}\`, strokeLinejoin: \`${strokeLinejoin}\`, strokeMiterlimit: \`${strokeMiterlimit}\` });
${componentName}.displayName = '${componentName}';
export default ${componentName};
`);

/**
 * Template: createIconComponent
 */
const getCreateIconSource = () => (`
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
`);


const createReactPackage = (svgs) => {
  const nameArr = [];
  const files = svgs.map((svg) => {
    const { name, width, height } = svg.metadata;
    const componentName = `Icon${upperFirst(camelCase(name))}`;
    const svgPaths = getSVGContent(svg.source);
    const inspect = new Svgi(svg.source);
    const report = inspect.report();
    const source = getReactSource({
      componentName,
      width,
      height,
      svgPaths,
      viewBox: report.nodes.properties.viewBox || '0 0 24 24',
      fill: report.nodes.properties.fill || '',
      fillRule: report.nodes.properties['fill-rule'] || '',
      preserveAspectRatio: report.nodes.properties.preserveAspectRatio || '',
      stroke: report.nodes.properties.stroke || '',
      strokeWidth: report.nodes.properties['stroke-width'] || '',
      strokeLinecap: report.nodes.properties['stroke-linecap'] || '',
      strokeLinejoin: report.nodes.properties['stroke-linejoin'] || '',
      strokeMiterlimit: report.nodes.properties['stroke-miterlimit'] || ''
    });
    const filepath = `${name}.jsx`;
    nameArr.push(componentName);

    return {
      filepath,
      source
    };
  });

  files.push({
    filepath: 'utils/createIconComponent.jsx',
    source: getCreateIconSource()
  });

  files.push({
    filepath: 'utils/iconList.json',
    source: JSON.stringify(nameArr.sort())
  });

  return {
    name: 'react-icons',
    files
  };
};

module.exports = createReactPackage;
