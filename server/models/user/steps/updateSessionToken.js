const database = require('../../../postgresql/postgresql');
const error = require('../../../errors/models/auth');

const updateSessionToken = async ({ id, sessionToken }) => {
	const query = 'UPDATE users SET session_token = $1 WHERE id = $2';

	try {
		await database.query(query, [sessionToken, id]);
		return sessionToken;
	} catch (e) {
		return error.database(e);
	}
};

module.exports = updateSessionToken;
