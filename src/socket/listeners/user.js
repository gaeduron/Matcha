const userListener = (dispatch, socket) => {
	socket.on('passwordReset', (res) => {
		console.log('response: ', res);
		dispatch({
			type: 'REDIRECT',
			redirect: '/',
		});
	});
};

export default userListener;
