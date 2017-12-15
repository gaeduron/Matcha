const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	incompleteLocation: myError.newFailure({
		log: 'User location is incomplete, missing either lat or lon',
		message: 'Your location is invalid'
	}),
	emptyArray: myError.newFailure({
		log: 'Error, the tag array is empty ',
		message: 'Error, you sent an empty array',
	})
};


const validation = async (tags) => {
	let errors = [];

	if (!tags)
		errors.push(error.emptyArray);

	errors.push(Users.validateTags(tags));

	myError.cleanBuffer(errors);
	errors = myError.mergeBuffer(errors);

	return errors;
};

/* tags = ['x', 'y', 'z', ...] */

const getTags = async ({ tags, sessionToken }) => {
	const { user } = await Users.find({ sessionToken });
	const { id } = user;

	logger.info('validating tags data...');
	const response = await validation(tags);

	if (response.error.length) {
		return response;
	}
	
	logger.info('inserting tags in db...');

	const updateResponse = await Users.addTags(tags, id);
	
	return (updateResponse.error ? updateResponse : tags);
};

module.exports = getTags;
