import styled from 'styled-components';

export const StatsContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const StatMessage = styled.div`
	font-family: 'Roboto', sans-serif;
	text-align: center;
	flex: none;
`;

export const StatAlertContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: none;
`;

export const StatAlertMessage = styled.div`
	font-family: 'Roboto', sans-serif;
	height: 30px;
	line-height: 30px;
	padding: 5px;
`;
