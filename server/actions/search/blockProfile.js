const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	loginNotUnique: myError.newFailure({
		log: 'User not found using ID',
		message: 'An error occured please try again later',
	}),
};

const blockProfile = async (data) => {
	logger.info(`Blocking user: ${data.profileID}`);	
	const res = await Users.createBlock({to: data.profileID, from: data.id });
	if (res.error) { return res.error }

	return  { data:
				{
					profile: null,
				}
			};
};

module.exports = blockProfile;
