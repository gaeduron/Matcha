const myError = require('../../../errors');

const error = {
	tooLong: myError.newFailure({
		log: length => `User firstname is too long (${length}) characters`,
		message: length => `Your firstname is too long (${length}), 
		254 characters max.`,
	}),
	format: myError.newFailure({
		log: 'User firstname contain forbidden characters',
		message: 'Your firstname should only contain letters.',
	}),
};

const validateFirstname = ({ firstname }) => {
	const regex = /^[a-zA-Z]+$/;

	if (firstname.length > 254) { return error.tooLong(firstname.length); }
	if (!regex.test(firstname)) { return error.format(); }
	return null;
};

module.exports = validateFirstname;
