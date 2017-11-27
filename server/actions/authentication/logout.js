const Users = require('../../models/user');
const logger = require('../../logs/logger');

const Logout = async ({ sessionToken }) => {
	const user = {
		sessionToken,
	};

	let response = await Users.find(user);
	if (response.error) { return response; }
	user.id = response.user.id;
	user.connected = null;
	user.sessionToken = null;
	logger.info('User exist');

	response = await Users.updateConnection(user);
	if (response.error) { return response; }
	logger.info('Socket is saved');

	return Users.newSession(user);
};

module.exports = Logout;
