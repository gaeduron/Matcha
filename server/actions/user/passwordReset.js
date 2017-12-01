const moment = require('moment');
const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myErrors = require('../../errors');

const error = {
	tokenTooOld: myErrors.newFailure({
		log: 'Password reset token too old',
		message: 'Your token has expired, please ask for another password reset email',
	}),
	fieldsNotEqual: myErrors.newFailure({
		log: 'Both password field are not equal',
		message: 'Both password field should be equal',
	}),
};

const passwordReset = async ({ password, passwordConfirmation, passwordResetToken }) => {
	const user = {
		password,
		passwordConfirmation,
		passwordResetToken,
	};

	logger.info(`Searching a matching user for token:${passwordResetToken} ...`);
	let response = await Users.find(user);
	if (response.error) { return response; }
	user.id = response.user.id;
	user.passwordResetExpireAt = response.user.passwordResetExpireAt;

	logger.info('Veryfing Token date...');
	if (moment().isBefore(user.passwordResetExpireAt)) { return error.tokenTooOld(); }

	logger.info('Veryfing if password and passwordConfirmation are equal');
	if (password !== passwordConfirmation) { return error.fieldsNotEqual(); }

	logger.info('Veryfing new password');
	response = await Users.validatePassword(user);
	if (response.error) { return response; }

	logger.info('hashing password...');
	user.password = await Users.hashPassword(user);

	logger.info('Updating user password in db...');
	response = await Users.updatePassword(user);
	if (response.error) { return response; }

	logger.info('Updating passwordResetToken in db...');
	user.passwordResetToken = null;
	response = await Users.updatePasswordResetToken(user);
	if (response.error) { return response; }

	logger.info('Updating passwordResetExpireAt in db...');
	user.passwordResetExpireAt = null;
	response = await Users.updatePasswordResetExpireAt(user);
	if (response.error) { return response; }

	return { message: 'Your new password has been successfully saved !' };
};

module.exports = passwordReset;
