const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const monitor = require('../monitor');
const constants = require('../constants');
const store = require('../store');
const alerts = require('../alerts');
const logger = require('../logger');

const contentLocation = path.join(__dirname, '..', constants.DIST);

const init = () => {
	// serve the static content
	app.use(express.static(contentLocation));
	logger.info(`Serving content from ${contentLocation}`);

	// log socket connections
	io.on('connection', (socket) => {
		logger.log(`Socket connection established: ${socket.id}`);
		socket.on('disconnect', () => {
			logger.log(`Socket connection terminated: ${socket.id}`);
		});
	});

	// initialize the store
	store.init();
	// initialize alerts
	alerts.init();
	// start monitoring load
	monitor.load.start();
	// subscribe socket connections to the store
	store.subscribe(io);
	// subscribe socket connections to alerts
	alerts.subscribe(io);

	// start the server
	http.listen(constants.SERVER_PORT, () => {
		logger.info(`Listening on port ${constants.SERVER_PORT}`);
	});
};

module.exports = {
	init,
};
