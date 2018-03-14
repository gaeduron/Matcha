const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	wrongUserId: myError.newFailure({
		log: 'like - user tried to send a wrong input',
		message: 'Whoops something happened',
	}),
};

const getBlocks = async (data) => {

	logger.info('retrieving blocked users from db...');
	const res = await Users.getBlocks(data);

	return res.error ? res : { data: res };
};

module.exports = getBlocks;
