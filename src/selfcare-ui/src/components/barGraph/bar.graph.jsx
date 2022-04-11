import PropTypes from 'prop-types';
import React from 'react';
import Bar from 'recharts/es6/cartesian/Bar';
import CartesianGrid from 'recharts/es6/cartesian/CartesianGrid';
import XAxis from 'recharts/es6/cartesian/XAxis';
import YAxis from 'recharts/es6/cartesian/YAxis';
import BarChart from 'recharts/es6/chart/BarChart';
import LabelList from 'recharts/es6/component/LabelList';
import ResponsiveContainer from 'recharts/es6/component/ResponsiveContainer';
import { AppContext } from '../appContext/app.context';
import CustomBar from './custom.bar';
import './custom.bar.scss';

class BarGraph extends React.Component {
    getBars = () => {
      const { dataKey } = this.props;
      const halfREM = 8;
      return (
        <Bar barSize={halfREM} shape={<CustomBar dataKey={dataKey} data={dataKey} />} dataKey={dataKey} stackId={0} xAxisId={0}>
          <LabelList dataKey={dataKey} content={this.renderCustomizedLabelList} />
        </Bar>
      );
    };

    renderCustomTick = (props) => {
      const { x, y, payload } = props;
      return (
        <g>
          <text className="recharts-cartesian-axis-tick-value" x={x} y={y} dy={24} textAnchor="middle">{payload.value}</text>
        </g>
      );
    };

    renderCustomizedLabelList = (props) => {
      const { x, width, value } = props;
      return (
        <g>
          <text className="recharts-bar-label-list" x={x + width / 2} y={20} textAnchor="middle" dominantBaseline="middle">
            {`${value}GB`}
          </text>
        </g>
      );
    };

    render() {
      const { data, xAxisKey, yAxisKey, showHorizontalGrid, showVerticalGrid } = this.props;
      const yAxisLabelPadding = 36;
      return (
        <ResponsiveContainer height="100%" width="100%">
          <BarChart
            data={data}
          >
            <CartesianGrid horizontal={showHorizontalGrid} vertical={showVerticalGrid} />
            <XAxis className="recharts-cartesian-axis-tick-value" dataKey={xAxisKey} xAxisId={0} tick={this.renderCustomTick} tickLine={false} interval="preserveStartEnd" />
            <YAxis
              dataKey={yAxisKey}
              padding={{
                top: yAxisLabelPadding
              }}
              hide
            />
            {this.getBars()}
          </BarChart>
        </ResponsiveContainer>
      );
    }
}

BarGraph.contextType = AppContext;

BarGraph.propTypes = {
  /** Attribute to render on the x axis label */
  xAxisKey: PropTypes.string,
  /** Attribute to render on the y axis label */
  yAxisKey: PropTypes.string,
  /** Data to render in the table */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** The dataKey that will be used to make the bars */
  dataKey: PropTypes.string,
  /** Show the horizontal gridlines */
  showHorizontalGrid: PropTypes.bool,
  /** Show the vertical gridlines */
  showVerticalGrid: PropTypes.bool
};

BarGraph.defaultProps = {
  showHorizontalGrid: false,
  showVerticalGrid: false,
  dataKey: ''
};

export default BarGraph;
