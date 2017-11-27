const Users = require('../../models/user');
const logger = require('../../logs/logger');
const error = require('../../errors/models/auth');
const bcrypt = require('bcryptjs');

const Login = async ({ socketID, emailOrLogin, password }) => {
	const user = {
		password,
		connected: socketID,
		email: emailOrLogin,
		login: emailOrLogin,
	};

	let response = await Users.find(user);
	if (response.error) { return response; }
	user.id = response.user.id;
	user.hash = response.user.password;
	logger.info('User exist');

	if (!(await bcrypt.compare(user.password, user.hash))) {
		return error.invalidePassword();
	}
	logger.info('User password match database password');

	response = await Users.updateConnection(user);
	if (response.error) { return response; }
	logger.info('Socket is saved');

	return Users.newSession(user);
};

module.exports = Login;
