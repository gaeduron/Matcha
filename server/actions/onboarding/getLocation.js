const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	incompleteLocation: myError.newFailure({
		log: 'User location is incomplete, missing either lat or lon',
		message: 'Your location is invalid'
	})
};


const validation = async ({ latitude = 0, longitude = 0 }) => {
	let errors = [];

	if (!latitude || !longitude)
		errors.push(error.incompleteLocation);

	errors.push(Users.validateLocation(latitude, longitude));

	myError.cleanBuffer(errors);
	errors = myError.mergeBuffer(errors);

	return errors;
};

const getLocation = async (location) => {
	const { sessionToken } = location;

	logger.info('validating location data...');
	const response = await validation(location);

	if (response.error.length) 
		return response;
	
	logger.info('updating location data in db...');

	const updateResponse = await Users.update({
		latitude: location.latitude,
		longitude: location.longitude,
		geolocationAllowed: location.geolocationAllowed,
		onboarding: false,
		sessionToken
	});
	
	return (updateResponse.error ? updateResponse : location);
};

module.exports = getLocation;
