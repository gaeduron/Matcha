const Users = require('../../models/user');
const logger = require('../../logs/logger');

// 1 - Do user exist

// 1 bis - if not, register him

// 2 - create a new sessionToken for the user

// 3 - send session token 

const facebookLogin = async (user) => {
	user.facebookID = user.id;
	user.id = 0;

	let response = await Users.find(user);
	if (response.error) { return response; }

	user.id = response.user.id;
	logger.info('User is valid');

	let uid = await Users.newSession(user);

	return { 
		uid,
	};
};

module.exports = facebookLogin;
