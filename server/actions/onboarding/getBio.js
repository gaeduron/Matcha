const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	loginNotUnique: myError.newFailure({
		log: 'Login already registered',
		message: 'This Login is already registered.',
	}),
};

const bioValidation = async ({ bio, occupation }) => {
	let errors = [];

	errors.push(Users.validateBio({ bio }));
	errors.push(Users.validateOccupation({ occupation }));

	myError.cleanBuffer(errors);
	errors = myError.mergeBuffer(errors);

	return errors;
};

const getBio = async (data) => {
	logger.info('validating bio & occupation data...');
	const response = await bioValidation(data);

	if (response.error.length) 
		return response;
	
	logger.info('updating bio & occupation data in db...');

	const updateResponse = await Users.update({
		sessionToken: data.sessionToken,
		bio: data.bio,
		occupation: data.occupation,
	});
	
	return (updateResponse.error ? updateResponse : data);
};

module.exports = getBio;
