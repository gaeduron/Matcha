const changeCase = require('change-object-case');
const database = require('../../../postgresql');
const logger = require('../../../logs/logger');
const myErrors = require('../../../errors');

const error = {
	database: myErrors.newFailure({
		log: e => `Database error: models/user/paths/find.js => ${e}`,
		message: 'Error, please try again later.',
	}),
	userNotFound: myErrors.newFailure({
		log: 'User not found',
		message: 'No profiles found with thoses filters',
	}),
};

const findProfilesWithFilters = async (
	{
		birthdate,
		longitude,
		latitude,
		score,
		sex,
		orderBy,
		limit,
	},
) => {
	const query = `
		SELECT
			firstname, lastname, birthdate, occupation, photos
		FROM
			users
		WHERE
			(age(birthdate) BETWEEN $1 AND $2)
		AND
			(longitude BETWEEN $3 AND $4)
		AND
			(latitude BETWEEN $5 AND $6)
		AND
			(score BETWEEN $7 AND $8)
		AND
			(sex = $9 OR sex = $10)
		ORDER BY
			${orderBy}
		limit $11
	`;

	try {
		const res = await database.query(
			query,
			[
				birthdate.min,
				birthdate.max,
				longitude.min,
				longitude.max,
				latitude.min,
				latitude.max,
				score.min,
				score.max,
				sex[0],
				sex[1],
				limit,
			],
		);

		if (!res.rows[0]) { return error.userNotFound(); }

		return { profiles: res.rows };
	} catch (e) {
		return error.database(e);
	}
};

const getProfiles = async (filters) => {
	let response = await findProfilesWithFilters(filters);
	if (response.error) { return response; }


	logger.info(`Profiles has been found: ${
		JSON.stringify(response.profiles, null, 2)
	}`);
	return response;
};

module.exports = getProfiles;
