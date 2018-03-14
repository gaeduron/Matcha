const database = require('../../../postgresql');
const myErrors = require('../../../errors');

const error = {
	database: myErrors.newFailure({
		log: e => `Database error: models/user/steps/updateConnection => ${e}`,
		message: 'Error, please try again later',
	}),
};

const updateReport = async ({ id, report }) => {
	const query = 'UPDATE users SET reported = $1 WHERE id = $2';

	try {
		await database.query(query, [report, id]);
		return {};
	} catch (e) {
		return error.database(e);
	}
};

module.exports = updateReport;
