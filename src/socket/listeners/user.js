const userListener = (dispatch, socket) => {
	socket.on('passwordReset', (res) => {
		dispatch({
			type: 'REDIRECT',
			redirect: '/',
		});
	});
};

export default userListener;
