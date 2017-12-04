const Users = require('../../models/user');
const logger = require('../../logs/logger');

const socketLogout = async ({ socketID }) => {
	const user = {
		socketID,
	};

	let response = await Users.find(user);
	if (response.error) { return response; }
	user.id = response.user.id;
	user.connected = null;
	logger.info('User exist');

	response = await Users.updateConnection(user);
	if (response.error) { return response; }
	logger.succes('Socket is unset');

	return {};
};

module.exports = socketLogout;
