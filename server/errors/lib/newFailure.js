const logger = require('../../logs/logger.js');

const newFailure = ({ log, message }) => {
	const error = (arg) => {
		if (typeof log === 'string') { logger.failure(log); }
		if (typeof log === 'function') { logger.failure(log(arg)); }

		if (typeof message === 'string') { return { error: [message] }; }
		if (typeof message === 'function') { return { error: [message(arg)] }; }

		logger.error('NewFailure argument must be an object, containing a key "message" of type "string" or "function" for string interpolation');
		return { error: 'An error occured on the server' };
	};

	return error;
};

module.exports = newFailure;
