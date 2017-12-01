import cookie from 'js-cookie';

const saveCookie = (sessionToken) => {
	cookie.set('sessionToken', sessionToken);
	console.log(cookie.get('sessionToken'));
};

const userListener = (dispatch, socket) => {
	
	socket.on('passwordReset', (res) => {
		console.log('response: ', res);
		dispatch({
			type: '',
		});	
	});
};

export default authListener;
