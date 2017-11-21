const users = require('../../models/users');
const logger = require('../../logs/logger');

const userListeners = (socket) => {
	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
	});

	socket.on('createUser', async (user) => {
		logger.info('Create User Listener running...');
		const response = await users.startUserCreation(user);
		if (response) {
			socket.emit('createdUser', response);
		} else {
			socket.emit('Error', response);
		};
	});
};

module.exports = userListeners;
