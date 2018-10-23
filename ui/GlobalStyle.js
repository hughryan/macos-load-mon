/* eslint-disable no-unused-expressions */
import { createGlobalStyle } from 'styled-components';
import Montserrat from './fonts/Montserrat-Regular.ttf';
import Roboto from './fonts/Roboto-Regular.ttf';

const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: 'Montserrat';
		src: url(${Montserrat}) format('truetype');
	}

	@font-face {
		font-family: 'Roboto';
		src: url(${Roboto}) format('truetype');
	}

	html {
		height: 100%;
	}

	body {
		height: 100%;
		margin: 0;
	}
`;

export default GlobalStyle;
