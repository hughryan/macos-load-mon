const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const utils = require('../utilities');
const logger = require('../logger');

utils.sysctl.getCpuCount().then((cpuCount) => {
	logger.info(`Inducing load for ${cpuCount} CPUs. CTRL-C to quit.`);

	// Induce load for number of cpus to exceed 1.0 load
	for (let i = 1; i <= cpuCount; i += 1) {
		logger.info(`Thread ${i} loaded.`);
		exec('yes > /dev/null').catch((err) => {
			logger.error('Error inducing load:', err);
		});
	}
});
