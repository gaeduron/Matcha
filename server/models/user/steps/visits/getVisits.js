const database = require('../../../../postgresql');
const myErrors = require('../../../../errors');

const error = {
	database: myErrors.newFailure({
		log: e => `Database error: models/user/paths/visits/getVisits.js => ${e}`,
		message: 'Error, please try again later.',
	}),
	userNotFound: myErrors.newFailure({
		log: 'User not found',
		message: 'Whoops, something went wrong',
	}),
};

const getVisits = async ({ id }) => {
	const query = `
		SELECT visits.*, users.firstname, users.lastname, users.birthdate, users.occupation, users.photos, users.id 
			FROM visits 
			INNER JOIN users 
			ON users.id = visits.receiver 
			WHERE sender = $1 
		UNION
		SELECT visits.*, users.firstname, users.lastname, users.birthdate, users.occupation, users.photos, users.id 
			FROM visits INNER JOIN users 
			ON users.id = visits.sender 
			WHERE receiver = $1;
	`;

	try {
		const res = await database.query(query, [id]);

		if (!res.rows[0]) { return error.userNotFound(); }

		return { visits: res.rows };
	} catch (e) {
		return error.database(e);
	}
};

module.exports = getVisits;
