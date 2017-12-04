const uuid = require('uuid/v4');
const moment = require('moment');
const Email = require('../../email');
const html = require('../../email/passwordReset');
const Users = require('../../models/user');
const logger = require('../../logs/logger');

const passwordResetEmail = async ({ emailOrLogin }) => {
	const user = {
		email: emailOrLogin,
		login: emailOrLogin,
	};

	logger.info('Searching a matching user...');
	let response = await Users.find(user);
	if (response.error) { return response; }
	user.email = response.user.email;
	user.id = response.user.id;

	logger.info('Generating password reset Token...');
	user.passwordResetToken = uuid();
	logger.info('getting current timestamp...');
	user.passwordResetExpireAt = moment().add(10, 'minutes').valueOf();

	logger.info('Updating passwordResetToken in db...');
	response = await Users.updatePasswordResetToken(user);
	if (response.error) { return response; }
	logger.info('Updating passwordResetExpireAt in db...');
	response = await Users.updatePasswordResetExpireAt(user);
	if (response.error) { return response; }

	const text = `Hello ${user.firstname}, you can reset your password by clicking this link: _some link_`;

	logger.info('Sending email...');
	const msg = {
		to: user.email,
		from: 'Matcha <noreply@matcha.com>',
		subject: 'Password Reset Request',
		text,
		html: html(`http://localhost:8080/password-reset/${user.passwordResetToken}`),
	};
	Email.send(msg);

	return { message: 'An email has been sent to your inbox.' };
};

module.exports = passwordResetEmail;
