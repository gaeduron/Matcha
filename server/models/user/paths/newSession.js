const uuid = require('uuid/v4');
const updateSessionToken = require('../steps/updateSessionToken.js');
const logger = require('../../../logs/logger');

const newSession = ({ id }) => {
	const sessionToken = uuid();
	const user = { id, sessionToken };

	return updateSessionToken(user);
};

module.exports = newSession;
