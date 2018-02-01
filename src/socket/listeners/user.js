//import { history } from '../../routers/AppRouter';

const userListener = (dispatch, socket) => {
	socket.on('passwordReset', (res) => {
		dispatch({
			type: 'REDIRECT',
			redirect: '/',
		});
	});

	socket.on('createUser', (res) => {
		console.log('redirect: ', res);
	//	history.push(`onboarding`);
	});
};

export default userListener;
