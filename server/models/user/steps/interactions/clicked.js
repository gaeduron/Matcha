const database = require('../../../../postgresql');
const myError = require('../../../../errors');

const error = {
	database: myError.newFailure({
		log: e => `Database error: models/user/steps/interactions/clicked => ${e}`,
		message: 'Error, please try again later',
	}),
};

async function clicked({id, newsId = 0, type, sender}) {

	const chatMessageQuery = `UPDATE messages SET clicked = true WHERE receiver = $1 AND sender = $2;`;
	const chatLikeQuery = `UPDATE likes SET clicked = true WHERE receiver = $1 AND sender = $2;`;
	const visitsQuery = `UPDATE visits SET clicked = true WHERE id = $1 AND receiver = $2;`;
	const likesQuery = `UPDATE likes SET clicked = true WHERE id = $1 AND receiver = $2;`;

	try {
		if (type == 'like') 
			await database.query(likesQuery, [newsId, id]);
		if (type == 'visit') 
			await database.query(visitsQuery, [newsId, id]);
		if (type == 'chat') {
			await database.query(chatMessageQuery, [id, sender]);
			await database.query(chatLikeQuery, [id, sender]);
		}
		return {};
	} catch (e) {
		return error.database(e);
	}
}

module.exports = clicked;
