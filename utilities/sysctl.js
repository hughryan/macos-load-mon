const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const D = require('decimal.js');

const getCpuCount = async () => {
	const { stdout } = await exec('sysctl hw.ncpu');

	return D(stdout.match(/(?<=hw.ncpu: )\d*/g)[0]).toNumber();
};

module.exports = {
	getCpuCount,
};
