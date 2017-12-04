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

const registrationValidation = async (user) => {
	let errors = [];

	errors.push(Users.validateFirstname(user));
	errors.push(Users.validateLastname(user));
	errors.push(Users.validatePassword(user));
	errors.push(Users.validateLogin(user));
	errors.push(Users.validateEmail(user));

	const userWithThisEmail = await Users.find({ email: user.email });
	const userWithThisLogin = await Users.find({ login: user.login });
	if (userWithThisEmail.user) {
		errors.push(error.emailNotUnique());
	}
	if (userWithThisLogin.user) {
		errors.push(error.loginNotUnique());
	}

	myError.cleanBuffer(errors);
	errors = myError.mergeBuffer(errors);

	return errors;
};

const registration = async (request) => {
	const user = { ...request };

	logger.info('validating user data...');
	const response = await registrationValidation(user);
	if (response.error.length) { return response; }

	logger.info('hashing password...');
	user.password = await Users.hashPassword(user);

	logger.info('Insert in database new user...');
	return Users.create(user);
};

module.exports = registration;
