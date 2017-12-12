const onboardingListener = (dispatch, socket) => {
	socket.on('getProfile', (res) => {
		console.log('getProfile response: ', res);
		dispatch([
			
		]);
	});
};

export default onboardingListener;
