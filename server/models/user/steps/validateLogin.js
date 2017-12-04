const myError = require('../../../errors');

const error = {
	tooLong: myError.newFailure({
		log: length => `User login is too long (${length}) characters`,
		message: length => `Your login is too long (${length}), 
		254 characters max.`,
	}),
	format: myError.newFailure({
		log: 'User login contain forbidden characters',
		message: 'Your login should only contain letters, numbers, dots, dashs, underscores.',
	}),
};

const validateLogin = ({ login }) => {
	const regex = /^[A-Za-z0-9.-_]+$/;

	if (login.length > 254) { return error.tooLong(login.length); }
	if (!regex.test(login)) { return error.format(); }
	return { error: false };
};

module.exports = validateLogin;
