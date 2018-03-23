const database = require('../../../../postgresql');
const myErrors = require('../../../../errors');

const error = {
	database: myErrors.newFailure({
		log: e => `Database error: models/user/steps/message/getConversation.js => ${e}`,
		message: 'Error, please try again later.',
	}),
	userNotFound: myErrors.newFailure({
		log: 'User not found',
		message: 'Whoops, something went wrong',
	}),
};

const getConversation = async ({ sender, receiver }) => {
	const query = `
		SELECT
			* 
		FROM
			messages
		WHERE
			sender = $1 AND receiver = $2;
	`;

	try {
		const res = await database.query(query, [sender, receiver]);

		if (!res.rows[0]) { return { messages: [] }}

		return { messages: res.rows };
	} catch (e) {
		return error.database(e);
	}
};

module.exports = getConversation;
