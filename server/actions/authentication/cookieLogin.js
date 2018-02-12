const Users = require('../../models/user');
const logger = require('../../logs/logger');
const { pick } = require('ramda');

const cookieLogin = async ({ sessionToken, socketID }) => {

	const reduxStateData = [
		'login', 'firstname', 'lastname', 
		'nickname', 'email', 'sex', 
		'sexualOrientation', 'bio', 
		'longitude', 'latitude', 'birthdate', 
		'photos', 'geolocationAllowed', 'onboarding', 'id', 'occupation'
	];

	const user = {
		sessionToken,
		connected: socketID,
	};

	let response = await Users.find(user);
	if (response.error) { return response; }

	let userRedux = pick(reduxStateData, response.user); 

	user.id = response.user.id;
	logger.info('User is valid');

	response = await Users.updateConnection(user);
	if (response.error) { return response; }
	logger.info('Socket is saved');

	let uid = await Users.newSession(user);

	return { 
		uid,
		...userRedux
	};
};

module.exports = cookieLogin;
