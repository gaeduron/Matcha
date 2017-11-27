const userListeners = require('./listeners/user');
const authListeners = require('./listeners/auth');
const socketLogout = require('../actions/authentication/socketLogout.js');
const logger = require('../logs/logger');


const defaultListeners = (socket) => {
	logger.info(`New user connected: ${socket.id}`);

	socket.emit('newMessage', {
		from: 'John',
		text: 'See you then',
		createdAt: 123123,
	});

	socket.on('disconnect', () => {
		logger.info('disconnecting user socket');
		socketLogout({ socketID: socket.id });
	});
};

const initListeners = (socket) => {
	defaultListeners(socket);
	authListeners(socket);
	userListeners(socket);
};

module.exports = initListeners;
