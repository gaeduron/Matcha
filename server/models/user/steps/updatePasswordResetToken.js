const database = require('../../../postgresql');
const myErrors = require('../../../errors');

const error = {
	database: myErrors.newFailure({
		log: e => `Database error: models/user/steps/updatePasswordResetToken => ${e}`,
		message: 'Error, please try again later',
	}),
};

const updatePasswordResetToken = async ({ id, passwordResetToken }) => {
	const query = 'UPDATE users SET password_reset_token = $1 WHERE id = $2';

	try {
		await database.query(query, [passwordResetToken, id]);
		return {};
	} catch (e) {
		return error.database(e);
	}
};

module.exports = updatePasswordResetToken;
