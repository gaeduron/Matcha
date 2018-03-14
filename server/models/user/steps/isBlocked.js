const database = require('../../../postgresql');
const logger = require('../../../logs/logger');
const myErrors = require('../../../errors');

const error = {
	database: myErrors.newFailure({
		log: e => `Database error: models/user/paths/isBlocked.js => ${e}`,
		message: 'Error, please try again later.',
	}),
};

const findIsBlocked = async (
	{
		from,
		to,
	},
) => {
	const query = `
		SELECT
			blocked.id, blocked.sender, blocked.receiver
		FROM
			blocked
		WHERE
			blocked.sender = $1
		AND
			blocked.receiver = $2
	`;

	try {
		const res = await database.query(
			query,
			[
				from,
				to
			],
		);

		return { profiles: res.rows };
	} catch (e) {
		return error.database(e);
	}
};

const isBlocked = async (filters) => {
	let response = await findIsBlocked(filters);
	if (response.error) { return response; }


	logger.info(`Blocks : ${
		JSON.stringify(response.profiles, null, 2)
	}`);
	return response.profiles;
};

module.exports = isBlocked;
