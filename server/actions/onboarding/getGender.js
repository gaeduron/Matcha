const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	missingField: myError.newFailure({
		log: 'User gender or orientation missing',
		message: 'Your gender or orientation is missing'
	})
};


const validation = async ({ gender, orientation }) => {
	let errors = [];

	if (!gender || !orientation)
		errors.push(error.missingField);

	errors.push(Users.validateGender({ gender }));
	errors.push(Users.validateOrientation({ orientation }));

	myError.cleanBuffer(errors);
	errors = myError.mergeBuffer(errors);

	return errors;
};

const getGender = async (genderData) => {
	logger.info('validating gender data...');
	const response = await validation(genderData);

	if (response.error.length) 
		return response;
	
	logger.info('updating gender data in db...');

	const updateResponse = await Users.update({
		sessionToken: genderData.sessionToken,
		sex: genderData.gender,
		sexualOrientation: genderData.orientation
	});
	
	return (updateResponse.error ? updateResponse : genderData);
};

module.exports = getGender;
