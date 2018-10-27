import styled from 'styled-components';
import {
	Warning,
	CheckCircle,
} from 'styled-icons/material';

export const IconContainer = styled.div`
	width: 30px;
	height: 30px;
	line-height: 30px;
	padding: 5px;
`;

export const AlertIconStyle = styled(Warning)`
	color: #FFAE42;
	display: block;
`;

export const RecoverIconStyle = styled(CheckCircle)`
	color: #4293FF;
	display: block;
`;
