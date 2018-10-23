import React from 'react';
import PropTypes from 'prop-types';
import {
	compose,
	lifecycle,
} from 'recompose';
import AlertList from '../AlertList';
import LineGraph from '../LineGraph';
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

const LoadMonitor = ({ graphData, alertHistory }) => (
	<LoadMonitorContainer>
		<Title>
			{messages.TITLE}
		</Title>
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
	graphData: PropTypes.arrayOf(PropTypes.shape({
		x: PropTypes.instanceOf(Date),
		y: PropTypes.number,
	})),
	alertHistory: PropTypes.arrayOf(PropTypes.shape({
		type: PropTypes.oneOf([
			constants.ALERT,
			constants.RECOVER,
		]),
		message: PropTypes.string,
	})),
};

LoadMonitor.defaultProps = {
	graphData: [],
	alertHistory: [],
};

const LoadMonitorWithData = compose(
	lifecycle({
		componentDidMount() {
			subscribeToLoad(({ graphData }) => {
				this.setState({ graphData });
			});
			subscribeToAlerts(({ alertHistory }) => {
				this.setState({ alertHistory });
			});
		},
	}),
)(LoadMonitor);

export default LoadMonitorWithData;
