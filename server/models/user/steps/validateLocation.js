const myError = require('../../../errors');
const isCoordinates = require('is-coordinates');

const error = {
	invalidLocation: myError.newFailure({
		log: 'invalid user location',
		message: 'Your location is invalid',
	})
};

const validateLocation = (latitude, longitude) => {
	if (isCoordinates([latitude, longitude]))	
		return { error: false };
	return error.invalidLocation;
};

module.exports = validateLocation;
