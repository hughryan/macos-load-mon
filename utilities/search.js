/**
 * Uses binary search to find the first element in an array of timeseries data
 * that occurred after or at a given unix epoch
 * @param {[ timestamp: number, data: any ]} array the array of timeseries data (timestamp is unix epoch)
 * @param {number} timestamp the unix epoch to search for
 * @returns {number} the index of the first element that occurred after the given timestamp, -1 if no matches.
 */
const binaryTimeseries = (array, target) => {
	let currentIndex;
	let currentElement;
	let canidateIndex;
	let minIndex = 0;
	let maxIndex = array.length - 1;

	while (minIndex <= maxIndex) {
		currentIndex = (minIndex + maxIndex) / 2 | 0;
		currentElement = array[currentIndex];

		if (currentElement.timestamp < target) {
			minIndex = currentIndex + 1;
		} else if (currentElement.timestamp > target) {
			canidateIndex = currentIndex;
			maxIndex = currentIndex - 1;
		} else {
			return currentIndex;
		}
	}

	if (canidateIndex !== undefined) {
		return canidateIndex;
	}

	return -1;
};

module.exports = {
	binaryTimeseries,
};
