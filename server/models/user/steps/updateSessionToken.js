const database = require('../../../postgresql');
const myErrors = require('../../../errors');

const error = {
	database: myErrors.newFailure({
		log: e => `Database error: models/user/steps/updateSessionToken => ${e}`,
		message: 'Error, please try again later',
	}),
};

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
