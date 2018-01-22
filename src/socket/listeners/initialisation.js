import cookie from 'js-cookie';
import notificationListener from './notification';
import authListener from './auth';
import userListener from './user';
import onboardingListener from './onboarding';

const defaultListener = (dispatch, socket) => {
	socket.on('connect', function () {
		socket.emit('loginWithCookie', {
			sessionToken: cookie.get('sessionToken'),
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
	userListener(dispatch, socket);
	onboardingListener(dispatch, socket);
};

export default initListeners;
