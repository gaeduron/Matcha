const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	wrongUserId: myError.newFailure({
		log: 'like - user tried to send a wrong input',
		message: 'Whoops something happened',
	}),
};

const getLikes = async (data) => {

	logger.info('retrieving likes from db...');
	const likesResponse = await Users.getLikes(data);

	return likesResponse.error ? likesResponse : { data: likesResponse };
};

module.exports = getLikes;
