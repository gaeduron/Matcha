import cookie from 'js-cookie';
import notificationListener from './notification';
import authListener from './auth';

const defaultListener = (dispatch, socket) => {
	socket.on('connect', function () {
		socket.emit('loginWithCookie', {
			uid: cookie.get('uid'),
			socketID: socket.id
		});
		console.log('Connected to server');
	});

	socket.on('disconnect', function () {
		console.log('Disconnected from server');
	});
};

const initListeners = (dispatch, socket) => {
	defaultListener(dispatch, socket);
	notificationListener(dispatch, socket);
	authListener(dispatch, socket);
};

export default initListeners;
