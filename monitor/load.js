const D = require('decimal.js');
const utils = require('../utilities');
const constants = require('../constants');
const events = require('../events');

const start = () => {
	console.log('Monitoring load');
	events.metric.on('load', load => console.log('Load:', load));

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
				console.log('Error getting load:', err);
			});
		}, constants.MONITOR_INTERVAL);
	}).catch((err) => {
		console.log('Error getting cpu count:', err);
	});
};

module.exports = {
	start,
};
