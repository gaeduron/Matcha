const myError = require('../../../errors');

const error = {
	tooLong: myError.newFailure({
		log: length => `User occupation is too long (${length}) characters`,
		message: length => `Your occupation is too long (${length}), 
		50 characters max.`,
	})
};

const validateOccupation = ({ occupation }) => {

	if (occupation.length > 50) { return error.tooLong(occupation.length); }
	return { error: false };
};

module.exports = validateOccupation;
