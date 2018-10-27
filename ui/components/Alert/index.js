import React from 'react';
import PropTypes from 'prop-types';
import {
	AlertContainer,
	AlertMessage,
} from './style';
import {
	AlertIcon,
	RecoverIcon,
} from '../Icons';
import constants from '../../constants';
import shapes from '../shapes';

const Alert = ({ type, children }) => (
	<AlertContainer>
		{type === constants.ALERT && <AlertIcon />}
		{type === constants.RECOVER && <RecoverIcon />}
		<AlertMessage>{children}</AlertMessage>
	</AlertContainer>
);

Alert.propTypes = {
	type: shapes.AlertType.isRequired,
	children: PropTypes.node.isRequired,
};

export default Alert;
