const database = require('../../../postgresql');
const myErrors = require('../../../errors');

const error = {
	database: myErrors.newFailure({
		log: e => `Database error: models/user/steps/updatePasswordResetExpireAt => ${e}`,
		message: 'Error, please try again later',
	}),
};

const updatePasswordResetExpireAt = async ({ id, passwordResetExpireAt }) => {
	const query = 'UPDATE users SET password_reset_expire_at = $1 WHERE id = $2';

	try {
		await database.query(query, [passwordResetExpireAt, id]);
		return {};
	} catch (e) {
		return error.database(e);
	}
};

module.exports = updatePasswordResetExpireAt;
