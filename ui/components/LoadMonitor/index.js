import React from 'react';
import PropTypes from 'prop-types';
import {
	compose,
	lifecycle,
} from 'recompose';
import AlertList from '../AlertList';
import LineGraph from '../LineGraph';
import Stats from '../Stats';
import {
	LineGraphContainer,
	LoadMonitorContainer,
	Title,
} from './style';
import {
	subscribeToLoad,
	subscribeToAlerts,
} from '../../services/api';
import constants from '../../constants';
import messages from '../../messages';
import shapes from '../shapes';

const LoadMonitor = ({
	alertHistory,
	averageLoad,
	currentAlert,
	currentLoad,
	graphData,
}) => (
	<LoadMonitorContainer>
		<Title>{messages.TITLE}</Title>
		<Stats
			currentLoad={currentLoad}
			averageLoad={averageLoad}
			currentAlert={currentAlert}
		/>
		<LineGraphContainer>
			<LineGraph data={[{
				id: messages.GRAPH_LABEL,
				color: constants.GRAPH_COLOR,
				data: graphData,
			}]} />
		</LineGraphContainer>
		<AlertList alerts={alertHistory} />
	</LoadMonitorContainer>
);

LoadMonitor.propTypes = {
	alertHistory: PropTypes.arrayOf(shapes.Alert),
	averageLoad: PropTypes.number,
	currentAlert: shapes.Alert,
	currentLoad: PropTypes.number,
	graphData: PropTypes.arrayOf(shapes.GraphDataPoint),
};

LoadMonitor.defaultProps = {
	alertHistory: [],
	graphData: [],
};

const LoadMonitorWithData = compose(
	lifecycle({
		componentDidMount() {
			subscribeToLoad(({
				averageLoad,
				currentLoad,
				graphData,
			}) => {
				this.setState({
					averageLoad,
					currentLoad,
					graphData,
				});
			});
			subscribeToAlerts(({
				alertHistory,
				currentAlert,
			}) => {
				this.setState({
					alertHistory,
					currentAlert,
				});
			});
		},
	}),
)(LoadMonitor);

export default LoadMonitorWithData;
