const database = require('../../../postgresql');
const logger = require('../../../logs/logger');
const myErrors = require('../../../errors');

const error = {
	database: myErrors.newFailure({
		log: e => `Database error: models/user/paths/find.js => ${e}`,
		message: 'Error, please try again later.',
	}),
	userNotFound: myErrors.newFailure({
		log: 'User not found',
		message: 'User not found',
	}),
};

const findUserByUniqueIdentifier = async (
	{
		email,
		socketID,
		sessionToken,
		passwordResetToken,
		login,
		id,
	},
) => {
	const query = 'SELECT * FROM users WHERE login = $1 OR email = $2 OR connected = $3 OR id = $4 OR session_token = $5 OR password_reset_token = $6;';

	try {
		const res = await database.query(
			query,
			[login, email, socketID, id, sessionToken, passwordResetToken],
		);

		if (!res.rows[0]) { return error.userNotFound(); }

		return { user: res.rows[0] };
	} catch (e) {
		return error.database(e);
	}
};

const formatUser = (user) => {
	const formatedUser = { ...user };
	if (!formatedUser.login) { formatedUser.login = ''; }
	if (!formatedUser.email) { formatedUser.email = ''; }
	if (!formatedUser.socketID) { formatedUser.socketID = ''; }
	if (!formatedUser.sessionToken) { formatedUser.sessionToken = ''; }
	if (!formatedUser.passwordResetToken) { formatedUser.passwordResetToken = ''; }
	if (!formatedUser.id) { formatedUser.id = 0; }

	return formatedUser;
};

const find = async (user) => {
	const formatedUser = formatUser(user);
	const response = await findUserByUniqueIdentifier(formatedUser);
	if (response.error) { return response; }

	logger.info(`A User has been found: ${
		JSON.stringify(response.user, null, 2)
	}`);
	return response;
};

module.exports = find;
