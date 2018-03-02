const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	wrongUserId: myError.newFailure({
		log: 'Visits - user tried to send a wrong input',
		message: 'Whoops something happened',
	}),
};

const clicked = async (data) => {

	logger.info('Setting user notifs to CLICKED');
	const response = await Users.clicked(data);

	return response.error ? response : { data: response };
};

module.exports = clicked;
