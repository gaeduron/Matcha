const myError = require('../../../errors');

const error = {
	invalidInput: myError.newFailure({
		log: 'User submitted invalid data',
		message: 'You submitted an invalid input'
	})
};

const validateOrientation = ({ orientation }) => {

	if (
			orientation === 'straight' || 
			orientation === 'bisexual' || 
			orientation === 'gay'
		) 
			return { error: false };
	return error.invalidInput;
};

module.exports = validateOrientation;
