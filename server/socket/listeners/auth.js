const auth = require('../../models/auth');
const logger = require('../../logs/logger');

const authListeners = (socket) => {
	socket.on('login', async (user) => {
		logger.info(`Login user with: ${JSON.stringify(user)}`);
		const response = await auth.startLogin(user);
		if (response.error) {
			socket.emit('error', response);
		} else {
			socket.emit('login', response);
		};
	});
	
	socket.on('loginWithCookie', async (cookie) => {
		logger.info(`Login user with cookie: ${JSON.stringify(cookie)}`);
		const response = await auth.startLoginWithCookie(cookie);
		if (response.error) {
			socket.emit('error', response);
		} else {
			socket.emit('loginWithCookie', response);
		};
	});
};

module.exports = authListeners;
