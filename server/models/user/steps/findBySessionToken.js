const database = require('../../../postgresql/postgresql.js');
const error = require('../../../errors/models/auth');

const findBySessionToken = async ({ sessionToken }) => {
	const query = 'SELECT * FROM users WHERE session_token = $1;';

	try {
		const res = await database.query(query, [sessionToken]);

		if (!res.rows[0]) { return error.userNotFound(); }

		return { user: res.rows[0] };
	} catch (e) {
		return error.database(e);
	}
};

module.exports = { findBySessionToken };
