const Users = require('../../models/user');
const logger = require('../../logs/logger');

const cookieLogin = async ({ sessionToken, socketID }) => {
	const user = {
		sessionToken,
		connected: socketID,
	};
	let response = await Users.find(user);
	if (response.error) { return response; }
	let isOnboarding = response.user.onboarding;
	user.id = response.user.id;
	logger.info('User is valide');

	response = await Users.updateConnection(user);
	if (response.error) { return response; }
	logger.info('Socket is saved');

	let uid = await Users.newSession(user);

	return { 
		uid,
		isOnboarding
	};
};

module.exports = cookieLogin;
