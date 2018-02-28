const Users = require('../../models/user');

const broadcastOnlineUsers = async (socket) => {

	const res = await Users.getOnlineUsers();
	const onlineUsers = res.map(x => x.id);	

	/* Broadcast online users */
	socket.broadcast.emit('onlineUsers', onlineUsers);
	socket.emit('onlineUsers', onlineUsers);
};


module.exports = broadcastOnlineUsers;
