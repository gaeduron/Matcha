const myError = require('../../../errors');

const error = {
	tooLong: myError.newFailure({
		log: length => `User password is too long (${length}) characters`,
		message: length => `Your password is too long (${length}), 
		254 characters max.`,
	}),
	format: myError.newFailure({
		log: 'User password contain forbidden characters',
		message: 'Your password should only contain letters.',
	}),
};

const validatePassword = ({ password }) => {
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

	if (password.length > 254 && password.length < 8) {
		return error.Length(password.length);
	}
	if (!regex.test(password)) { return error.format(); }
	return null;
};

module.exports = validatePassword;
