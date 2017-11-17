import notificationListener from './notification';

const defaultListener = (socket) => {
	socket.on('connect', function () {
		console.log('Connected to server');
	});

	socket.on('disconnect', function () {
		  console.log('Disconnected from server');
	});
};

const initListeners = (socket) => {
	defaultListener(socket);
	notificationListener(socket);
};

export default initListeners;
