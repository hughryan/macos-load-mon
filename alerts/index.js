const moment = require('moment');
const constants = require('../constants');
const messages = require('../messages');
const store = require('../store');
const events = require('../events');

// Alert Data
const alerts = {
	load: [], // array of { timestamp, data: { type, message } }
};

// Getters
const getLoadAlertHistory = () => alerts.load;

// Setters
const triggerLoadAlert = (timestamp, type, message) => {
	const alert = {
		timestamp,
		data: {
			type,
			message,
		},
	};

	alerts.load.push(alert);
	events.alert.emit(type, alert);
};

/**
 * Triggers or resolves high load alerts based on average load
 * @returns undefined
 */
const observeLoadAverage = () => {
	const currentLoadAverage = store.getCurrentLoadAverage();

	if (currentLoadAverage === undefined) return;

	const previousLoadAverage = store.getPreviousLoadAverage();
	const currentLoadAverageString = currentLoadAverage.data.toFixed(constants.LOAD_DECIMAL_PLACES);
	const currentLoadAverageTimeString = moment(currentLoadAverage.timestamp).toString();

	// if current load went from low to high
	if (currentLoadAverage.data > constants.HIGH_LOAD_THRESHOLD
		&& (previousLoadAverage === undefined || previousLoadAverage.data <= constants.HIGH_LOAD_THRESHOLD)) {
		triggerLoadAlert(
			currentLoadAverage.timestamp,
			constants.ALERT,
			messages.HIGH_LOAD_ALERT(
				currentLoadAverageString,
				currentLoadAverageTimeString,
			),
		);
	// if current load went from high to low
	} else if (currentLoadAverage.data <= constants.HIGH_LOAD_THRESHOLD
		&& (previousLoadAverage && previousLoadAverage.data > constants.HIGH_LOAD_THRESHOLD)) {
		triggerLoadAlert(
			currentLoadAverage.timestamp,
			constants.RECOVER,
			messages.HIGH_LOAD_RECOVER(
				currentLoadAverageString,
				currentLoadAverageTimeString,
			),
		);
	}
};

const subscribe = (io) => {
	io.on(constants.CONNECTION, (socket) => {
		// emit latest status immediately to new clients
		socket.emit(constants.ALERTS, {
			alerts: getLoadAlertHistory(),
		});
	});

	events.alert.on(constants.ALERT, () => {
		// emit latest status to listeners
		io.emit(constants.ALERTS, {
			alerts: getLoadAlertHistory(),
		});
	});

	events.alert.on(constants.RECOVER, () => {
		// emit latest status to listeners
		io.emit(constants.ALERTS, {
			alerts: getLoadAlertHistory(),
		});
	});
};

const init = () => {
	events.store.on(constants.LOAD, () => {
		// calculate alert status
		observeLoadAverage();
	});
	events.alert.on(constants.ALERT, (alert) => {
		console.log(alert.data.message);
	});
	events.alert.on(constants.RECOVER, (alert) => {
		console.log(alert.data.message);
	});
};

module.exports = {
	init,
	subscribe,
	observeLoadAverage,
	triggerLoadAlert,
	getLoadAlertHistory,
};
