import cookie from 'js-cookie';
import rehydrateStore from '../../store/rehydrateStore';

const saveCookie = (sessionToken) => {
	cookie.set('sessionToken', sessionToken);
	console.log(cookie.get('sessionToken'));
};

const authListener = (dispatch, socket) => {
	
	socket.on('login', (user) => {
	
		const { uid, onboarding } = user;

		console.log('response: ', uid);
		saveCookie(uid);
		dispatch({
			type: 'LOGIN',
			uid,
			isOnboarding: onboarding
		});
		
		rehydrateStore(dispatch, user);
	});
	
	socket.on('logout', (res) => {
		console.log('response: ', res);
		dispatch({
			type: 'LOGOUT'
		});	
	});

	
};

export default authListener;
