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
	firstname,
	lastname,
	login,
	password,
}) => {
	const query = `
	INSERT INTO users (
		email,
		firstname,
		lastname,
		login,
		password
	) VALUES ($1, $2, $3, $4, $5);`;

	try {
		await database.query(query, [email, firstname, lastname, login, password]);
		logger.info('User Creation succesful !');
		return {
			message: ['Your account has been successfuly created !'],
		};
	} catch (e) {
		return error.database();
	}
};

module.exports = create;
