const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	loginNotUnique: myError.newFailure({
		log: 'User not found using ID',
		message: 'An error occured please try again later',
	}),
};

const getProfileByID = async (id) => {
	logger.info(`searching for user: ${id}`);	
	const res = await Users.find({id: id});
	if (res.error) { return error.userNotFound;	}

	return  { data:
				{
					profile: res.user,
				}
			};
};

module.exports = getProfileByID;
