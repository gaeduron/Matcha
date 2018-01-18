const myError = require('../../../errors');

const error = {
	invalidInput: myError.newFailure({
		log: 'User submitted invalid data',
		message: 'You submitted an invalid input'
	})
};

const validateGender = ({ gender }) => {

	if (gender === 'man' || gender === 'woman') 
			return { error: false };
	return error.invalidInput;
};

module.exports = validateGender;
