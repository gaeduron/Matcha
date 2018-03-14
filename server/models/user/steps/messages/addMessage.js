const database = require('../../../../postgresql');
const myError = require('../../../../errors');

const error = {
	database: myError.newFailure({
		log: e => `Database error: models/user/steps/messages/addMessage => ${e}`,
		message: 'Error, please try again later',
	}),
};

async function addMessage({receiver, sender, message}) {

	const query = `INSERT INTO messages (receiver, sender, message) VALUES ($1, $2, $3);`;

	try {
		const res = await database.query(query, [receiver, sender, message]);
		return {};
	} catch (e) {
		return error.database(e);
	}
}

module.exports = addMessage;
