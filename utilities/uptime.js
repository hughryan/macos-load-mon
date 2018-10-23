const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const getLoad = async () => {
	const { stdout } = await exec('uptime');

	return stdout.match(/(?<=load averages: )(\d.)*/g)[0];
};

module.exports = {
	getLoad,
};
