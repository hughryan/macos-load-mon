import React from 'react';
import {
	AlertIconStyle,
	IconContainer,
	RecoverIconStyle,
} from './style';


export const AlertIcon = () => (
	<IconContainer>
		<AlertIconStyle size={25}/>
	</IconContainer>
);

export const RecoverIcon = () => (
	<IconContainer>
		<RecoverIconStyle size={25}/>
	</IconContainer>
);
