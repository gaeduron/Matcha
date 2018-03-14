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

const getMessages = async ({ id }) => {
	const query = `
		SELECT messages.*, users.firstname, users.lastname, users.birthdate, users.occupation, users.photos, users.reported 
			FROM messages 
			INNER JOIN users 
			ON users.id = messages.receiver 
			WHERE sender = $1 
		UNION
		SELECT messages.*, users.firstname, users.lastname, users.birthdate, users.occupation, users.photos, users.reported 
			FROM messages 
			INNER JOIN users 
			ON users.id = messages.sender 
			WHERE receiver = $1;
	`;

	try {
		const res = await database.query(query, [id]);

		if (!res.rows[0]) { return { messages: [] }}

		return { messages: res.rows };
	} catch (e) {
		return error.database(e);
	}
};

module.exports = getMessages;
