import PropTypes from 'prop-types';
import constants from '../constants';

const AlertType = PropTypes.oneOf([
	constants.ALERT,
	constants.RECOVER,
]);

const Alert = PropTypes.shape({
	type: AlertType,
	message: PropTypes.string,
});

const GraphDataPoint = PropTypes.shape({
	x: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.number,
		PropTypes.string,
	]),
	y: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.number,
		PropTypes.string,
	]),
});

const GraphDataSet = PropTypes.shape({
	id: PropTypes.string,
	color: PropTypes.string,
	data: PropTypes.arrayOf(GraphDataPoint),
});

export default {
	Alert,
	AlertType,
	GraphDataPoint,
	GraphDataSet,
};
