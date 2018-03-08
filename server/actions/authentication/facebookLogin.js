const Users = require('../../models/user');
const logger = require('../../logs/logger');
const facebookRegistration = require('../user/facebookRegistration');

// 1 - Do user exist

// 1 bis - if not, register him

// 2 - create a new sessionToken for the user

// 3 - send session token 

const facebookLogin = async (user) => {
	user.facebookID = user.id;
	user.id = 0;

	let response = await Users.find(user);
	if (response.error) {
		if (response.error[0] !== 'User not found') {
			return response;
		} else {
			console.log('FB REGISTRATION');
			let response2 = await facebookRegistration(user);
			if (response2.error) { return response }
			return facebookLogin(user);
		}
	}

	user.id = response.user.id;
	logger.info('User is valid');

	let uid = await Users.newSession(user);

	return { 
		uid,
	};
};

module.exports = facebookLogin;
