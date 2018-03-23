const changeCase = require('change-object-case');
const database = require('../../../postgresql');
const logger = require('../../../logs/logger');
const myErrors = require('../../../errors');

const error = {
	database: myErrors.newFailure({
		log: e => `Database error: models/user/paths/getProfiles.js => ${e}`,
		message: 'Error, please try again later.',
	}),
	userNotFound: myErrors.newFailure({
		log: 'User not found',
		message: 'Please, try different filters',
		type: 'info'
	}),
};

const findProfilesWithFilters = async (
	{
		birthdate,
		distance,
		position,
		score,
		sex,
		orderBy,
		tags,
		noTags,
		id
	},
) => {
	const query = `
		SELECT
			(earth_distance(
				ll_to_earth(cast(latitude AS float), cast(longitude AS float)),
				ll_to_earth(cast($5 AS float), cast($6 AS float)))
			) AS distance
		FROM
			users
		JOIN
			tags ON tags.id = (
				SELECT
					id
				FROM
					tags
				WHERE
					tags.user_id = users.id
				AND
					tags.tag = ANY($11::text[]) OR $12 = 'no tags'
				limit 1
			)
		WHERE
			(age(birthdate) BETWEEN $1 AND $2)
		AND
			((earth_distance(
				ll_to_earth(cast(latitude AS float), cast(longitude AS float)),
				ll_to_earth(cast($5 AS float), cast($6 AS float)))
			) BETWEEN $3 AND $4)
		AND
			(score BETWEEN $7 AND $8)
		AND
			(sex = $9 OR sex = $10)
		AND
			login != $13
		ORDER BY
			${orderBy}
	`;

	try {
		const res = await database.query(
			query,
			[
				birthdate.min,
				birthdate.max,
				distance.min,
				distance.max,
				position.lat,
				position.lon,
				score.min,
				score.max,
				sex[0],
				sex[1],
				tags,
				noTags,
				id
			],
		);

		if (!res.rows[0]) { return error.userNotFound(); }

		return { profiles: res.rows };
	} catch (e) {
		return error.database(e);
	}
};

const getProfilesCount = async (filters) => {
	let response = await findProfilesWithFilters(filters);
	if (response.error) { return response; }


	logger.info(`Profiles has been found: ${
		JSON.stringify(response.profiles, null, 2)
	}`);
	return response;
};

module.exports = getProfilesCount;
