import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';

const LineGraph = ({ data }) => (
	<ResponsiveLine
		data={data}
		curve='monotoneX'
		margin={{
			top: 50,
			right: 50,
			bottom: 50,
			left: 60,
		}}
		xScale={{
			format: 'native',
			type: 'time',
		}}
		yScale={{
			type: 'linear',
			stacked: false,
			min: 0,
			max: 'auto',
		}}
		minY='auto'
		maxY='auto'
		stacked={true}
		axisBottom={{
			orient: 'bottom',
			format: '%H:%M:%S',
			tickSize: 5,
			tickPadding: 5,
			tickRotation: 0,
			legend: 'time',
			legendOffset: 36,
			legendPosition: 'center',
		}}
		axisLeft={{
			orient: 'left',
			tickSize: 5,
			tickPadding: 5,
			tickRotation: 0,
			legend: 'load',
			legendOffset: -40,
			legendPosition: 'center',
		}}
		colors="category10"
		dotSize={10}
		dotColor='inherit:darker(0.3)'
		dotBorderWidth={2}
		dotBorderColor='#ffffff'
		enableDotLabel={true}
		dotLabel='y'
		dotLabelYOffset={-12}
		animate={true}
		motionStiffness={200}
		motionDamping={35}
		legends={[]}
	/>
);

LineGraph.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string,
		color: PropTypes.string,
		data: PropTypes.arrayOf(PropTypes.shape({
			x: PropTypes.oneOfType([
				PropTypes.instanceOf(Date),
				PropTypes.number,
				PropTypes.string,
			]),
			y: PropTypes.oneOfType([
				PropTypes.instanceOf(Date),
				PropTypes.number,
				PropTypes.string,
			]),
		})),
	})).isRequired,
};

export default LineGraph;
