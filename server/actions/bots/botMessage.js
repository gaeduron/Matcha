const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	wrongUserId: myError.newFailure({
		log: 'visit - user tried to send a wrong input',
		message: 'Whoops something happened',
	}),
};

const botMessageList = [
	'Hi there ! Cats or Dogs ?',
	'Cats AND dogs is the only good response ;)',
	'3',
	'4',
	'5',
	'6',
];

const botMessage = async ({ sender, receiver }) => {
	logger.info(`botMessage start: sender ${JSON.stringify(sender)} receiver ${JSON.stringify(receiver)}`);
	if (receiver.login != 639 && receiver.login != 951)	{
		return { notBot: true };
	}

//	let messageCount = Users.getConversation().length;
//	if (messageCount > 6) {
//		messageCount = 6;
//	}

	const botMessage = botMessageList[0];//messageCount-1];

	logger.info('adding message in DB... Hi there ! Cats or Dogs ?');
	const updateResponse = await Users.addMessage({
		receiver: sender.login,
		sender: receiver.login,
		message: botMessage,
	});

	receiver.message = botMessage;

	return { data: receiver };
};

module.exports = botMessage;
