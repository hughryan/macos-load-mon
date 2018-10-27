import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import { AlertsContainer } from './style';
import shapes from '../shapes';

const AlertList = ({ alerts }) => (
	<AlertsContainer>
		{alerts.map(alert => (
			<Alert key={alert.message} type={alert.type}>{alert.message}</Alert>
		)).reverse()}
	</AlertsContainer>
);

AlertList.propTypes = {
	alerts: PropTypes.arrayOf(shapes.Alert),
};

AlertList.defaultProps = {
	alerts: [],
};

export default AlertList;
