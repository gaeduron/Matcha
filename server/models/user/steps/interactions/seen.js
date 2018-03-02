const database = require('../../../../postgresql');
const myError = require('../../../../errors');

const error = {
	database: myError.newFailure({
		log: e => `Database error: models/user/steps/interactions/seen => ${e}`,
		message: 'Error, please try again later',
	}),
};

async function seen({id, type}) {

	const chatQuery = `UPDATE messages SET seen = true WHERE receiver = $1;`;
	const visitsQuery = `UPDATE visits SET seen = true WHERE receiver = $1;`;
	const likesQuery = `UPDATE likes SET seen = true WHERE receiver = $1;`;

	try {
		if (type == 'chat')
			await database.query(chatQuery, [id]);
		if (type == 'news') {
			await database.query(visitsQuery, [id]);
			await database.query(likesQuery, [id]);
		}
		return {};
	} catch (e) {
		return error.database(e);
	}
}

module.exports = seen;
