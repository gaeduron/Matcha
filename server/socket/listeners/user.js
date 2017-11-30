const registration = require('../../actions/user/registration');
const passwordResetEmail = require('../../actions/user/passwordResetMail');
const passwordReset = require('../../actions/user/passwordReset');
const logger = require('../../logs/logger');

const userListeners = (socket) => {
	socket.on('createMessage', (message) => {
		logger.info('createMessage', message);
	});

	socket.on('createUser', async (user) => {
		logger.info('Create User Listener running...');
		const response = await registration(user);
		if (response.error) {
			socket.emit('notify_error', response);
		} else {
			socket.emit('createdUser', response);
			logger.succes('User registration');
		}
	});

	socket.on('passwordResetEmail', async (user) => {
		logger.info('Password Reset Email Listener running...');
		const response = await passwordResetEmail(user);
		if (response.error) {
			socket.emit('notify_error', response);
		} else {
			socket.emit('passwordResetEmail', response);
			logger.succes('Password Reset email on his way...');
		}
	});

	socket.on('passwordReset', async (user) => {
		logger.info('Password Reset Listener running...');
		const response = await passwordReset(user);
		if (response.error) {
			socket.emit('notify_error', response);
		} else {
			socket.emit('passwordReset', response);
			logger.succes('Password Reset email on his way...');
		}
	});
};

module.exports = userListeners;
