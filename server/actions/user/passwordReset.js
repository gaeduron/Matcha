const uuid = require('uuid/v4');
// NEED INSTALL const moment = require('moment');
const Users = require('../../models/user');
const logger = require('../../logs/logger');

const passwordReset = async ({ password, passwordConfirmation, token }) => {
	const user = {
		email: emailOrLogin,
		login: emailOrLogin,
	};

	logger.info('Searching a matching user...');
	let response = await Users.find(user);
	if (response.error) { return response; }
	user.email = response.user.email;

	logger.info('Generating password reset Token...');
	user.passwordResetToken = uuid();

	logger.info('getting current timestamp...');
	// user.passwordResetExpireAt = moment() + (1 heure);

	logger.info('Updating passwordResetToken in db...');
	response = await Users.updatePasswordResetToken(user);
	if (response.error) { return response; }

	logger.info('Updating passwordResetExpireAt in db...');
	response = await Users.updatePasswordResetExpireAt(user);
	if (response.error) { return response; }

	// generate reset email content (text + email + Token
	user.emailTitle = 'Matcha: password reset';
	user.emailBody = `Hello ${user.firstname}, you can reset your password by clicking this link: _some link_`;

	logger.info('Sending email...');
	response = await Users.sendEmail(user);
	if (response.error) { return response; }

	return Users.newSession(user);
};

module.exports = passwordReset;
