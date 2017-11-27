const Users = require('../../models/user');
const logger = require('../../logs/logger');

const socketLogout = async ({ socketID }) => {
	const user = {
		socketID,
	};

	logger.warn(`user on socketLogout: ${JSON.stringify(user)}`);
	let response = await Users.find(user);
	if (response.error) { return response; }
	user.id = response.user.id;
	user.connected = null;
	logger.info('User exist');

	response = await Users.updateConnection(user);
	if (response.error) { return response; }
	logger.info('Socket is unset');

	return {};
};

module.exports = socketLogout;
