const database = require('../../../../postgresql');
const myErrors = require('../../../../errors');

const error = {
	database: myErrors.newFailure({
		log: e => `Database error: models/user/paths/interactions/getBlocks.js => ${e}`,
		message: 'Error, please try again later.',
	}),
};

const getBlocks = async ({ id }) => {
	const query = `
		SELECT *
			FROM blocked 
			WHERE sender = $1 
		UNION
		SELECT *
			FROM blocked
			WHERE receiver = $1;
	`;

	try {
		const res = await database.query(query, [id]);

		return { 
			blocks: res.rows,
			id
		};
	} catch (e) {
		return error.database(e);
	}
};

module.exports = getBlocks;
