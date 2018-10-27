import io from 'socket.io-client';
import constants from '../constants';

const socket = io();

export const subscribeToLoad = (callback) => {
	socket.on(constants.LOAD, payload => callback({
		graphData: payload.load.map(metric => ({
			x: new Date(metric.timestamp),
			y: metric.data,
		})),
		currentLoad: payload.load[payload.load.length - 1].data,
		averageLoad: payload.average.data,
	}));
};

export const subscribeToAlerts = (callback) => {
	socket.on(constants.ALERTS, payload => callback({
		alertHistory: payload.alerts.map(alert => alert.data),
		currentAlert: (payload.alerts.length > 0 && payload.alerts[payload.alerts.length - 1].data) || undefined,
	}));
};
