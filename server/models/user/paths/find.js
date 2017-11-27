const database = require('../../postgresql/postgresql.js');
const logger = require('../../logs/logger');
const error = require('../../errors/models/auth');

const findUserByUniqueIdentifier = async (
	{
		email,
		socketID,
		login,
		id,
	},
) => {
	const query = 'SELECT * FROM users WHERE login = $1 OR email = $2 OR connected = $3 OR id = $4;';

	try {
		const res = await database.query(
			query,
			[login, email, socketID, id],
		);

		if (!res.rows[0]) { return error.userNotFound(); }

		return { user: res.rows[0] };
	} catch (e) {
		return error.database(e);
	}
};

const formatUser = (user) => {
	const formatedUser = { ...user };
	if (!formatUser.login) { formatUser.login = ''; }
	if (!formatUser.email) { formatUser.email = ''; }
	if (!formatUser.socketID) { formatUser.socketID = ''; }
	if (!formatUser.id) { formatUser.id = 0; }

	return formatUser;
};

const find = async (user) => {
	const formatedUser = formatUser(user);
	const response = await findUserByUniqueIdentifier(formatedUser);
	if (response.error) { return response; }

	logger.info(`A User has been found: ${JSON.stringify(response.user)}`);
	return response;
};

module.exports = { find };
