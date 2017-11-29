// STEPS //
const updateConnection = require('./steps/updateConnection');
const updateSessionToken = require('./steps/updateSessionToken');
const validateEmail = require('./steps/validateEmail');
const validateFirstname = require('./steps/validateFirstname');
const validateLastname = require('./steps/validateLastname');
const validateLogin = require('./steps/validateLogin');
const validatePassword = require('./steps/validatePassword');
const hashPassword = require('./steps/hashPassword');
const create = require('./steps/create');

// PATHS //
const find = require('./paths/find');
const newSession = require('./paths/newSession');

module.exports = {
	// STEPS //
	updateConnection,
	updateSessionToken,
	validateEmail,
	validateFirstname,
	validateLastname,
	validateLogin,
	validatePassword,
	hashPassword,
	create,
	// PATHS //
	find,
	newSession,
};
