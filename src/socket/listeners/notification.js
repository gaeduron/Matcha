const notificationListener = (dispatch, socket) => {
	socket.on('newMessage', function (message) {
		console.log('newMessage', message);
	});

	socket.on('createdUser', (res) => {
		console.log('response: ', res);
		dispatch({
			type: 'ADD_NOTIFICATION',
			notification: res.messages
		});
	});

	socket.on('notify_error', (res) => {
		console.log('SERVER INFO: ', res);
		if (res.type != 'hidden') {
			dispatch({
				type: 'ADD_NOTIFICATION',
				notification: res.error
			});
		};
	});
};

export default notificationListener;
