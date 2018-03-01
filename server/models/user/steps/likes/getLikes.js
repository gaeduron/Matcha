const database = require('../../../../postgresql');
const myErrors = require('../../../../errors');

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

const getLikes = async ({ id }) => {
	const query = `
		SELECT likes.*, users.firstname, users.lastname, users.birthdate, users.occupation, users.photos, users.id 
			FROM likes 
			INNER JOIN users 
			ON users.id = likes.receiver 
			WHERE sender = $1 
		UNION
		SELECT likes.*, users.firstname, users.lastname, users.birthdate, users.occupation, users.photos, users.id 
			FROM likes INNER JOIN users 
			ON users.id = likes.sender 
			WHERE receiver = $1;
	`;

	try {
		const res = await database.query(query, [id]);

		if (!res.rows[0]) { return error.userNotFound(); }

		return { likes: res.rows };
	} catch (e) {
		return error.database(e);
	}
};

module.exports = getLikes;
