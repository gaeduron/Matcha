const uuid = require('uuid/v4');
const database = require('../../../postgresql');
const myError = require('../../../errors');
const logger = require('../../../logs/logger');

const error = {
	database: myError.newFailure({
		log: e => `Database error at User Creation =>\n${e}`,
		message: 'Error, please try again later',
	}),
};

const create = async ({
	email,
	facebookID,
	first_name,
	last_name,
	gender,
	photos,
}) => {
	const query = `
	INSERT INTO users (
		email,
		facebook_id,
		firstname,
		lastname,
		sex,
		password,
		photos
	) VALUES ($1, $2, $3, $4, $5, $6, $7);`;

	try {
		await database.query(query, [
			email,
			facebookID,
			first_name,
			last_name,
			gender,
			uuid(),
			photos,
		]);
		logger.info('User Creation succesful !');
		return {
			message: ['Your account has been successfuly created !'],
		};
	} catch (e) {
		return error.database(e);
	}
};

module.exports = create;
