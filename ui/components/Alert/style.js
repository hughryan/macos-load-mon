import styled from 'styled-components';
import {
	Warning,
	CheckCircle,
} from 'styled-icons/material';

export const AlertContainer = styled.div`
	display: flex;
	align-items: center;
	flex: none;
	padding-left: 40px;
`;

export const IconContainer = styled.div`
	width: 30px;
	height: 30px;
	line-height: 30px;
	padding: 5px;
`;

export const AlertMessage = styled.div`
	font-family: 'Roboto', sans-serif;
	width: 100%;
	height: 30px;
	line-height: 30px;
	padding: 5px;
`;

export const AlertIcon = styled(Warning)`
	color: #FFAE42;
	display: block;
`;

export const RecoverIcon = styled(CheckCircle)`
	color: #4293FF;
	display: block;
`;
