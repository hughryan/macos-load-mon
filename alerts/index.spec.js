const constants = require('../constants');
const messages = require('../messages');

describe('Alerts', () => {
	const moment = sinon.stub();
	const events = {
		alert: {
			on: sinon.stub(),
			emit: sinon.stub(),
		},
		store: {
			on: sinon.stub(),
		},
	};
	const store = {
		getCurrentLoadAverage: sinon.stub(),
		getPreviousLoadAverage: sinon.stub(),
	};
	const logger = {
		log: sinon.stub(),
	};
	const alertsStub = {
		moment,
		'../events': events,
		'../store': store,
		'../logger': logger,
	};
	const alerts = proxyquire('./index', alertsStub);
	const testAlert = {
		timestamp: 12345,
		data: {
			type: constants.ALERT,
			message: 'Test Alert',
		},
	};

	afterEach(() => {
		alerts.clearLoadAlerts();
		sinon.reset();
	});

	after(() => {
		sinon.restore();
	});

	describe('init', () => {
		it('subscribes to load store updates', () => {
			alerts.init();

			expect(events.store.on).to.have.been.calledOnce();
			expect(events.store.on.args[0].length).to.equal(2);
			expect(events.store.on.args[0][0]).to.equal(constants.LOAD);
			expect(events.store.on.args[0][1]).to.be.a('function');
		});

		it('subscribes logging to new alerts', () => {
			alerts.init();

			expect(events.alert.on).to.have.been.calledTwice();
			expect(events.alert.on.args[0].length).to.equal(2);
			expect(events.alert.on.args[0][0]).to.equal(constants.ALERT);
			expect(events.alert.on.args[0][1]).to.be.a('function');

			events.alert.on.args[0][1](testAlert);

			expect(logger.log).to.have.been.calledOnce();
			expect(logger.log.args[0].length).to.equal(1);
			expect(logger.log.args[0][0]).to.equal(testAlert.data.message);

			events.alert.on.args[1][1](testAlert);

			expect(logger.log).to.have.been.calledTwice();
			expect(logger.log.args[1].length).to.equal(1);
			expect(logger.log.args[1][0]).to.equal(testAlert.data.message);
		});
	});

	describe('subscribe', () => {
		const io = {
			on: sinon.stub(),
			emit: sinon.stub(),
		};

		beforeEach(() => {
			alerts.triggerLoadAlert(
				testAlert.timestamp,
				testAlert.data.type,
				testAlert.data.message,
			);
		});

		afterEach(() => {
			io.on.reset();
		});

		it('subscribes new socket listeners to alerts', () => {
			const socket = {
				emit: sinon.stub(),
			};

			alerts.subscribe(io);

			expect(io.on).to.have.been.calledOnce();
			expect(io.on.args[0].length).to.equal(2);
			expect(io.on.args[0][0]).to.equal(constants.CONNECTION);
			expect(io.on.args[0][1]).to.be.a('function');

			io.on.args[0][1](socket);

			expect(socket.emit).to.have.been.calledOnce();
			expect(socket.emit.args[0].length).to.equal(2);
			expect(socket.emit.args[0][0]).to.equal(constants.ALERTS);
			expect(socket.emit.args[0][1]).to.deep.equal({
				alerts: [testAlert],
			});
		});

		it('subscribes to new alerts', () => {
			alerts.subscribe(io);

			expect(events.alert.on).to.have.been.calledTwice();
			expect(events.alert.on.args[0].length).to.equal(2);
			expect(events.alert.on.args[0][0]).to.equal(constants.ALERT);
			expect(events.alert.on.args[0][1]).to.be.a('function');

			events.alert.on.args[0][1]();

			expect(io.emit).to.have.been.calledOnce();
			expect(io.emit.args[0]).to.have.length(2);
			expect(io.emit.args[0][0]).to.equal(constants.ALERTS);
			expect(io.emit.args[0][1]).to.deep.equal({
				alerts: [testAlert],
			});
		});

		it('subscribes to new alert recoveries', () => {
			alerts.subscribe(io);

			expect(events.alert.on).to.have.been.calledTwice();
			expect(events.alert.on.args[1].length).to.equal(2);
			expect(events.alert.on.args[1][0]).to.equal(constants.RECOVER);
			expect(events.alert.on.args[1][1]).to.be.a('function');

			events.alert.on.args[1][1]();

			expect(io.emit).to.have.been.calledOnce();
			expect(io.emit.args[0]).to.have.length(2);
			expect(io.emit.args[0][0]).to.equal(constants.ALERTS);
			expect(io.emit.args[0][1]).to.deep.equal({
				alerts: [testAlert],
			});
		});
	});

	describe('alert history', () => {
		const timestamp = 12345;
		const type = constants.ALERT;
		const message = 'Test Alert';
		const alert = {
			timestamp,
			data: {
				type,
				message,
			},
		};

		it('sets and gets an alert', () => {
			alerts.triggerLoadAlert(timestamp, type, message);

			const loadAlertHistory = alerts.getLoadAlertHistory();

			expect(events.alert.emit).to.have.been.calledOnce();
			expect(events.alert.emit.args[0].length).to.equal(2);
			expect(events.alert.emit.args[0][0]).to.equal(type);
			expect(events.alert.emit.args[0][1]).to.deep.equal(alert);
			expect(loadAlertHistory).to.deep.equal([alert]);
		});
	});

	describe('load alert', () => {
		const lowLoadAverage = {
			timestamp: 12345,
			data: 0.41,
		};
		const highLoadAverage = {
			timestamp: 67890,
			data: 1.21,
		};

		it('returns if currentLoadAverage is undefined', () => {
			store.getCurrentLoadAverage.returns(undefined);
			alerts.observeLoadAverage();

			expect(store.getCurrentLoadAverage).to.have.been.calledOnce();
			expect(store.getPreviousLoadAverage).to.not.have.been.called();
		});

		it('does not trigger an alert if load average remains low', () => {
			store.getPreviousLoadAverage.returns(lowLoadAverage);
			store.getCurrentLoadAverage.returns(lowLoadAverage);
			moment.returns(lowLoadAverage.timestamp);
			alerts.observeLoadAverage();

			const loadAlertHistory = alerts.getLoadAlertHistory();

			expect(store.getCurrentLoadAverage).to.have.been.calledOnce();
			expect(store.getPreviousLoadAverage).to.have.been.calledOnce();
			expect(loadAlertHistory).to.deep.equal([]);
		});

		it('triggers an alert if load average starts high', () => {
			store.getPreviousLoadAverage.returns(undefined);
			store.getCurrentLoadAverage.returns(highLoadAverage);
			moment.returns(highLoadAverage.timestamp);
			alerts.observeLoadAverage();

			const loadAlertHistory = alerts.getLoadAlertHistory();

			expect(store.getCurrentLoadAverage).to.have.been.calledOnce();
			expect(store.getPreviousLoadAverage).to.have.been.calledOnce();
			expect(loadAlertHistory).to.deep.equal([{
				timestamp: highLoadAverage.timestamp,
				data: {
					type: constants.ALERT,
					message: messages.HIGH_LOAD_ALERT(
						highLoadAverage.data.toFixed(constants.LOAD_DECIMAL_PLACES),
						highLoadAverage.timestamp,
					),
				},
			}]);
		});

		it('triggers an alert if load average goes from low to high', () => {
			store.getPreviousLoadAverage.returns(lowLoadAverage);
			store.getCurrentLoadAverage.returns(highLoadAverage);
			moment.returns(highLoadAverage.timestamp);
			alerts.observeLoadAverage();

			const loadAlertHistory = alerts.getLoadAlertHistory();

			expect(store.getCurrentLoadAverage).to.have.been.calledOnce();
			expect(store.getPreviousLoadAverage).to.have.been.calledOnce();
			expect(loadAlertHistory).to.deep.equal([{
				timestamp: highLoadAverage.timestamp,
				data: {
					type: constants.ALERT,
					message: messages.HIGH_LOAD_ALERT(
						highLoadAverage.data.toFixed(constants.LOAD_DECIMAL_PLACES),
						highLoadAverage.timestamp,
					),
				},
			}]);
		});

		it('alert recovers if load average goes from high to low', () => {
			store.getPreviousLoadAverage.returns(highLoadAverage);
			store.getCurrentLoadAverage.returns(lowLoadAverage);
			moment.returns(lowLoadAverage.timestamp);
			alerts.observeLoadAverage();

			const loadAlertHistory = alerts.getLoadAlertHistory();

			expect(store.getCurrentLoadAverage).to.have.been.calledOnce();
			expect(store.getPreviousLoadAverage).to.have.been.calledOnce();
			expect(loadAlertHistory).to.deep.equal([{
				timestamp: lowLoadAverage.timestamp,
				data: {
					type: constants.RECOVER,
					message: messages.HIGH_LOAD_RECOVER(
						lowLoadAverage.data.toFixed(constants.LOAD_DECIMAL_PLACES),
						lowLoadAverage.timestamp,
					),
				},
			}]);
		});

		it('observes load average on load store updates after init', () => {
			store.getPreviousLoadAverage.returns(lowLoadAverage);
			store.getCurrentLoadAverage.returns(highLoadAverage);
			moment.returns(highLoadAverage.timestamp);

			alerts.init();
			events.store.on.args[0][1]();

			const loadAlertHistory = alerts.getLoadAlertHistory();

			expect(store.getCurrentLoadAverage).to.have.been.calledOnce();
			expect(store.getPreviousLoadAverage).to.have.been.calledOnce();
			expect(loadAlertHistory).to.deep.equal([{
				timestamp: highLoadAverage.timestamp,
				data: {
					type: constants.ALERT,
					message: messages.HIGH_LOAD_ALERT(
						highLoadAverage.data.toFixed(constants.LOAD_DECIMAL_PLACES),
						highLoadAverage.timestamp,
					),
				},
			}]);
		});
	});
});
