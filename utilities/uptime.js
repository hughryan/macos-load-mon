const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const D = require('decimal.js');

const getLoad = async () => {
	const { stdout } = await exec('uptime');

	return D(stdout.match(/(?<=load averages: )(\d.)*/g)[0]).toNumber();
};

module.exports = {
	getLoad,
};
