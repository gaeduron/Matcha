const database = require('../../../../postgresql');
const myErrors = require('../../../../errors');

const error = {
	database: myErrors.newFailure({
		log: e => `Database error: models/user/paths/online/getOnlineUsers.js => ${e}`,
		message: 'Error, please try again later.',
	})
};

const getOnlineUsers = async () => {
	const query = `
		SELECT id FROM users WHERE connected IS NOT NULL;
	`;

	try {
		const res = await database.query(query, []);

		return res.rows;
	} catch (e) {
		return error.database(e);
	}
};

module.exports = getOnlineUsers ;
