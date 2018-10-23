const search = require('./search.js');

describe('search utils', () => {
	describe('binaryTimeseries', () => {
		const timeseries = [
			{
				timestamp: 1540055835060,
				data: 1,
			},
			{
				timestamp: 1540055849923,
				data: 2,
			},
			{
				timestamp: 1540055868722,
				data: 3,
			},
			{
				timestamp: 1540055880825,
				data: 4,
			},
			{
				timestamp: 1540055968766,
				data: 5,
			},
		];

		it('finds the correct index when target is exact', () => {
			expect(search.binaryTimeseries(timeseries, timeseries[0].timestamp)).to.equal(0);
			expect(search.binaryTimeseries(timeseries, timeseries[1].timestamp)).to.equal(1);
			expect(search.binaryTimeseries(timeseries, timeseries[2].timestamp)).to.equal(2);
			expect(search.binaryTimeseries(timeseries, timeseries[3].timestamp)).to.equal(3);
			expect(search.binaryTimeseries(timeseries, timeseries[4].timestamp)).to.equal(4);
		});

		it('finds the correct index when target time is less than expected target', () => {
			expect(search.binaryTimeseries(timeseries, timeseries[0].timestamp - 1)).to.equal(0);
			expect(search.binaryTimeseries(timeseries, timeseries[1].timestamp - 1)).to.equal(1);
			expect(search.binaryTimeseries(timeseries, timeseries[2].timestamp - 1)).to.equal(2);
			expect(search.binaryTimeseries(timeseries, timeseries[3].timestamp - 1)).to.equal(3);
			expect(search.binaryTimeseries(timeseries, timeseries[4].timestamp - 1)).to.equal(4);
		});

		it('finds the correct index when target time is greater than expected target', () => {
			expect(search.binaryTimeseries(timeseries, timeseries[0].timestamp + 1)).to.equal(1);
			expect(search.binaryTimeseries(timeseries, timeseries[1].timestamp + 1)).to.equal(2);
			expect(search.binaryTimeseries(timeseries, timeseries[2].timestamp + 1)).to.equal(3);
			expect(search.binaryTimeseries(timeseries, timeseries[3].timestamp + 1)).to.equal(4);
		});

		it('returns -1 if there are no results', () => {
			expect(search.binaryTimeseries(timeseries, timeseries[4].timestamp + 1)).to.equal(-1);
			expect(search.binaryTimeseries([], timeseries[0].timestamp)).to.equal(-1);
		});
	});
});
