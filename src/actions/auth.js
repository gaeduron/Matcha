import cookie from 'js-cookie';
import { socket } from '../socket/socket';

export const passwordResetEmail = ({ emailOrLogin }) => {
	socket.emit('passwordResetEmail', {
		emailOrLogin,
		socketID: socket.id,
	});
};

export const passwordReset = ({
	password,
	passwordConfirmation,
	passwordResetToken,
}) => {
	socket.emit('passwordReset', {
		password,
		passwordConfirmation,
		passwordResetToken,
	});
};

export const createAccount = ({
	email,
	password,
}) => {
	socket.emit('createUser', {
		email,
		password,
	});
};

export const login = ( uid, isOnboarding ) => ({
	type: 'LOGIN',
	uid,
	isOnboarding
});

export const startLogin = ({ emailOrLogin, password }) => {
	socket.emit('login', {
		emailOrLogin,
		password,
		socketID: socket.id,
	});
};

export const logout = () => ({
	type: 'LOGOUT',
});

export const startLogout = () => {
	socket.emit('logout', { sessionToken: cookie.get('sessionToken') });
	cookie.remove('sessionToken');
};
