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
		message: 'No profiles found with thoses filters',
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
		limit,
		tags,
		noTags,
		id
	},
) => {
	const query = `
		SELECT
			users.id, firstname, lastname, birthdate, occupation, photos, latitude, longitude,
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
					tags.tag = ANY($12::text[]) OR $13 = 'no tags'
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
			users.id != $14
		AND
			exists(
				SELECT
					1
				FROM
					blocked
				WHERE
					blocked.sender = $14
				AND
					blocked.receiver = users.id
			) = false
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
				distance.min,
				distance.max,
				position.lat,
				position.lon,
				score.min,
				score.max,
				sex[0],
				sex[1],
				limit,
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

const getProfiles = async (filters) => {
	let response = await findProfilesWithFilters(filters);
	if (response.error) { return response; }


	logger.info(`Profiles has been found: ${
		JSON.stringify(response.profiles, null, 2)
	}`);
	return response;
};

module.exports = getProfiles;
