const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	wrongUserId: myError.newFailure({
		log: 'Visits - user tried to send a wrong input',
		message: 'Whoops something happened',
	}),
};

const getMessages = async (data) => {

	logger.info('retrieving messages from db...');
	const response = await Users.getMessages(data);

	return response.error ? response : { data: response };
};

module.exports = getMessages;
