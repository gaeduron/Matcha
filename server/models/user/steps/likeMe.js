const database = require('../../../../postgresql');

async function likeMe(myID, userID) {

	const query = `SELECT id FROM likes WHERE from = $2 AND to = $1;`;		

	try {
		const res = await database.query(query, [myID, userID]);
		return res.rows[0];
	} catch (e) {
		return console.log(e);
	}
}

module.exports = getTags;
