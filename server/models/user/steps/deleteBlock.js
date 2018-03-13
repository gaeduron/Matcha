const database = require('../../../postgresql');
const myError = require('../../../errors');

const error = {
	database: myError.newFailure({
		log: e => `Database error: models/user/steps/createBlock.js => ${e}`,
		message: 'Error, please try again later',
	}),
};

async function deleteBlock({to, from}) {

	const query = `DELETE FROM blocked WHERE blocked.receiver = $1 AND blocked.sender = $2`;

	try {
		const res = await database.query(query, [to, from]);
		return {};
	} catch (e) {
		return error.database(e);
	}
}

module.exports = deleteBlock;
