const D = require('decimal.js');
const utils = require('../utilities');
const constants = require('../constants');
const events = require('../events');
const logger = require('../logger');

const start = () => {
	logger.info('Monitoring load');

	utils.sysctl.getCpuCount().then((cpuCount) => {
		utils.interval(() => {
			utils.uptime.getLoad().then((load) => {
				// Normalize load by dividing by number of logical processors
				const normalizedLoad = D.div(load, cpuCount).toDP(constants.LOAD_DECIMAL_PLACES).toNumber();
				const loadMetric = {
					timestamp: Date.now(),
					data: normalizedLoad,
				};
				events.metric.emit('load', loadMetric);
			}).catch((err) => {
				logger.error('Error getting load:', err);
			});
		}, constants.MONITOR_INTERVAL);
	}).catch((err) => {
		logger.error('Error getting cpu count:', err);
	});
};

module.exports = {
	start,
};
