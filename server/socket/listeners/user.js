const registration = require('../../actions/user/registration');
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
};

module.exports = userListeners;
