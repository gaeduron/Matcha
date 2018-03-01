const database = require('../../../../postgresql');
const myError = require('../../../../errors');

const error = {
	database: myError.newFailure({
		log: e => `Database error: models/user/steps/visits/addVisit => ${e}`,
		message: 'Error, please try again later',
	}),
};

async function addVisit({receiver, sender}) {

	const query = `INSERT INTO visits (receiver, sender) VALUES ($1, $2);`;

	try {
		const res = await database.query(query, [receiver, sender]);
		return {};
	} catch (e) {
		return error.database(e);
	}
}

module.exports = addVisit;
