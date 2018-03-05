const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	wrongUserId: myError.newFailure({
		log: 'like - user tried to send a wrong input',
		message: 'Whoops something happened',
	}),
};

const blockValidation = async ({sender, receiver, id}) => {
	let errors = [];

	const isValid = [
		Number.isInteger(sender),
		Number.isInteger(receiver),
		id === sender
	].reduce((acc, cond) => acc && cond, true); 
	

	if (!isValid)
		errors.push(error.wrongUserId());

	myError.cleanBuffer(errors);
	errors = myError.mergeBuffer(errors);

	return errors;
};

const block = async (data) => {


	logger.info('validating block input...');
	const response = await blockValidation(data);

	if (response.error.length) 
		return response;
	
	logger.info('updating block/unblock in DB...');

	const updateResponse = await Users.block(data);
	const receiver = await Users.find({ id: data.receiver });
	data.sockets = receiver.error ? [] : [receiver.user.connected];

	return (updateResponse.error ? updateResponse : data);
};

module.exports = block;
