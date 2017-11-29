const database = require('../../../postgresql/postgresql');
const myErrors = require('../../../errors');

const error = {
	database: myErrors.newFailure({
		log: e => `Database error: models/user/steps/updateConnection => ${e}`,
		message: 'Error, please try again later',
	}),
};

const updateConnection = async ({ id, connected }) => {
	const query = 'UPDATE users SET connected = $1 WHERE id = $2';

	try {
		await database.query(query, [connected, id]);
		return {};
	} catch (e) {
		return error.database(e);
	}
};

module.exports = updateConnection;
