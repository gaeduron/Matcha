const database = require('../../../../postgresql');
const myError = require('../../../../errors');

const error = {
	database: myError.newFailure({
		log: e => `Database error: models/user/steps/likes/addLike => ${e}`,
		message: 'Error, please try again later',
	}),
};



async function addMatch(receiver, sender) {

	const query = `INSERT INTO matches (receiver, sender) VALUES ($1, $2);`;	

	try {
		await database.query(query, [receiver, sender]);
		await database.query(query, [sender, receiver]);
		return true;
	} catch (e) {
		return error.database(e);
	}

}

async function isMatch(receiver, sender) {

	 /*
		 SELECT ALL likes where receiver == sender AND sender == receiver
		 take the most recent one
		 unliked == false ? TRUE : FALSE; 
	 */
	
	const query = `SELECT * FROM likes WHERE receiver = $2 AND sender = $1 ORDER BY id DESC LIMIT 1;`;	

	try {
		const res = await database.query(query, [receiver, sender]);
		return (res.rowCount == 1 && res.rows[0].unliked == false) ? true : false;
	} catch (e) {
		return error.database(e);
	}

}

async function addLike({receiver, sender}) {

	// 1 - isMatch ? SQL query to check if this like is going to produce a match ? 
	// 2 - call addMatch, and add a match for the two people
	// 3 - Add an indicator to the return object, so that we can send a match notification to the 2 users instead of a like for one 
	
	let matchNotification = false;

	if (await isMatch(receiver, sender)) {
		const res = await addMatch(receiver, sender);
		if (res === true) 
			matchNotification = true;
	}

	const query = `INSERT INTO likes (receiver, sender) VALUES ($1, $2);`;	

	try {
		await database.query(query, [receiver, sender]);
		return { matchNotification };
	} catch (e) {
		return error.database(e);
	}
}

module.exports = addLike;
