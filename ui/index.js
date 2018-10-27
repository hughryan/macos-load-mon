import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './GlobalStyle';
import LoadMonitor from './components/LoadMonitor';
import './assets/favicon.ico';

ReactDOM.render(
	<React.Fragment>
		<GlobalStyle />
		<LoadMonitor />
	</React.Fragment>,
	document.getElementById('root'),
);
