const Users = require('../../models/user');
const logger = require('../../logs/logger');

const cookieLogin = async ({ sessionToken, socketID }) => {
	const user = {
		sessionToken,
		connected: socketID,
	};
	let response = await Users.find(user);
	if (response.error) { return response; }
	user.id = response.user.id;
	logger.info('User is valide');

	response = await Users.updateConnection(user);
	if (response.error) { return response; }
	logger.info('Socket is saved');

	return Users.newSession(user);
};

module.exports = cookieLogin;
