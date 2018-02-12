const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	loginNotUnique: myError.newFailure({
		log: 'User not found using socketID',
		message: 'An error occured please try again later',
	}),
};

const getProfiles = async (filters) => {
	logger.info(`Adding user sexual preferences to filters`);	
	const user = await Users.find(filters);
	if (!user) {
		return error.userNotFound;	
	}
	filters.sexualOrientation = user.sexualOrientation;
	
	logger.info(`validating filter data... ${JSON.stringify(filters, null, 2)}`);

	logger.info('fetching profiles data in db...');
	
	return { res: [{name: 'john'}, {name: 'paola'}] };
};

module.exports = getProfiles;
