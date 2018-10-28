/* eslint-disable no-console */
const log = (...args) => {
	console.log(...args);
};

const error = (...args) => {
	console.error(...args);
};

const info = (...args) => {
	console.info(...args);
};

module.exports = {
	error,
	info,
	log,
};
