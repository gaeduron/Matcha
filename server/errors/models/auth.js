const logger = require('../../logs/logger');

const none = { error: false };

const noCookie = () => {
	logger.failure('User have no valid cookie');
	return { error: 'You have no session cookie, please login', type: 'hidden' };
};

const invalidePassword = () => {
	logger.failure('Invalide password');
	return { error: ['Invalide password'] };
};

const userNotFound = () => {
	logger.failure('Incorrect login or e-mail');
	return { error: ['Incorrect login or e-mail'] };
};

const socketNotAuth = () => {
	logger.failure('This socket is not authenticated');
	return { error: ['This socket is not authenticated'] };
};

const database = (e) => {
	logger.error(`Database error in models/auth.js => ${e}`);
	return { error: ['Error, please try again later'] };
};

module.exports = {
	database,
	none,
	userNotFound,
	invalidePassword,
	noCookie,
	socketNotAuth,
};
