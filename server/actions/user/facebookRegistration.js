const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	emailNotUnique: myError.newFailure({
		log: 'Email already registered',
		message: 'This Email is already registered.',
	}),
};

const registrationValidation = async (user) => {
	let errors = [];

	errors.push(Users.validateEmail(user));
	
	const userWithThisEmail = await Users.find({ email: user.email });

	if (userWithThisEmail.user) {
		errors.push(error.emailNotUnique());
	}
	myError.cleanBuffer(errors);
	errors = myError.mergeBuffer(errors);

	return errors;
};

const facebookRegistration = async (request) => {
	const user = { ...request };

	logger.info('validating user data...');
	const response = await registrationValidation(user);
	if (response.error.length) { return response; }

	logger.info('Insert in database new user...');
	return Users.facebookCreate(user);
};

module.exports = Registration;
