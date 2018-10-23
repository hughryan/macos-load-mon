const moment = require('moment');
const constants = require('../constants');
const utils = require('../utilities');
const events = require('../events');

// Data Store
const store = {
	metrics: {
		load: {
			data: [], // array of { timestamp, data }
			average: [], // array of { timestamp, data }
		},
	},
};

// Getters
const getStore = () => store;
const getLoadMetrics = () => store.metrics.load.data;
const getLastLoadMetric = () => store.metrics.load.data[store.metrics.load.data.length - 1];
const getLoadAverages = () => store.metrics.load.average;
const getCurrentLoadAverage = () => store.metrics.load.average[store.metrics.load.data.length - 1];
const getPreviousLoadAverage = () => store.metrics.load.average[store.metrics.load.average.length - 2];

// Derived Data
const calcLoadAverage = (metric) => {
	const metrics = getLoadMetrics();
	const loadAverage = utils.math.calcMetricAverage(
		metrics,
		constants.LOAD_AVERAGE_DURATION,
		constants.LOAD_DECIMAL_PLACES,
	);

	store.metrics.load.average.push({
		timestamp: metric.timestamp,
		data: loadAverage,
	});
};

// Setters
const receiveLoadMetric = (metric) => {
	store.metrics.load.data.push(metric);
	// calculate average
	calcLoadAverage(metric);
	// emit load event
	events.store.emit(constants.LOAD);
};

/**
 * Gets load metrics for the last (duration) minutes
 * @param {number} duration number of minutes
 * @returns {[{ timestamp: number, data: number }]} array of load metrics
 */
const getLoadHistory = (duration) => {
	const metrics = getLoadMetrics();
	const latestTime = metrics[metrics.length - 1].timestamp;
	const targetTime = moment(latestTime).subtract(duration, constants.MINUTES);
	const sliceIndex = utils.search.binaryTimeseries(metrics, targetTime);

	if (sliceIndex >= 0) {
		return metrics.slice(sliceIndex);
	}

	return [];
};

const subscribe = (io) => {
	io.on(constants.CONNECTION, (socket) => {
		// emit latest status immediately to new clients
		socket.emit(constants.LOAD, {
			data: getLoadHistory(constants.LOAD_HISTORY_DURATION),
		});
	});

	events.store.on(constants.LOAD, () => {
		// emit latest status to socket listeners
		io.emit(constants.LOAD, {
			data: getLoadHistory(constants.LOAD_HISTORY_DURATION),
		});
	});
};

const init = () => {
	events.metric.on(constants.LOAD, (metric) => {
		// add new metric to store
		receiveLoadMetric(metric);
	});
};

module.exports = {
	getCurrentLoadAverage,
	getLastLoadMetric,
	getLoadAverages,
	getLoadHistory,
	getLoadMetrics,
	getPreviousLoadAverage,
	getStore,
	init,
	receiveLoadMetric,
	subscribe,
};
