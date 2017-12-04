import cookie from 'js-cookie';

const saveCookie = (sessionToken) => {
	cookie.set('sessionToken', sessionToken);
	console.log(cookie.get('sessionToken'));
};

const authListener = (dispatch, socket) => {
	
	socket.on('login', (res) => {
		console.log('response: ', res);
		saveCookie(res);
		dispatch({
			type: 'LOGIN',
			uid: res
		});
	});
	
	socket.on('logout', (res) => {
		console.log('response: ', res);
		dispatch({
			type: 'LOGOUT'
		});	
	});
};

export default authListener;
