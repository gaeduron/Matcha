const myError = require('../../../errors');

const error = {
	invalidPhoto: myError.newFailure({
		log: 'invalid user photo',
		message: 'Your photo is invalid'
	}),
	emptyPhoto: myError.newFailure({
		log: 'user didn\'t submi any photo',
		message: 'You must upload at least one picture'
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

	if (photosUrl[0] == undefined)
		return error.emptyPhoto();

	const validate = [
		Array.isArray(photosUrl), 
		isPhotoArray(photosUrl), 
	].reduce((acc, cond) => cond && acc, true);

	return validate == true ? { error: false } : error.invalidPhoto();
};

module.exports = validatePhotos;
