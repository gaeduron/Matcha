const database = require('../../../postgresql/postgresql');
const error = require('../../../errors/models/auth');

const findUserByID = async ({ id }) => {
	const query = 'SELECT * FROM users WHERE id = $1;';

	try {
		const res = await database.query(query, [id]);

		if (!res.rows[0]) { return error.userNotFound(); }

		return { user: res.rows[0] };
	} catch (e) {
		return error.database(e);
	}
};

module.exports = findUserByID;
