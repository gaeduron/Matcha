const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');
const _ = require('lodash');

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
	
	const res3 = await Users.isBlocked({
		to: data.profileID,
		from: data.id,
	});
	if (res3.error) { return error }
	res.user.blocked = !!res3.length;

	const profile = _.pick(res.user, [
		'id',
		'connected',
		'score',
		'reported',
		'firstname',
		'lastname',
		'sex',
		'sexualOrientation',
		'bio',
		'longitude',
		'latitude',
		'lastConnection',
		'birthdate',
		'photos',
		'occupation',
		'tags',
		'distance',
		'blocked',
	]);
	
	return  { data:
				{
					profile: profile,
				}
			};
};

module.exports = getProfileByID;
