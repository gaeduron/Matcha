const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	wrongUserId: myError.newFailure({
		log: 'visit - user tried to send a wrong input',
		message: 'Whoops something happened',
	}),
};

const addVisitValidation = async ({sender, receiver, id}) => {
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

const addVisit = async (data) => {


	logger.info('validating visit input...');
	const response = await addVisitValidation(data);

	if (response.error.length) 
		return response;
	
	logger.info('updating visit in DB...');

	const updateResponse = await Users.addVisit(data);
	const receiver = await Users.find({ id: data.receiver });
	data.sockets = [receiver.user.connected];

	return (updateResponse.error ? updateResponse : data);
};

module.exports = addVisit;
