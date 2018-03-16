const database = require('../../../../postgresql');
const myErrors = require('../../../../errors');

const error = {
	database: myErrors.newFailure({
		log: e => `Database error: models/user/steps/likes/getMatches.js => ${e}`,
		message: 'Error, please try again later.',
	}),
	userNotFound: myErrors.newFailure({
		log: 'User not found',
		message: 'No profiles found with thoses filters',
	}),
};

const getMatches = async ({ id }) => {
	const query = ` 
		SELECT matches.*, users.firstname, users.lastname, users.birthdate, users.occupation, users.photos, users.reported 
			FROM matches 
			INNER JOIN users 
			ON users.id = matches.sender 
			WHERE receiver = $1
	`;


	try {
		const res = await database.query(query, [id]);

		if (!res.rows[0]) { return { matches: [] }}

		return { matches: res.rows };
	} catch (e) {
		return error.database(e);
	}
};

module.exports = getMatches;
