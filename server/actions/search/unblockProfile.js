const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	loginNotUnique: myError.newFailure({
		log: 'User not found using ID',
		message: 'An error occured please try again later',
	}),
};

const unblockProfile = async (data) => {
	logger.info(`Unblocking user: ${data.profileID}`);	
	const res = await Users.deleteBlock({to: data.profileID, from: data.id });
	if (res.error) { return res.error }

	return  { data:
				{
					profile: null,
				}
			};
};

module.exports = unblockProfile;
