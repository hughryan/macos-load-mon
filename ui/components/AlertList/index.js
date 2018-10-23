import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import { AlertsContainer } from './style';
import constants from '../../constants';

const AlertList = ({ alerts }) => (
	<AlertsContainer>
		{alerts.map(alert => (
			<Alert key={alert.message} type={alert.type}>{alert.message}</Alert>
		)).reverse()}
	</AlertsContainer>
);

AlertList.propTypes = {
	alerts: PropTypes.arrayOf(PropTypes.shape({
		type: PropTypes.oneOf([
			constants.ALERT,
			constants.RECOVER,
		]),
		message: PropTypes.string,
	})),
};

AlertList.defaultProps = {
	alerts: [],
};

export default AlertList;
