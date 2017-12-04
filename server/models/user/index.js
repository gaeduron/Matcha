// STEPS //
const updateConnection = require('./steps/updateConnection');
const updatePassword = require('./steps/updatePassword');
const updateSessionToken = require('./steps/updateSessionToken');
const updatePasswordResetToken = require('./steps/updatePasswordResetToken');
const updatePasswordResetExpireAt = require('./steps/updatePasswordResetExpireAt');
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
	updatePassword,
	updateSessionToken,
	updatePasswordResetToken,
	updatePasswordResetExpireAt,
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
