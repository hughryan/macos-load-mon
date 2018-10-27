import React from 'react';
import PropTypes from 'prop-types';
import { AlertIcon } from '../Icons';
import {
	StatAlertContainer,
	StatAlertMessage,
	StatMessage,
	StatsContainer,
} from './style';
import constants from '../../constants';
import messages from '../../messages';

const Stats = ({ currentLoad, averageLoad, currentAlert }) => (
	<StatsContainer>
		{currentLoad && <StatMessage>{messages.CURRENT_LOAD(currentLoad.toFixed(2))}</StatMessage>}
		{averageLoad && <StatMessage>{messages.AVERAGE_LOAD(averageLoad.toFixed(2))}</StatMessage>}
		{currentAlert && currentAlert.type === constants.ALERT
			&& <StatAlertContainer>
				<AlertIcon />
				<StatAlertMessage>{messages.HIGH_LOAD_ALERT}</StatAlertMessage>
			</StatAlertContainer>
		}
	</StatsContainer>
);

Stats.propTypes = {
	currentAlert: PropTypes.shape({
		type: PropTypes.oneOf([
			constants.ALERT,
			constants.RECOVER,
		]),
		message: PropTypes.string,
	}),
	currentLoad: PropTypes.number,
	averageLoad: PropTypes.number,
};

export default Stats;
