const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	wrongUserId: myError.newFailure({
		log: 'Visits - user tried to send a wrong input',
		message: 'Whoops something happened',
	}),
};

const seen = async (data) => {

	logger.info('Setting user notifs to SEEN');
	const response = await Users.seen(data);

	return response.error ? response : { data: response };
};

module.exports = seen;
