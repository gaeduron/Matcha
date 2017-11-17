const userListeners = require("./listeners/user");

const defaultListeners = (socket) => {
	console.log('New user connected', socket.id);

	socket.emit('newMessage', {
		    from: 'John',
		    text: 'See you then',
		    createdAt: 123123
	});

	socket.on('disconnect', () => {
		    console.log('User was disconnected');
	});
};

const initListeners = (socket) => {
	defaultListeners(socket);
	userListeners(socket);
};

module.exports = initListeners;
