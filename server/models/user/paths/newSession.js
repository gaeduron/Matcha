const uuid = require('uuid/v4');
const updateSessionToken = require('../steps/updateSessionToken');
const updateLastConnection = require('../steps/updateLastConnection');
const logger = require('../../../logs/logger');

const newSession = ({ id }) => {
	const sessionToken = uuid();
	const user = { id, sessionToken };
	const res = updateLastConnection(user);
	if (res.error) { return res };
	
	return updateSessionToken(user);
};

module.exports = newSession;
