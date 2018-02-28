const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	wrongUserId: myError.newFailure({
		log: 'Visits - user tried to send a wrong input',
		message: 'Whoops something happened',
	}),
};

const getVisits = async (data) => {

	logger.info('retrieving visits from db...');
	const response = await Users.getVisits(data);

	return response.error ? response : { data: response };
};

module.exports = getVisits;
