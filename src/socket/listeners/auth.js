import cookie from 'js-cookie';

const saveCookie = (uid) => {
	cookie.set('uid', uid);
	console.log(cookie.get('uid'));
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
	
	socket.on('loginWithCookie', (res) => {
		console.log('response: ', res);
		dispatch({
			type: 'LOGIN',
			uid: res.uid
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
