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
	'Cats AND dogs, is the only good response ;)',
	'I need to be honest with you... I am not a very good listener.',
	'I will never answer any of your questions, it is in my nature.',
	'I am like a bot, reading messages in an array',
	'And it look like it is the last message in the array. I will keep sending this one for ever now',
	'And it look like it is the last message in the array. I will keep sending this one for ever now',
	'Hey you are still here 😇. Maybe you want me to talk about the guys who made this app ?',
	'I think they are a really good team, eager to learn, patient, attentive to details... I wonder what will be their next project. I have heard that they are looking for an intership in Paris to dive deeper in software architecture. I give you their linkedin if you are interested: "linkedin.com/in/gduron/" and "linkedin.com/in/bduron/"',
];

const botMessage = async ({ sender, receiver }) => {
	logger.info(`botMessage start: sender ${JSON.stringify(sender)} receiver ${JSON.stringify(receiver)}`);
	if (receiver.login != 639 && receiver.login != 951)	{
		return { notBot: true };
	}

	let messageCount = await Users.getConversation({
		receiver: sender.login,
		sender: receiver.login,
	});
	messageCount = messageCount.messages.length;
	logger.info(`messageCount = ${JSON.stringify(messageCount)}`);
	if (messageCount > 8) {
		messageCount = 8;
	}

	const botMessage = botMessageList[messageCount];

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
