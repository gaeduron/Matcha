const notificationListener = (socket) => {
	socket.on('newMessage', function (message) {
		  console.log('newMessage', message);
	});
	
	socket.on('createdUser', (res) => {
		  console.log('response: ', res);
	});
};

export default notificationListener;
