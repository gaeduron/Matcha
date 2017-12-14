// Validate data
// Save in pgsql
// throw error 

const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	loginNotUnique: myError.newFailure({
		log: 'Login already registered',
		message: 'This Login is already registered.',
	}),
};

const profileValidation = async (profile) => {
	let errors = [];

	errors.push(Users.validateFirstname({ firstname: profile.fname }));
	errors.push(Users.validateLastname({ lastname: profile.lname }));
	errors.push(Users.validateBirthdate({ birthdate: profile.birthDate }));

	const userWithSession = await Users.find({ sessionToken: profile.sessionToken });
	const userWithNickname = await Users.find({ login: profile.nickname }); 

	if (userWithNickname.user && userWithSession.user.id !== userWithNickname.user.id) {
		errors.push(error.loginNotUnique());
	}

	myError.cleanBuffer(errors);
	errors = myError.mergeBuffer(errors);

	return errors;
};

const getProfile = async (profile) => {
	logger.info('validating profile data...');
	const response = await profileValidation(profile);

	if (response.error.length) 
		return response;
	
	logger.info('updating profile data in db...');

	const updateResponse = await Users.update({
		sessionToken: profile.sessionToken,
		login: profile.nickname,
		firstname: profile.fname,
		lastname: profile.lname,
		birthdate: JSON.stringify(profile.birthDate)
	});
	
	return (updateResponse.error ? updateResponse : profile);
};

module.exports = getProfile;
