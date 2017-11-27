const database = require('../../../postgresql/postgresql');
const error = require('../../../errors/models/auth');

const updateConnection = async ({ id, connected }) => {
	const query = 'UPDATE users SET connected = $1 WHERE id = $2';

	try {
		await database.query(query, [connected, id]);
		return error.none;
	} catch (e) {
		return error.database(e);
	}
};

module.exports = updateConnection;
