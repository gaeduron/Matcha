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
const validateBirthdate = require('./steps/validateBirthdate');
const validateGender = require('./steps/validateGender');
const validateLocation = require('./steps/validateLocation');
const validateOrientation = require('./steps/validateOrientation');
const hashPassword = require('./steps/hashPassword');
const create = require('./steps/create');

// PATHS //
const find = require('./paths/find');
const newSession = require('./paths/newSession');
const update = require('./paths/update');

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
	validateBirthdate,
	validateGender,
	validateOrientation,
	validateLocation,
	hashPassword,
	create,
	// PATHS //
	find,
	newSession,
	update
};
