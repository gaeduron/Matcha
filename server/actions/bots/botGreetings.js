const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');
const selectBot = require('./selectBot');

const error = {
	wrongUserId: myError.newFailure({
		log: 'visit - user tried to send a wrong input',
		message: 'Whoops something happened',
	}),
};

const formatBot = (raw) => {
	return {
		id: raw.id,
		login: raw.id,
		profilePicture: JSON.parse(raw.photos)[0],
		firstname: raw.firstname,
	}
}

const botGreetings = async (user) => {
	const botRaw = await selectBot(user);
	if (botRaw.error) { return botRaw }

	const bot = formatBot(botRaw.user);

	logger.info('updating visit in DB...');
	const updateResponse = await Users.addVisit({ receiver: user.id, sender: bot.id });

	logger.info(`Updating User { id: ${user.id} } score by 1`);
	const res = await Users.updateScore({ id: user.id, score: 1});
	if (res.error) { return res }

	return { data: bot };
};

module.exports = botGreetings;
