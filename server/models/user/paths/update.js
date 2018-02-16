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

const updateUser = async (user) => {

	const query = `
		UPDATE users 	
		SET connected = $2,
			score = $3,
			reported = $4,
			login = $5,
			password = $6,
			firstname = $7,
			lastname = $8,
			email = $9,
			sex = $10,
			sexual_orientation = $11,
			bio = $12,
			longitude = $13,
			latitude = $14,
			last_connection = $15,
			session_token = $16,
			password_reset_token = $17,
			password_reset_expire_at = $18,
			birthdate = $19,
			photos = $20,
			geolocation_allowed = $21,
			occupation = $22,
			onboarding = $23
		WHERE id = $1;`;

	try {
		const res = await database.query(query, Object.values(user).slice(0, 23));
		return { user: res };
	} catch (e) {
		return { error: error.database(e) };
	}
};

const update = async (user) => {
	let response = await find(user);
	if (response.error) { return response; }
	response.user = {
		...response.user,
		...user
	};

	let update = await updateUser(response.user);
	if (update.error) { return update; }

	logger.info(`User has been updated: ${
		JSON.stringify(user, null, 2)
	}`);
	return update;
};

module.exports = update;
