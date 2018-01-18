const myError = require('../../../errors');

const error = {
	invalidPhoto: myError.newFailure({
		log: 'invalid user photo',
		message: 'Your photo is invalid'
	})
};

const isPhotoArray = (photosUrl) => {
	const regex = /https:\/\/res\.cloudinary\.com\/matcha\/image\/upload/;

	for (let photo of photosUrl) {
		if (photo == undefined || photo.match(regex))
			;			
		else 
			return false;
	}	
	return photosUrl.length == 5 ? true : false;
};

const validatePhotos = (photosUrl) => {

	if (Array.isArray(photosUrl) && isPhotoArray(photosUrl))	
		return { error: false };
	return error.invalidPhoto();
};

module.exports = validatePhotos;
