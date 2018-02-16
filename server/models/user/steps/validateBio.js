const myError = require('../../../errors');

const error = {
	tooLong: myError.newFailure({
		log: length => `User bio is too long (${length}) characters`,
		message: length => `Your bio is too long (${length}), 
		280 characters max.`,
	})
};

const validateBio = ({ bio }) => {

	if (bio.length > 599) { return error.tooLong(bio.length); }
	return { error: false };
};

module.exports = validateBio;
