const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	loginNotUnique: myError.newFailure({
		log: 'User not found using ID',
		message: 'An error occured please try again later',
	}),
};

const getProfileByID = async (data) => {
	logger.info(`searching for user: ${data.profileID}`);	
	const res = await Users.find({id: data.profileID});
	if (res.error) { return error.userNotFound;	}

	const res2 = await Users.getDistanceBetween({
		id: data.profileID,
		longitude: data.user.longitude,
		latitude: data.user.latitude
	});
	if (res2.error) { return error }

	res.user.distance = res2.distance;

	return  { data:
				{
					profile: res.user,
				}
			};
};

module.exports = getProfileByID;
