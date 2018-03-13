const database = require('../../../postgresql');
const myError = require('../../../errors');

const error = {
	database: myError.newFailure({
		log: e => `Database error: models/user/steps/createBlock.js => ${e}`,
		message: 'Error, please try again later',
	}),
};

async function createBlock({to, from}) {

	const query = `INSERT INTO blocked (receiver, sender) VALUES ($1, $2);`;

	try {
		const res = await database.query(query, [to, from]);
		return {};
	} catch (e) {
		return error.database(e);
	}
}

module.exports = createBlock;
