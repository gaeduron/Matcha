const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	wrongUserId: myError.newFailure({
		log: 'like - user tried to send a wrong input',
		message: 'Whoops something happened',
	}),
};

const getMatches = async (data) => {

	logger.info('retrieving matches from db...');
	const matchesResponse = await Users.getMatches(data);

	return matchesResponse.error ? matchesResponse : { data: matchesResponse };
};

module.exports = getMatches;
