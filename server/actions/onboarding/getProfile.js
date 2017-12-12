// Validate data
// Save in pgsql
// throw error 

const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	emailNotUnique: myError.newFailure({
		log: 'Email already registered',
		message: 'This Email is already registered.',
	}),

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
	errors.push(Users.validateFirstname({ firstname: profile.nickname }));


	myError.cleanBuffer(errors);
	errors = myError.mergeBuffer(errors);

	return errors;
};

const getProfile = async (profile) => {
	logger.info('validating profile data...');
	const response = await profileValidation(profile);

	if (response.error.length) 
		return response;
	
	//	logger.info('finding user in db...');
	//	let user = await Users.find(profile);


	logger.info('updating profile data in db...');

	//	logger.info(JSON.stringify(updates, null, 2));

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
