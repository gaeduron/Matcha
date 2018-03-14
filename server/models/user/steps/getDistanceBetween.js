const database = require('../../../postgresql');
const logger = require('../../../logs/logger');
const myErrors = require('../../../errors');

const error = {
	database: myErrors.newFailure({
		log: e => `Database error: models/user/paths/getDistanceBetween.js => ${e}`,
		message: 'Error, please try again later.',
	}),
	userNotFound: myErrors.newFailure({
		log: 'User not found',
		message: 'User profiles corrupted',
	}),
};

const findDistanceBetween = async (
	{
		id,
		longitude,
		latitude,
	},
) => {
	const query = `
		SELECT
			(earth_distance(
				ll_to_earth(cast(latitude AS float), cast(longitude AS float)),
				ll_to_earth(cast($1 AS float), cast($2 AS float)))
			) AS distance
		FROM
			users
		WHERE
			id = $3
		limit 1
	`;

	try {
		const res = await database.query(
			query,
			[
				latitude,
				longitude,
				id
			],
		);

		if (!res.rows[0]) { return error.userNotFound(); }

		return { profiles: res.rows };
	} catch (e) {
		return error.database(e);
	}
};

const getDistanceBetween = async (filters) => {
	let response = await findDistanceBetween(filters);
	if (response.error) { return response; }


	logger.info(`Distance has been found: ${
		JSON.stringify(response.profiles, null, 2)
	}`);
	return response.profiles[0];
};

module.exports = getDistanceBetween;
