const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	wrongUserId: myError.newFailure({
		log: 'like - user tried to send a wrong input',
		message: 'Whoops something happened',
	}),
};

const addLikeValidation = async ({sender, receiver}) => {
	let errors = [];

	const isValid = [
		Number.isInteger(sender),
		Number.isInteger(receiver)
	].reduce((acc, cond) => acc && cond, true); 
	

	if (!isValid)
		errors.push(error.wrongUserId);

	myError.cleanBuffer(errors);
	errors = myError.mergeBuffer(errors);

	return errors;
};

const addLike = async (data) => {


	logger.info('validating like input...');
	const response = await addLikeValidation(data);

	if (response.error.length) 
		return response;
	
	logger.info('updating like in DB...');

	const updateResponse = await Users.addLike(data);
	const receiver = await Users.find({ id: data.receiver });
	updateResponse.sockets = [receiver.user.connected]

	return (updateResponse.error ? updateResponse : data);
};

module.exports = addLike;
