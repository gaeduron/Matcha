const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');
const axios = require('axios');

const error = {
	emailNotUnique: myError.newFailure({
		log: 'Email already registered',
		message: 'This Email is already registered.',
	}),
};

const getUserPhoto = async (id) => {
	const file = `http://graph.facebook.com/v2.5/${id}/picture?height=500&height=500`;

	const cloudName = 'matcha';
	const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

	const data = await axios.post(url, { file: file, upload_preset: 'l37etlko' });

	let photoUrl = data.data.secure_url;
	console.log('Uploaded photo url: ', photoUrl);
	return photoUrl;
};

const registrationValidation = async (user) => {
	let errors = [];

	errors.push(Users.validateEmail(user));
	
	const userWithThisEmail = await Users.find({ email: user.email });

	if (userWithThisEmail.user) {
		errors.push(error.emailNotUnique());
	}
	myError.cleanBuffer(errors);
	errors = myError.mergeBuffer(errors);

	return errors;
};

const facebookRegistration = async (request) => {
	const user = { ...request };

	logger.info('validating user data...');
	const response = await registrationValidation(user);
	if (response.error.length) { return response; }
	
	if (user.gender == 'female') {
		user.gender = 'women';
	} else {
		user.gender = 'man';
	}

	const photoUrl = await getUserPhoto(user.facebookID);

	user.photos = JSON.stringify([photoUrl, undefined, undefined, undefined, undefined]);

	logger.info('Insert in database new user...');
	return Users.facebookCreate(user);
};

module.exports = facebookRegistration;
