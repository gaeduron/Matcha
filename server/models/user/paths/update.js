const database = require('../../../postgresql');
const logger = require('../../../logs/logger');
const myErrors = require('../../../errors');
const find = require('./find');

const error = {
	database: myErrors.newFailure({
		log: e => `Database error: models/user/paths/find.js => ${e}`,
		message: 'Error, please try again later.',
	}),
};

const updateUser = async ({ ...user }) => {
	const query = 'UPDATE users SET session_token = $2, password_reset_token = $3, password_reset_expire_at = $4, connected = $5, age = $6, score = $7, reported = $8, login = $9, password = $10, firstname = $11, lastname = $12, email = $13, sex = $14, sexual_orientation = $15, bio = $16, longitude = $17, latitude = $18, last_connection = $19 WHERE id = $1;';

	try {
		const res = await database.query(
			query,
			[id, session_token, password_reset_token, password_reset_expire_at, connected,age,score,reported,login,password,firstname,lastname,email,sex,sexual_orientation,bio,longitude,latitude,last_connection],
		);

		return { user: res.rows[0] };
	} catch (e) {
		return error.database(e);
	}
};

const update = async (user) => {
	let response = find(user);
	if (response.error) { return response; }
	response.user = {
		...response.user,
		...user,
	};
	response = await updateUser(response.user);
	if (response.error) { return response; }

	logger.info(`User has been updated: ${
		JSON.stringify(response.user, null, 2)
	}`);
	return response;
};

module.exports = update;
