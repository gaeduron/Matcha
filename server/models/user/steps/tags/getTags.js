const database = require('../../../../postgresql');

async function getTags(userId) {

	const query = `SELECT tag FROM tags WHERE user_id = $1;`;		

	try {
		const res = await database.query(query, [userId]);
		return res.rows.map(row => row.tag);
	} catch (e) {
		return console.log(e);
	}
}

module.exports = getTags;
