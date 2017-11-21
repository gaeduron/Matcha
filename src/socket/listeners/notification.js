
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
};

export default notificationListener;
