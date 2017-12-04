const myError = require('../../../errors');

const error = {
	tooLong: myError.newFailure({
		log: length => `User email is too long (${length}) characters`,
		message: length => `Your email is too long (${length}), 
		254 characters max.`,
	}),
	format: myError.newFailure({
		log: 'User email contain forbidden characters',
		message: 'Your email should respect asked format',
	}),
};

const validateEmail = ({ email }) => {
	const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

	if (email.length > 254) { return error.tooLong(email.length); }
	if (!regex.test(email)) { return error.format(); }
	return { error: false };
};

module.exports = validateEmail;
