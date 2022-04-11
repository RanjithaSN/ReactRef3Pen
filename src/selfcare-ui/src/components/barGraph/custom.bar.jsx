import PropTypes from 'prop-types';
import React from 'react';
import * as GraphHelpers from './graph.helpers';

const CustomBar = ({ x, y, width, height }) => {
  return <g><path className="c-bar--primary" d={GraphHelpers.getPath(x, y, width, height)} /></g>;
};

CustomBar.propTypes = {
  /** The X positioning */
  x: PropTypes.number,
  /** They Y positioning */
  y: PropTypes.number,
  /** The width of the bar */
  width: PropTypes.number,
  /** The rendered height of the bar */
  height: PropTypes.number
};

export default CustomBar;
