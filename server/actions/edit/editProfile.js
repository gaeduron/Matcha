const { pick } = require('ramda');
const getProfile = require('../onboarding/getProfile');
const getGender = require('../onboarding/getGender');
const getLocation = require('../onboarding/getLocation');
const getTags = require('../onboarding/getTags');
const getPhotos = require('../onboarding/getPhotos');
const getBio = require('../onboarding/getBio');

const editProfile = async (data) => {
	
	/* Async dispatch of validations and database updates */
	let res = [];
	res.push(await getProfile(pick(['fname', 'lname', 'nickname', 'birthDate', 'sessionToken'], data)));
	res.push(await getGender(pick(['gender', 'orientation', 'sessionToken'], data)));
	res.push(await getBio(pick(['bio', 'occupation', 'sessionToken'], data)));
	res.push(await getLocation(pick(['latitude', 'longitude', 'geolocationAllowed', 'sessionToken'], data)));
	res.push(await getTags(pick(['tags', 'sessionToken'], data)));
	res.push(await getPhotos(pick(['photosUrl', 'sessionToken'], data)));

	const error = res.filter(response => response.error)[0];
	return error ? error : data; 
};

module.exports = editProfile;
