const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	noPhotos: myError.newFailure({
		log: 'User didn\'t submit photos',
		message: 'Your photos are invalid'
	})
};


const validation = async ({ photosUrl }) => {
	let errors = [];

	if (!photosUrl)
		errors.push(error.noPhotos);
	else
		errors.push(Users.validatePhotos(photosUrl));

	myError.cleanBuffer(errors);
	errors = myError.mergeBuffer(errors);

	return errors;
};

const getPhotos = async (photos) => {
	const { sessionToken, photosUrl } = photos;

	logger.info('validating photos data...');
	const response = await validation(photos);

	if (response.error.length) 
		return response;
	
	logger.info('updating photos data in db...');

	const updateResponse = await Users.update({
		photos: photosUrl,
		sessionToken
	});
	
	return (updateResponse.error ? updateResponse : photosUrl);
};

module.exports = getPhotos;
