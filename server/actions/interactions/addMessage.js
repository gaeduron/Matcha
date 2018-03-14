const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	wrongUserId: myError.newFailure({
		log: 'like - user tried to send a wrong input',
		message: 'Whoops something happened',
	}),
};

const addMessageValidation = async ({sender, receiver, id, message}) => {
	let errors = [];

	const isValid = [
		Number.isInteger(sender),
		Number.isInteger(receiver),
		id === sender,
		typeof message == 'string',
		message.length <= 500,
		//	Users.validateMatch()
		/* IMPROVE MESSAGE VALIDATION */
		// Do these users have matched ?  
	].reduce((acc, cond) => acc && cond, true); 
	

	if (!isValid)
		errors.push(error.wrongUserId());

	myError.cleanBuffer(errors);
	errors = myError.mergeBuffer(errors);

	return errors;
};

const addMessage = async (data) => {


	logger.info('validating message input...');
	const response = await addMessageValidation(data);

	if (response.error.length) 
		return response;
	
	logger.info('updating message in DB...');

	const updateResponse = await Users.addMessage(data);
	const receiver = await Users.find({ id: data.receiver });
	data.sockets = receiver.error ? [] : [receiver.user.connected];

	return (updateResponse.error ? updateResponse : data);
};

module.exports = addMessage;
