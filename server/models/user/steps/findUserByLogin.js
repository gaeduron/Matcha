const database = require('../../../postgresql/postgresql.js');
const logger = require('../../../logs/logger');
const error = require('../../../errors/models/auth');

const finduserbyid = ({ id }) => {
	const query = 'select * from users where id = $1;';

	try {
		const res = await database.query(query, [id]);

		if (!res.rows[0]) { return error.usernotfound(); }

		return { user: res.rows[0] };
	} catch (e) {
		return error.database(e);
	}
	
};

module.exports = { finduserbyid }
