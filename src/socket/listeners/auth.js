import cookie from 'js-cookie';

const saveCookie = (sessionToken) => {
	cookie.set('sessionToken', sessionToken);
	console.log(cookie.get('sessionToken'));
};

const authListener = (dispatch, socket) => {
	
	socket.on('login', ({ uid, isOnboarding }) => {
		console.log('response: ', uid, isOnboarding);
		saveCookie(uid);
		dispatch({
			type: 'LOGIN',
			uid,
			isOnboarding
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
