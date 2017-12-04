const database = require('../../../postgresql');
const myErrors = require('../../../errors');

const error = {
	database: myErrors.newFailure({
		log: e => `Database error: models/user/steps/updatePassword => ${e}`,
		message: 'Error, please try again later',
	}),
};

const updatePassword = async ({ id, password }) => {
	const query = 'UPDATE users SET password = $1 WHERE id = $2';

	try {
		await database.query(query, [password, id]);
		return {};
	} catch (e) {
		return error.database(e);
	}
};

module.exports = updatePassword;
