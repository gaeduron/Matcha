import notificationListener from './notification';

const defaultListener = (dispatch, socket) => {
	socket.on('connect', function () {
		console.log('Connected to server');
	});

	socket.on('disconnect', function () {
		console.log('Disconnected from server');
	});
};

const initListeners = (dispatch, socket) => {
	defaultListener(dispatch, socket);
	notificationListener(dispatch, socket);
};

export default initListeners;
