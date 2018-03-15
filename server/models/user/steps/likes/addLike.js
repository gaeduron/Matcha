const database = require('../../../../postgresql');
const myError = require('../../../../errors');

const error = {
	database: myError.newFailure({
		log: e => `Database error: models/user/steps/likes/addLike => ${e}`,
		message: 'Error, please try again later',
	}),
};

async function addLike({receiver, sender}) {

	// 1 - isMatch ? SQL query to check if this like is going to produce a match ? 
	// 2 - call addMatch, and add a match for the two people
	// 3 - Add an indicator to the return object, so that we can send a match notification to the 2 users instead of a like for one 
	// 		


	const query = `INSERT INTO likes (receiver, sender) VALUES ($1, $2);`;

	try {
		const res = await database.query(query, [receiver, sender]);
		return {};
	} catch (e) {
		return error.database(e);
	}
}

module.exports = addLike;
