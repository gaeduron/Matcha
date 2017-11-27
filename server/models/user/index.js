// STEPS //
const findUserByID = require('./steps/findUserByID.js');
const findBySessionToken = require('./steps/findBySessionToken.js');
const updateConnection = require('./steps/updateConnection.js');
const updateSessionToken = require('./steps/updateSessionToken.js');

// PATHS //
const find = require('./paths/find');
const newSession = require('./paths/newSession');

module.exports = {
	// STEPS //
	findUserByID,
	findBySessionToken,
	updateConnection,
	updateSessionToken,
	// PATHS //
	find,
	newSession,
};
