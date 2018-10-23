const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const getCpuCount = async () => {
	const { stdout } = await exec('sysctl hw.ncpu');

	return stdout.match(/(?<=hw.ncpu: )\d*/g)[0];
};

module.exports = {
	getCpuCount,
};
