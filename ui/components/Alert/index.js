import React from 'react';
import PropTypes from 'prop-types';
import {
	AlertContainer,
	AlertIcon,
	AlertMessage,
	RecoverIcon,
	IconContainer,
} from './style';
import constants from '../../constants';

const Alert = ({ type, children }) => (
	<AlertContainer>
		<IconContainer>
			{type === constants.ALERT && <AlertIcon size={25} />}
			{type === constants.RECOVER && <RecoverIcon size={25} />}
		</IconContainer>
		<AlertMessage>
			{children}
		</AlertMessage>
	</AlertContainer>
);

Alert.propTypes = {
	type: PropTypes.oneOf([
		constants.ALERT,
		constants.RECOVER,
	]).isRequired,
	children: PropTypes.node.isRequired,
};

export default Alert;
