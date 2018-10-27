const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const utils = require('../utilities');

utils.sysctl.getCpuCount().then((cpuCount) => {
	console.log(`Inducing load for ${cpuCount} CPUs. CTRL-C to quit.`);

	// Induce load for number of cpus to exceed 1.0 load
	for (let i = 1; i <= cpuCount; i += 1) {
		console.log(`Thread ${i} loaded.`);
		exec('yes > /dev/null').catch((err) => {
			console.log('Error inducing load:', err);
		});
	}
});
