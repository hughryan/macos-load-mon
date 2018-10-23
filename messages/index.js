module.exports = {
	HIGH_LOAD_ALERT: (load, time) => `High load generated an alert - load = ${load}, triggered at ${time}`,
	HIGH_LOAD_RECOVER: (load, time) => `High load recovered - load = ${load}, triggered at ${time}`,
};
