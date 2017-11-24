import { socket } from '../socket/socket';
import cookie from 'js-cookie';

export const passwordReset = ({ email}) => {
	socket.emit('passwordReset', {
		email: email,
		socketID: socket.id
	});
};

export const createAccount = ({ email, firstname, lastname, login, password }) => {
	socket.emit('createUser', {
		email: email,
		firstname: firstname,
		lastname: lastname,
		login: login,
		password: password
	});
};

export const createAccountNotif = (notification) => ({
	type: 'ADD_NOTIFICATION',
	notification: notification
});

export const login = (uid) => ({
	type: 'LOGIN',
	uid
});

export const startLogin = ({ email, password }) => {
	socket.emit('login', {
		email: email,
		password: password,
		socketID: socket.id
	});
};

export const logout = () => ({
	type: 'LOGOUT'
});

export const startLogout = () => {
	socket.emit('logout', cookie.get('uid'));
	cookie.remove('uid');
};
