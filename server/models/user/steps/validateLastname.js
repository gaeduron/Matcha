const myError = require('../../../errors');

const error = {
	tooLong: myError.newFailure({
		log: length => `User lastname is too long (${length}) characters`,
		message: length => `Your lastname is too long (${length}), 
		254 characters max.`,
	}),
	format: myError.newFailure({
		log: 'User lastname contain forbidden characters',
		message: 'Your lastname should only contain letters.',
	}),
};

const validateLastname = ({ lastname }) => {
	const regex = /^[a-zA-Z]+$/;

	if (lastname.length > 254) { return error.tooLong(lastname.length); }
	if (!regex.test(lastname)) { return error.format(); }
	return null;
};

module.exports = validateLastname;
