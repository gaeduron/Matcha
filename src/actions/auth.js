import { socket } from '../socket/socket';

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

export const startLogin = () => {
};

export const logout = () => ({
	type: 'LOGOUT'
});

export const startLogout = () => {
	return () => {
		//    return firebase.auth().signOut();
	};
};
