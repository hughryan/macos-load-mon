const D = require('decimal.js');
const moment = require('moment');

/**
 * Calculates the average for a metric over the last (duration) minutes
 * @param {Array} metrics array of metric objects with the shape { timestamp, data }
 * @param {number} duration duration in minutes to calculate backwards in time
 * @param {number} dp number of decimal places to round to
 * @returns {number} average metric value
 */
const calcMetricAverage = (metrics, duration, dp) => {
	const latestTime = metrics[metrics.length - 1].timestamp;
	const targetTime = moment(latestTime).subtract(duration, 'minutes');
	let average = 0;
	let count = 0;

	for (let i = metrics.length - 1; i >= 0; i -= 1) {
		if (moment(metrics[i].timestamp).diff(targetTime) > 0) {
			average = D.add(average, metrics[i].data);
			count += 1;
		} else {
			break;
		}
	}

	return D.div(average, count).toDP(dp).toNumber();
};

module.exports = {
	calcMetricAverage,
};
