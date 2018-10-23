import io from 'socket.io-client';
import constants from '../constants';

const socket = io();

export const subscribeToLoad = (callback) => {
	socket.on(constants.LOAD, payload => callback({
		graphData: payload.data.map(metric => ({
			x: new Date(metric.timestamp),
			y: metric.data,
		})),
	}));
};

export const subscribeToAlerts = (callback) => {
	socket.on(constants.ALERTS, payload => callback({
		alertHistory: payload.alerts.map(alert => alert.data),
	}));
};
